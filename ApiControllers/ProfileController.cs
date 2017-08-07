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
    public class ProfileController : Controller
    {
        private ApplicationContext db;

        public ProfileController(ApplicationContext _db)
        {
            db = _db;
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            UserProfile user = await db.UserProfile.Include(p => p.Achivments).ThenInclude(p => p.Achivment).FirstOrDefaultAsync(p => p.Id == id);
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

        [HttpGet("[action]")]
        [Authorize]
        public IActionResult GetCurrentUser()
        {
            UserProfile userProfile = db.UserProfile.Include(p => p.User).Include(p => p.UserRole).FirstOrDefault(p => p.User.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(new { id = userProfile.Id, role = userProfile.UserRole.Role });
        }
    }
}
