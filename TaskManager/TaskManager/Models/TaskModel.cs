﻿namespace TaskManager.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public bool IsCompleted { get; set; }
        public bool IsImportant {  get; set; }
    }
}