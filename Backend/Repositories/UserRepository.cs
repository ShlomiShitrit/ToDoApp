using Backend.Interfaces;
using Backend.Models;
using Backend.Data;

namespace Backend.Repositories
{
    public class UserRepository(DataContext context) : IUserRepository
    {
        private readonly DataContext _context = context;
        public bool CreateUser(User user)
        {
            _context.Add(user);

            return Save();
        }

        public bool DeleteUser(User user)
        {
            throw new NotImplementedException();
        }

        public ICollection<Category> GetCategories(int userId)
        {
            return _context.Categories.Where(c => c.UserId == userId).OrderBy(c => c.Id).ToList();
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users.Where(u => u.Email == email).FirstOrDefault();
        }

        public User? GetUserById(int id)
        {
            return _context.Users.Where(u => u.Id == id).FirstOrDefault();
        }

        public ICollection<User>? GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();

            return saved > 0;
        }

        public bool UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }
    }
}