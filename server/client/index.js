const socket = io();
const tweetsArr = new Array();

updateTweetCounterStr = (newCount) => {
  return `Total Tweets Received: ${newCount}`;
};

socket.on("tweet", function (tweet) {
  const li = document.createElement("li");
  const tweetData = tweet.tweet.data;
  tweetsArr.push(tweetData);

  const tweetIdPElem = document.createElement("p");
  tweetIdPElem.innerText = `Tweet ID: ${tweetData.id}`;

  const tweetTextPElem = document.createElement("p");
  tweetTextPElem.innerText = `${tweetData.text}`;

  const authorIdPElem = document.createElement("p");
  authorIdPElem.innerText = `Author ID: ${tweetData.author_id}`;

  const createdAtPElem = document.createElement("p");
  createdAtPElem.innerText = `Created at: ${tweetData.created_at}`;

  li.appendChild(tweetIdPElem);
  li.appendChild(createdAtPElem);
  li.appendChild(authorIdPElem);
  li.appendChild(tweetTextPElem);

  const mainList = document.getElementById("tweet-stream");
  mainList.appendChild(li);

  document.getElementById("tweet-counter").innerText = updateTweetCounterStr(
    tweetsArr.length
  );
});
