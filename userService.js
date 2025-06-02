// userService.js
const users = [];

module.exports = {
  addUser: (user) => {
    users.push(user);
  },
  getUsers: () => users,
  updateUser: (id, updatedData) => {
    const user = users.findIndex(u => u.id === id);
    if( user !== -1){
        users[user] = { ...users[user], ...updatedData};
    }
    return users[user] || null;
  },
  deleteUser: (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) users.splice(index, 1);
  },
  getUserCount: () => users.length
};
