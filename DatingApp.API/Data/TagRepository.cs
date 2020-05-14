using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DatingApp.API.Data
{
    public class TagRepository : ITagRepository
    {
        private readonly DataContext _dataContext;

        public TagRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public Task<Tag> AddAsync(Tag entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> DeleteAsync(Tag entity)
        {
            throw new System.NotImplementedException();
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

        public Task<ICollection<Tag>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<Tag> GetByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Tag> GetByNameAsync(string name)
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

        ValueTask<EntityEntry> IRepositoryAsync<Tag>.AddAsync(Tag entity)
        {
            throw new System.NotImplementedException();
        }
    }
}