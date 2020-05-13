using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;

        private readonly ITagRepository _tagRepo;

        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repository, ITagRepository tagRepository, IMapper mapper)
        {
            this._repo = repository;
            this._mapper = mapper;
            this._tagRepo = tagRepository;
        }

        // GET api/Products
        [HttpGet] 
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repo.GetProducts();

            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDTO>>(products);

            return Ok(productsToReturn);
        }

        // GET api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _repo.GetProduct(id);

            var productToReturn = _mapper.Map<ProductForDetailDTO>(product);
            return Ok(productToReturn);
        }

        // POST api/Products
        [HttpPost]
        public void Post([FromBody]string Product)
        {
        }

        // PUT api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ProductForUpdateDTO productForUpdateDTO)
        {
            var productFromRepo = await _repo.GetProduct(id);

            _mapper.Map(productForUpdateDTO, productFromRepo);

            // save the tags first.
            productForUpdateDTO.Tags.Where(t => t.Id == 0).ToList().ForEach(tag =>
            {
               // Add the new tags to the product. 
               // Behind the scenes EF will create new Tags in the DB table and associate their new IDs with the Product.
               productFromRepo.ProductTags.Add(new ProductTag()
               { 
                   Tag = _mapper.Map<Tag>(tag)
               });
            });

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating product with id: {id} failed on save.");
        }

        // DELETE api/Products/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}