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
        public UserRole UserRole { get; set; }
        public User User { get; set; }
        public ICollection<AchivmentUser> Achivments { get; set; }
        [JsonIgnore]
        public ICollection<UserLike> UsersLike { get; set; }

        public UserProfile(){
            Achivments = new List<AchivmentUser>();
            UsersLike = new List<UserLike>();
        }

    }

    public class UserRole
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Role { get; set; }
        public ICollection<UserProfile> UserProfiles { get;set;}
    
        public UserRole()
        {
            UserProfiles = new List<UserProfile>();
        }
    }
 

  



   


}
