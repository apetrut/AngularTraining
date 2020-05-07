using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IBookRepository : IRepository
    {
         Task<IEnumerable<Book>> GetBooks();

         Task<Book> GetBook(int id);
    }
}