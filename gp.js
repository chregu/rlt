(function(){

    // the minimum version of jQuery we want
    var v = "1.3.2";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    function initMyBookmarklet() {
        (window.myBookmarklet = function() {
            NzzWebpaper.init();
        })();
    }



})();

var NzzWebpaper = (function() {
    var my = {};
    function fetchSuccess(data) {
        jQuery("#socialShare").after("<div id='rlt'> </div>");
        jQuery("#rlt").append("<p ><a href='" + data + "'>" + data + "</a></p>");
        jQuery("#rlt").append("<p><a href='" + 'http://liip.to/?url='+encodeURIComponent(data) + "'>liip.to</a></p>");
        var pocket = '<iframe class="readitlater_button" id="readitlater_button1" allowtransparency="true" frameborder="0" scrolling="no" width="85" height="16" style="z-index: 2000; overflow: hidden;position:relative;top:3px"'+
        'src="http://getpocket.com/button?url='+encodeURIComponent(data)+
        '&title='+encodeURIComponent(nzz.title)+
        '&via='+encodeURIComponent(document.location.host)+
        '"></iframe>';
        jQuery("#rlt").append("<p>" + pocket + "</p>");
        document.location.hash="rlt";

    }
    my.init = function() {
        var path = document.location.pathname;
        var gbUrl = document.location.origin + "/guestpassUrl" + path;
        jQuery.get(gbUrl, fetchSuccess);
    }
    return my;
}());
