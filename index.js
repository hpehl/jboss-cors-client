var xhr = new XMLHttpRequest();

function loginUsingIframe() {
    var url = document.getElementById("url").value;

    var iframe = document.getElementById("safari-authentication-workaround");
    iframe.src = url;
    iframe.onload = function () {
        document.getElementById("result").innerHTML = "Received at " + new Date().getTime() + ": Request finished"
    }
}

function loginUsingSyncXmlHttpRequest() {
    if (xhr) {
        var url = document.getElementById("url").value;

        xhr.open("GET", url, false);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.withCredentials = true;
        xhr.send(null);
        if (xhr.status == 200) {
            document.getElementById("result").innerHTML = "Received at " + new Date().getTime() + ": Request finished"
        }
        else {
            alert("An error occured. Status: " + xhr.status);
        }
    }
}

function loginUsingAsyncXmlHttpRequest() {
    if (xhr) {
        var url = document.getElementById("url").value;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    document.getElementById("result").innerHTML = "Received at " + new Date().getTime() + ": Request finished"
                }
                else {
                    alert("An error occured. Status: " + xhr.status);
                }
            }
        };
        xhr.send(null);
    }
}

function send() {
    if (xhr) {
        var url = document.getElementById("url").value;
        var payload = document.getElementById("payload").value;

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
}
