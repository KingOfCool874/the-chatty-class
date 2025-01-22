let messages = {};
let users = {}; // Track active users in each room

exports.handler = async (event) => {
    try {
        const { room, message, user, action } = JSON.parse(event.body);

        if (action === "join") {
            // Add the user to the active users list
            if (!users[room]) users[room] = [];
            if (!users[room].includes(user)) users[room].push(user);

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, users: users[room] }),
            };
        } else if (action === "leave") {
            // Remove the user from the active users list
            if (users[room]) {
                users[room] = users[room].filter(u => u !== user);
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            // Handle sending messages
            if (!messages[room]) messages[room] = [];
            messages[room].push({ user, message });

            if (messages[room].length > 20) messages[room].shift(); // Limit messages

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        }
    } catch (error) {
        console.error("Error in send-message:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "Server Error" }),
        };
    }
};

function updateUsersList(users) {
    const usersList = document.getElementById("users");
    usersList.innerHTML = users.map(user => `<li>${user}</li>`).join("");
}
