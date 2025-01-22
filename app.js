// Firebase setup
import { db } from './firebase.js';

const hostBtn = document.getElementById('host-btn');
const joinBtn = document.getElementById('join-btn');
const roomContainer = document.getElementById('room-container');
const roomCodeDisplay = document.getElementById('room-code');
const messagesDisplay = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const leaveBtn = document.getElementById('leave-btn');

let currentRoomCode = null;

// Host a room
hostBtn.addEventListener('click', async () => {
    const roomCode = generateRoomCode();
    currentRoomCode = roomCode;

    // Create a new room document in Firestore
    await db.collection('rooms').doc(roomCode).set({ messages: [] });

    // Show the room UI
    showRoomUI(roomCode);
});

// Join a room
joinBtn.addEventListener('click', async () => {
    const roomCode = prompt('Enter Room Code (5 letters):');

    if (roomCode && roomCode.length === 5) {
        currentRoomCode = roomCode;
        const roomDoc = await db.collection('rooms').doc(roomCode).get();

        if (roomDoc.exists) {
            showRoomUI(roomCode);
        } else {
            alert('Room does not exist!');
        }
    }
});

// Send a message
sendBtn.addEventListener('click', async () => {
    const message = messageInput.value;
    if (message && currentRoomCode) {
        await db.collection('rooms').doc(currentRoomCode).update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
        });
        messageInput.value = '';
    }
});

// Leave the room
leaveBtn.addEventListener('click', () => {
    roomContainer.style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
});

// Display the room UI
function showRoomUI(roomCode) {
    document.getElementById('auth-container').style.display = 'none';
    roomContainer.style.display = 'block';
    roomCodeDisplay.textContent = `Room Code: ${roomCode}`;

    // Listen for new messages in the room
    db.collection('rooms').doc(roomCode).onSnapshot((doc) => {
        const messages = doc.data().messages;
        messagesDisplay.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');
    });
}

// Generate a random 5-letter room code
function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let roomCode = '';
    for (let i = 0; i < 5; i++) {
        roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomCode;
}
