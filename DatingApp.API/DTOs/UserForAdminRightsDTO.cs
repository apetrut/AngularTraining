using System.Collections.Generic;

namespace DatingApp.API.DTOs
{
    public class UserForAdminRightsDTO
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public List<string> Roles { get; set; }
    }
}