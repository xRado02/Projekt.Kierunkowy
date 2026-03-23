using Rado.Dyntro.Server.Enums;

namespace Rado.Dyntro.Server.Models
{
    public class OrderDetailsViewModel
    {
        public Guid Id { get; set; }
        public OrderStatus Status { get; set; }
        public string? Topic { get; set; }
        public OrderCategory Category { get; set; }
        public OrderPriority Priority { get; set; }
        public DateTime Date { get; set; }

        public string? ContactFirstName { get; set; }
        public string? ContactLastName { get; set; }
        public string? ContactEmail { get; set; }
    }

}
