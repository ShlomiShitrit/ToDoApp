using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Backend.Dto;
using Backend.Interfaces;
using Backend.Repositories;
using AutoMapper;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController(
        ITaskRepository taskRepository,
        ICategoryRepository categoryRepository,
        ISubCategoryRepository subCategoryRepository,
         IMapper mapper
         ) : Controller
    {
        private readonly ITaskRepository _taskRepository = taskRepository;
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly ISubCategoryRepository _subCategoryRepository = subCategoryRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = _mapper.Map<List<TaskDto>>(_taskRepository.GetTasks());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(tasks);
        }

        [HttpGet("{taskId}")]
        public IActionResult GetTask(int taskId)
        {
            if (!_taskRepository.TaskExists(taskId))
                return NotFound();

            var task = _mapper.Map<TaskDto>(_taskRepository.GetTaskById(taskId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(task);
        }

        [HttpPost("category")]
        public IActionResult CreateTaskOfCategory([FromQuery] int categoryId, [FromBody] TaskDto taskCreate)
        {
            if (taskCreate == null)
                return BadRequest(ModelState);

            var task = _taskRepository.GetTasks()?
                .Where(t => t.Title.Trim().ToLower() == taskCreate.Title.TrimEnd().ToLower() &&
                t.CategoryId == categoryId)
                .FirstOrDefault();
            if (task != null)
            {
                ModelState.AddModelError("Task", "Task is already exist in this category");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var isCategoryExists = _categoryRepository.CategoryExists(categoryId);
            if (!isCategoryExists)
                return NotFound("Category not found");

            var taskMap = _mapper.Map<TaskModel>(taskCreate);
            var category = _categoryRepository.GetCategoryById(categoryId);

            if (category == null)
                return NotFound("Category not found");

            taskMap.Category = category;

            if (!_taskRepository.CreateTask(taskMap))
            {
                ModelState.AddModelError("Task", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }
        [HttpPost("subcategory")]
        public IActionResult CreateTaskOfSubCategory([FromQuery] int subCategoryId, [FromBody] TaskDto taskCreate)
        {
            if (taskCreate == null)
                return BadRequest(ModelState);

            var task = _taskRepository.GetTasks()?
                .Where(t => t.Title.Trim().ToLower() == taskCreate.Title.TrimEnd().ToLower() &&
                t.SubCategoryId == subCategoryId)
                .FirstOrDefault();
            if (task != null)
            {
                ModelState.AddModelError("Task", "Task is already exist in this sub category");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var isSubCategoryExists = _subCategoryRepository.SubCategoryExists(subCategoryId);
            if (!isSubCategoryExists)
                return NotFound("SubCategory not found");

            var taskMap = _mapper.Map<TaskModel>(taskCreate);
            var subCategory = _subCategoryRepository.GetSubCategoryById(subCategoryId);

            if (subCategory == null)
                return NotFound("SubCategory not found");

            taskMap.SubCategory = subCategory;

            if (!_taskRepository.CreateTask(taskMap))
            {
                ModelState.AddModelError("Task", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }
    }
}