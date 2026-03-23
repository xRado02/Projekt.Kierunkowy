using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rado.Dyntro.Server.Models;
using System.Security.Claims;

namespace Rado.Dyntro.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AccountDetailsController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;

        public AccountDetailsController(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<UserViewModel> Get()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = Guid.Parse(userIdClaim.Value);
            var userDetails = _appDbContext.Users.FirstOrDefault(u => u.Id == userId);
            var result = _mapper.Map<UserViewModel>(userDetails);
            return Ok(result);
        }

    }
}
