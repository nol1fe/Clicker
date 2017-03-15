using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Entities
{
    public class User : IUser<int>
    {

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(Func<User, string, Task<ClaimsIdentity>> identityCreator)
        {
            var userIdentity = await identityCreator(this, DefaultAuthenticationTypes.ApplicationCookie);
            userIdentity.AddClaim(new Claim(ClaimTypes.Email, this.UserName));
            //userIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, this.Id.ToString()));

            // TODO: Tu można dodać nowe dane
            return userIdentity;
        }



        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PasswordHash { get; set; }

    }
}