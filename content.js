/**
 * Created by Madiyar on 26.10.2015.
 */

var isEnabled;
var $content = $('.entry-content');
var $videoContent = $content.find('p:first-child');
var hasVideo = $videoContent.find('iframe').length > 0;
var $next = $content.find('p:nth-child(2)');
var contentHeight = $content.height();
var contentOffsetTop = $content.offset().top;
var isChanged = false;

if (hasVideo) {
    var videoHeight = $videoContent.height();
    $(window).scroll(function () {
        if (isEnabled && !isChanged && $(window).scrollTop() > contentOffsetTop && $(window).scrollTop() < contentHeight - 100) {
            changeView();
        }
        if (isEnabled && isChanged && ($(window).scrollTop() < contentOffsetTop || $(window).scrollTop() > contentHeight - 100)) {
            returnView();
        }

    });
}

function changeView() {
    isChanged = true;
    $videoContent.addClass('fixed');
    $next.css('margin-top', videoHeight + 50 + "px");
}

function returnView() {
    isChanged = false;
    $videoContent.removeClass('fixed');
    $next.css('margin-top', "0px");
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    isEnabled = message;
    if (!isEnabled) {
        returnView();
    }
});



