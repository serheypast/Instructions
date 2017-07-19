using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
namespace A2SPA.Controllers
{
    public class PartialController : Controller
    {
        
  
        public IActionResult AboutComponent() => PartialView();

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();

        public IActionResult AuthorizationComponent() => PartialView();
    }
}
