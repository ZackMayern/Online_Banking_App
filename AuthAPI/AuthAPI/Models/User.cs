using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Numerics;

namespace AuthAPI.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string AadharNumber { get; set; }
        public string PanNumber { get; set; }
        public string CustID { get; set; }
        public string AccountNumber { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public string Balance { get; set; }

    }
}
