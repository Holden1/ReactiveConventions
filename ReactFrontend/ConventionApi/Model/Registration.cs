using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConventionApi.Model
{
    public class Registration
    {
        public int Id { get; set; }
        public virtual Talk Talk { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }
        public string PhoneNumer { get; set; }

    }
}
