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
            UserProfile user = (id.Equals("0")) ? await db.UserProfile.FirstOrDefaultAsync(p => p.IdUser == User.FindFirst(ClaimTypes.NameIdentifier).Value) : await db.UserProfile.FirstOrDefaultAsync(p => p.Id == Convert.ToInt32(id));
            return (user == null || (user.IdUser = null) != null) ? Ok("No result") : new ObjectResult(user);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> EditProfile([FromBody] UserProfile item)
        {
            db.UserProfile.Update(item);
            User user = db.Users.First(p => p.Id == item.IdUser);
            user.UserName = item.FirstName;
            db.Users.Update(user);
            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("[action]/{take}/{skip}")]
        public IActionResult GetInstruction(int take, int skip)
        {
            var items = db.Instruction.Skip(skip).Take(take).ToArray();
            return new ObjectResult(items);
        }

        [HttpPost("[action]")]
        public IActionResult AddInstruction([FromBody] A2SPA.Models.Instruction item)
        {
            db.Instruction.Add(item);
            db.SaveChanges();
            return Ok();
        }

    }
}
