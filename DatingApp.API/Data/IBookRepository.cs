using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IBookRepository : IRepository
    {
         Task<PagedList<Book>> GetBooks(BookParams bookParams);

         Task<Book> GetBook(int id);
    }
}