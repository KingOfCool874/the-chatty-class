let messages = {};

exports.handler = async (event) => {
    const { room, message, user } = JSON.parse(event.body);
    if (!messages[room]) messages[room] = [];
    messages[room].push({ user, message });
    if (messages[room].length > 20) messages[room].shift(); // Keep only 20 messages
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
