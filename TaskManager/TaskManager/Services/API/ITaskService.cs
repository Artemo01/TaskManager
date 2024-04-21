using TaskManager.Models;

namespace TaskManager.Services.API
{
    public interface ITaskService
    {
        Task<List<TaskModel>> GetAllTasks(TaskFilterModel filters);
        Task<List<TaskModel>> AddTask(TaskModel newTask);
        Task<TaskModel> UpdateTask(TaskModel updatedTask);
    }
}
