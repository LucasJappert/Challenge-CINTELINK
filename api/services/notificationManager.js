// const CacheData = require("./cacheData");
const UsersManager = require('./usersManager');


const NotificationsProcess = () => {
    UsersManager.CheckNotifications();

    setTimeout(()=>{
        NotificationsProcess();
    }, 1000);
}

(async () => {
    // await CacheData.InitializeCache()

    NotificationsProcess();// Start process
})()

