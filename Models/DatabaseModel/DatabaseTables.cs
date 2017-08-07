using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace A2SPA.Models
{
    public class Step
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [JsonIgnore]
        [Required]
        public Instruction Instruction { get; set; }
        public int Position { get; set; }
        public string Name { get; set; }
        public ICollection<Block> Blocks { get; set; }

        public Step()
        {
            Blocks = new List<Block>();
        }
    }

    public class Block
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [JsonIgnore]
        [Required]
        public Step Step { get; set; }
        public string Type { get; set; }
        public string Field { get; set; }
    }

    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
    }

    public class Instruction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public string DataCreated { get; set; }
        public string PreviewImageUrl { get; set; }
        public int Rating { get; set; }

        public Category Category { get; set; }
        public UserProfile UserProfile { get; set; }

        public ICollection<InstructionTag> Tags { get; set; }
        public ICollection<Step> Steps { get; set; }
        public ICollection<UserLike> UsersLike { get; set; }

        public Instruction()
        {
            Steps = new List<Step>();
            Tags = new List<InstructionTag>();
            UsersLike = new List<UserLike>();
        }

    }

    public class UserLike
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]
        [JsonIgnore]
        public Instruction Instruction { get; set; }
    }



    public class Tag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public ICollection<InstructionTag> Instructions { get; set; }

        public Tag()
        {
            Instructions = new List<InstructionTag>();
        }
    }

    public class InstructionTag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public Tag Tag { get; set; }
        [Required]
        [JsonIgnore]
        public Instruction Instruction { get; set; }
    }

    public class Commentary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Instruction Instruction { get; set; }
        public UserProfile UserProfile { get; set; }
        public string DataCreated { get; set; }
        public string Content { get; set; }
        public string Date { get; set; }

    }

    public class Achivment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string UrlImage { get; set; }
        public string Description { get; set; }
    }

    public class AchivmentUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Achivment Achivment { get; set; }
        [JsonIgnore]
        public UserProfile UserProfile { get; set; }
    }

}
