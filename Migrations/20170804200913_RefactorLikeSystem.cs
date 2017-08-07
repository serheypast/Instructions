using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace A2SPA.Migrations
{
    public partial class RefactorLikeSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikeInstruction");

            migrationBuilder.AddColumn<int>(
                name: "InstructionId",
                table: "UserProfile",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_InstructionId",
                table: "UserProfile",
                column: "InstructionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_Instruction_InstructionId",
                table: "UserProfile",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_Instruction_InstructionId",
                table: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_UserProfile_InstructionId",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "InstructionId",
                table: "UserProfile");

            migrationBuilder.CreateTable(
                name: "LikeInstruction",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InstructionId = table.Column<int>(nullable: true),
                    UserProfileId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeInstruction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikeInstruction_Instruction_InstructionId",
                        column: x => x.InstructionId,
                        principalTable: "Instruction",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikeInstruction_UserProfile_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikeInstruction_InstructionId",
                table: "LikeInstruction",
                column: "InstructionId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeInstruction_UserProfileId",
                table: "LikeInstruction",
                column: "UserProfileId");
        }
    }
}
