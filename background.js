let intervalId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        if (!intervalId) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    const tabId = tabs[0].id;
                    intervalId = setInterval(() => {
                        chrome.scripting.executeScript({
                            target: { tabId: tabId },
                            files: ["content.js"]
                        });
                    }, 5000);
                }
            });
        }
    } else if (request.action === "stop") {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
});
