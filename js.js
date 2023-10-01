document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatMessages = document.getElementById("chatMessages");

    function addMessage(messageText, sentByUser) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sentByUser ? "sent" : "received");
        messageDiv.textContent = messageText;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessageToServer(messageText) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "server.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Message sent successfully
                // You can update the UI here if needed
            }
        };
        xhr.send("message=" + encodeURIComponent(messageText));
    }

    function checkForNewMessages() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "server.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                response.messages.forEach((message) => {
                    addMessage(message.text, false);
                });
            }
        };
        xhr.send();
    }

    sendMessageButton.addEventListener("click", function () {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            addMessage(messageText, true);
            sendMessageToServer(messageText);
            messageInput.value = "";
        }
    });

    messageInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessageButton.click();
        }
    });

    setInterval(checkForNewMessages, 2000);
});
