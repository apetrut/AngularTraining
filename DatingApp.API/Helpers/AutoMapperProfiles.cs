using System.Collections.Generic;
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
            CreateMap<User, UserForLoginDTO>();
            CreateMap<UserWithRoles, UserForAdminRightsDTO>();

            CreateMap<Product, ProductForDetailDTO>()
                .AfterMap( (productDb, productDto) => {
                    
                    if (productDb.ProductTags != null && productDb.ProductTags.Any())
                    {
                        productDto.Tags = new List<TagDTO>();
                        foreach(var productTag in productDb.ProductTags)
                        {
                            if (productTag.Tag != null)
                            {
                                productDto.Tags.Add(new TagDTO(){
                                    Id = productTag.Tag.Id,
                                    Name = productTag.Tag.Name
                                } );
                            }
                        }
                    }
                });

            CreateMap<ProductForUpdateDTO, Product>();
            CreateMap<TagDTO, Tag>();
        }
    }
}