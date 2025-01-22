let messages = {}; // Temporary in-memory storage

exports.handler = async (event) => {
    try {
        const { room, message, user } = JSON.parse(event.body);

        // Initialize room if it doesn't exist
        if (!messages[room]) messages[room] = [];
        messages[room].push({ user, message });

        // Limit to the last 20 messages
        if (messages[room].length > 20) messages[room].shift();

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error("Error in send-message:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "Server Error" }),
        };
    }
};
