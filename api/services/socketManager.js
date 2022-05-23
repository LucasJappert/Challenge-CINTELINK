const UsersManager = require('./usersManager');

module.exports = async (server) => {
    const ServerSocket = require("socket.io")(server);

    ServerSocket.on("connection", (socket) => {
        UsersManager.Add(socket);

        socket.on('disconnect', () => {
            UsersManager.Remove(socket);
        });
    });
}
