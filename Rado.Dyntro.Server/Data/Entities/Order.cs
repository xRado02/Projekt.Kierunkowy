using Rado.Dyntro.Server.Enums;
using System.ComponentModel.DataAnnotations;

namespace Rado.Dyntro.Server.Data.Entities
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public OrderStatus Status { get; set; }

        [Required]
        public string? Topic { get; set; }

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public OrderCategory Category { get; set; }

        [Required]
        public OrderPriority Priority { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public Guid? ReceiverId { get; set; }
        public User? Receiver { get; set; }

        public List<Message> Messages { get; set; } = new();




    }
}
