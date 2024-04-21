using Microsoft.AspNetCore.Mvc;
using TaskManager.DTO;
using TaskManager.Mappers;
using TaskManager.Models;
using TaskManager.Services.API;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("GetAllTasks")]
        public async Task<ActionResult<TaskModel>> GetAllTasks([FromQuery] TaskFilterDto filters)
        {
            var result = await _taskService.GetAllTasks(TaskMapper.MapToTaskFilterModel(filters));
            return Ok(result.Select(TaskMapper.MapToTaskDto).ToList());
        }

        [HttpPost]
        public async Task<ActionResult<List<TaskModel>>> AddTask(TaskDto newTask)
        {
            var result = await _taskService.AddTask(TaskMapper.MapToTaskModel(newTask));
            return Ok(result.Select(TaskMapper.MapToTaskDto).ToList());
        }

        [HttpPut]
        public async Task<ActionResult<TaskModel>> UpdateTask(TaskDto updatedTask)
        {
            var result = await _taskService.UpdateTask(TaskMapper.MapToTaskModel(updatedTask));
            return Ok(TaskMapper.MapToTaskDto(result));
        }

    }
}
