using Microsoft.EntityFrameworkCore;
using Rado.Dyntro.Server.Data.Entities;

public class AppDbContext : DbContext
{
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;
    public DbSet<Attachment> Attachments { get; set; } = null!;
    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; } = null!;


    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       
        modelBuilder.Entity<Order>().Property(o => o.Status).HasConversion<string>();
        modelBuilder.Entity<Order>().Property(o => o.Priority).HasConversion<string>();
        modelBuilder.Entity<Order>().Property(o => o.Category).HasConversion<string>();
        modelBuilder.Entity<User>().Property(u => u.Role).HasConversion<string>();

   
        modelBuilder.Entity<User>()
            .HasMany(u => u.Orders)
            .WithOne(o => o.User)
            .HasForeignKey(o => o.UserId) 
            .OnDelete(DeleteBehavior.Cascade);

  
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Receiver)
            .WithMany()
            .HasForeignKey(o => o.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

       
        modelBuilder.Entity<Order>()
            .HasMany(o => o.Messages)
            .WithOne(m => m.Order)
            .HasForeignKey(m => m.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

       
        modelBuilder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany()
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

       
        modelBuilder.Entity<Message>()
            .HasOne(m => m.Receiver)
            .WithMany()
            .HasForeignKey(m => m.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Attachment>()
            .HasOne(a => a.Message)
            .WithMany(m => m.Attachments)
            .HasForeignKey(a => a.MessageId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PasswordResetToken>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
