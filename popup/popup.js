import { getTopic, getHotPosts, getAllPosts } from "../98api/api.js";

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
