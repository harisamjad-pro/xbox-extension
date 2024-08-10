let intervalId;
let currentTabId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        if (!intervalId) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    currentTabId = tabs[0].id;

                    intervalId = setInterval(() => {
                        chrome.scripting.executeScript({
                            target: { tabId: currentTabId },
                            files: ["content.js"]
                        });
                    }, 90000);

                    chrome.storage.local.set({ state: 'started', tabId: currentTabId });
                    chrome.scripting.executeScript({
                        target: { tabId: currentTabId },
                        func: () => {
                            const button = document.querySelector('button[class*="IconButton-module__button"][class*="ControllerIndicatorButton-module__hideButtonSmallPortrait"]');
                            if (button) {
                                button.style.display = 'none';
                                console.log("Button hidden");
                            } else {
                                console.log("Button not found");
                            }
                        }
                    });
                }
            });
        }
    } else if (request.action === "stop") {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;

            chrome.storage.local.set({ state: 'stopped', tabId: currentTabId });
            chrome.scripting.executeScript({
                target: { tabId: currentTabId },
                func: () => {
                    const button = document.querySelector('button[class*="IconButton-module__button"][class*="ControllerIndicatorButton-module__hideButtonSmallPortrait"]');
                    if (button) {
                        button.style.display = '';
                        console.log("Button shown");
                    } else {
                        console.log("Button not found");
                    }
                }
            });
        }
    }
});
