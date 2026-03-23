using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rado.Dyntro.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangesEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Messages",
                newName: "SentAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SentAt",
                table: "Messages",
                newName: "Date");
        }
    }
}
