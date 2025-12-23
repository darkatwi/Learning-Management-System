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
    public class QuestionsController : ControllerBase
    {
        private readonly LmsDbContext _context;
        public QuestionsController(LmsDbContext context) => _context = context;

        // GET /quizzes/{quizId}/questions
        [HttpGet("/quizzes/{quizId}/questions")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsByQuiz(int quizId)
        {
            return await _context.Questions
                .Where(q => q.QuizId == quizId)
                .Include(q => q.Answers)
                .ToListAsync();
        }

        // POST /quizzes/{quizId}/questions
        [HttpPost("/quizzes/{quizId}/questions")]
        [Authorize(Roles = "Instructor,Admin")] 
        public async Task<ActionResult<Question>> CreateQuestion(int quizId, Question question)
        {
            question.QuizId = quizId;
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, question);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null) return NotFound();
            return question;
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Instructor,Admin")]
        public async Task<IActionResult> UpdateQuestion(int id, Question question)
        {
            if (id != question.Id) return BadRequest();
            _context.Entry(question).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Instructor,Admin")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null) return NotFound();
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET /questions/{questionId}/answers
        [HttpGet("/questions/{questionId}/answers")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers(int questionId)
        {
            return await _context.Answers
                .Where(a => a.QuestionId == questionId)
                .ToListAsync();
        }

        // POST /questions/{questionId}/answers
        [HttpPost("/questions/{questionId}/answers")]
        [Authorize(Roles = "Instructor,Admin")]
        public async Task<ActionResult<Answer>> CreateAnswer(int questionId, Answer answer)
        {
            answer.QuestionId = questionId;
            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAnswers), new { questionId }, answer);
        }
    }
}
