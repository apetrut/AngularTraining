using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

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

        public void Delete<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Exists()
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Exists<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public Task<Tag> GetTag(int id)
        {
            throw new System.NotImplementedException();
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