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

      
            SubscribeEvent();
            
            
            
            host.Run();
        }

        private static void SubscribeEvent()
        {
            ServiceAchivment.GetInstance().Subscribe(Events.CreatePost, x => AchievementForCreateOneInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.CreatePost, x => AchievementForCreateFiveInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.LikePost, x => AchievementForManyLikeOnInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.LikePost, x => AchievementForTenLikeOnInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.CommentPost, x => AchievementForFiveCommendOnInstruction((int)x));
        }

        private static void AddAchivment(int idAchievement, UserProfile userProfile)
        {
            AchivmentUser achiv = new AchivmentUser();
            Achivment achivment = db.Achivment.FirstOrDefault(p => p.Id == idAchievement);
            achiv.Achivment = achivment;
            userProfile.Achivments.Add(achiv);
            db.Update(userProfile);
            db.SaveChanges();
        }

        private static void AchievementForCreateOneInstruction(int idUser)
        {
            const int forInstruction = 1;
            const int idAchievement = 1;
            UserProfile userProfile = GetUserById(idUser);
            if (db.Instruction.Include(p => p.UserProfile).Where(p => p.UserProfile == userProfile).LongCount() == forInstruction)
            {
                AddAchivment(idAchievement, userProfile);
            }
        }

        private static UserProfile GetUserById(int idUser) { 
            return db.UserProfile.AsNoTracking().Include(p => p.Achivments).FirstOrDefault(p => p.Id == idUser);
        }

        private static void AchievementForCreateFiveInstruction(int idUser)
        {
            const int forInstruction = 5;
            const int idAchievement = 2;
            UserProfile userProfile = GetUserById(idUser);
            if (db.Instruction.Include(p => p.UserProfile).Where(p => p.UserProfile == userProfile).LongCount() == forInstruction)
            {
                AddAchivment(idAchievement, userProfile);
            }
        }

      

        private static void AchievementForTenLikeOnInstruction(int idUser)
        {
            const int forLike = 10;
            const int idAchievement = 4;
            UserProfile userProfile = GetUserById(idUser);
            if (userProfile.Rating == forLike)
            {
                AddAchivment(idAchievement, userProfile);
            }
        }


        private static void AchievementForManyLikeOnInstruction(int idUser)
        {
            const int forLike = 100;
            const int idAchievement = 5     ;
            UserProfile userProfile = GetUserById(idUser);
            if (userProfile.Rating == forLike)
            {
                AddAchivment(idAchievement, userProfile);
            }
        }


        private static void AchievementForFiveCommendOnInstruction(int idUser)
        {
            const int forCommend = 5;
            const int idAchievement = 3;
            UserProfile userProfile = GetUserById(idUser);
            if (db.Commentary.Include(p => p.UserProfile).Where(p => p.UserProfile == userProfile).LongCount() == forCommend)
            {
                AddAchivment(idAchievement, userProfile);
            }
        }
        
        public static void setDbContext(ApplicationContext db)
        {
            db = Startup.db;
        }
    }
}
