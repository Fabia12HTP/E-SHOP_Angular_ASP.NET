namespace AspNetCoreAPI.DTOs
{
    public class ShoesDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? UrlPicture { get; set; }
        public int? Price { get; set; }
        public float? Rating { get; set; }
        public float? ShoeSize { get; set; }
        public bool? DeliveringState { get; set; }
    }
}
