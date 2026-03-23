using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Models;
using Rado.Dyntro.Server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Rado.Dyntro.Server.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class AuthController(IAuthService authService, AppDbContext context) : ControllerBase
    {


        [HttpPut("activate")]
        public async Task<ActionResult<User>> ActivateUser(UserActivateViewModel request)
        {
            var user = await authService.UserActivatePasswordAsync(request);            
            if (user == null)
            {
                return NotFound("Użytkownik nie istnieje.");
            } 
            return Ok(user);
        }
        
        [HttpPut("reset-password")]
        public async Task<ActionResult<User>> ResetPassword(UserResetPasswordViewModel request)
        {
            var user = await authService.UserResetPasswordAsync(request);
            if (user == null)
            {
                return NotFound("Użytkownik nie istnieje.");
            }  
            
            return Ok(user);
        }

        [HttpGet("validate-reset-password-token")]
        public async Task<IActionResult> ValidateResetPasswordToken([FromQuery] string token)
        {
            var resetPasswordToken = await context.PasswordResetTokens.FirstOrDefaultAsync(t => t.Token == token && t.ExpirationDate > DateTime.UtcNow);
            if (resetPasswordToken == null)
            {
                return NotFound("Token wygasł lub jest nieprawidłowy.");
            }
            return Ok();
        }

        [HttpPost("login")]

        public async Task<ActionResult<TokenResponseViewModel>> Login(UserLoginViewModel request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null)
            {
                return BadRequest("Invalid username or password.");
            }
            return Ok(result);            
        }

        [Authorize]
        [HttpGet]
        public IActionResult AuthenticatedOnlyEndpoint()
        {
            return Ok("You are authenticated!");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin-only")]
        public IActionResult AdminOnlyEndpoint()
        {
            return Ok("You are an Admin!");
        }

        [Authorize(Roles = "Client")]
        [HttpGet("client-only")]
        public IActionResult ClientOnlyEndpoint()
        {
            return Ok("You are a Client!");
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseViewModel>> RefreshToken(RefreshTokenRequestViewModel request)
        {
            var result = await authService.RefreshTokenAsync(request);
            if(result is null || result.AccesToken is null || result.RefreshToken is null)
            {
                return Unauthorized("Invalid refresh token.");
            }
            return Ok(result);
        }

    }

    
}
