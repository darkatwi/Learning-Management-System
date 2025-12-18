using LMS.Api.Models;
using System;

namespace LearningManagementSystem.Models
{
    public class LessonCompletion
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public int UserId { get; set; }
        public DateTime CompletedDate { get; set; } = DateTime.Now;

        // Navigation properties
        public Lesson Lesson { get; set; }
        public User User { get; set; }
    }
}
