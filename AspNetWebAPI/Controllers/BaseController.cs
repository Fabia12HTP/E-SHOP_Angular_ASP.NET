using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTOs;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AspNetCoreAPI.Controllers
{
    [ApiController]
    //[Authorize]
    public class BaseController : ControllerBase
    {
        protected readonly ApplicationDbContext Context;

        public BaseController(ApplicationDbContext context) => Context = context;

        protected User? GetCurrentUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            return Context.Users.SingleOrDefault(user => user.UserName == userName);
        }
    }
}