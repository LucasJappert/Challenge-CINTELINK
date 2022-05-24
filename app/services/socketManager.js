const UsersManager = require('./usersManager');

module.exports = async (server) => {
    const ServerSocket = require("socket.io")(server, {
        cors: {
          origin: "http://localhost:8081", //TODO: Asegurarse que el cliente levante ahí
          methods: ["GET", "POST", "PUT", "DELETE"]
        }
      });

    ServerSocket.on("connection", (socket) => {
        UsersManager.Add(socket);

        socket.on('disconnect', () => {
            UsersManager.Remove(socket);
        });
    });
}
