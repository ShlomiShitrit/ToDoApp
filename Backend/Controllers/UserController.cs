using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Interfaces;
using Backend.Repositories;
using Backend.Data;
using Backend.Dto;
using AutoMapper;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(
        IUserRepository userRepository,
        ICategoryRepository categoryRepository,
        IMapper mapper
    ) : Controller
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetUsers());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("{userId}")]
        public IActionResult GetUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound();

            var user = _mapper.Map<UserDto>(_userRepository.GetUserById(userId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] UserDto userCreate)
        {
            if (userCreate == null)
                return BadRequest(ModelState);

            var user = _userRepository.GetUsers()?
                .Where(u => u.Email.Trim().ToLower() == userCreate.Email.TrimEnd().ToLower())
                .FirstOrDefault();

            if (user != null)
            {
                ModelState.AddModelError("User", "User with this email is already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userMap = _mapper.Map<User>(userCreate);

            if (!_userRepository.CreateUser(userMap))
            {
                ModelState.AddModelError("User", "Somthing went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpGet("{userId}/categories")]
        public IActionResult GetCategoriesOfUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound();

            var categories = _mapper.Map<List<CategoryDto>>(_userRepository.GetCategories(userId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(categories);
        }

        [HttpGet("email/{userEmail}")]
        public IActionResult GetUserByEmail(string userEmail)
        {
            var user = _mapper.Map<UserDto>(_userRepository.GetUserByEmail(userEmail));

            if (user == null)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);

        }
    }
}