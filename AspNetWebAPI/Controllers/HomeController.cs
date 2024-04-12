using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTOs;
using AspNetCoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class HomeController : BaseController
    {
        private readonly IHomeService _homeService;
        public HomeController(IHomeService homeService, ApplicationDbContext context) : base(context) =>
            _homeService = homeService;

        [HttpGet]
        public IEnumerable<ShoesDTO> Get() => _homeService.GetShoes();

        [HttpGet("{shoesDetailPage:int}")]
        public ActionResult<ShoesDetDTO?> Get(int page) => GetResponse(_homeService.GetShoesDetailPage(page));

        private ActionResult<ShoesDetDTO?> GetResponse(IEnumerable<ShoesDetDTO?> shoeDetail) =>
            shoeDetail == null ? NotFound() : Ok(shoeDetail);
    }
}
