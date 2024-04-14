using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class migShoes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DbShoeDetails");

            migrationBuilder.AddColumn<string>(
                name: "ShoeBrand",
                table: "DbShoes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShoeColor",
                table: "DbShoes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShoeMaterial",
                table: "DbShoes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "ShoeSize",
                table: "DbShoes",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShoeBrand",
                table: "DbShoes");

            migrationBuilder.DropColumn(
                name: "ShoeColor",
                table: "DbShoes");

            migrationBuilder.DropColumn(
                name: "ShoeMaterial",
                table: "DbShoes");

            migrationBuilder.DropColumn(
                name: "ShoeSize",
                table: "DbShoes");

            migrationBuilder.CreateTable(
                name: "DbShoeDetails",
                columns: table => new
                {
                    ShoeSize = table.Column<float>(type: "real", nullable: false),
                    ShoeBrand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShoeColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShoeMaterial = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbShoeDetails", x => x.ShoeSize);
                });
        }
    }
}
