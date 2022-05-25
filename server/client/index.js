const socket = io();
let totalTweets = 0;

updateTweetCounterStr = (newCount) => {
  return `Total Tweets Received: ${newCount}`;
};

socket.on("tweet", function (tweet) {
  const li = document.createElement("li");
  const tweetData = tweet.tweet.data;

  const p0 = document.createElement("p");
  p0.innerText = `Tweet ID: ${tweetData.id}`;

  const p1 = document.createElement("p");
  p1.innerText = `${tweetData.text}`;

  li.appendChild(p0);
  li.appendChild(p1);

  const mainList = document.getElementById("tweet-stream");
  mainList.appendChild(li);

  document.getElementById("tweet-counter").innerText = updateTweetCounterStr(
    ++totalTweets
  );
});
