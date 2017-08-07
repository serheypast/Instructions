using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using A2SPA.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace A2SPA.ApiControllers
{
    [Route("api/")]
    public class LikeSystemController : Controller
    {
        private ApplicationContext db;

        public LikeSystemController(ApplicationContext _db)
        {
            db = _db;
        }


        [Authorize]
        [HttpPost("[action]")]
        public IActionResult ChangeRatingInstruction([FromBody] Models.Instruction item)
        {
            UserProfile userProfile = db.UserProfile.Include(p => p.UserRole).Include(p => p.User).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (userProfile != null)
            {
                int rating = 0;
                Models.Instruction instruction = db.Instruction.Include(p => p.UsersLike).Include(p => p.UserProfile).FirstOrDefault(p => p.Id == item.Id);
                if (instruction.UsersLike.Any(p => p.UserProfile.Id == userProfile.Id))
                {
                    var temp = instruction.UsersLike.FirstOrDefault(p => p.UserProfile.Id == userProfile.Id);
                    db.UserLike.Remove(temp);
                    rating = -1;
                }
                else
                {
                    var temp = new UserLike();
                    temp.UserProfile = userProfile;
                    instruction.UsersLike.Add(temp);
                    rating = 1;
                }
                instruction.Rating += rating;
                instruction.UserProfile.Rating += rating;
                db.SaveChanges();
                ServiceAchivment.GetInstance().WasAction(Events.LikePost, instruction.UserProfile.Id);
                return Ok();
            }
            return Unauthorized();
        }

        [HttpGet("[action]/{idUser}/{idInstruction}")]
        public IActionResult IsUserLikedIt(int idUser, int idInstruction)
        {
            Models.Instruction instruction = db.Instruction.Include(p => p.UsersLike).ThenInclude(p => p.UserProfile).FirstOrDefault(p => p.Id == idInstruction);
            return new ObjectResult((instruction.UsersLike.Any(x => x.UserProfile.Id == idUser)) ? true : false);
        }
    }
}
