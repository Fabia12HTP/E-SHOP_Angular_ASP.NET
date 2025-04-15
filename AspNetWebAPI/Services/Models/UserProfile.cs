using System.ComponentModel.DataAnnotations;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.Services.Models
{
    public class UserProfile : ControllerBase
    {
        [Key]
        [Required]

        string? ProfilePicturePath { get; set; }
        string? Role { get; set; }
        string? Surname { get; set; }
    }
}
