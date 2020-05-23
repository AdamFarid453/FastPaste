//information about add to clipboard button
var addClipboard = {
	"id": "Parent",
	"title": "Add to Clipboard",
	"contexts": ["selection"] //
};
//information about paste clipboard button
var pasteClipboard = {
	"id": "child",
	"title": "Paste Clipboard",
	"contexts": ["page"],
	visible: false
};

//String used to append the selected text to console
var fullString =  "";

//initialize the two buttons in the context menu

chrome.contextMenus.create(addClipboard);

chrome.contextMenus.create(pasteClipboard);

//Function waits for user to click button and updates the string as well as makes the paste clipboard button visible
chrome.contextMenus.onClicked.addListener(function(copiedData){
	if(copiedData.menuItemId == "Parent" && copiedData.selectionText){
		fullString = [fullString,copiedData.selectionText].join(' ');
		chrome.contextMenus.update("child", {visible : true});
		console.log(fullString);
	}


});

//Function that sends message to console once the paste button is clicked
//code not complete
chrome.contextMenus.onClicked.addListener(function(pasteData){
	if(pasteData.menuItemId =="child" && fullString.length > 0){
		console.log("button working");
	}
});


