import { getTopic, getHotPosts, getAllPosts, anonymize } from "../api/98api.js";
import { writeToFile } from "../api/export.js";

function constructOptions() {
  chrome.storage.sync.get(["pseudonym", "fileFormat", "range"], (data) => {
    const { pseudonym, fileFormat, range } = data;
    document.getElementById("pseudonym").checked = pseudonym ? pseudonym : true;
    document.getElementById(fileFormat ? fileFormat : "json").checked = true;
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

  const filename = form.elements["filename"].value;
  const usePseudonym = form.elements["pseudonym"].checked;
  const fileFormat = form.elements["file-format"].value;
  const range = form.elements["range"].value;

  await getTopic(topic);
  await getHotPosts(topic);
  await getAllPosts(topic);
  // Promise.all() to run async functions in parallel.

  if (usePseudonym) {
    anonymize(topic);
  }

  writeToFile(filename, fileFormat, topic);
});
