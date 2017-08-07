using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using A2SPA.Models;

namespace A2SPA.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("A2SPA.Models.Achivment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<string>("UrlImage");

                    b.HasKey("Id");

                    b.ToTable("Achivment");
                });

            modelBuilder.Entity("A2SPA.Models.AchivmentUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AchivmentId");

                    b.Property<int?>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("AchivmentId");

                    b.HasIndex("UserProfileId");

                    b.ToTable("AchivmentUser");
                });

            modelBuilder.Entity("A2SPA.Models.Block", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Field");

                    b.Property<int>("StepId");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("StepId");

                    b.ToTable("Block");
                });

            modelBuilder.Entity("A2SPA.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Category");
                });

            modelBuilder.Entity("A2SPA.Models.Commentary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<string>("DataCreated");

                    b.Property<string>("Date");

                    b.Property<int?>("InstructionId");

                    b.Property<int?>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("InstructionId");

                    b.HasIndex("UserProfileId");

                    b.ToTable("Commentary");
                });

            modelBuilder.Entity("A2SPA.Models.Instruction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<string>("DataCreated");

                    b.Property<string>("Name");

                    b.Property<string>("PreviewImageUrl");

                    b.Property<int>("Rating");

                    b.Property<int?>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserProfileId");

                    b.ToTable("Instruction");
                });

            modelBuilder.Entity("A2SPA.Models.InstructionTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InstructionId");

                    b.Property<int?>("TagId");

                    b.HasKey("Id");

                    b.HasIndex("InstructionId");

                    b.HasIndex("TagId");

                    b.ToTable("InstructionTag");
                });

            modelBuilder.Entity("A2SPA.Models.Step", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InstructionId");

                    b.Property<string>("Name");

                    b.Property<int>("Position");

                    b.HasKey("Id");

                    b.HasIndex("InstructionId");

                    b.ToTable("Step");
                });

            modelBuilder.Entity("A2SPA.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Tag");
                });

            modelBuilder.Entity("A2SPA.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("A2SPA.Models.UserLike", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InstructionId");

                    b.Property<int?>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("InstructionId");

                    b.HasIndex("UserProfileId");

                    b.ToTable("UserLike");
                });

            modelBuilder.Entity("A2SPA.Models.UserProfile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AboutMySelf");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("DataOfBirth");

                    b.Property<string>("FirstName");

                    b.Property<int>("Rating");

                    b.Property<string>("SecondName");

                    b.Property<string>("UrlPhoto");

                    b.Property<string>("UserId");

                    b.Property<int?>("UserRoleId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("UserRoleId");

                    b.ToTable("UserProfile");
                });

            modelBuilder.Entity("A2SPA.Models.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Role");

                    b.HasKey("Id");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("A2SPA.Models.AchivmentUser", b =>
                {
                    b.HasOne("A2SPA.Models.Achivment", "Achivment")
                        .WithMany()
                        .HasForeignKey("AchivmentId");

                    b.HasOne("A2SPA.Models.UserProfile", "UserProfile")
                        .WithMany("Achivments")
                        .HasForeignKey("UserProfileId");
                });

            modelBuilder.Entity("A2SPA.Models.Block", b =>
                {
                    b.HasOne("A2SPA.Models.Step", "Step")
                        .WithMany("Blocks")
                        .HasForeignKey("StepId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("A2SPA.Models.Commentary", b =>
                {
                    b.HasOne("A2SPA.Models.Instruction", "Instruction")
                        .WithMany()
                        .HasForeignKey("InstructionId");

                    b.HasOne("A2SPA.Models.UserProfile", "UserProfile")
                        .WithMany()
                        .HasForeignKey("UserProfileId");
                });

            modelBuilder.Entity("A2SPA.Models.Instruction", b =>
                {
                    b.HasOne("A2SPA.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("A2SPA.Models.UserProfile", "UserProfile")
                        .WithMany()
                        .HasForeignKey("UserProfileId");
                });

            modelBuilder.Entity("A2SPA.Models.InstructionTag", b =>
                {
                    b.HasOne("A2SPA.Models.Instruction", "Instruction")
                        .WithMany("Tags")
                        .HasForeignKey("InstructionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("A2SPA.Models.Tag", "Tag")
                        .WithMany("Instructions")
                        .HasForeignKey("TagId");
                });

            modelBuilder.Entity("A2SPA.Models.Step", b =>
                {
                    b.HasOne("A2SPA.Models.Instruction", "Instruction")
                        .WithMany("Steps")
                        .HasForeignKey("InstructionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("A2SPA.Models.UserLike", b =>
                {
                    b.HasOne("A2SPA.Models.Instruction", "Instruction")
                        .WithMany("UsersLike")
                        .HasForeignKey("InstructionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("A2SPA.Models.UserProfile", "UserProfile")
                        .WithMany("UsersLike")
                        .HasForeignKey("UserProfileId");
                });

            modelBuilder.Entity("A2SPA.Models.UserProfile", b =>
                {
                    b.HasOne("A2SPA.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.HasOne("A2SPA.Models.UserRole", "UserRole")
                        .WithMany("UserProfiles")
                        .HasForeignKey("UserRoleId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("A2SPA.Models.User")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("A2SPA.Models.User")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("A2SPA.Models.User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
