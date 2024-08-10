chrome.storage.local.get(['state'], (result) => {
    const state = result.state || 'stopped';

    if (state === 'started') {
        const hideButton = () => {
            const button = document.querySelector('button[class*="IconButton-module__button"][class*="ControllerIndicatorButton-module__hideButtonSmallPortrait"]');
            if (button) {
                button.style.display = 'none';
            }
        };

        hideButton();

        const observer = new MutationObserver(hideButton);
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

function simulateSpaceBarPress() {
    const event = new KeyboardEvent("keydown", {
        key: " ",
        code: "Space",
        keyCode: 32,
        which: 32,
        bubbles: true
    });
    document.dispatchEvent(event);

    const eventUp = new KeyboardEvent("keyup", {
        key: " ",
        code: "Space",
        keyCode: 32,
        which: 32,
        bubbles: true
    });
    document.dispatchEvent(eventUp);
}

function simulateSpaceBarAction() {
    window.scrollBy(0, window.innerHeight);
}

simulateSpaceBarPress();
simulateSpaceBarAction();