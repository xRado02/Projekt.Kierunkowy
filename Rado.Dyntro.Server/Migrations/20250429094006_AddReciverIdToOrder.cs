using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rado.Dyntro.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddReciverIdToOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ReceiverId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ReceiverId",
                table: "Orders",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_ReceiverId",
                table: "Orders",
                column: "ReceiverId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_ReceiverId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ReceiverId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Orders");
        }
    }
}
