if (window.jQuery === undefined) {
    var processClick = function (e) {
        e = e || window.event;
        var navTo = e.target || e.srcElement;
        if (navTo.tagName.toLowerCase() === 'a') {
            var doAjax = !navTo.hasAttribute('ajax');
            e.preventDefault();
            if (doAjax) {
                callAjax(navTo.getAttribute('href'), function (e) {
                    document.write(e);
                });
                window.history.pushState("~ Placeholder String ~ Not Visible ~", "~ Page Placeholder Title ~ Not Visible ~", navTo.getAttribute('href'));
            } else {
                window.location = navTo.getAttribute('href');
            }
        }
    }
    if (window.addEventListener) {
        window.addEventListener('click', processClick, false);
    } else {
        window.attachEvent('onclick', processClick);
    }
} else {
    $(document).ready(function () {
        $("a").click(function (event) {
            event.preventDefault();
            var navTo = $(this).attr('href');
            var doAjax = $(this).attr('ajax');
            if (doAjax === 'true' || doAjax === true || (typeof doAjax) === 'undefined' || doAjax === '') {
                var req = $.ajax({
                    url: navTo,
                });
                req.done(function (msg) {
                    window.history.pushState("~ Placeholder String ~ Not Visible ~", "~ Page Placeholder Title ~ Not Visible ~", navTo);
                    document.write(msg);
                });
                req.fail(function (jqXHR, textStatus) {
                    alert("Request failed: " + textStatus);
                });
            } else {
                window.location = navTo;
            }
        });
    });
}


function callAjax(url, callback) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
