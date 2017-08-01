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

        [HttpGet("[action]/{take}/{skip}")]
        public IActionResult GetInstruction(int take, int skip)
        {
            var items = db.Instruction.Skip(skip).Take(take).ToArray();
            return new ObjectResult(items);
        }


        [HttpPost("[action]")]
        public IActionResult PublishInstruction([FromBody] A2SPA.Models.Instruction item)
        {
            Category category = db.Category.FirstOrDefault(p => p.Name == item.Category.Name);
            item.Category = (category != null) ? category : item.Category;
            List<InstructionTag> newTags = new List<InstructionTag>();
            foreach (InstructionTag instructTag in item.Tags)
            {
                InstructionTag instTag = (db.Tag.FirstOrDefault(p => p.Name == instructTag.Tag.Name) == null) ?
                    new InstructionTag { Tag = new Tag { Name = instructTag.Tag.Name } }
                    : instTag = db.InstructionTag.FirstOrDefault(p => p.Tag.Name == instructTag.Tag.Name);
                newTags.Add(instTag);
            }
            item.Tags = newTags;
            db.Instruction.Add(item);
            db.SaveChanges();
            return Ok(item);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetInstructionById(string id)
        {
            Models.Instruction ins = db.Instruction.Include(p => p.Steps).ThenInclude(p => p.Blocks).Include(p => p.Tags).ThenInclude(p => p.Tag).FirstOrDefault(p => p.Id == Int32.Parse(id));
            return new ObjectResult(ins);
        }

    }
}
