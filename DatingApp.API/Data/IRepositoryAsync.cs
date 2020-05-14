using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DatingApp.API.Data
{
    public interface IRepositoryAsync<T> where T: class
    {
         ValueTask<EntityEntry> AddAsync(T entity);

         Task<int> DeleteAsync(T entity);

         Task<bool> SaveAll();

         Task<ICollection<T>> GetAllAsync();

         Task<T> GetByIdAsync(int id);

         Task<T> GetByNameAsync(string name);
    }
}