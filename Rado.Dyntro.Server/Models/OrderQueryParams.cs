using Rado.Dyntro.Server.Enums;

namespace Rado.Dyntro.Server.Models
{
    public class OrderQueryParams
    {
        public string? searchByUser { get; set; }
        public OrderStatus? searchByStatus { get; set; }
        public OrderCategory? searchByCategory { get; set; }
        public OrderPriority? searchByPriority { get; set; }
        public SortByDirection? sortByDirection { get; set; }
        public SortByElement? sortByElement { get; set; }


    }
}
