const UsersManager = require('./usersManager');

module.exports = async (server) => {
    const ServerSocket = require("socket.io")(server, {
        cors: {
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
      });

    ServerSocket.on("connection", (socket) => {
        UsersManager.Add(socket);
        console.log(`Users on: ${Object.keys(UsersManager.GetAll()).length}`);

        socket.on('disconnect', () => {
            UsersManager.Remove(socket);
        });
    });
}
