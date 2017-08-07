using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using A2SPA.Models;
using Microsoft.EntityFrameworkCore;

namespace A2SPA.ApiControllers
{
    [Route("api/")]
    public class CommentController : Controller
    {
        private ApplicationContext db;

        public CommentController(ApplicationContext _db)
        {
            db = _db;
        }


        [Authorize]
        [HttpPost("[action]")]
        public IActionResult RemoveCommentOnInstruction([FromBody] Commentary commentary)
        {
            UserProfile userProfile = db.UserProfile.FirstOrDefault(p => p.Id == commentary.UserProfile.Id);
            Models.Instruction instruction = db.Instruction.Include(p => p.UserProfile).FirstOrDefault(p => p.Id == commentary.Instruction.Id);
            Commentary comment = db.Commentary.Include(p => p.Instruction).Include(p => p.UserProfile).FirstOrDefault(p => p.Instruction == instruction && p.UserProfile == userProfile);
            db.Commentary.Remove(comment);
            db.SaveChanges();
            return Ok();
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult AddCommentOnInstruction([FromBody] Commentary commentary)
        {
            UserProfile userProfile = db.UserProfile.FirstOrDefault(p => p.Id == commentary.UserProfile.Id);
            Models.Instruction instruction = db.Instruction.Include(p => p.UserProfile).FirstOrDefault(p => p.Id == commentary.Instruction.Id);
            commentary.Instruction = instruction;
            commentary.UserProfile = userProfile;
            db.Commentary.Add(commentary);
            db.SaveChanges();
            ServiceAchivment.GetInstance().WasAction(Events.CommentPost, instruction.UserProfile.Id);
            return Ok();
        }

        [HttpGet("[action]/{idInstruction}/{skip}/{take}")]
        public IActionResult GetCommentsByInstruction(int idInstruction, int skip, int take)
        {
            Models.Instruction instruction = db.Instruction.FirstOrDefault(p => p.Id == idInstruction);
            return new ObjectResult(db.Commentary.Include(p => p.UserProfile).Where(p => p.Instruction == instruction).Skip(skip).Take(take).ToList());
        }
    }
}
