using System.Linq;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class TagRepository : GenericRepository<Tag>, ITagRepository
    {
        public TagRepository(DataContext dataContext) : base(dataContext){}

        public Tag GetTag(string tagName)
        {
            return _context.Tags.Include("BookTags").Include("ProductTags").FirstOrDefault(p => p.Name == tagName);
        }
    }
}