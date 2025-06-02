// index.js
const cron = require('node-cron');
const axios = require('axios');

const SERVER_A_HEALTH_URL = 'https://graphql-tutorial-sbmo.onrender.com/health';

const checkHealth = async () => {
    try {
        const response = await axios.get(SERVER_A_HEALTH_URL);
        const { status, uptime, timestamp } = response.data;

        if (status === 'OK') {
            console.log(`[${new Date().toLocaleString()}] ✅ Server A is healthy. Uptime: ${Math.floor(uptime)}s`);
        } else {
            console.warn(`[${new Date().toLocaleString()}] ⚠️ Server A reported unhealthy status.`);
        }
    } catch (err) {
        console.error(`[${new Date().toLocaleString()}] ❌ Failed to reach Server A:`, err.message);
    }
};

// Cron job: every 5 minutes
cron.schedule('* * * * *', () => {
   checkHealth(); 
});

console.log('🟡 Health monitor started. Monitoring every 1 minutes...');
