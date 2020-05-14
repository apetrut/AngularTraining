using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DatingApp.API.Data
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _context;
        public BookRepository(DataContext context)
        {
            this._context = context;
        }
        
        public ValueTask<EntityEntry> AddAsync(Book entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> DeleteAsync(Book entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> ExistsAsync(Book entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<ICollection<Book>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<Book>> GetBooksAsync(BookParams bookParams)
        {
            var books = _context.Books.OrderByDescending(book => book.PublishedDate).AsQueryable();

            if (!string.IsNullOrEmpty(bookParams.Topic) && 
                bookParams.Topic.ToLower() != "any" &&
                bookParams.Topic.ToLower() != "null")
            {
                books = books.Where(b => b.Topic.ToLower() == bookParams.Topic.ToLower() || b.Topic.ToLower().Contains(bookParams.Topic.ToLower()));
            }

            if (bookParams.MinPrice != 1 ||
                bookParams.MaxPrice != 999)
                {
                    books = books.Where(b => b.Price >= bookParams.MinPrice && b.Price <= bookParams.MaxPrice);
                }

            if (!string.IsNullOrEmpty(bookParams.OrderBy))
            {
                switch (bookParams.OrderBy.ToLower())
                {
                    case "publisheddate":
                        books = books.OrderByDescending(b => b.PublishedDate);
                        break;
                    case "starrating":
                        books = books.OrderByDescending(b => b.StarRating);
                        break;
                }
            }

            return await PagedList<Book>.CreateAsync(books,
                                                     bookParams.PageNumber,
                                                     bookParams.PageSize);
        }

        public async Task<Book> GetByIdAsync(int id)
        {
            var book = await _context.Books.Include("BookTags").FirstOrDefaultAsync(p => p.Id == id);
            return book;
        }

        public Task<Book> GetByNameAsync(string name)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}