using AuthAPI.Context;
using AuthAPI.Helpers;
using AuthAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

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

            //if(PasswordHasher.VerifyPassword(userObj.Password, user.Password)) 
            //{
            //    return BadRequest(new { Message = "Password is incorrect!" });
            //}

            user.Token = CreateJWT(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success!"
            }); 
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj==null)
            {
                return BadRequest();
            }

            //var pass = CheckPasswordStrength(userObj.Password);
            //if (!string.IsNullOrEmpty(pass))
            //{
            //    return BadRequest(new { Message = pass.ToString() });
            //}

            await _db.Users.AddAsync(userObj);
            userObj.Role = "Customer";
            await _db.SaveChangesAsync();
            return Ok(new { Message = "Details have been sent to the bank!" });
        }

        //private string CheckPasswordStrength(string password)
        //{
        //    StringBuilder sb = new StringBuilder();
        //    if(password.Length < 8)
        //    {
        //        sb.Append("Minimum password length should be 8" + Environment.NewLine);
        //    }

        //    if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
        //    {
        //        sb.Append("Password should be Alphanumeric" + Environment.NewLine);
        //    }

        //    if (!(Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]")))
        //    {0
        //        sb.Append("Password should contain special character" + Environment.NewLine);
        //    }
        //    return sb.ToString();
        //}

        private string CreateJWT(User userObj)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("privatebankcorporation");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, userObj.Role),
                new Claim(ClaimTypes.Name, $"{userObj.FullName}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                //Expires = DateTime.Now.AddMinutes(5),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = credentials
            };
            var token = jwtHandler.CreateToken(tokenDescriptor);
            return jwtHandler.WriteToken(token);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _db.Users.ToListAsync());
        }
    }
}
