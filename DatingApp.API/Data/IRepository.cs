using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    // General repository with common actions for all repositories.
    public interface IRepository<T> where T: class
    {
         void Add(T entity);

         void Delete(T entity);

         Task<bool> SaveAll();

         Task<bool> ExistsAsync(T entity);

         Task<int> FindId(string name);
    }
}