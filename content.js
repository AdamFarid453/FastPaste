//information about add to clipboard button
var addClipboard = {
	"id": "Parent",
	"title": "Add to Clipboard",
	"contexts": ["selection"] 
};

var clearClipboard = {
	"id": "child",
	"title": "Clear the Clipboard",
	"contexts": ["page"],
	visible: false
};

//String used to append the selected text to console
var fullString =  "";

//initialize two buttons in the context menu
chrome.contextMenus.create(addClipboard);
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

//Function waits for user to click button and updates the string as well as makes the clear clipboard button visible
chrome.contextMenus.onClicked.addListener(function(copiedData){
	//checks if user interacted with Parent button and appends to clipboard
	if(copiedData.menuItemId === "Parent" && copiedData.selectionText){
		fullString = [fullString,copiedData.selectionText].join(' ');
		copyTextToClipboard(fullString);
		chrome.contextMenus.update("child", {visible : true});
	}
});




//function works regardless if user interacts with it or not
chrome.contextMenus.onClicked.addListener(function(clearData){
	//clears full string but should clear the windows clipboard as well
	if(clearData.menuItemId === "child" && fullString.length > 0 ){
		fullString = "";
		copyTextToClipboard(' ');
		chrome.contextMenus.update("child", {visible : false});
	}
});