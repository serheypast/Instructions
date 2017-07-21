using System;
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
        public async Task<IActionResult> City()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserProfile user = await db.UserProfile.FirstOrDefaultAsync(p => p.Id == currentUserId);

            return Ok(new { FirstName = user.FirstName,
                SecondName = "1",
                UrlPhoto = "1",
                Rating = user.Rating,
                Country = "1",
                City = "1",
                DataOfBirth = "1",
                AboutMySelf = "1"
            });
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> MyProfile()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserProfile user = await db.UserProfile.FirstOrDefaultAsync(p => p.Id == currentUserId);

            return Ok(new
            {
                FirstName = user.FirstName,
                SecondName = user.SecondName,
                UrlPhoto = user.UrlPhoto,
                Rating = user.Rating,
                Country = user.Country,
                City = user.City,
                DataOfBirth = user.DataOfBirth,
                AboutMySelf = user.AboutMySelf
            });
        }
    }
}
