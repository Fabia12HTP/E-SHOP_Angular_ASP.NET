using System.Security.Claims;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTOs;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.Controllers
{

    [ApiController]
    //[Authorize]
    [Route("[controller]")]
    
    public class UserProfileController : ControllerBase
    {
        protected readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public UserProfileController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetUserProfileById(string id)
        {
            var username = User.FindFirstValue(ClaimTypes.Name);

            if (string.IsNullOrEmpty(username))
                return BadRequest($"You are not LOGGED IN! {username}");

            var user = await _context.Users.FindAsync(username);

            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                user.Id,
                user.Bio,
                user.Email,
                user.UserName,
                user.DisplayName,
                user.TwoFactorEnabled,
                user.ProfilePicturePath
            });
        }

        [Authorize]
        [HttpPost("upload-profile-picture")]
        [RequestSizeLimit(5 * 1024 * 1024)]
        public async Task<IActionResult> UploadProfilePicture(IFormFile file)
        {
            var username = User.FindFirstValue(ClaimTypes.Name);

            if (string.IsNullOrEmpty(username))
                return BadRequest($"You are not LOGGED IN! {username}");

            var user = await _context.Users.FindAsync(username);

            if (user == null || file == null || file.Length == 0)
                return BadRequest("Invalid request!");

            var uploadsRoot = Path.Combine(_environment.WebRootPath, "uploads", "users");
            Directory.CreateDirectory(uploadsRoot);

            if (!string.IsNullOrEmpty(user.ProfilePicturePath))
            {
                var oldPath = Path.Combine(_environment.WebRootPath, user.ProfilePicturePath.TrimStart('/'));
                if (System.IO.File.Exists(oldPath))
                    System.IO.File.Delete(oldPath);
            }

            var ext = Path.GetExtension(file.FileName);
            var newFileName = $"{user.Id}{ext}";
            var filePath = Path.Combine(uploadsRoot, newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            user.ProfilePicturePath = $"/uploads/users/{newFileName}";
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { path = user.ProfilePicturePath });
        }
    }
}

