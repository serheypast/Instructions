using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace A2SPA.Migrations
{
    public partial class CascadeDeleteLiek : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLike_Instruction_InstructionId",
                table: "UserLike");

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "UserLike",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLike_Instruction_InstructionId",
                table: "UserLike",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLike_Instruction_InstructionId",
                table: "UserLike");

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "UserLike",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_UserLike_Instruction_InstructionId",
                table: "UserLike",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
