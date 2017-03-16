using Entities;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using DataAccess;
using System.Data.Entity;

namespace Services
{
    public class ApplicationUserStore : IUserStore<User, int>, IUserClaimStore<User, int>, IUserLoginStore<User, int>, IUserRoleStore<User, int>, IUserPasswordStore<User, int>, IUserTwoFactorStore<User, int>, IUserEmailStore<User, int>, IUserLockoutStore<User, int>, IUserSecurityStampStore<User, int>
    {
        
        private ClickerDb context;
        public ApplicationUserStore()
        {
            context = new ClickerDb();
        }

        public Task CreateAsync(User user)
        {
            context.Users.Add(user);

         
            return context.SaveChangesAsync();
        }

        public Task DeleteAsync(User user)
        {
     
            context.Users.Remove(user);

          //  context.Configuration.ValidateOnSaveEnabled = false;

            return context.SaveChangesAsync();
        }

        public Task AddClaimAsync(User user, Claim claim)
        {
            throw new NotImplementedException();
        }

        public Task AddLoginAsync(User user, UserLoginInfo login)
        {
            throw new NotImplementedException();
        }

        public Task AddToRoleAsync(User user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task<User> FindAsync(UserLoginInfo login)
        {
            throw new NotImplementedException();
        }

        public Task<User> FindByEmailAsync(string email)
        {
            return context.Users.FirstOrDefaultAsync(u => u.Email == email);

        }

        public Task<User> FindByIdAsync(int userId)
        {
            return context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public Task<User> FindByNameAsync(string userName)
        {
            return context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        }

        public Task<int> GetAccessFailedCountAsync(User user)
        {
            return Task.FromResult(0);
        }

        public Task<IList<Claim>> GetClaimsAsync(User user)
        {
            var result = new List<Claim>();
            return Task.FromResult(result as IList<Claim>);
        }

        public Task<string> GetEmailAsync(User user)
        {
            return Task.FromResult(user.UserName);

        }

        public Task<bool> GetEmailConfirmedAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> GetLockoutEnabledAsync(User user)
        {
            return Task.FromResult(user.LockoutEnabled);
        }

        public Task<DateTimeOffset> GetLockoutEndDateAsync(User user)
        {
            return Task.FromResult(new DateTimeOffset(DateTime.Now.AddDays(-1)));
        }

        public Task<IList<UserLoginInfo>> GetLoginsAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetPasswordHashAsync(User user)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<IList<string>> GetRolesAsync(User user)
        {
            var roles = new List<string>();
            return Task.FromResult(roles as IList<string>);
        }

        public Task<string> GetSecurityStampAsync(User user)
        {
            return Task.FromResult(user.SecurityStamp);
        }

        public Task<bool> GetTwoFactorEnabledAsync(User user)
        {
            return Task.FromResult(false);
        }

        public Task<bool> HasPasswordAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<int> IncrementAccessFailedCountAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsInRoleAsync(User user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task RemoveClaimAsync(User user, Claim claim)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromRoleAsync(User user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task RemoveLoginAsync(User user, UserLoginInfo login)
        {
            throw new NotImplementedException();
        }

        public Task ResetAccessFailedCountAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task SetEmailAsync(User user, string email)
        {
            user.Email = email;
            return Task.FromResult<object>(null);
        }

        public Task SetEmailConfirmedAsync(User user, bool confirmed)
        {
            throw new NotImplementedException();
        }

        public Task SetLockoutEnabledAsync(User user, bool enabled)
        {
            user.LockoutEnabled = enabled;
            return Task.FromResult<object>(null);
        }

        public Task SetLockoutEndDateAsync(User user, DateTimeOffset lockoutEnd)
        {
            throw new NotImplementedException();
        }

        public Task SetPasswordHashAsync(User user, string passwordHash)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult<object>(null);
            
        }

        public Task SetSecurityStampAsync(User user, string stamp)
        {
            user.SecurityStamp = stamp;
            return Task.FromResult(true);
        }

        public Task SetTwoFactorEnabledAsync(User user, bool enabled)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(User user)
        {
            throw new NotImplementedException();
        }


        public void Dispose()
        {
        }

    }
}
