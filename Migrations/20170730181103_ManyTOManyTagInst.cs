using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace A2SPA.Migrations
{
    public partial class ManyTOManyTagInst : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tag_Instruction_InstructionId",
                table: "Tag");

            migrationBuilder.DropIndex(
                name: "IX_Tag_InstructionId",
                table: "Tag");

            migrationBuilder.DropColumn(
                name: "InstructionId",
                table: "Tag");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InstructionId",
                table: "Tag",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tag_InstructionId",
                table: "Tag",
                column: "InstructionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tag_Instruction_InstructionId",
                table: "Tag",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
