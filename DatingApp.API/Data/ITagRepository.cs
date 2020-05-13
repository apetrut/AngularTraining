using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface ITagRepository : IRepository
    {
         Task<IEnumerable<Tag>> GetTags();

         Task<Tag> GetTag(int id);
    }
}