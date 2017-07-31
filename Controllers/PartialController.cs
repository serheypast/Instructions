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
        private ApplicationContext db;

        public PartialController(ApplicationContext _db)
        {
            db = _db;
        }

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();

        public IActionResult AuthorizationComponent() => PartialView();

        public IActionResult ProfileComponent() => PartialView();

        public IActionResult InstructionComponent() => PartialView();

        public IActionResult TestComponent() => PartialView();

        public IActionResult CommentComponent() => PartialView();

        public IActionResult HomeComponent()
        {
            //Block bl = new Block();
            //bl.Field = "3";
            //bl.Type = "3";
            //Block bl2 = new Block();
            //bl2.Field = "4";
            //bl2.Type = "4";

            //Step step = new Step();
            //step.Name = "3";
            //step.Position = 3;
            //Step step1 = new Step();
            //step1.Name = "4";
            //step1.Position = 4;

            //step.Blocks.Add(bl);
            //step1.Blocks.Add(bl2);

            //A2SPA.Models.Instruction inst = new A2SPA.Models.Instruction();
            //inst.Name = "5";
            //inst.Steps.Add(step);
            //inst.Steps.Add(step1);

            //Tag tagg = db.Tag.First(p => p.Name == "fd1");
            
            //InstructionTag tag = new InstructionTag();
            //tag.Tag = tagg;
            //tag.Instruction = inst;

            //tagg.Instructions.Add(tag);
            //inst.Tags.Add(tag);
            
            //Category cat = db.Category.First(p => p.Name == "It");
            //inst.Category = cat;
            //db.Instruction.Add(inst);
            //db.SaveChanges();
            return PartialView(); 
        } 

        public IActionResult InstructionBlockComponent() => PartialView();
    }
}
