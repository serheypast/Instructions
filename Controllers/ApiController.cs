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
            UserProfile user = (id.Equals("0")) ? await db.UserProfile.FirstOrDefaultAsync(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value) : await db.UserProfile.FirstOrDefaultAsync(p => p.Id == Convert.ToInt32(id));
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
            ServiceAchivment.GetInstance().WasAction(Events.CreatePost, "lul");
            Func<Models.Instruction, object> SortParams = getSortParams(property);
            Category category = db.Category.FirstOrDefault(p => p.Name == value);
            return new ObjectResult(db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).OrderBy(SortParams).Where(p => p.Category == category).Skip(skip).Take(take).ToList());
        }

        private Func<Models.Instruction, object> getSortParams(string property)
        {
            var SortParams = new Func<Models.Instruction, object>(p => p.Rating);
            if (property == "popular")
            {
                SortParams = new Func<Models.Instruction, object>(p => p.Rating);

            }
            else if (property == "new")
            {
                SortParams = new Func<Models.Instruction, object>(p => p.DataCreated);
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
            var arr = db.InstructionTag.Include(p => p.Tag).Include(p => p.Instruction).ThenInclude(p => p.Category).Include(p => p.Instruction).ThenInclude(p => p.UserProfile).Where(p => p.Tag == tag).ToList();
            var ans = new List<Models.Instruction>();

            foreach (InstructionTag item in arr)
            {
                ans.Add(item.Instruction);
            }
            return ans.OrderBy(SortParams).Skip(skip).Take(take).ToList();
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/{type}/{value}")]
        public List<Models.Instruction> GetInstructionDefaulttype(int take, int skip, string property,string type ,string value )
        {
            Func<Models.Instruction, object> SortParams = getSortParams(property);
            return db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).OrderBy(SortParams).Skip(skip).Take(take).ToList();
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/search/{value}")]
        public List<Models.Instruction> GetInstructionsBySearch(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = getSortParams(property);
            return  db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).OrderBy(SortParams).Where(p => p.Name.ToLower().Contains(value.ToLower())).Skip(skip).Take(take).ToList();
        }

        [HttpPost("[action]")]
        public IActionResult PublishInstruction([FromBody] A2SPA.Models.Instruction item)
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
        public IActionResult GetInstructionById(string id)
        {
            
            Models.Instruction ins = db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Include(p => p.Steps).ThenInclude(p => p.Blocks).Include(p => p.Tags).ThenInclude(p => p.Tag).FirstOrDefault(p => p.Id == Int32.Parse(id));
            return new ObjectResult(ins);
        }

        [HttpGet("[action]")]
        public IActionResult GetAllCategories()
        {
            return new ObjectResult(db.Category.ToList());
        }


    }
    
}
