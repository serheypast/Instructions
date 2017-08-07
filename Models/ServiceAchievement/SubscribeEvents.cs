using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace A2SPA.Models
{
    public class SubscribeEvents
    {
        private static ApplicationContext db;


        public static void Subscribe(ApplicationContext _db)
        {
            db = _db;
            ServiceAchivment.GetInstance().Subscribe(Events.CreatePost, x => AchievementForCreateOneInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.CreatePost, x => AchievementForCreateFiveInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.LikePost, x => AchievementForManyLikeOnInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.LikePost, x => AchievementForFiveLikeOnInstruction((int)x));
            ServiceAchivment.GetInstance().Subscribe(Events.CommentPost, x => AchievementForFiveCommendOnInstruction((int)x));
        }

        private static void AddAchivment(int idAchievement, UserProfile userProfile)
        {
            AchivmentUser achiv = new AchivmentUser();
            Achivment achivment = db.Achivment.FirstOrDefault(p => p.Id == idAchievement);
            achiv.Achivment = achivment;
            if (userProfile.Achivments.Any(x => x.Achivment.Id == idAchievement))
                return;
            userProfile.Achivments.Add(achiv);
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

        private static UserProfile GetUserById(int idUser)
        {
            UserProfile userProfile = db.UserProfile.Include(p => p.Achivments).ThenInclude(p => p.Achivment).FirstOrDefault(p => p.Id == idUser);
            return userProfile;
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



        private static void AchievementForFiveLikeOnInstruction(int idUser)
        {
            // поставь с большой
            const int forLike = 5;
            const int idAchievement = 4;
            UserProfile userProfile = GetUserById(idUser);
            if (userProfile.Rating == forLike)
            {
                AddAchivment(idAchievement, userProfile);
            }
        }


        private static void AchievementForManyLikeOnInstruction(int idUser)
        {
            const int forLike = 10;
            const int idAchievement = 5;
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
            if (db.Commentary.Include(p => p.Instruction).ThenInclude(p => p.UserProfile).Where(p => p.Instruction.UserProfile.Id == idUser).LongCount() == forCommend)
            {
                AddAchivment(idAchievement, userProfile);
            }
        }
    }
}
