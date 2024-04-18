using AspNetCoreAPI.Data;
using AspNetCoreAPI.DTOs;
using AspNetCoreAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
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
                Discount = shoe.Discount,
                Description = shoe.Description,            
                DeliveringState = shoe.DeliveringState,
                UrlPicture = FormatUrl(shoe.UrlPicture),
                PriceBeforeDiscount = PriceBefore(shoe.Price, shoe.Discount, shoe.PriceBeforeDiscount),
            }); 
        }

        public IEnumerable<ShoesDTO> GetShoesDetailPage(int page)
        {
            var shoesD = _context.DbShoes.Where(x => x.Id == page).Single();
            var detailToReturn = new ShoesDTO
            {
                Id = shoesD.Id,
                Name = shoesD.Name,
                Price = shoesD.Price,
                Rating = shoesD.Rating,            
                Discount = shoesD.Discount,
                ShoeSize = shoesD.ShoeSize,
                ShoeColor = shoesD.ShoeColor,
                ShoeBrand = shoesD.ShoeBrand,
                Description = shoesD.Description,
                ShoeMaterial = shoesD.ShoeMaterial,
                DeliveringState = shoesD.DeliveringState,
                UrlPicture = FormatUrl(shoesD.UrlPicture),
                PriceBeforeDiscount = PriceBefore(shoesD.Price, shoesD.Discount, shoesD.PriceBeforeDiscount),
            };

            return (IEnumerable<ShoesDTO>)detailToReturn;
        }

        private static string? FormatUrl(string? url)
        {
            if (url != null)
            {
                return url.Replace("\\", "/");
            }

            return url;
        }

        private static float? PriceBefore(float? price, float? discount, float? priceBefore) 
        {
            float? OnePercent;
            float? ActualPriceOfPercentage;
                    
            if(price != null || discount != null)
            {
                OnePercent = (price / 100);

                ActualPriceOfPercentage = OnePercent * discount;

                priceBefore = price + ActualPriceOfPercentage;

                return priceBefore;
            }

            else
            {
                return null;
            }
        }
    }
}
