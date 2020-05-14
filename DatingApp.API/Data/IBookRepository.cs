using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IBookRepository : IGenericRepository<Book>
    {
          Task<PagedList<Book>> GetBooksWithPaginationAsync(BookParams bookParams);
    }
}