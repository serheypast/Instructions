using A2SPA.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;

namespace A2SPA
{
    public class Program
    {
        private static ApplicationContext db;

        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();

            host.Run();
        }

        public static void SetDbContext(ApplicationContext _db)
        {
            SubscribeEvents.Subscribe(_db);
        }
    }
}
