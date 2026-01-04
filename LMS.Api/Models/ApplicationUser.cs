using LearningManagementSystem.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace LMS.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
