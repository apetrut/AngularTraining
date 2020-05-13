using System.Collections.Generic;

namespace DatingApp.API.DTOs
{
    public class ProductForUpdateDTO
    {
        public int Id { get; set; }
        
        public string ProductName { get; set; }

        public string ProductCode { get; set; }

        public float Price { get; set; }

        public string StarRating { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<TagDTO> Tags { get; set; }
    }
}