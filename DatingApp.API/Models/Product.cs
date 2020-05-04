using System;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public string ProductCode { get; set; }

        public DateTime ReleaseDate { get; set; }

        public float Price { get; set; }

        public string StarRating { get; set; }

        public string ImageUrl { get; set; }

        public List<Tag> Tags { get; set; }
    }
}