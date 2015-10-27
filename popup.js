/**
 * Created by Madiyar on 26.10.2015.
 */
var currentTab;

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    currentTab = tabs[0];
});


$('#change').change(function () {
    start($(this).prop('checked'));
});
function start(state) {
    console.log(currentTab);
    chrome.tabs.insertCSS(currentTab.id, {
        file: 'style.css'
    });
    chrome.tabs.executeScript(currentTab.id, {file: "js/jquery.min.js"}, function () {
        chrome.tabs.executeScript(currentTab.id, {file: "content.js"}, function () {
            chrome.tabs.sendMessage(currentTab.id, state);
        });
    });
}

//document.getElementById('clickme').addEventListener('click', start);