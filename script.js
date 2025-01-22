let roomCode = "";
let userType = ""; // "host" or "join"

// Show the "Host a Room" interface
function showHostRoom() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("host").classList.remove("hidden");
}

// Show the "Join a Room" interface
function showJoinRoom() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("join").classList.remove("hidden");
}

// Generate a room code and show it to the host
function hostRoom() {
    roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById("generated-code").innerText = roomCode;
    document.getElementById("room-code").classList.remove("hidden");
    userType = "host";
}

// Join a room using the provided code
function joinRoom() {
    roomCode = document.getElementById("join-code").value.trim();
    if (roomCode) {
        userType = "join";
        showChat();
    } else {
        alert("Please enter a valid room code.");
    }
}

// Show the chat interface
function showChat() {
    document.getElementById("host").classList.add("hidden");
    document.getElementById("join").classList.add("hidden");
    document.getElementById("chat").classList.remove("hidden");
    fetchMessages();
}

// Send a message to the backend
async function sendMessage() {
    const message = document.getElementById("message").value.trim();
    if (message) {
        try {
            const response = await fetch("https://<venerable-bubblegum-f75deb>.netlify.app/.netlify/functions/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ room: roomCode, message, user: userType }),
            });
            const result = await response.json();
            if (result.success) {
                document.getElementById("message").value = ""; // Clear input field
            } else {
                console.error("Failed to send message:", result);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    } else {
        alert("Message cannot be empty!");
    }
}

// Fetch messages from the backend and display them
async function fetchMessages() {
    setInterval(async () => {
        try {
            const res = await fetch(`https://<venerable-bubblegum-f75deb>.netlify.app/.netlify/functions/get-messages?room=${roomCode}`);
            const data = await res.json();
            const messagesDiv = document.getElementById("messages");
            messagesDiv.innerHTML = data.messages
                .map(msg => `<p><strong>${msg.user}:</strong> ${msg.message}</p>`)
                .join("");
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, 1000);
}
