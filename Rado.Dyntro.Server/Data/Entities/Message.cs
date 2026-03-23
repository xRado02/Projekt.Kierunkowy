using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

namespace Rado.Dyntro.Server.Data.Entities
{
    public class Message
    {
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; } = null!;

        public Guid SenderId { get; set; }
        public User Sender { get; set; } = null!;

        public Guid ReceiverId { get; set; }
        public User Receiver { get; set; } = null!;

        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }

        public List<Attachment> Attachments { get; set; } = new();
    }



}
