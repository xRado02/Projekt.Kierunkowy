using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace Rado.Dyntro.Server.Data
{
    public class AppDbContext : DbContext
    {

        private string _connectionSting = "Server=localhost;Database=RadoDyntroDB;Trusted_Connection=True;";
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Entities.Order>? Orders { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           optionsBuilder.UseSqlServer(_connectionSting);
        }

    }
}

