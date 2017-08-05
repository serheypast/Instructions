using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using A2SPA.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace A2SPA.Controllers
{

    [Route("api")]
    public class ApiController : Controller
    {
        private ApplicationContext db;

        public ApiController(ApplicationContext _db)
        {
            db = _db;
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            UserProfile user = (id.Equals("0")) ? await db.UserProfile.Include(p => p.Achivments).ThenInclude(p => p.Achivment)
                .FirstOrDefaultAsync(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value) :
                await db.UserProfile.Include(p => p.Achivments).ThenInclude(p => p.Achivment).FirstOrDefaultAsync(p => p.Id == Convert.ToInt32(id));
            return (user == null) ? Ok("No result") : new ObjectResult(user);
        }
         

        [HttpPost("[action]")]
        public IActionResult EditProfile([FromBody] UserProfile item)
        {
            item.User = db.UserProfile.AsNoTracking().Include(o => o.User).FirstOrDefault(p => p.Id == item.Id).User;
            item.User.UserName = item.FirstName;
            db.UserProfile.Update(item);
            db.SaveChanges();
            return Ok();
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/category/{value}")]
        public IActionResult GetInstrucitonsByCategory(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = getSortParams(property);
            Category category = db.Category.FirstOrDefault(p => p.Name == value);
            return new ObjectResult(db.Instruction.Include(p => p.UserProfile).Include(p => p.Category)
                .OrderByDescending(SortParams).Where(p => p.Category == category).Skip(skip).Take(take).ToList());
        }

        private Func<Models.Instruction, object> getSortParams(string property)
        {
            var SortParams = new Func<Models.Instruction, object>(p => p.Rating);
            if (property == "popular")
            {
                SortParams = new Func<Models.Instruction, object>(p => p.Rating);

            }
            else if (property == "all")
            {
                SortParams = new Func<Models.Instruction, object>(p => p.Id);
            }
            return SortParams;
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/tag/{value}")]
        public List<Models.Instruction> GetInstrucitonsByTag(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = getSortParams(property);
            var tag = db.Tag.FirstOrDefault(p => p.Name == value);
            var arr = db.InstructionTag.Include(p => p.Tag).Include(p => p.Instruction).ThenInclude(p => p.Category)
                .Include(p => p.Instruction).ThenInclude(p => p.UserProfile).Where(p => p.Tag == tag).ToList();
            var ans = new List<Models.Instruction>();

            foreach (InstructionTag item in arr)
            {
                ans.Add(item.Instruction);
            }
            return ans.OrderByDescending(SortParams).Skip(skip).Take(take).ToList();
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/{type}/{value}")]
        public List<Models.Instruction> GetInstructionDefaulttype(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = getSortParams(property);
            return db.Instruction.Include(p => p.UserProfile).Include(p => p.Category)
                .OrderByDescending(SortParams).Skip(skip).Take(take).ToList();
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/search/{value}")]
        public List<Models.Instruction> GetInstructionsBySearch(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = getSortParams(property);
            return db.Instruction.Include(p => p.UserProfile).Include(p => p.Category)
                .OrderByDescending(SortParams).Where(p => p.Name.ToLower().Contains(value.ToLower())).Skip(skip).Take(take).ToList();
        }

        [HttpPost("[action]")]
        public IActionResult PublishInstruction([FromBody] Models.Instruction item)
        {
            Category category = db.Category.FirstOrDefault(p => p.Name == item.Category.Name);
            item.Category = (category != null) ? category : item.Category;
            List<InstructionTag> newTags = new List<InstructionTag>();
            foreach (InstructionTag instructTag in item.Tags)
            {
                InstructionTag instTag = db.InstructionTag.FirstOrDefault(p => p.Tag.Name == instructTag.Tag.Name) ??
                    new InstructionTag { Tag = new Tag { Name = instructTag.Tag.Name } };
                newTags.Add(instTag);
            }
            item.UserProfile = db.UserProfile.Include(o => o.User).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            item.Tags = newTags;
            db.Instruction.Add(item);
            db.SaveChanges();
            ServiceAchivment.GetInstance().WasAction(Events.CreatePost, item.UserProfile.Id);
            return Ok(item);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetInstrcutionById(string id)
        {

            Models.Instruction ins = db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Include(p => p.Steps)
                .ThenInclude(p => p.Blocks).Include(p => p.Tags).ThenInclude(p => p.Tag).FirstOrDefault(p => p.Id == Int32.Parse(id));
            return new ObjectResult(ins);
        }

        [HttpGet("[action]")]
        public IActionResult GetAllCategories()
        {
            return new ObjectResult(db.Category.ToList());
        }

        [HttpGet("[action]/{idInstruction}/{skip}/{take}")]
        public IActionResult GetCommentsByInstruction(int idInstruction,  int skip, int take)
        {
            Models.Instruction instruction = db.Instruction.FirstOrDefault(p => p.Id == idInstruction);
            return new ObjectResult(db.Commentary.Include(p => p.UserProfile).Where(p => p.Instruction == instruction).ToList());
        }

        [HttpPost("[action]")]
        public IActionResult AddCommentOnInstruction([FromBody] Commentary commentary)
        {
            UserProfile userProfile = db.UserProfile.FirstOrDefault(p => p.Id == commentary.UserProfile.Id);
            Models.Instruction instruction = db.Instruction.FirstOrDefault(p => p.Id == commentary.Instruction.Id);
            commentary.Instruction = instruction;
            commentary.UserProfile = userProfile;
            db.Commentary.Add(commentary);
            db.SaveChanges();
            ServiceAchivment.GetInstance().WasAction(Events.CommentPost, userProfile.Id);
            return Ok();
        }


        [HttpPost("[action]/{idUser}/{idInstruction}")]
        public IActionResult ChangeComentaryFromUser([FromBody] Commentary commentary, int idUser, int idInstruction)
        {
            Commentary oldComment = db.Commentary.AsNoTracking().Include(p => p.Instruction).Include(p => p.UserProfile)
                .FirstOrDefault(p => p.Id == commentary.Id);
            UserProfile userProfile = db.UserProfile.FirstOrDefault(p => p.Id == commentary.UserProfile.Id);
            Models.Instruction instruction = db.Instruction.FirstOrDefault(p => p.Id == commentary.Instruction.Id);
            oldComment.Instruction = instruction;
            oldComment.UserProfile = userProfile;
            db.Commentary.Update(oldComment);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult ChangeRatingInstruction([FromBody] Models.Instruction item)
        {
            UserProfile userProfile = db.UserProfile.Include(p => p.User).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userProfile != null)
            {
                Models.Instruction instruction = db.Instruction.Include(p => p.UsersLike).Include(p => p.UserProfile).FirstOrDefault(p => p.Id == item.Id);
                if (item.Rating == -1)
                {
                    instruction.UsersLike.Remove(userProfile);
                } else
                {
                    instruction.UsersLike.Add(userProfile);
                }
                instruction.Rating += item.Rating;
                instruction.UserProfile.Rating += item.Rating;
                db.SaveChanges();
                int id = instruction.UserProfile.Id;
                ServiceAchivment.GetInstance().WasAction(Events.LikePost, id);
                return Ok();
            }
            return Ok("Autification Error");
        }

        [HttpGet("[action]/{idUser}/{idInstruction}")]
        public IActionResult IsUserLikedIt(int idUser, int idInstruction)
        {
            UserProfile userProfile = db.UserProfile.FirstOrDefault(p => p.Id == idUser);
            Models.Instruction instruction = db.Instruction.Include(p => p.UsersLike).Include(p => p.UserProfile).FirstOrDefault(p => p.Id == idInstruction);
            return (instruction.UsersLike.Contains(userProfile) == true) ? Ok(true) : Ok(false);
        }

        [HttpGet("[action]")]
        public IActionResult GetTags()
        {
            return new ObjectResult(db.Tag.OrderBy(p => Guid.NewGuid()).Take(10));
        }

        [HttpGet("[action]")]
        public IActionResult GetCurrentUser()
        {
            return new ObjectResult(db.UserProfile.Include(p => p.User).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value));
        }
        
    }
}
            