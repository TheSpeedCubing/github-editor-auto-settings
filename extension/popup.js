document.addEventListener('DOMContentLoaded', () => {
    const indentMode = document.getElementById('indentMode');
    const indentSize = document.getElementById('indentSize');
    const lineWrap = document.getElementById('lineWrap');
    const saveBtn = document.getElementById('saveBtn');

    chrome.storage.sync.get(['indentMode', 'indentSize', 'lineWrap'], (data) => {
        if (data.indentMode) indentMode.value = data.indentMode;
        if (data.indentSize) indentSize.value = data.indentSize;
        if (data.lineWrap) lineWrap.value = data.lineWrap;
    });

    saveBtn.addEventListener('click', () => {
        const newSettings = {
            indentMode: indentMode.value,
            indentSize: indentSize.value,
            lineWrap: lineWrap.value
        };

        chrome.storage.sync.set(newSettings, async () => {

            chrome.tabs.query({ url: "https://github.com/*" }, (tabs) => {
                for (const tab of tabs) {
                    if (!tab.id) continue;
                    chrome.tabs.sendMessage(tab.id, { type: "APPLY_SETTINGS_NOW" });
                }
            });

            alert("Saved!");
            window.close();
        });
    });
});
