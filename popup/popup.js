function constructOptions() {
  chrome.storage.sync.get(["pseudonym", "fileFormat", "range"], (data) => {
    const { pseudonym, fileFormat, range } = data;
    document.getElementById("pseudonym").checked = pseudonym ? pseudonym : true;
    document.getElementById(fileFormat ? fileFormat : "html").checked = true;
    document.getElementById("range").value = range ? range : "all";
  });
}

constructOptions();
