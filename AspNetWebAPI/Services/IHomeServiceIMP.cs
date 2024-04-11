using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTOs;
using AspNetCoreAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace AspNetCoreAPI.Services
{
    public class IHomeServiceIMP : IHomeService
    {
        private readonly ApplicationDbContext _context;

        public IHomeServiceIMP(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<ShoesDTO> GetShoes()
        {
            return _context.DbShoes.Select(shoe => new ShoesDTO
            {
                Id = shoe.Id,
                Name = shoe.Name,
                Price = shoe.Price,
                Rating = shoe.Rating,
                ShoeSize = shoe.ShoeSize,
                DeliveringState = shoe.DeliveringState,
                UrlPicture = FormatUrl(shoe.UrlPicture)
            });
        }

        public ShoesDTO GetShoesDetailPage(int page)
        {
            var shoe = _context.DbShoes.Where(x => x.Id == page).Single();
            var detailToReturn = new ShoesDTO()
            {
                Name = shoe.Name,
                Price = shoe.Price,
                Rating = shoe.Rating,
                ShoeSize = shoe.ShoeSize,
                DeliveringState = shoe.DeliveringState,
                UrlPicture = FormatUrl(shoe.UrlPicture)          
            };

            return detailToReturn;
        }

        private static string? FormatUrl(string? url)
        {
            if (url != null)
            {
                return url.Replace("\\", "/");
            }
            return url;
        }
    }
}
