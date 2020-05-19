using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Data
{
    public interface IUserRepository : IGenericRepository<User>
    {
    }
}