var tabToMimeType = {};
chrome.webRequest.onHeadersReceived.addListener(function(details) {
    if (details.tabId !== -1) {
        var headers = details.responseHeaders;
    for (var i = 0; i < headers.length; ++i) {
        var header = headers[i];
        if (header.name.toLowerCase() === 'content-type') {
            if (header.value.indexOf('application/x-protobuf')===0) {
                tabToMimeType[details.tabId] = header.value;
                header.value = "text/html; charset=x-user-defined";
                return {responseHeaders: headers};
            }
        }
    }
    }
}, {
    urls: ['*://*/*'],
    types: ['main_frame']
}, ["blocking", 'responseHeaders']);

chrome.webNavigation.onDOMContentLoaded.addListener((details)=>{
    var contentType = tabToMimeType[details.tabId];
    if (contentType) {
       delete tabToMimeType[details.tabId];
        chrome.tabs.executeScript(null, {file: 'content.js'}, ()=>{
            var port = chrome.tabs.connect(details.tabId);
          port.postMessage(contentType, "*");
        });
    }
});
