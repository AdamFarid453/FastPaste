//information about add to clipboard button
var addClipboard = {
	"id": "Parent",
	"title": "Add to Clipboard",
	"contexts": ["selection"] 
};

//String used to append the selected text to console
var fullString =  "";

//initialize one button in the context menu
chrome.contextMenus.create(addClipboard);

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
}

//Function waits for user to click button and updates the string as well as makes the paste clipboard button visible
chrome.contextMenus.onClicked.addListener(function(copiedData){
	if (copiedData.selectionText){
		fullString += copiedData.selectionText;
		copyTextToClipboard(fullString);
	}
});
