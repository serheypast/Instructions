using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using A2SPA.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Linq;

namespace A2SPA.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();

        public IActionResult AuthorizationComponent() => PartialView();

        public IActionResult ProfileComponent() => PartialView();

        [Authorize]
        public IActionResult InstructionComponent() => PartialView();

        public IActionResult TestComponent() => PartialView();

        public IActionResult CommentComponent() => PartialView();

        public IActionResult HomeComponent() => PartialView();
 
        public IActionResult InstructionBlockComponent() => PartialView();

        public IActionResult DisplayInstructionComponent() => PartialView();
    }
}
