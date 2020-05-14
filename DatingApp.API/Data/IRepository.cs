using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    // General repository with common actions for all repositories.
    public interface IRepository<T> where T: class
    {
         T Add(T entity);

         int Delete(T entity);

         T Update(T entity);

         ICollection<T> GetAll();

         T GetById(int id);

         T GetByName(string name);
    }
}