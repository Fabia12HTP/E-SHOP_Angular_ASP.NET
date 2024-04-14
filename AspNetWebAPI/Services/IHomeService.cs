using AspNetCoreAPI.DTOs;

namespace AspNetCoreAPI.Services
{
    public interface IHomeService
    {
        public IEnumerable<ShoesDTO> GetShoesDetailPage(int page);
        public IEnumerable<ShoesDTO> GetShoes();
    }
}
