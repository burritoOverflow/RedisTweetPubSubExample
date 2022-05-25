require("dotenv").config();
const redis = require("redis");

class RedisClient {
  #client;

  constructor() {
    if (!this.client) {
      this.client = this.createClient();
    }
  }

  createClient() {
    // redis[s]://[[username][:password]@][host][:port][/db-number]
    let redisUrl = new String();
    if (process.env.IS_PRODUCTION) {
      redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`;
    } else {
      // for local development
      redisUrl = `redis://${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`;
    }
    const client = redis.createClient({
      url: redisUrl,
    });

    client.on("error", (err) => {
      console.log("Error connecting to Redis" + err);
      throw new Error(err);
    });

    return client;
  }
}

module.exports = { RedisClient };
