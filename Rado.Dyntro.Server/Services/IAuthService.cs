using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Models;

namespace Rado.Dyntro.Server.Services
{
    public interface IAuthService
    {
        Task<User?> UserActivatePasswordAsync(UserActivateViewModel request);
        Task<User?> UserResetPasswordAsync(UserResetPasswordViewModel request);
        Task<TokenResponseViewModel?> LoginAsync(UserLoginViewModel request);
        Task<TokenResponseViewModel?> RefreshTokenAsync(RefreshTokenRequestViewModel request);
    }
}
