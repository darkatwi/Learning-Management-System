using LearningManagementSystem.Models;
using LMS.Api.Data;
using LMS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonCompletionsController : ControllerBase
    {
        private readonly LmsDbContext _context;
        public LessonCompletionsController(LmsDbContext context) => _context = context;

        // POST /lessons/{lessonId}/complete
        [HttpPost("/lessons/{lessonId}/complete")]
        public async Task<ActionResult<LessonCompletion>> CompleteLesson(int lessonId, LessonCompletion completion)
        {
            completion.LessonId = lessonId;
            completion.CompletedDate = DateTime.UtcNow;
            _context.LessonCompletions.Add(completion);
            await _context.SaveChangesAsync();
            return Ok(completion);
        }

        // GET /users/{userId}/lesson-completion
        [HttpGet("/users/{userId}/lesson-completion")]
        public async Task<ActionResult<IEnumerable<LessonCompletion>>> GetCompletedLessons(int userId)
        {
            return await _context.LessonCompletions
                .Where(lc => lc.UserId == userId)
                .Include(lc => lc.Lesson)
                .ToListAsync();
        }
    }
}
