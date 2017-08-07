using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace A2SPA.Models
{
    public class ServiceAchivment
    {
        private static readonly ServiceAchivment instance = new ServiceAchivment();

        private ServiceAchivment()
        {
         
        }

        public static ServiceAchivment GetInstance()
        {
            return instance;
        }

        private Dictionary<Events, Action<object>> hash = new Dictionary<Events, Action<object>>();
        public void Subscribe(Events type, Action<object> subber)
        {
            if (hash.Keys.Contains(type))
            {
                hash[type] += subber;
            }
            else
            {
                hash[type] = subber;
            }
        }

        public void WasAction(Events type, object data = null)
        {
            if (hash.Keys.Contains(type))
            {
                if (hash[type] != null)
                {
                    hash[type](data);
                }
            }
              
        }


      
    }
}
