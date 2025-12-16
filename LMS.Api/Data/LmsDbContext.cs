using Microsoft.EntityFrameworkCore;
using LMS.Api.Models;

namespace LMS.Api.Data
{
    public class LmsDbContext : DbContext
    {
        public LmsDbContext(DbContextOptions<LmsDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}

