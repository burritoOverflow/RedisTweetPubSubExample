const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { RedisClient } = require("./redisClient");

const port = process.env.WEB_SERVER_PORT;
let redisSubscriberClient, redisClient;

async function createRedisSubscriber() {
  const redisClient = new RedisClient().createClient();
  await redisClient.connect();
  const subscriber = redisClient.duplicate();
  await subscriber.connect();
  return { subscriber, redisClient };
}

app.use(express.static(`${__dirname}/client`));

app.get("/tweets/:tweetid", async (req, res) => {
  const tweetid = req.params.tweetid;
  console.info(`Request for ${tweetid}`);
  const tweetRes = await redisClient.get(tweetid);
  const tweet = JSON.parse(tweetRes);
  res.send({ tweet });
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, async () => {
  const redisClientsObj = await createRedisSubscriber();
  redisSubscriberClient = redisClientsObj["subscriber"];
  redisClient = redisClientsObj["redisClient"];

  await redisSubscriberClient.subscribe("tweets", (tweet) => {
    const _tweet = JSON.parse(tweet);
    console.log({ _tweet });
    // for all connected clients
    io.emit("tweet", { tweet: _tweet });
  });

  console.log(`listening on *:${port}`);
});
