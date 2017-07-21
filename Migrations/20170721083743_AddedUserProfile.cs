using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace A2SPA.Migrations
{
    public partial class AddedUserProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserProfile",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AboutMySelf = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    DataOfBirth = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    Rating = table.Column<int>(nullable: false),
                    SecondName = table.Column<string>(nullable: true),
                    UrlPhoto = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfile", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProfile");
        }
    }
}
