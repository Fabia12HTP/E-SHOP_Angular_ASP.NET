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
        private readonly UserManager<User> _userManager;
        private readonly IWebHostEnvironment _environment;

        public UserProfileController(UserManager<User> userManager,IWebHostEnvironment environment)
        {
            _userManager = userManager;
            _environment = environment;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetUserProfile()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null) {
                return NotFound();
            }

            return Ok(new
            {
                user.Id,
                user.DisplayName,
                user.Bio,
                user.ProfilePicturePath
            });
        }

        [Authorize]
        [HttpPost("upload-profile-picture")]
        [RequestSizeLimit(5 * 1024 * 1024)]
        public async Task<IActionResult> UploadProfilePicture(IFormFile file)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null || file == null || file.Length == 0) {
                return BadRequest("Invalid REUEST!");
            }
                
            var uploadsRoot = Path.Combine(_environment.WebRootPath, "uploads", "users");

            // vytvor priečinok ak neexistuje
            Directory.CreateDirectory(uploadsRoot); 

            // Zmaž starý súbor ak existuje
            if (!string.IsNullOrEmpty(user.ProfilePicturePath))
            {
                var oldPath = Path.Combine(_environment.WebRootPath, user.ProfilePicturePath.TrimStart('/'));
                if (System.IO.File.Exists(oldPath))
                    System.IO.File.Delete(oldPath);
            }

            // Generuj nový názov súboru (napr. podľa user ID)
            var ext = Path.GetExtension(file.FileName);
            var newFileName = $"{user.Id}{ext}";
            var filePath = Path.Combine(uploadsRoot, newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Ulož cestu do DB
            user.ProfilePicturePath = $"/uploads/users/{newFileName}";
            await _userManager.UpdateAsync(user);

            return Ok(new { path = user.ProfilePicturePath });
        }
    }
}

