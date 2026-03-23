//using Rado.Dyntro.Server.Data.Entities;
//using Rado.Dyntro.Server.enums;

//namespace Rado.Dyntro.Server.Data.Seeder.UserSeeder
//{
//    public class UserSeeder
//    {
//        private readonly AppDbContext _appDbContext;

//        public UserSeeder(AppDbContext appDbContext)
//        {
//            _appDbContext = appDbContext;
//        }


//        public void Seed()
//        {
//            if (_appDbContext.Database.CanConnect())
//            {
//                if (_appDbContext.Users != null && !_appDbContext.Users.Any())
//                {
//                    InsertSampleData();
//                }
//            }
//        }


//        private void InsertSampleData()
//        {
//            var users = new List<Entities.User>
//            {
//                new Entities.User
//                {
//                    FirstName = "Mateusz",
//                    LastName = "Ostrowski",
//                    Email = "mateusz.ostrowski@dyntro.com",
//                    Role = "Admin"
                    
//                }
//            };
//            _appDbContext.AddRange(users);
//            _appDbContext.SaveChanges();
//        }
//    }
//}
