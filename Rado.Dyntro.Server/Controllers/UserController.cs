using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rado.Dyntro.Server.Models;
using System.Linq;
using System.Security.Claims;


namespace Rado.Dyntro.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController: ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly UserService _userService;

        public UserController(AppDbContext appDbContext, IMapper mapper, UserService userService)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<UserViewModel>> Get()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                var loggedUserId = Guid.Parse(userIdClaim!.Value);

                IQueryable<Data.Entities.User> query = _appDbContext.Users;

                // Filtruj - zawsze wyklucz zalogowanego użytkownika
                query = query.Where(u => u.Id != loggedUserId)
                    .Distinct()  // DODAJ DISTINCT
                    .OrderByDescending(o => o.Id);

                var users = query.ToList();
                var result = _mapper.Map<List<UserViewModel>>(users);                
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd: {ex.Message}");
                return StatusCode(500, "Wystąpił błąd serwera");
            }
        }

        [HttpGet("userFilterBy")]
        public ActionResult<List<UserViewModel>> Get([FromQuery] UserQueryParams queryParams)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                var loggedUserId = Guid.Parse(userIdClaim!.Value);

                var query = _appDbContext.Users.AsQueryable();
           
              
                query = query.Where(u => u.Id != loggedUserId)
                    .Distinct();  

                if (!string.IsNullOrEmpty(queryParams.searchByUser))
                {
                    query = query.Where(u => u.FirstName.StartsWith(queryParams.searchByUser) || u.LastName.StartsWith(queryParams.searchByUser));
                }
                
                var users = query.ToList();
                var result = _mapper.Map<List<UserViewModel>>(users);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd: {ex.Message}");
                return StatusCode(500, "Wystąpił błąd serwera");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult Post([FromBody] UserViewModel model)
        {
            var user = _mapper.Map<Data.Entities.User>(model);       
            
            _userService.CreateUser(user);
            var result = _mapper.Map<UserViewModel>(user);
            var key = user.Id;            
            
            return Created("api/user/" + key, result);
        }

        [HttpDelete("delete-multiple")]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteMultiple([FromBody] List<Guid> ids)
        {       
            var usersToDelete = _appDbContext.Users.Where(u => ids.Contains(u.Id)).ToList();
            if (usersToDelete.Count == 0)
            {
                return NotFound();
            }
            _appDbContext.Users.RemoveRange(usersToDelete);
            _appDbContext.SaveChanges();
            return NoContent();
        }
    }
}
