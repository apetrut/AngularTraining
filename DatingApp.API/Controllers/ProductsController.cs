using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
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
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repository, IMapper mapper)
        {
            this._repo = repository;
            this._mapper = mapper;
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
            return Ok(product);
        }

        // POST api/Products
        [HttpPost]
        public void Post([FromBody]string Product)
        {
        }

        // PUT api/Products/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string Product)
        {
        }

        // DELETE api/Products/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}