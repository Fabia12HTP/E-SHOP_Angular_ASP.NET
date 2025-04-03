using System.Security.Claims;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTOs;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.Services;
using AspNetCoreAPI.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.Controllers
{

    [ApiController]
    //[Authorize]
    [Route("[controller]")]
    
    public class UserProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public ActionResult<UserProfileDTO> GetCurrentUserData()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            if (userName == null)
            {
                return Unauthorized("USER není PRIHLÁSENÝ!");
            }
            
            var user = _context.DbUserProfile
                .Where(u => u.UserName == userName)
                .Select(u => new UserProfileDTO
                {
                    Id = u.Id,
                    Email = u.Email,
                    UserName = u.UserName,
                    PhoneNumber = u.PhoneNumber, 
                    
                })
                .FirstOrDefault();

            if (user == null)
            {
                return NotFound($"User sa NENAŠIEL! {user}");
            }

            return Ok(user);
        }
    }
}

