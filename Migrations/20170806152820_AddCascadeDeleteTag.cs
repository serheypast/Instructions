using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace A2SPA.Migrations
{
    public partial class AddCascadeDeleteTag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InstructionTag_Instruction_InstructionId",
                table: "InstructionTag");

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "InstructionTag",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InstructionTag_Instruction_InstructionId",
                table: "InstructionTag",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InstructionTag_Instruction_InstructionId",
                table: "InstructionTag");

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "InstructionTag",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InstructionTag_Instruction_InstructionId",
                table: "InstructionTag",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
