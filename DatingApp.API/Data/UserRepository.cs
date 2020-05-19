using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(DataContext context) : base(context)
        {
        }

        public Task<List<UserWithRoles>> GetUsersWithRoles()
        {
            return GenericDataContext.Users
                                     .OrderBy(x => x.UserName)
                                     .Include("UserRoles")
                                     .Select(user => new UserWithRoles {
                                         Id = user.Id,
                                         Username = user.UserName,
                                         Roles = (from userRole in user.UserRoles
                                                  join role in GenericDataContext.Roles
                                                  on  userRole.RoleId equals role.Id
                                                  select role.Name)
                                     })
                                     .ToListAsync();
        }
    }
}