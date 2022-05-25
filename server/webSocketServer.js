const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { RedisClient } = require("./redisClient");

const port = process.env.WEB_SERVER_PORT;
let redisSubscriberClient;

async function createRedisSubscriber() {
  const redisClient = new RedisClient().createClient();
  await redisClient.connect();
  const subscriber = redisClient.duplicate();
  await subscriber.connect();
  return subscriber;
}

app.use(express.static(`${__dirname}/client`));

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, async () => {
  redisSubscriberClient = await createRedisSubscriber();

  await redisSubscriberClient.subscribe("tweets", (tweet) => {
    const _tweet = JSON.parse(tweet);
    console.log({ _tweet });
    // for all connected clients
    io.emit("tweet", { tweet: _tweet });
  });

  console.log(`listening on *:${port}`);
});
