using LearningManagementSystem.Models;
using LMS.Api.Data;
using LMS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizAttemptsController : ControllerBase
    {
        private readonly LmsDbContext _context;
        public QuizAttemptsController(LmsDbContext context) => _context = context;

        // POST /quizzes/{quizId}/attempts
        [HttpPost("/quizzes/{quizId}/attempts")]
        public async Task<ActionResult<QuizAttempt>> CreateAttempt(int quizId, QuizAttempt attempt)
        {
            attempt.QuizId = quizId;
            attempt.StartedAt = DateTime.UtcNow;
            _context.QuizAttempts.Add(attempt);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAttempt), new { quizId, userId = attempt.UserId }, attempt);
        }

        // GET /quizzes/{quizId}/attempts/{userId}
        [HttpGet("/quizzes/{quizId}/attempts/{userId}")]
        public async Task<ActionResult<IEnumerable<QuizAttempt>>> GetAttempt(int quizId, int userId)
        {
            return await _context.QuizAttempts
                .Where(a => a.QuizId == quizId && a.UserId == userId)
                .Include(a => a.StudentAnswers)
                .ToListAsync();
        }

        // POST /quiz-attempts/{attemptId}/answers
        [HttpPost("/quiz-attempts/{attemptId}/answers")]
        public async Task<ActionResult<StudentAnswer>> SubmitAnswer(int attemptId, StudentAnswer answer)
        {
            answer.QuizAttemptId = attemptId;
            _context.StudentAnswers.Add(answer);
            await _context.SaveChangesAsync();
            return Ok(answer);
        }

        // GET /quiz-attempts/{attemptId}/answers
        [HttpGet("/quiz-attempts/{attemptId}/answers")]
        public async Task<ActionResult<IEnumerable<StudentAnswer>>> GetSubmittedAnswers(int attemptId)
        {
            return await _context.StudentAnswers
                .Where(a => a.QuizAttemptId == attemptId)
                .Include(a => a.Answer)
                .Include(a => a.Question)
                .ToListAsync();
        }
    }
}
