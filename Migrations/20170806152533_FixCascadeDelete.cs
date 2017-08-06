using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace A2SPA.Migrations
{
    public partial class FixCascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Block_Step_StepId",
                table: "Block");

            migrationBuilder.DropForeignKey(
                name: "FK_Step_Instruction_InstructionId",
                table: "Step");

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "Step",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StepId",
                table: "Block",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Block_Step_StepId",
                table: "Block",
                column: "StepId",
                principalTable: "Step",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Step_Instruction_InstructionId",
                table: "Step",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Block_Step_StepId",
                table: "Block");

            migrationBuilder.DropForeignKey(
                name: "FK_Step_Instruction_InstructionId",
                table: "Step");

            migrationBuilder.AlterColumn<int>(
                name: "InstructionId",
                table: "Step",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "StepId",
                table: "Block",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Block_Step_StepId",
                table: "Block",
                column: "StepId",
                principalTable: "Step",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Step_Instruction_InstructionId",
                table: "Step",
                column: "InstructionId",
                principalTable: "Instruction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
