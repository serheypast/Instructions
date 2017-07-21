using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.Extensions.FileProviders;
using A2SPA.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace A2SPA
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<ApplicationContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<User, IdentityRole>(opts =>
            {
                opts.User.AllowedUserNameCharacters = null;
            }).AddEntityFrameworkStores<ApplicationContext>();
            // Add framework services.
            services.AddMvc(options =>
            {
                options.SslPort = 44358;
                options.Filters.Add(new RequireHttpsAttribute());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules")),
                RequestPath = "/node_modules"
            });


            app.UseIdentity();

            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = "295941230814904", //use the exact AppId
                AppSecret = "a0108464919aa45050ca38361d215264" //Use the exact AppSecret
            });


            app.UseTwitterAuthentication(new TwitterOptions()
            {
                ConsumerKey = "bZxk9Lysya55kQeYoVuqt1CiB",
                ConsumerSecret = "YHvt7mHy83paaIvBxsRuFBhuQbb57tc81BrtzF9JzxaNMySw6o"
            });

            app.UseVkontakteAuthentication(new AspNetCore.Security.OAuth.Vkontakte.VkontakteAuthenticationOptions()
            {

                ClientId = "6116750",
                ClientSecret = "vKvld7sjOD63WMW78qzH",

            });

            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = "302541995228-fhtrtbuvfm8o9okqc4j4m7qkthfd4ld3.apps.googleusercontent.com",
                ClientSecret = "QwDkAnKiXWak2he_EN8M5IiE"
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                // in case multiple SPAs required.
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "home", action = "index" });
            });
        }
    }
}
