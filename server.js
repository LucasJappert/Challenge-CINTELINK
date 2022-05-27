
const Log = require('./app/utils/log');
const app = require("./app/app");
const http = require("http");
const NotificationsProcess = require("./app/modules/notificationsProcess");

const port = app.get("port");
const server = http.createServer(app);

require("./app/routes/user.routes")(app);
require("./app/routes/tag.routes")(app);
require("./app/routes/notification.routes")(app);

//process.env.TZ = "America/Argentina/Buenos_Aires";


server.listen(port, async () => {
    Log.BgGreen(`Servidor corriendo en http://localhost:${port}`);
});

const DataManager = require("./app/services/dataManager");
(async () => {
    await DataManager.InitializeCache();
    require("./app/services/notificationManager");
    require("./app/services/socketManager")(server);
    NotificationsProcess.StartProcess();
})()

