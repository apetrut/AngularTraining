using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DatingApp.API.Models;

namespace DatingApp.API.DTOs
{
    public class BookForDetailedDTO
    {
        public int Id { get; set; }

        public string BookTitle { get; set; }

        public string Topic { get; set; }

        public string ISBN { get; set; }

        public List<TagDTO> Tags { get; set; }

        [DisplayFormat(DataFormatString="{0:d}")]
        public DateTime PublishedDate { get; set; }

        public float Price { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        public float StarRating { get; set; }

        public string BookImageUrl { get; set; }
    }
}