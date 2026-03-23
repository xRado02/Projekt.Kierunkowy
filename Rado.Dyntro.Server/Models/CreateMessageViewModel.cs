namespace Rado.Dyntro.Server.Models
{
    public class CreateMessageViewModel
    {
        public Guid OrderId { get; set; }
        public string Content { get; set; } = null!;
        public List<AttachmentViewModel> Attachments { get; set; } = new();
    }
}
