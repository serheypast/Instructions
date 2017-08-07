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
            AchivmentUser achivmentUser = new AchivmentUser();
            Achivment achivment = db.Achivment.FirstOrDefault(p => p.Id == idAchievement);
            achivmentUser.Achivment = achivment;
            if (userProfile.Achivments.Any(x => x.Achivment.Id == idAchievement))
                return;
            userProfile.Achivments.Add(achivmentUser);
            db.SaveChanges();
        }

        private static UserProfile GetUserById(int idUser)
        {
            UserProfile userProfile = db.UserProfile.Include(p => p.Achivments).ThenInclude(p => p.Achivment).FirstOrDefault(p => p.Id == idUser);
            return userProfile;
        }

        private static void AchievementForCreateOneInstruction(int idUser)
        {
            const int FULFILLMENT_CONDITION = 1;
            const int ID_ACHIEVEMENT = 1;
            UserProfile userProfile = GetUserById(idUser);
            if (db.Instruction.Include(p => p.UserProfile).Where(p => p.UserProfile == userProfile).LongCount() == FULFILLMENT_CONDITION)
            {
                AddAchivment(ID_ACHIEVEMENT, userProfile);
            }
        }

        private static void AchievementForCreateFiveInstruction(int idUser)
        {
            const int FULFILLMENT_CONDITION = 5;
            const int ID_ACHIEVEMENT = 2;
            UserProfile userProfile = GetUserById(idUser);
            if (db.Instruction.Include(p => p.UserProfile).Where(p => p.UserProfile == userProfile).LongCount() == FULFILLMENT_CONDITION)
            {
                AddAchivment(ID_ACHIEVEMENT, userProfile);
            }
        }

        private static void AchievementForFiveLikeOnInstruction(int idUser)
        {
            const int FULFILLMENT_CONDITION = 5;
            const int ID_ACHIEVEMENT = 4;
            UserProfile userProfile = GetUserById(idUser);
            if (userProfile.Rating == FULFILLMENT_CONDITION)
            {
                AddAchivment(ID_ACHIEVEMENT, userProfile);
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
