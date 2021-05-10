const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pseudonym = form.elements["pseudonym"].checked;
  const fileFormat = form.elements["file-format"].value;
  const range = form.elements["range"].value;
  storeSettings(pseudonym, fileFormat, range);
});

function storeSettings(pseudonym, fileFormat, range) {
  chrome.storage.sync.set({
    pseudonym,
    fileFormat,
    range,
  });
}

function constructOptions() {
  chrome.storage.sync.get(["pseudonym", "fileFormat", "range"], (data) => {
    const { pseudonym, fileFormat, range } = data;
    document.getElementById("pseudonym").checked = pseudonym ? pseudonym : true;
    document.getElementById(fileFormat ? fileFormat : "html").checked = true;
    document.getElementById("range").value = range ? range : "all";
  });
}

constructOptions();
