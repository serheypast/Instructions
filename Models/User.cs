﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace A2SPA.Models
{
    public class User: IdentityUser
    {
       
    }

    public class UserProfile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string UrlPhoto { get; set; }
        public int Rating { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string DataOfBirth { get; set; }
        public string AboutMySelf { get; set; }

        public User User { get; set; }

    }

 

    public class Step
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [JsonIgnore]
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

        public Instruction()
        {
            Steps = new List<Step>();
            Tags = new List<InstructionTag>();
        }

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
        public int Content { get; set; }
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
        public UserProfile UserProfile { get; set; }
    }

   

}
