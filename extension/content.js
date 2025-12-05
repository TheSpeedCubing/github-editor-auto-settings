function applySettings(settings) {
    const indentModeSelect = document.querySelector('select[aria-label="Indent mode"]');
    if (indentModeSelect && settings.indentMode) {
        indentModeSelect.value = settings.indentMode;
        indentModeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const indentSizeSelect = document.querySelector('select[aria-label="Indent size"]');
    if (indentSizeSelect && settings.indentSize) {
        indentSizeSelect.value = settings.indentSize;
        indentSizeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const lineWrapSelect = document.querySelector('select[aria-label="Line wrap mode"]');
    if (lineWrapSelect && settings.lineWrap) {
        lineWrapSelect.value = settings.lineWrap;
        lineWrapSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

const interval = setInterval(() => {
    const indentModeSelect = document.querySelector('select[aria-label="Indent mode"]');
    if (indentModeSelect) {
        clearInterval(interval);
        chrome.storage.sync.get(['indentMode', 'indentSize', 'lineWrap'], applySettings);
    }
}, 500);
