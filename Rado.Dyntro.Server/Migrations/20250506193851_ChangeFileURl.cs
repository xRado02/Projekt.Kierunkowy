using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rado.Dyntro.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFileURl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FileUrl",
                table: "Attachments",
                newName: "FilePath");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "Attachments",
                newName: "FileUrl");
        }
    }
}
