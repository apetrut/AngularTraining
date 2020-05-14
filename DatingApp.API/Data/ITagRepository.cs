using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface ITagRepository : IRepository<Tag>
    {
         Task<IEnumerable<Tag>> GetTags();

         Task<Tag> GetTag(string name);
    }
}