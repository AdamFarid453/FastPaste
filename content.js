var clearClipboard = {
	"id": "child",
	"title": "Clear the Clipboard",
	"contexts": ["page"],
	visible: true
};

//String used to append the selected text to console
var fullString =  "";

//initialize two buttons in the context menu
chrome.contextMenus.create(clearClipboard);


function copyTextToClipboard(text){
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = text;
	document.body.appendChild(copyFrom);
	copyFrom.select();

	try {
		document.execCommand('copy');
		copyFrom.blur();
	} catch {
		pass;
	} finally {
		document.body.removeChild(copyFrom);
	}
};

chrome.extension.onMessage.addListener(
	(message, sender, sendResponse) => {
		fullString = [fullString, message.text].join(" ");
		copyTextToClipboard(fullString);
	}
)
//function works regardless if user interacts with it or not
chrome.contextMenus.onClicked.addListener(function(clearData){
	//clears full string but should clear the windows clipboard as well
	if(clearData.menuItemId === "child" && fullString.length > 0 ){
		fullString = "";
		copyTextToClipboard(" ");
	}
});