const ClientSocket = io();

//Listen
ClientSocket.on("message", (data) => {
    console.log(data);
    if (data.newNotification != null){
        ClientSocket.emit("message", {
            receivedNotificationId: data.newNotification.Id
        });
    }
});

// setInterval(() => {
//     ClientSocket.emit("message", "asdasdadasdadsd");
// }, 2000);
setTimeout(() => {
    ClientSocket.emit("message", `Hola! soy el cliente: ${ClientSocket.id}`);
}, 1000);

