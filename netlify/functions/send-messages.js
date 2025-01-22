let messages = {};

exports.handler = async (event) => {
    try {
        const { room, message, user } = JSON.parse(event.body);
        if (!messages[room]) messages[room] = [];
        messages[room].push({ user, message });
        if (messages[room].length > 20) messages[room].shift(); // Limit to 20 messages
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        console.error("Error in send-message:", error);
        return { statusCode: 500, body: JSON.stringify({ success: false, error: "Server Error" }) };
    }
};
