using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Models;
using System.Security.Claims;

namespace Rado.Dyntro.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;

        public MessageController(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }


        [HttpGet("{orderId}")]
        public ActionResult<List<MessageViewModel>> GetMessages(Guid orderId)
        {
            var userId = GetCurrentUserId();

            var order = _appDbContext.Orders.FirstOrDefault(o => o.Id == orderId && (o.UserId == userId || o.ReceiverId == userId));
            if (order == null) return NotFound("Order not found or access denied.");
            
            var messages = _appDbContext.Messages
                .Where(m => m.OrderId == orderId)
                .OrderBy(m => m.SentAt)
                .ToList();
           
            return Ok(_mapper.Map<List<MessageViewModel>>(messages));
        }



        [HttpPost]
        public ActionResult<MessageViewModel> CreateMessage([FromBody] CreateMessageViewModel model)
        {
            var userId = GetCurrentUserId();

            var order = _appDbContext.Orders.FirstOrDefault(o => o.Id == model.OrderId && (o.UserId == userId || o.ReceiverId == userId));


            if (order == null)
            {
                return NotFound("Order not found or access denied.");
            }


            var receiverId = order.UserId == userId ? order.ReceiverId : order.UserId;
            if (!receiverId.HasValue)
                return BadRequest("Order does not have an assigned second participant.");

            var message = new Message
            {
                Id = Guid.NewGuid(),
                OrderId = order.Id,
                SenderId = userId,
                ReceiverId = receiverId.Value,
                Content = model.Content,
                SentAt = DateTime.Now
            };


            var result = _mapper.Map<MessageViewModel>(message);
            _appDbContext.Messages.Add(message);
            _appDbContext.SaveChanges();



            return Created($"api/messages/{message.Id}", result);

        }

        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return Guid.Parse(userIdClaim!.Value);
        }
    }
}
