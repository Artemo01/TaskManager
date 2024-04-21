using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;
using TaskManager.Services.API;

namespace TaskManager.Services
{
    public class TaskService : ITaskService
    {

        private DataContext dataContext;

        public TaskService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<List<TaskModel>> GetAllTasks(TaskFilterModel filters)
        {
            var dbTasks = await dataContext.Tasks.ToListAsync();
            var filteredTasks = dbTasks;

            if (filters != null)
            {
                filteredTasks = FilterTasks(filteredTasks, filters);
            }

            return filteredTasks;
        }

        public async Task<List<TaskModel>> AddTask(TaskModel newTask)
        {
            var task = newTask;
            dataContext.Add(task);
            dataContext.SaveChanges();
            return await dataContext.Tasks.ToListAsync(); ;
        }

        public async Task<TaskModel> UpdateTask(TaskModel updatedTask)
        {
            var dbTasks = await dataContext.Tasks.ToListAsync();
            var task = dbTasks.FirstOrDefault(t => t.Id == updatedTask.Id);

            task.Name = updatedTask.Name;
            task.Description = updatedTask.Description;
            task.Date = updatedTask.Date;
            task.IsCompleted = updatedTask.IsCompleted;
            task.IsImportant = updatedTask.IsImportant;

            dataContext.SaveChanges();

            return task;
        }

        #region private
        private List<TaskModel> FilterTasks(List<TaskModel> tasks, TaskFilterModel filters) 
        {
            if (filters.IsCompleted) tasks = tasks.Where(task => !task.IsCompleted).ToList();

            if (filters.IsImportant) tasks = tasks.Where(task => task.IsImportant).ToList();

            return tasks;
            
        }
        #endregion
    }
}