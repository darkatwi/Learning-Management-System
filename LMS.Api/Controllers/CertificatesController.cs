using LearningManagementSystem.Models;
using LMS.Api.Data;
using LMS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificatesController : ControllerBase
    {
        private readonly LmsDbContext _context;
        public CertificatesController(LmsDbContext context) => _context = context;

        // GET /users/{userId}/certificates
        [HttpGet("/users/{userId}/certificates")]
        public async Task<ActionResult<IEnumerable<Certificate>>> GetCertificates(int userId)
        {
            return await _context.Certificates
                .Where(c => c.UserId == userId)
                .Include(c => c.Course)
                .ToListAsync();
        }

        // POST /courses/{courseId}/certificates
        [HttpPost("/courses/{courseId}/certificates")]
        public async Task<ActionResult<Certificate>> GenerateCertificate(int courseId, Certificate certificate)
        {
            certificate.CourseId = courseId;
            certificate.GeneratedAt = DateTime.UtcNow;
            _context.Certificates.Add(certificate);
            await _context.SaveChangesAsync();
            return Ok(certificate);
        }
    }
}
