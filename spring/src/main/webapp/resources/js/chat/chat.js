// chat.js
'use strict';
let stompClient = null;

document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.querySelector('#messageForm');
    const messageInput = document.querySelector('#messageInput');
    const connectingElement = document.querySelector('#connecting'); // Make sure this matches your HTML
    const messageArea = document.querySelector('#messageArea');
    const connectForm = document.querySelector('#connect');
    const userIdInput = document.querySelector('#userId');
    const privateMessageInput = document.querySelector('#privateMessage');
    const privateMessageForm = document.querySelector('#privateMessageForm');

    function connect(event) {
        const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
        event.preventDefault();
    }

    function onConnected() {
        // stompClient.subscribe("/topic/public", onMessageReceived);
        stompClient.subscribe(`/topic/chat.privateMessage/${id}`, onMessageReceived);
        connectingElement.textContent = 'Connected!';
        connectingElement.style.color = 'green';
    }

    function onError(error) {
        connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
        connectingElement.style.color = 'red';
    }

    function disconnect() {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log('Disconnected');
            });
            stompClient = null
        }
    }

    function sendMessage(event) {
        const message = messageInput.value.trim();
        if (message && stompClient) {  // Added message check
            const chatMessage = {sender: "cac", content: message};
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            messageInput.value = "";
        }
        event.preventDefault();
    }

    function onMessageReceived(payload) {
        const message = JSON.parse(payload.body);
        console.log(message)
        let messageElement = document.createElement('li');
        messageElement.classList.add('chat-message');

        const usernameElement = document.createElement('span');
        usernameElement.appendChild(document.createTextNode(message.sender));
        messageElement.appendChild(usernameElement);

        const textElement = document.createElement('p');
        textElement.appendChild(document.createTextNode(message.content));
        messageElement.appendChild(textElement);

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight; // Auto-scroll to latest message
    }

    function sendPrivateMessage(event) {
        const username = messageInput.value.trim();
        const message = privateMessageInput.value.trim();
        const userId = userIdInput.value.trim();
        if (message && userId && stompClient) {  // Added message check
            const chatMessage = {sender: username, content: message};
            stompClient.send(`/app/chat.privateMessage/${userId}`, {}, JSON.stringify(chatMessage));
            privateMessageInput.value = "";
        }
        event.preventDefault();
    }


    connectForm.addEventListener('submit', connect, true);
    messageForm.addEventListener('submit', sendMessage, true);
    privateMessageForm.addEventListener('submit', sendPrivateMessage, true);

    window.addEventListener('beforeunload', () => {
        disconnect()
    });
});