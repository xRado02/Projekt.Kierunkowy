using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rado.Dyntro.Server.Data;
using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Enums;
using Rado.Dyntro.Server.Models;
using System.Security.Claims;

namespace Rado.Dyntro.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;

        public OrderController(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<OrderViewModel>> Get()
        {
            try
            {
                var userId = GetCurrentUserId();
                var orders = _appDbContext.Orders
                    .Include(o => o.User)
                    .Where(o => o.UserId == userId || o.ReceiverId == userId)
                    .OrderByDescending(o => o.Id)
                    .ToList();

                var result = _mapper.Map<List<OrderViewModel>>(orders, opt => opt.Items["CurrentUserId"] = userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd: {ex.Message}");
                return StatusCode(500, "Wystąpił błąd serwera");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<OrderDetailsViewModel> GetOrderDetails(Guid id)
        {
            var userId = GetCurrentUserId();        
            var order = _appDbContext.Orders
                .Include(o => o.User)
                .Include(o => o.Receiver) 
                .FirstOrDefault(o => o.Id == id && (o.UserId == userId || o.ReceiverId == userId)); 

            if (order == null)
                return NotFound("Nie znaleziono zlecenia.");

            
            var result = _mapper.Map<OrderDetailsViewModel>(order, opt => opt.Items["CurrentUserId"] = userId);
            return Ok(result);
        }


        [HttpGet("page")]
        public ActionResult<PagedResult<OrderViewModel>> GetOrdersFromPage([FromQuery] int pageNumber = 1)
        {
            var userId = GetCurrentUserId();
            var pageSize = 11;

            var query = _appDbContext.Orders
                .Include(o => o.User)
                .Where(o => o.UserId == userId || o.ReceiverId == userId);


            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var orders = query
                .OrderByDescending(o => o.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new PagedResult<OrderViewModel>
            {
                Items = _mapper.Map<List<OrderViewModel>>(orders, opt => opt.Items["CurrentUserId"] = userId),
                TotalCount = totalCount,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = totalPages
            };

            return Ok(result);
        }

        [HttpGet("orderFilteredBy")]
        public ActionResult<PagedResult<OrderViewModel>> GetFilteredBy([FromQuery] OrderQueryParams queryParams, [FromQuery] int pageNumber = 1)
        {
            var userId = GetCurrentUserId();
            var pageSize = 11;

            var query = _appDbContext.Orders
                .Include(o => o.User)
                .Where(o => o.UserId == userId || o.ReceiverId == userId);


            if (queryParams.searchByStatus.HasValue)
                query = query.Where(o => o.Status == queryParams.searchByStatus);

            if (queryParams.searchByCategory.HasValue)
                query = query.Where(o => o.Category == queryParams.searchByCategory);

            if (queryParams.searchByPriority.HasValue)
                query = query.Where(o => o.Priority == queryParams.searchByPriority);

            if (!string.IsNullOrEmpty(queryParams.searchByUser))
                query = query.Where(o => o.FirstName.StartsWith(queryParams.searchByUser) || o.LastName.StartsWith(queryParams.searchByUser));

            if (queryParams.sortByElement.HasValue && queryParams.sortByDirection.HasValue)
            {
                query = queryParams.sortByElement == SortByElement.Data
                    ? queryParams.sortByDirection == SortByDirection.Ascending ? query.OrderBy(o => o.Date) : query.OrderByDescending(o => o.Date)
                    : queryParams.sortByDirection == SortByDirection.Ascending ? query.OrderBy(o => o.Id) : query.OrderByDescending(o => o.Id);
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var orders = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new PagedResult<OrderViewModel>
            {
                Items = _mapper.Map<List<OrderViewModel>>(orders, opt => opt.Items["CurrentUserId"] = userId),
                TotalCount = totalCount,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = totalPages
            };

            return Ok(result);
        }

        [HttpPost]
        public ActionResult Post([FromBody] OrderViewModel model)
        {
            var userId = GetCurrentUserId();

            var order = _mapper.Map<Order>(model);
            order.Date = DateTime.Now;
            order.UserId = userId;

            if (model.ReceiverId != Guid.Empty)
            {
                var receiver = _appDbContext.Users.FirstOrDefault(u => u.Id == model.ReceiverId);
                if (receiver == null)
                    return BadRequest("Nie znaleziono użytkownika o podanym ID.");

                
            }

            _appDbContext.Orders.Add(order);
            _appDbContext.SaveChanges();

            return Created("api/order/" + order.Id, null);
        }

        [HttpDelete("delete")]
        public ActionResult Delete([FromBody] List<Guid> ids)
        {
            var userId = GetCurrentUserId();
            var ordersToDelete = _appDbContext.Orders.Where(o => ids.Contains(o.Id) && o.UserId == userId).ToList();

            _appDbContext.Orders.RemoveRange(ordersToDelete);
            _appDbContext.SaveChanges();

            return NoContent();
        }


    

        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return Guid.Parse(userIdClaim!.Value);
        }
    }
}
