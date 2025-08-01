const {createClient} = require("redis")

const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

(async ()=>{
    try {
        await redisClient.connect();
        console.log("redis server connected successfully")
    } catch (error) {
        console.log(error.messasge);
    }
})()

module.exports = redisClient