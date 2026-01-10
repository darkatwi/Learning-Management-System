using LearningManagementSystem.Models;
using LMS.Api.Data;
using LMS.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // only logged-in users can enroll
    public class EnrollmentsController : ControllerBase
    {
        private readonly LmsDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public EnrollmentsController(LmsDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Enroll([FromBody] EnrollmentDto dto)
        {
            var userId = _userManager.GetUserId(User); // get logged-in user id
            if (userId == null)
                return Unauthorized("User must be logged in.");

            // check if course exists
            var course = await _context.Courses.FindAsync(dto.CourseId);
            if (course == null)
                return NotFound("Course not found.");

            // check if already enrolled
            var existing = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == dto.CourseId && e.StudentId == userId);
            if (existing != null)
                return BadRequest("Already enrolled in this course.");

            // create enrollment
            var enrollment = new Enrollment
            {
                CourseId = dto.CourseId,
                StudentId = userId,
                EnrolledAt = DateTime.Now
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Enrolled in course {course.Title}" });
        }
    }

    public class EnrollmentDto
    {
        public int CourseId { get; set; }
    }
}
