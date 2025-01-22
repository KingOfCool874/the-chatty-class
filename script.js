const socket = new WebSocket("wss://your-backend-url");

const joinBtn = document.getElementById("join-btn");
const roomCodeInput = document.getElementById("room-code");
const chatDiv = document.getElementById("chat");
const joinDiv = document.getElementById("join-room");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

let roomCode;

joinBtn.addEventListener("click", () => {
    roomCode = roomCodeInput.value.trim();
    if (roomCode) {
        socket.send(JSON.stringify({ type: "join", room: roomCode }));
        joinDiv.style.display = "none";
        chatDiv.style.display = "block";
    }
});

sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.send(JSON.stringify({ type: "message", room: roomCode, text: message }));
        messageInput.value = "";
    }
});

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "message") {
        const msg = document.createElement("div");
        msg.textContent = data.text;
        messagesDiv.appendChild(msg);
    }
};
