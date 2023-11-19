using Backend.Models;

namespace Backend.Interfaces
{
    public interface IUserRepository
    {
        public ICollection<User>? GetUsers();
        public User? GetUserById(int id);
        public bool UserExists(int id);
        public bool CreateUser(User user);
        public bool UpdateUser(User user);
        public bool DeleteUser(User user);
        public ICollection<Category> GetCategories(int userId);
        public User? GetUserByEmail(string email);
        public bool Save();
    }
}