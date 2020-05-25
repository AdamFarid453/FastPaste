document.addEventListener('copy', (event) => {
	const selection = document.getSelection();
    chrome.runtime.sendMessage({text: selection.toString()});
})
