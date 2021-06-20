using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ConventionApi.Model;

namespace ConventionApi.Data
{
    public class ConventionApiContext : DbContext
    {
        public ConventionApiContext (DbContextOptions<ConventionApiContext> options)
            : base(options)
        {
        }

        public DbSet<ConventionApi.Model.Convention> Convention { get; set; }

        public DbSet<ConventionApi.Model.Registration> Registration { get; set; }

        public DbSet<ConventionApi.Model.Talk> Talk { get; set; }
    }
}
