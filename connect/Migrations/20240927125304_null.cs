using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace connect.Migrations
{
    /// <inheritdoc />
    public partial class @null : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Messages");
        }
    }
}
