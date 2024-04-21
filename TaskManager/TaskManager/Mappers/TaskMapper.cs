using TaskManager.DTO;
using TaskManager.Models;

namespace TaskManager.Mappers
{
    public class TaskMapper
    {
        public static TaskDto MapToTaskDto(TaskModel model)
        {
            return new TaskDto
            {
                Id = model.Id,
                Name = model.Name,
                Description = model.Description,
                Date = model.Date,
                IsCompleted = model.IsCompleted,
                IsImportant = model.IsImportant,
            };
        }

        public static TaskModel MapToTaskModel(TaskDto dto) 
        {
            return new TaskModel
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                Date = dto.Date,
                IsCompleted = dto.IsCompleted,
                IsImportant = dto.IsImportant,
            };
        }

        public static TaskFilterDto MapToTaskFilterDto(TaskFilterModel model) 
        {
            return new TaskFilterDto
            {
                IsCompleted = model.IsCompleted,
                IsImportant = model.IsImportant,
            };
        }

        public static TaskFilterModel MapToTaskFilterModel(TaskFilterDto dto)
        {
            return new TaskFilterModel
            {
                IsCompleted = dto.IsCompleted,
                IsImportant = dto.IsImportant,
            };
        }
    }
}
