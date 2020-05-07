using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    // This is the repository for the Product entity.
    public interface IProductRepository : IRepository
    {
         Task<IEnumerable<Product>> GetProducts();

         Task<Product> GetProduct(int id);
    }
}