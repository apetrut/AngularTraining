using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IBookRepository : IRepositoryAsync<Book>
    {
         Task<PagedList<Book>> GetBooksAsync(BookParams bookParams);
    }
}