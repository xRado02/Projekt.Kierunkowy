namespace Rado.Dyntro.Server.Models
{
    public class UserActivateViewModel
    {
        public Guid Id { get; set; }
        public string? Email { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public bool? IsActivated { get; set; } = false;
    }
}
