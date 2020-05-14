using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface ITagRepository : IGenericRepository<Tag>
    {
        Tag GetTag(string tagName);
    }
}