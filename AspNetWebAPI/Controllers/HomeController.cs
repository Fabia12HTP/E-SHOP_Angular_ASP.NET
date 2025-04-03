using AspNetCoreAPI.CustomErrors;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTOs;
using AspNetCoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : BaseController
    {
        private readonly IHomeService _homeService;
        private readonly ApplicationDbContext _context;

        public HomeController(IHomeService homeService, ApplicationDbContext context) : base(context)
        {
            _homeService = homeService;
            _context = context; // Initialize _context properly

        }

        [HttpGet("returnShoesCount")]
        public int ReturnShoesCount()
        {
            return _context.DbShoes.Count();
        }

        [HttpGet]
        public IEnumerable<ShoesDTO> Get() => _homeService.GetShoes();

        [HttpGet("detail")]
        public ActionResult<ShoesDTO?> Get([FromQuery] int page) => GetResponse(_homeService.GetShoesDetailPage(page));

        private ActionResult<ShoesDTO?> GetResponse(ShoesDTO shoeDetail) =>
            shoeDetail == null ? new CustomError($"Topánky s dátami {shoeDetail} neboli nájdené.") : Ok(shoeDetail);
    }
}