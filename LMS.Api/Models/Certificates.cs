using LMS.Api.Models;

using System;

namespace LearningManagementSystem.Models
{
    public class Certificate
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public string DownloadUrl { get; set; }
        public DateTime GeneratedAt { get; set; } = DateTime.Now;

        // Navigation properties
        public Course Course { get; set; }
        public User User { get; set; }
    }
}
