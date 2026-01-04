using LMS.Api.Models;
using System;

namespace LearningManagementSystem.Models
{
    public class Enrollment
    {
        public int Id { get; set; }

        public string StudentId { get; set; }     
        public ApplicationUser Student { get; set; }


        public int CourseId { get; set; }           
        public Course Course { get; set; }

        public DateTime EnrolledAt { get; set; } = DateTime.Now;
    }
}
