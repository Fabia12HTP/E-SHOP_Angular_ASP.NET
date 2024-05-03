using AspNetCoreAPI.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.Services
{
    public interface IHomeService
    {
        public ShoesDTO GetShoesDetailPage(int page);
        public IEnumerable<ShoesDTO> GetShoes();
    }
}
