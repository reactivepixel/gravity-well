// Mock user data
const mock_users = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", role: "Admin" },
  { id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "User" },
  { id: 3, name: "Bob Wilson", email: "bob.wilson@example.com", role: "User" },
];

let next_id = 4;

class User_Service {
  async get_users() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mock_users];
  }

  async add_user(user_data) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const new_user = {
      id: next_id++,
      ...user_data,
    };
    mock_users.push(new_user);
    return new_user;
  }

  async delete_user(user_id) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mock_users.findIndex((user) => user.id === user_id);
    if (index !== -1) {
      mock_users.splice(index, 1);
    }
  }
}

const user_service = new User_Service();
export default user_service;
