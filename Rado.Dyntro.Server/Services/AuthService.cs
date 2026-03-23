using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Rado.Dyntro.Server.Services
{
    public class AuthService(AppDbContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<TokenResponseViewModel> LoginAsync(UserLoginViewModel request)
        {
            var user = await context.Users.FirstOrDefaultAsync(user => user.Email == request.Email);
            if (user is null)
            {
                return null; 
            }
           
            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }
            else
            {
                TokenResponseViewModel response = await CreateTokenResponse(user);
                return response;
            }
        }

        private async Task<TokenResponseViewModel> CreateTokenResponse(User? user)
        {
            return new TokenResponseViewModel
            {
                AccesToken = CreateToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user),
            };
        }

        public async Task<User> UserActivatePasswordAsync(UserActivateViewModel request)
        {

            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == request.Id);

            if (user == null)
            {
                return null;
            }

            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.Password);

            user.PasswordHash = hashedPassword;
            user.IsActivated = true;
            context.Users.Update(user);
            await context.SaveChangesAsync();

            return user;       
        }
        //to do poprawy bojest powtrzenie
        public async Task<User> UserResetPasswordAsync(UserResetPasswordViewModel request)
        {

            var tokenEntry = await context.PasswordResetTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == request.Token && t.ExpirationDate > DateTime.UtcNow);

            if (tokenEntry == null)
            {
                return null;
            }

            var user = tokenEntry.User;

            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.NewPassword);

            user.PasswordHash = hashedPassword;

            context.Users.Update(user);
            context.PasswordResetTokens.Remove(tokenEntry);
            await context.SaveChangesAsync();

            return user;
        }

      
        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await context.SaveChangesAsync();
            return refreshToken;
        }

        private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var user = await context.Users.FindAsync(userId);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }
            return user;
        }

        public async Task<TokenResponseViewModel?> RefreshTokenAsync(RefreshTokenRequestViewModel request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);
            if(user is null)
            {
                return null;
            }
            return await CreateTokenResponse(user);
        }

        
    }
}
