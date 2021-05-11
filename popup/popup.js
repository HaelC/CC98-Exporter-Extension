import { TOPIC_URL, hotPostsURL, allPostsURL } from "../98api/api.js";

function constructOptions() {
  chrome.storage.sync.get(["pseudonym", "fileFormat", "range"], (data) => {
    const { pseudonym, fileFormat, range } = data;
    document.getElementById("pseudonym").checked = pseudonym ? pseudonym : true;
    document.getElementById(fileFormat ? fileFormat : "html").checked = true;
    document.getElementById("range").value = range ? range : "all";
  });
}

constructOptions();

const topic = {};
let topicId;

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = res[0].url;
  topicId = url.split("/")[4];
  topic.id = topicId;
  topic.posts = [];

  await getTopic(topic);
  await getHotPosts(topic);
  await getAllPosts(topic);
  // Promise.all() to run async functions in parallel.
  console.log(topic);
});

async function getTopic(topic) {
  const response = await fetch(`${TOPIC_URL}/${topicId}`);
  if (response.status === 200) {
    const result = await response.json();
    const { hitCount, replyCount, title, time } = result;
    // console.log(hitCount, replyCount, title, time);
    topic.hitCount = hitCount;
    topic.replyCount = replyCount;
    topic.title = title;
    topic.time = time;
  }
}

async function getHotPosts(topic) {
  const response = await fetch(hotPostsURL(topicId));
  if (response.status === 200) {
    const result = await response.json();
    // console.log(result);
    topic.hotPosts = result;
  }
}

async function getAllPosts(topic) {
  let start = 0;
  while (true) {
    const response = await fetch(allPostsURL(topicId, start));
    if (response.status === 200) {
      const result = await response.json();
      // console.log(result);
      if (result.length === 0) {
        return;
      }
      topic.posts = topic.posts.concat(result);
      start += 10;
    }
  }
}
