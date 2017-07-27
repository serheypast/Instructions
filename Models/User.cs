using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
        [ForeignKey("User")]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string UrlPhoto { get; set; }
        public int Rating { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string DataOfBirth { get; set; }
        public string AboutMySelf { get; set; }
    }

    public class Instruction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string AuthorId { get; set; }
        public string Name { get; set; }
        public string DataCreated { get; set; }
        public string PreviewImageUrl { get; set; }
        public int Rating { get; set; }
        public string Category { get; set; }
    }


}
