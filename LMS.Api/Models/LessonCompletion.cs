using LMS.Api.Models;
using System;

namespace LearningManagementSystem.Models
{
    public class LessonCompletion
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime CompletedDate { get; set; } = DateTime.Now;

        public Lesson Lesson { get; set; }
    }
}