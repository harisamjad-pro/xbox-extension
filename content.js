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
