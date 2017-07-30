﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using A2SPA.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace A2SPA.Controllers
{
    [Route("api/[controller]")]
    public class ApiController : Controller
    {
        private ApplicationContext db;

        public ApiController(ApplicationContext _db)
        {
            db = _db;
        }

        [HttpGet("[action]")]
        public IActionResult City()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserProfile user = db.UserProfile.First(p => p.IdUser == currentUserId);
            return new ObjectResult(user);
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
    }
}
