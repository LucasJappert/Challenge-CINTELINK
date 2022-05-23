const UsersManager = require('./usersManager');


const NotificationsProcess = () => {
    UsersManager.CheckNotifications();

    setTimeout(()=>{
        NotificationsProcess();
    }, 1000);
}

(async () => {
    NotificationsProcess();// Start process
})()

