using System.Collections.Generic;

namespace DatingApp.API.Models
{
    public class UserWithRoles
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}