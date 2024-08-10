document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("#start");
    const stopButton = document.querySelector("#stop");

    const updateButtonVisibility = (state) => {
        if (state === "started") {
            startButton.style.display = "none";
            stopButton.style.display = "block";
        } else {
            startButton.style.display = "block";
            stopButton.style.display = "none";
        }
    };

    chrome.storage.local.get("state", (result) => {
        const state = result.state || "stopped";
        updateButtonVisibility(state);
    });

    startButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "start" });
        chrome.storage.local.set({ state: "started" });
        updateButtonVisibility("started");
    });

    stopButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "stop" });
        chrome.storage.local.set({ state: "stopped" });
        updateButtonVisibility("stopped");
    });
});
