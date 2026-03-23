//using Rado.Dyntro.Server.Data.Entities;
//using Rado.Dyntro.Server.Data;
//using Rado.Dyntro.Server.Enums;

//namespace Rado.Dyntro.Server.Data.Seeder.OrderSeeder

//{
//    public class OrderSeeder
//    {
//        private readonly AppDbContext _appDbContext;
//        public OrderSeeder(AppDbContext appDbContext)
//        {
//            _appDbContext = appDbContext;
//        }


//        public void Seed()
//        {
//            if(_appDbContext.Database.CanConnect())
//            {
//                if (_appDbContext.Orders != null && !_appDbContext.Orders.Any())
//                {
//                    InsertSampleData();
//                }
//            }
//        }

//        private void InsertSampleData()
//        {
//          var orders = new List<Entities.Order>
//          {
//            new Entities.Order
//            {
//                Status = OrderStatus.InProgress,
//                Topic = "Nowa kampania newsletterowa",
//                FirstName = "Anna",
//                LastName = "Kowalska",
//                Category = OrderCategory.LinkedinCampaing,
//                Priority = OrderPriority.High,
//                Date = DateTime.UtcNow.AddDays(-3)
//            },
//            new Entities.Order
//            {
//                 Status = OrderStatus.Completed,
//                Topic = "Reklama na LinkedIn",
//                FirstName = "Michał",
//                LastName = "Nowak",
//                Category = OrderCategory.LinkedinAutomatization,
//                Priority = OrderPriority.Low,
//                Date = DateTime.UtcNow.AddDays(-10)
//            },
//            new Entities.Order
//            {
//                Status = OrderStatus.InProgress,
//                Topic = "Segmentacja odbiorców",
//                FirstName = "Katarzyna",
//                LastName = "Wiśniewska",
//                Category = OrderCategory.Other,
//                Priority = OrderPriority.Medium,
//                Date = DateTime.UtcNow.AddDays(-1)
//            },
//            new Entities.Order
//            {
//                Status = OrderStatus.Completed,
//                Topic = "Testy A/B reklam",
//                FirstName = "Tomasz",
//                LastName = "Dąbrowski",
//                Category = OrderCategory.LinkedinCampaing,
//                Priority = OrderPriority.High,
//                Date = DateTime.UtcNow.AddDays(-7)
//            },
//            new Entities.Order
//            {
//                Status = OrderStatus.InProgress,
//                Topic = "Analiza wyników kampanii",
//                FirstName = "Ewa",
//                LastName = "Lis",
//                Category = OrderCategory.Other,
//                Priority = OrderPriority.Medium,
//                Date = DateTime.UtcNow.AddDays(-5)
//            }
//          };

//            _appDbContext.AddRange(orders);
//            _appDbContext.SaveChanges();
//        }




//    }
//}
