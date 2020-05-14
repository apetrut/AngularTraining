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
        public Task<int> DeleteAsync(Tag entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<ICollection<Tag>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Tag> GetByIdAsync(int id)
        {
            var tag = await _dataContext.Tags.Include("BookTags").Include("ProductTags").FirstOrDefaultAsync(p => p.Id == id);
            return tag;
        }

        public async Task<Tag> GetByNameAsync(string name)
        {
            var tag = await _dataContext.Tags.Include("BookTags").Include("ProductTags").FirstOrDefaultAsync(p => p.Name == name);
            return tag;
        }

        public Task<bool> SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        ValueTask<EntityEntry> IRepositoryAsync<Tag>.AddAsync(Tag entity)
        {
            throw new System.NotImplementedException();
        }
    }
}