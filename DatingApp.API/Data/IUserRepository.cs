using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Data
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<List<UserWithRoles>> GetUsersWithRoles();
    }
}