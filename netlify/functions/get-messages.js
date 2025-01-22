exports.handler = async (event) => {
    const room = event.queryStringParameters.room;
    return {
        statusCode: 200,
        body: JSON.stringify({ messages: messages[room] || [] }),
    };
};
