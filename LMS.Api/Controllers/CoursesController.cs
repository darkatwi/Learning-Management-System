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

        // GET: api/Courses
        [HttpGet]
        [Authorize(Roles = "Student,Instructor,Admin")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            return await _context.Courses
                .Include(c => c.Lessons)
                .Include(c => c.Quizzes)
                .ToListAsync();
        }

        // GET: api/Courses/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "Student,Instructor,Admin")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Lessons)
                .Include(c => c.Quizzes)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null) return NotFound();
            return course;
        }

        // POST: api/Courses
        [HttpPost]
        [Authorize(Roles = "Instructor,Admin")] 
        public async Task<ActionResult<Course>> CreateCourse(Course course)
        {
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
