using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using A2SPA.Models;
using System.Threading.Tasks;
using System.Security.Claims;

namespace A2SPA.Controllers
{
    public class PartialController : Controller
    {
        

        public IActionResult AboutComponent() => PartialView();

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() {
            return PartialView();
        }

        public IActionResult IndexComponent() => PartialView();

        public IActionResult AuthorizationComponent() => PartialView();

        public IActionResult ProfileComponent() => PartialView();

        public IActionResult TestComponent() => PartialView();

        public IActionResult HomeComponent() => PartialView();
    }
}
