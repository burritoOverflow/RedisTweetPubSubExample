The simplest example of Redis Pub-Sub in conjunction with SocketIO to allow clients to view live filtered Tweets via Twitters Streaming endpoint.

You'll need:

- a running Redis instance
- a Twitter bearer token (sign up for a Twitter developer account)

Set up a `.env` file at project root as so:

```
TWITTER_BEARER_TOKEN=<your-token>
REDIS_HOSTNAME=<redis-hostname>
REDIS_PORT=<redis-port>
REDIS_USERNAME=<redis-username>
REDIS_PASSWORD=<redis-password>
WEB_SERVER_PORT=<port-for-web-server>
```

If running in conjuction with a local Redis instance, you may omit `REDIS_USERNAME` and `REDIS_PASSWORD`.

Install dependencies

```
npm i
```

Start the publisher process, responsible for connecting to the filtered Twitter stream and publishing Tweets to redis on the `tweets` channel:

```
node server/redisPublisher.js
```

Start the web server, that serves the a single HTML file along with the client JS for connecting to this same server's websocket server.

```
 node server/webSocketServer.js
```

The websocket server subscibes to the same Redis instance and channel as above, and, on addition of a tweet to the `tweets` channel, sends the tweet to all connected clients.

Visit the `WEB_SERVER_PORT`.

The code for interacting with Twitters streaming endpoint is entirely adapted from [here](https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Filtered-Stream/filtered_stream.js)

The SocketIO code is liberally borrowed from [here](https://socket.io/get-started/chat)
