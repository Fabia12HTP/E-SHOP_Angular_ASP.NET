using System.Security.Claims;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public UserProfileController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        protected async Task<User?> GetCurrentUserAsync()
        {
            var userName = User?.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(userName))
                return null;

            return await _context.Users.SingleOrDefaultAsync(u => u.Email == userName);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetUserProfile()
        {
            var user = await GetCurrentUserAsync();

            if (user == null)
                return Unauthorized("User not found or not LOGGED IN!");

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

        [HttpPost("upload-profile-picture")]
        [RequestSizeLimit(5 * 1024 * 1024)]
        public async Task<IActionResult> UploadProfilePicture(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var user = await GetCurrentUserAsync();

            if (user == null)
                return Unauthorized("User not found or not LOGGED IN!");

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
