using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ConventionApi.Model
{
    public class Talk
    {
        public int Id { get; set; }
        [Required]
        public int ConventionId { get; set; }

        [ForeignKey("ConventionId")]
        public virtual Convention Convention { get; set; }
        public string Name { get; set; }

        public string Topic { get; set; }


    }
}
