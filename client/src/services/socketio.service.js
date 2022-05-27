import { io } from 'socket.io-client';

class SocketioService {
    constructor() {
        this.socket;
    }

    SetupSocketConnection(user) {
      this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);//TODO: Asegurarse que el server levante en ese puerto
      user.socketId = this.socket.id;
      //console.log(user);
      //this.SendMessage({ loggedUser: user });
    }
    Disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    SendMessage(json){
        this.socket.emit('message', json);
    }

  }

  export default new SocketioService();
