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
    public class QuizzesController : ControllerBase
    {
        private readonly LmsDbContext _context;
        public QuizzesController(LmsDbContext context) => _context = context;

        // GET /courses/{courseId}/quizzes
        [HttpGet("/courses/{courseId}/quizzes")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzesByCourse(int courseId)
        {
            return await _context.Quizzes
                .Where(q => q.CourseId == courseId)
                .Include(q => q.Questions)
                .ToListAsync();
        }

        // GET /lessons/{lessonId}/quizzes (optional)
        [HttpGet("/lessons/{lessonId}/quizzes")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzesByLesson(int lessonId)
        {
            return await _context.Quizzes
                .Where(q => q.LessonId == lessonId)
                .Include(q => q.Questions)
                .ToListAsync();
        }

        // POST /api/Quizzes
        [HttpPost]
        [Authorize(Roles = "Instructor,Admin")] 
        public async Task<ActionResult<Quiz>> CreateQuiz(Quiz quiz)
        {
            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQuiz), new { id = quiz.Id }, quiz);
        }

        // GET /api/Quizzes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(int id)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quiz == null) return NotFound();
            return quiz;
        }

        // PUT /api/Quizzes/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Instructor,Admin")]
        public async Task<IActionResult> UpdateQuiz(int id, Quiz quiz)
        {
            if (id != quiz.Id) return BadRequest();

            _context.Entry(quiz).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE /api/Quizzes/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Instructor,Admin")] 
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null) return NotFound();

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
