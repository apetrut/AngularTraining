using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface ITagRepository : IRepositoryAsync<Tag>
    {
         // Task<Tag> GetTag(string name);
    }
}