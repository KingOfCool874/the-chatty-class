let roomCode = "";
let userType = ""; // "host" or "join"

function showHostRoom() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("host").classList.remove("hidden");
}

function showJoinRoom() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("join").classList.remove("hidden");
}

function hostRoom() {
    roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById("generated-code").innerText = roomCode;
    document.getElementById("room-code").classList.remove("hidden");
    userType = "host";
}

function joinRoom() {
    roomCode = document.getElementById("join-code").value.trim();
    if (roomCode) {
        userType = "join";
        showChat();
    } else {
        alert("Please enter a valid room code.");
    }
}

function showChat() {
    document.getElementById("host").classList.add("hidden");
    document.getElementById("join").classList.add("hidden");
    document.getElementById("chat").classList.remove("hidden");
    // Start listening for messages
    fetchMessages();
}

async function sendMessage() {
    const message = document.getElementById("message").value.trim();
    if (message) {
        await fetch("https://your-netlify-function-url.netlify.app/.netlify/functions/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ room: roomCode, message, user: userType }),
        });
        document.getElementById("message").value = "";
    }
}

async function fetchMessages() {
    setInterval(async () => {
        const res = await fetch(`https://your-netlify-function-url.netlify.app/.netlify/functions/get-messages?room=${roomCode}`);
        const data = await res.json();
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML = data.messages.map(msg => `<p>${msg.user}: ${msg.message}</p>`).join("");
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1000);
}
