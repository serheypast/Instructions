using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace A2SPA.Models
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public static DbContextOptions<ApplicationContext> _options;
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Instruction> Instruction { get; set; }
        public DbSet<Step> Step { get; set; }
        public DbSet<Block> Block { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<InstructionTag> InstructionTag { get; set; }
        public DbSet<Commentary> Commentary { get; set; }
        public DbSet<Achivment> Achivment { get; set; }
        public DbSet<AchivmentUser> AchivmentUser { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<UserLike> UserLike { get; set; }
        public DbSet<UserRole> UserRole { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            _options = options;
        }

        
        public ApplicationContext()
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>()
            .HasIndex(u => u.Name)
            .IsUnique();
        }
    }
}
