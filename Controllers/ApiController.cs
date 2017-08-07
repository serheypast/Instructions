using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using A2SPA.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using A2SPA.Controllers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

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
            //UserProfile user = await db.UserProfile.Include(p => p.Achivments).ThenInclude(p => p.Achivment).FirstOrDefaultAsync(p => p.Id == (id ?? Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value)));
            return (user == null) ? BadRequest("No result") : new ObjectResult(user);
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult EditProfile([FromBody] UserProfile item)
        {
            item.User = db.UserProfile.AsNoTracking().Include(o => o.User).FirstOrDefault(p => p.Id == item.Id).User;
            item.User.UserName = item.FirstName;
            db.UserProfile.Update(item);
            db.SaveChanges();
            return Ok();
        }

        //изменить название переменных
        [HttpGet("getInstructions/{take}/{skip}/{property}/category/{value}")]
        public IActionResult GetInstrucitonsByCategory(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = GetSortParams(property);
            Category category = db.Category.FirstOrDefault(p => p.Name == value);          
            return new ObjectResult(db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Include(p => p.UsersLike).ThenInclude(p => p.UserProfile)
                .OrderByDescending(SortParams).Where(p => p.Category == category).Skip(skip).Take(take).ToList());
        }

        private Func<Models.Instruction, object> GetSortParams(string property)
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
            Func<Models.Instruction, object> sortParams = GetSortParams(property);
            var tag = db.Tag.FirstOrDefault(p => p.Name == value);
            var arr = db.InstructionTag.Include(p => p.Tag).Include(p => p.Instruction).ThenInclude(p => p.Category)
                .Include(p => p.Instruction).ThenInclude(p => p.UserProfile).Where(p => p.Tag == tag).ToList();
            var ans = new List<Models.Instruction>();

            foreach (InstructionTag item in arr)
            {
                ans.Add(item.Instruction);
            }
            return ans.OrderByDescending(sortParams).Skip(skip).Take(take).ToList();
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/{type}/{value}")]
        public List<Models.Instruction> GetInstructionDefaulttype(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = GetSortParams(property);
            return db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Include(p => p.UsersLike).ThenInclude(p => p.UserProfile)
                .OrderByDescending(SortParams).Skip(skip).Take(take).ToList();
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/search/{value}")]
        public List<Models.Instruction> GetInstructionsBySearch(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = GetSortParams(property);
            return db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Include(p => p.UsersLike).ThenInclude(p => p.UserProfile)
                .OrderByDescending(SortParams).Where(p => p.Name.ToLower().Contains(value.ToLower())).Skip(skip).Take(take).ToList();
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult PublishInstruction([FromBody] Models.Instruction item)
        {
            Category category = db.Category.FirstOrDefault(p => p.Name == item.Category.Name);
            item.Category =  category ?? item.Category;
            List<InstructionTag> newTags = GetOrCreteTags(item);
            item.UserProfile = db.UserProfile.Include(o => o.User).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            item.Tags = newTags;
            db.Instruction.Add(item);
            db.SaveChanges();
            ServiceAchivment.GetInstance().WasAction(Events.CreatePost, item.UserProfile.Id);
            return Ok(item);
        }

        private List<InstructionTag> GetOrCreteTags(Models.Instruction item)
        {
            List<InstructionTag> newTags = new List<InstructionTag>();
            foreach (InstructionTag instructTag in item.Tags)
            {
                InstructionTag instTag = db.InstructionTag.FirstOrDefault(p => p.Tag.Name == instructTag.Tag.Name) ??
                    new InstructionTag { Tag = new Tag { Name = instructTag.Tag.Name } };
                newTags.Add(instTag);
            }

            return newTags;
        }

        [HttpPost("[action]")]
        public IActionResult EditInstruction([FromBody] Models.Instruction item)
        {
            Category category = db.Category.FirstOrDefault(p => p.Name == item.Category.Name);
            item.Category = category ?? item.Category;
            Models.Instruction instruction = db.Instruction.AsNoTracking().
                Include(p => p.Category).
                Include(p => p.Steps).ThenInclude(p => p.Blocks).
                Include(p => p.Tags).ThenInclude(p => p.Instruction).
                FirstOrDefault(p => p.Id == item.Id);
            foreach(Models.Step step in instruction.Steps)
            {
                db.Step.Remove(db.Step.FirstOrDefault(p => p.Id == step.Id));   
            }
            
            var steps = item.Steps;
            db.Step.AddRange(steps);
            item.UserProfile = null;
            db.Update(item);  
            db.SaveChanges();
            return Ok(item);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetInstrcutionById(int id)
        {
            Models.Instruction ins = db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Include(p => p.Steps)
                .ThenInclude(p => p.Blocks).Include(p => p.Tags).ThenInclude(p => p.Tag).FirstOrDefault(p => p.Id == id) ?? new Models.Instruction();
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
            return new ObjectResult(db.Commentary.Include(p => p.UserProfile).Where(p => p.Instruction == instruction).Skip(skip).Take(take).ToList());
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

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult ChangeRatingInstruction([FromBody] Models.Instruction item)
        {
            UserProfile userProfile = db.UserProfile.Include(p => p.UserRole).Include(p => p.User).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            if (userProfile != null)
            {
                int rating = 0;
                Models.Instruction instruction = db.Instruction.Include(p => p.UsersLike).Include(p => p.UserProfile).FirstOrDefault(p => p.Id == item.Id);
                if(instruction.UsersLike.Any(p => p.UserProfile.Id == userProfile.Id))
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
            Models.Instruction instruction = db.Instruction.Include(p => p.UsersLike).ThenInclude(p =>p.UserProfile).FirstOrDefault(p => p.Id == idInstruction);
            return new ObjectResult((instruction.UsersLike.Any(x => x.UserProfile.Id == idUser)) ? true : false);
        }

        [HttpGet("[action]")]
        public IActionResult GetTags()
        {
            return new ObjectResult(db.Tag.OrderBy(p => Guid.NewGuid()).Take(20));
        }

        [HttpGet("[action]")]
        [Authorize]
        public IActionResult GetCurrentUser()
        {
            UserProfile userProfile = db.UserProfile.Include(p => p.User).Include(p=>p.UserRole).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(new { id = userProfile.Id, role = userProfile.UserRole.Role });
        }

        [HttpGet("[action]/{idUser}/{take}/{skip}")]
        public IActionResult GetUserInstruction(int idUser,int take,int skip)
        {
            return new ObjectResult(db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Where(p => p.UserProfile.Id == idUser).Skip(skip).Take(take).ToList());
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult RemoveCommentOnInstruction([FromBody] Commentary commentary)
        {
            User user = new User();
            var a = user.Roles;
            
            UserProfile userProfile = db.UserProfile.FirstOrDefault(p => p.Id == commentary.UserProfile.Id);
            Models.Instruction instruction = db.Instruction.Include(p => p.UserProfile).FirstOrDefault(p => p.Id == commentary.Instruction.Id);
            commentary.Instruction = instruction;
            commentary.UserProfile = userProfile;
            db.Commentary.Add(commentary);
            db.SaveChanges();
            ServiceAchivment.GetInstance().WasAction(Events.CommentPost, instruction.UserProfile.Id);
            return Ok();
        }

    }
}
            