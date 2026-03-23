namespace Rado.Dyntro.Server.Models
{
    public class UserResetPasswordViewModel
    {
        
        public string? Email { get; set; } = string.Empty;
        public string Token { get; set; }
        public string? NewPassword { get; set; } = string.Empty;        
    }
}
