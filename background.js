const checkURL = (url) => {
  if (url.startsWith("https://www.google.com")) {
    chrome.action.enable();
  } else {
    chrome.action.disable();
  }
};

chrome.tabs.onActivated.addListener(async function () {
  const res = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = res[0].url;
  checkURL(url);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const url = tab.url;
    checkURL(url);
  }
});

// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/mv2-archive/api/pageAction/pageaction_by_url/background.js
/*
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: "github" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
*/
