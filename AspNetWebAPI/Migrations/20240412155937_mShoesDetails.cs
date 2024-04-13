using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class mShoesDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShoeSize",
                table: "DbShoes",
                newName: "Discount");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "DbShoes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DbShoeDetails",
                columns: table => new
                {
                    ShoeSize = table.Column<float>(type: "real", nullable: false),
                    ShoeColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShoeBrand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShoeMaterial = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbShoeDetails", x => x.ShoeSize);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DbShoeDetails");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "DbShoes");

            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "DbShoes",
                newName: "ShoeSize");
        }
    }
}
