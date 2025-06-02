// cronJob.js
const cron = require('node-cron');
const userService = require('./userService');

const startUserCountLogger = () => {
  cron.schedule('* * * * *', () => {
    const count = userService.getUserCount();
    console.log(`[${new Date().toLocaleString()}] Total users: ${count}`);
  });
};

module.exports = { startUserCountLogger };
