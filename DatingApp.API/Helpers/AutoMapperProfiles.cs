using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Product, ProductForListDTO>()
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Book, BookForDetailedDTO>();
            CreateMap<Book, BookForListDTO>();
            CreateMap<BookForUpdateDTO, Book>();

            CreateMap<Photo, PhotosForDetailedDTO>();

            CreateMap<UserForRegisterDTO, User>();
            CreateMap<User, UserForRegisterDTO>();
        }
    }
}