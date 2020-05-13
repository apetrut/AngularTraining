using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    // General repository with common actions for all repositories.
    public interface IRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<bool> Exists<T>(T entity) where T: class;
    }
}