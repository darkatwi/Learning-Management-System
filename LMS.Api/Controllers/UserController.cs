using LMS.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.Api.Controllers
{
    [Authorize] 
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != id && !User.IsInRole("Admin"))
                return Forbid();

            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult<ApplicationUser>> CreateUser([FromBody] ApplicationUser user, string password, string role = "Student")
        {
            user.UserName = user.Email;
            user.Email = user.Email;
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            await _userManager.AddToRoleAsync(user, role);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] ApplicationUser updatedUser)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != id && !User.IsInRole("Admin"))
                return Forbid();

            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            user.FullName = updatedUser.FullName;
            user.Email = updatedUser.Email;
            user.UserName = updatedUser.Email;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }
    }
}
