using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DatingApp.API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            this._context = context;
        }
        
        public async ValueTask<EntityEntry> AddAsync(Product entity) => await _context.AddAsync(entity);

        public Task<int> DeleteAsync(Product entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Product>> GetAllAsync()
        {
            var products = await _context.Products.Include("Photos")
                                                  .Include("ProductTags")
                                                  .ToListAsync();
            return products;
        }

        public Product GetById(int id)
        {
           throw new NotImplementedException();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
             var product = await _context.Products.Include("Photos").Include("ProductTags.Tag").FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        public Product GetByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public Product Update(Product entity)
        {
            throw new NotImplementedException();
        }
    }
}