using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _repo;

        public IMapper _mapper { get; set; }

        public BooksController(IBookRepository repository, IMapper mapper)
        {
            this._repo = repository;
            _mapper = mapper;
        }

        // GET api/books
        [HttpGet]
        public async Task<IActionResult> GetBooks([FromQuery]BookParams bookParams)
        {
            var books = await _repo.GetBooks(bookParams);

            var booksToReturn = _mapper.Map<IEnumerable<BookForListDTO>>(books);

            // pass the information in the header to the client.
            Response.AddPagination(books.CurrentPage, books.PageSize, books.TotalCount, books.TotalPages);

            return Ok(booksToReturn);
        }

        // GET api/books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _repo.GetBook(id);

            var bookToReturn = _mapper.Map<BookForDetailedDTO>(book);

            return Ok(bookToReturn);
        }

        // POST api/books
        [HttpPost]
        public void Post([FromBody]string Book)
        {
        }

        // PUT api/books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, BookForUpdateDTO bookForUpdateDTO)
        {
            var bookFromRepo = await _repo.GetBook(id);

            _mapper.Map(bookForUpdateDTO, bookFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating book with id: {id} failed on save.");
        }

        // DELETE api/books/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}