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
  chrome.storage.sync.set({
    indentMode: indentMode.value,
    indentSize: indentSize.value,
    lineWrap: lineWrap.value
  }, () => {
    alert('saved!!!!!');
  });
});