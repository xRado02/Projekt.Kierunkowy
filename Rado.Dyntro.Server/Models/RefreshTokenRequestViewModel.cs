namespace Rado.Dyntro.Server.Models
{
    public class RefreshTokenRequestViewModel
    {
        public Guid UserId { get; set; }
        public required string RefreshToken { get; set; }
    }
}
