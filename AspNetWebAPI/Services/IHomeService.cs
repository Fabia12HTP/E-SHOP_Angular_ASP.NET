using AspNetCoreAPI.DTOs;

namespace AspNetCoreAPI.Services
{
    public interface IHomeService
    {
        public IEnumerable<ShoesDetDTO> GetShoesDetailPage(int page);
        public IEnumerable<ShoesDTO> GetShoes();
    }
}
