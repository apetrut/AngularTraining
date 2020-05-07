using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTOs
{
    public class BookForListDTO
    {
        public int Id { get; set; }

        public string BookTitle { get; set; }

        [DisplayFormat(DataFormatString="{0:d}")]
        public DateTime PublishedDate { get; set; }

        public float Price { get; set; }

        public string Author { get; set; }

        public float StarRating { get; set; }

        public string BookImageUrl { get; set; }
    }
}