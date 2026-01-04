using LearningManagementSystem.Models;
using LMS.Api.Data;
using LMS.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly LmsDbContext _context;

        public CoursesController(LmsDbContext context)
        {
            _context = context;
        }

        // DTO for frontend
        public class CourseDto
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string ShortDescription { get; set; }
            public string Category { get; set; }
            public string Difficulty { get; set; }
            public string Thumbnail { get; set; }
            public decimal Price { get; set; }
            public double Rating { get; set; }
            public string Instructor { get; set; }
            public int EnrollerCount { get; set; }
            public string Duration { get; set; }  
        }

        // GET: api/Courses
        [HttpGet]
        [Authorize(Roles = "Student,Instructor,Admin")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.CreatedBy)
                .Include(c => c.Lessons)
                .Include(c => c.Quizzes)
                .Include(c => c.Enrollments)
                .Select(c => new CourseDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    ShortDescription = c.ShortDescription,
                    Category = c.Category,
                    Difficulty = c.Difficulty,
                    Thumbnail = c.Thumbnail,
                    Price = c.Price,
                    Rating = c.Rating,
                    Instructor = c.CreatedBy != null ? c.CreatedBy.FullName : "Unknown",
                    EnrollerCount = c.Enrollments.Count,
                    Duration = c.Duration 
                })
                .ToListAsync();

            return Ok(courses);
        }

        // GET: api/Courses/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "Student,Instructor,Admin")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.CreatedBy)
                .Include(c => c.Lessons)
                .Include(c => c.Quizzes)
                .Include(c => c.Enrollments)
                .Where(c => c.Id == id)
                .Select(c => new CourseDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    ShortDescription = c.ShortDescription,
                    Category = c.Category,
                    Difficulty = c.Difficulty,
                    Thumbnail = c.Thumbnail,
                    Price = c.Price,
                    Rating = c.Rating,
                    Instructor = c.CreatedBy != null ? c.CreatedBy.FullName : "Unknown",
                    EnrollerCount = c.Enrollments.Count,
                    Duration = c.Duration
                })
                .FirstOrDefaultAsync();

            if (course == null) return NotFound();
            return course;
        }

        // POST: api/Courses
        [HttpPost]
        [Authorize(Roles = "Instructor,Admin")]
        public async Task<ActionResult<Course>> CreateCourse(Course course)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == course.CreatedById);
            if (user == null) return BadRequest("Invalid CreatedById — user not found.");

            course.CreatedBy = user;
            course.InstructorName = user.FullName;  
            course.Rating = 0;                     
            course.Lessons ??= new List<Lesson>();
            course.Quizzes ??= new List<Quiz>();
            course.Certificates ??= new List<Certificate>();
            course.Enrollments ??= new List<Enrollment>();

            _context.Entry(user).State = EntityState.Unchanged;

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
        }

        // PUT: api/Courses/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Instructor,Admin")]
        public async Task<IActionResult> UpdateCourse(int id, Course course)
        {
            if (id != course.Id) return BadRequest();

            if (course.CreatedBy != null)
                _context.Entry(course.CreatedBy).State = EntityState.Unchanged;

            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Courses/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound();

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
