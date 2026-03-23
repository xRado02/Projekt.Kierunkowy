using Rado.Dyntro.Server.Data.Entities;

public class Attachment
{
    public int Id { get; set; }

    public string FileName { get; set; } = null!;
    public string ContentType { get; set; } = null!;
    public byte[] FileContent { get; set; } = null!;
    public DateTime UploadedAt { get; set; }
    public Guid MessageId { get; set; } 
    public Message Message { get; set; } = null!;
}
