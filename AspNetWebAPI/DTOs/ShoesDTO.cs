namespace AspNetCoreAPI.DTOs
{
    public class ShoesDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? UrlPicture { get; set; }
        public string? Description { get; set; } 
        public string? ShoeColor { get; set; } //ShoeDetails
        public string? ShoeBrand { get; set; } //ShoeDetails
        public string? ShoeMaterial { get; set; } //ShoeDetails
        public float? Price { get; set; }
        public float? PriceBeforeDiscount { get; set; }
        public float? Discount { get; set; } 
        public float? Rating { get; set; }
        public float? ShoeSize { get; set; } //ShoeDetails
        public bool? DeliveringState { get; set; }
        public bool? Favourite { get; set; }

    }
}
