using AutoMapper;
using Backend.Dto;
using Backend.Interfaces;
using Backend.Filters.ActionFilters;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(
        ICategoryRepository categoryRepository,
        IUserRepository userRepository,
         IMapper mapper
         ) : Controller
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _mapper.Map<List<CategoryDto>>(_categoryRepository.GetCategories());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        [Category_ValidateCategoryIdFilter]
        public IActionResult GetCategory(int categoryId)
        {
            if (!_categoryRepository.CategoryExists(categoryId))
                return NotFound();

            var category = _mapper.Map<CategoryDto>(_categoryRepository.GetCategoryById(categoryId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(category);

        }


        [HttpPost]
        public IActionResult CreateCategory([FromQuery] int userId, [FromBody] CategoryDto categoryCreate)
        {
            if (categoryCreate == null)
                return BadRequest(ModelState);

            var category = _categoryRepository.GetCategories()
                .Where(c => c.Name.Trim().ToLower() == categoryCreate.Name.TrimEnd().ToLower())
                .FirstOrDefault();

            if (category != null)
            {
                ModelState.AddModelError("Category", "Category already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var isUserExists = _userRepository.UserExists(userId);
            if (!isUserExists)
                return NotFound();

            var categoryMap = _mapper.Map<Category>(categoryCreate);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return NotFound();

            categoryMap.User = user;

            if (!_categoryRepository.CreateCategory(categoryMap))
            {
                ModelState.AddModelError("Category", "Somthing went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpGet("{categoryId}/subcategories")]
        public IActionResult GetSubCategories(int categoryId)
        {
            if (!_categoryRepository.CategoryExists(categoryId))
                return NotFound();

            var subCategories = _mapper.Map<List<SubCategoryDto>>(_categoryRepository.GetSubCategories(categoryId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(subCategories);
        }

        [HttpGet("{categoryId}/tasks")]
        public IActionResult GetTasks(int categoryId)
        {
            if (!_categoryRepository.CategoryExists(categoryId))
                return NotFound();

            var tasks = _mapper.Map<List<TaskDto>>(_categoryRepository.GetTasks(categoryId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(tasks);
        }
    }
}