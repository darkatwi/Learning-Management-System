using LMS.Api.Models;
using System;

namespace LearningManagementSystem.Models
{
    public class Certificate
    {
        public int Id { get; set; }
        public int CourseId { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public string DownloadUrl { get; set; }
        public DateTime GeneratedAt { get; set; } = DateTime.Now;

        public Course Course { get; set; }
    }
}