using LMS.Api.Models;
using System;
using System.Collections.Generic;

namespace LearningManagementSystem.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Category { get; set; }
        public string Difficulty { get; set; }
        public string Thumbnail { get; set; }
        public string CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsPublished { get; set; } = false;

        public User Creator { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
        public ICollection<Quiz> Quizzes { get; set; }
        public ICollection<Certificate> Certificates { get; set; }
    }
}