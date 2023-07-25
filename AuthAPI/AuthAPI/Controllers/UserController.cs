using AuthAPI.Context;
using AuthAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDBContext _db;
        public UserController(AppDBContext db)
        {
            _db = db;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            var user = await _db.Users.FirstOrDefaultAsync(u=>u.CustID == userObj.CustID && u.Password == userObj.Password);
            if(user == null)
            {
                return NotFound(new {Message = "User not found!"});
            }
            return Ok(new {Message = "Login Success!"});
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj==null)
            {
                return BadRequest();
            }
            await _db.Users.AddAsync(userObj);
            await _db.SaveChangesAsync();
            return Ok(new { Message = "Details have been sent to the bank!" });
        }
    }
}
