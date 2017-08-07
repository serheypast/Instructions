using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using A2SPA.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace A2SPA.ApiControllers
{
    [Route("api/")]
    public class InstructionController : Controller
    {
        private ApplicationContext db;

        public InstructionController(ApplicationContext _db)
        {
            db = _db;
        }

        [HttpGet("getInstructions/{take}/{skip}/{property}/category/{value}")]
        public IActionResult GetInstrucitonsByCategory(int take, int skip, string property, string type, string value)
        {
            Func<Models.Instruction, object> SortParams = GetSortParams(property);
            Category category = db.Category.FirstOrDefault(p => p.Name == value);
            return new ObjectResult(db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Include(p => p.UsersLike).ThenInclude(p => p.UserProfile)
                .OrderByDescending(SortParams).Where(p => p.Category == category).Skip(skip).Take(take).ToList());
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
            item.Category = category ?? item.Category;
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
            foreach (Models.Step step in instruction.Steps)
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

        [HttpGet("[action]/{idUser}/{take}/{skip}")]
        public IActionResult GetUserInstruction(int idUser, int take, int skip)
        {
            return new ObjectResult(db.Instruction.Include(p => p.UserProfile).Include(p => p.Category).Where(p => p.UserProfile.Id == idUser).Skip(skip).Take(take).ToList());
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult RemoveInstructionById([FromBody] Models.Instruction itemInstruction)
        {
            Models.Instruction instruction = db.Instruction.Include(p => p.Steps)
                .ThenInclude(p => p.Blocks).Include(p => p.Tags).ThenInclude(p => p.Tag).FirstOrDefault(p => p.Id == itemInstruction.Id);

            foreach (InstructionTag item in instruction.Tags)
            {
                db.InstructionTag.Remove(item);
            }
            var commentaries = db.Commentary.Include(p => p.Instruction).Where(p => p.Instruction.Id == instruction.Id);
            foreach (Commentary comment in commentaries)
            {
                db.Commentary.Remove(comment);
            }
            db.Instruction.Remove(instruction);
            db.SaveChanges();
            return Ok();
        }

        [HttpGet("[action]")]
        public IActionResult GetTags()
        {
            return new ObjectResult(db.Tag.OrderBy(p => Guid.NewGuid()).Take(20));
        }

        [HttpGet("[action]")]
        public IActionResult GetAllCategories()
        {
            return new ObjectResult(db.Category.ToList());
        }

        private Func<Models.Instruction, object> GetSortParams(string conditionSearch)
        {
            var SortParams = new Func<Models.Instruction, object>(p => p.Rating);
            if (conditionSearch == "popular")
            {
                SortParams = new Func<Models.Instruction, object>(p => p.Rating);

            }
            else if (conditionSearch == "all")
            {
                SortParams = new Func<Models.Instruction, object>(p => p.Id);
            }
            return SortParams;
        }

    }
}
