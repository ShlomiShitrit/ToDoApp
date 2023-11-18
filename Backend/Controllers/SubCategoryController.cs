using Microsoft.AspNetCore.Mvc;
using Backend.Dto;
using Backend.Interfaces;
using AutoMapper;
using Backend.Models;
using System.Reflection.Metadata.Ecma335;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController(ISubCategoryRepository subCategoryRepository, ICategoryRepository categoryRepository, IMapper mapper) : Controller
    {
        private readonly ISubCategoryRepository _subCategoryRepository = subCategoryRepository;
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public IActionResult GetSubCategories()
        {
            var subCategories = _mapper.Map<List<SubCategoryDto>>(_subCategoryRepository.GetSubCategories());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(subCategories);
        }

        [HttpGet("{subCategoryId}")]
        public IActionResult GetSubCategory(int subCategoryId)
        {
            if (!_subCategoryRepository.SubCategoryExists(subCategoryId))
                return NotFound();

            var subCategory = _mapper.Map<SubCategoryDto>(_subCategoryRepository.GetSubCategoryById(subCategoryId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(subCategory);

        }

        [HttpPost]
        public IActionResult CreateSubCategory([FromQuery] int categoryId, [FromBody] SubCategoryDto subCategoryCreate)
        {
            if (subCategoryCreate == null)
                return BadRequest(ModelState);

            var subCategory = _subCategoryRepository.GetSubCategories()
                .Where(sc => sc.Name.Trim().ToLower() == subCategoryCreate.Name.TrimEnd().ToLower() && sc.CategoryId == categoryId)
                .FirstOrDefault();

            if (subCategory != null)
            {
                ModelState.AddModelError("SubCategory", "SubCategory already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var isCategoryExists = _categoryRepository.CategoryExists(categoryId);
            if (!isCategoryExists)
                return NotFound();

            var subCategoryMap = _mapper.Map<SubCategory>(subCategoryCreate);
            var category = _categoryRepository.GetCategoryById(categoryId);

            if (category == null)
                return NotFound();

            subCategoryMap.Category = category;


            if (!_subCategoryRepository.CreateSubCategory(subCategoryMap))
            {
                ModelState.AddModelError("SubCategory", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpGet("{subCategoryId}/tasks")]
        public IActionResult GetTasks(int subCategoryId)
        {
            if (!_subCategoryRepository.SubCategoryExists(subCategoryId))
                return NotFound();

            var tasks = _mapper.Map<List<TaskDto>>(_subCategoryRepository.GetTasks(subCategoryId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(tasks);
        }
    }


}