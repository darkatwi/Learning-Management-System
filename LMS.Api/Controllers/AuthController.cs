using LMS.Api.Helpers;
using LMS.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace LMS.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
        }

        // -------------------
        // REGISTER
        // -------------------
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var role = string.IsNullOrWhiteSpace(dto.Role) ? "Student" : dto.Role;

            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            var user = new ApplicationUser
            {
                FullName = dto.FullName,
                Email = dto.Email,
                UserName = dto.Email
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
                return BadRequest(new
                {
                    message = "Registration failed",
                    errors = result.Errors.Select(e => e.Description)
                });

            await _userManager.AddToRoleAsync(user, role);

            return Ok("User registered successfully");
        }



        // -------------------
        // LOGIN
        // -------------------
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized("Invalid credentials");

            var valid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!valid)
                return Unauthorized("Invalid credentials");

            var roles = await _userManager.GetRolesAsync(user);
            var token = JwtHelper.GenerateToken(user, roles, _config);

            return Ok(new { token });
        }

        // -------------------
        // FORGOT PASSWORD (sends email)
        // -------------------
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { message = "Email is required" });

            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                // Security: don't reveal if email exists
                return Ok(new { message = "If your email exists, a reset link has been sent." });
            }

            // Generate password reset token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            // Create frontend reset link
            var frontendUrl = _config["FrontendUrl"];
            var resetLink = $"{frontendUrl}/reset-password?email={user.Email}&token={WebUtility.UrlEncode(token)}";

            // Send email
            try
            {
                var smtpHost = _config["Smtp:Host"];
                var smtpPort = int.Parse(_config["Smtp:Port"]);
                var smtpUser = _config["Smtp:User"];
                var smtpPass = _config["Smtp:Pass"];
                var fromEmail = _config["Smtp:From"];

                using (var client = new SmtpClient(smtpHost, smtpPort))
                {
                    client.Credentials = new NetworkCredential(smtpUser, smtpPass);
                    client.EnableSsl = true;

                    var mail = new MailMessage();
                    mail.From = new MailAddress(fromEmail);
                    mail.To.Add(user.Email);
                    mail.Subject = "SkillUp Academy - Password Reset Request";

                    // Professional HTML email body
                    mail.Body = $@"
<html>
<head>
  <style>
    body {{
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333;
    }}
    .container {{
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }}
    .button {{
      display: inline-block;
      padding: 12px 20px;
      margin: 20px 0;
      font-size: 16px;
      color: #fff;
      background-color: #7F00FF;
      text-decoration: none;
      border-radius: 5px;
    }}
    .footer {{
      font-size: 12px;
      color: #888;
      margin-top: 20px;
    }}
  </style>
</head>
<body>
  <div class='container'>
    <h2>Hello {user.FullName ?? "Learner"},</h2>
    <p>We received a request to reset your SkillUp Academy account password. Click the button below to reset it:</p>
    <a class='button' href='{resetLink}'>Reset Password</a>
    <p>If you did not request a password reset, please ignore this email or contact our support.</p>
    <p class='footer'>SkillUp Academy &copy; 2026</p>
  </div>
</body>
</html>
";

                    mail.IsBodyHtml = true;

                    await client.SendMailAsync(mail);
                }

                return Ok(new { message = "If your email exists, a reset link has been sent." });
            }
            catch
            {
                return StatusCode(500, new { message = "Failed to send email. Please try again later." });
            }
        }


        // -------------------
        // RESET PASSWORD
        // -------------------
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Token) ||
                string.IsNullOrWhiteSpace(dto.NewPassword))
                return BadRequest(new { message = "Email, token, and new password are required" });

            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return BadRequest(new { message = "Invalid email" });

            var result = await _userManager.ResetPasswordAsync(user, dto.Token, dto.NewPassword);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(new { message = "Password has been reset successfully" });
        }
    }

    public class ForgotPasswordDto
    {
        public string Email { get; set; }
    }

    public class ResetPasswordDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
