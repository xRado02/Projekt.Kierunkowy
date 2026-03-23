using Rado.Dyntro.Server.Models;

namespace Rado.Dyntro.Server.Models
{
    public class MessageViewModel
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; } 
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }
        public List<AttachmentViewModel> Attachments { get; set; } = new();
    }

}
