using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _context;
        public BookRepository(DataContext context)
        {
            this._context = context;
        }
        
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Book> GetBook(int id)
        {
            var book = await _context.Books.Include("Tags").FirstOrDefaultAsync(p => p.Id == id);
            return book;
        }

        public async Task<PagedList<Book>> GetBooks(BookParams bookParams)
        {
            var books = _context.Books;
            return await PagedList<Book>.CreateAsync(books,
                                                     bookParams.PageNumber,
                                                     bookParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}