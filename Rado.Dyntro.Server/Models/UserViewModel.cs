using Rado.Dyntro.Server.enums;

namespace Rado.Dyntro.Server.Models
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;      
        public string? Role { get; set; } = string.Empty;
        public bool? IsActivated { get; set; } = false;
    }
}
