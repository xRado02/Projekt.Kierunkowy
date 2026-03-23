using Rado.Dyntro.Server.enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rado.Dyntro.Server.Data.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public bool? IsActivated { get; set; } = false;

        [Required]
        public string? Email { get; set; } = string.Empty;        
        public string? PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
