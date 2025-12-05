function applySettings(settings) {
    const indentModeSelect = document.querySelector('select[aria-label="Indent mode"]');
    if (indentModeSelect && settings.indentMode && indentModeSelect.value !== settings.indentMode) {
        indentModeSelect.value = settings.indentMode;
        indentModeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const indentSizeSelect = document.querySelector('select[aria-label="Indent size"]');
    if (indentSizeSelect && settings.indentSize && indentSizeSelect.value !== settings.indentSize) {
        indentSizeSelect.value = settings.indentSize;
        indentSizeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const lineWrapSelect = document.querySelector('select[aria-label="Line wrap mode"]');
    if (lineWrapSelect && settings.lineWrap && lineWrapSelect.value !== settings.lineWrap) {
        lineWrapSelect.value = settings.lineWrap;
        lineWrapSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

function loadAndApply() {
    chrome.storage.sync.get(['indentMode', 'indentSize', 'lineWrap'], applySettings);
}

loadAndApply();

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') 
		return;
    loadAndApply();
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.type === 'APPLY_SETTINGS_NOW') {
        loadAndApply();
        sendResponse({ ok: true });
    }
});

let applyTimer = null;
const observer = new MutationObserver(() => {
    if (applyTimer) clearTimeout(applyTimer);
    applyTimer = setTimeout(() => {
        const hasEditorSettings =
            document.querySelector('select[aria-label="Indent mode"]') ||
            document.querySelector('select[aria-label="Indent size"]') ||
            document.querySelector('select[aria-label="Line wrap mode"]');

        if (hasEditorSettings) {
            loadAndApply();
        }
    }, 300);
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
