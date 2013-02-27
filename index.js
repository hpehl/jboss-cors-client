var xhr = new XMLHttpRequest();

function send() {
    if (xhr) {
        var url = document.getElementById("url").value;
        var payload = document.getElementById("payload").value;

        if (navigator.userAgent.indexOf("Safari") != -1) {
            // See http://avalanche123.com/blog/2011/10/10/cross-domain-javascript-lessons-learned/
            // 'CORS Basic Auth gotchas'
            var iframe = document.getElementById("safari-authentication-workaround");
            iframe.src = url;
            iframe.onload = function () {
                sendReally(url, payload);
            }
        }
        else {
            sendReally(url, payload);
        }
    }
}

function sendReally(url, payload) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/dmr-encoded");
    xhr.setRequestHeader("Accept", "application/dmr-encoded");
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.getElementById("result").innerHTML = "Received at " + new Date().getTime() + ": " + xhr.responseText;
            }
            else {
                alert("An error occured. Status: " + xhr.status);
            }
        }
    };
    xhr.send(payload);
}
