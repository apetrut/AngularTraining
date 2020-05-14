using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class TagRepository : ITagRepository
    {
        private readonly DataContext _dataContext;

        public TagRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void Add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void Add(Tag entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Tag entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> ExistsAsync(Tag entity)
        {
            return await _dataContext.Tags.AnyAsync(t => t.Name == entity.Name);
        }

         public async Task<int> ExistsAsync(string name)
        {
            Tag tagFromRepo = await _dataContext.Tags.FirstOrDefaultAsync(t => t.Name == name);
            if (tagFromRepo != null)
            {
                return tagFromRepo.Id;
            }

            return -1;
        }

        public async Task<int> FindId(string name)
        {
            Tag tagFromRepo = await _dataContext.Tags.FirstOrDefaultAsync(t => t.Name == name);
            if (tagFromRepo != null)
            {
                return tagFromRepo.Id;
            }

            return -1;
        }

        public async Task<Tag> GetTag(string name)
        {
             var tag = await _dataContext.Tags.Include("BookTags").Include("ProductTags").FirstOrDefaultAsync(p => p.Name == name);
            return tag;
        }

        public Task<IEnumerable<Tag>> GetTags()
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }

       
    }
}