
const Log = require('./api/utils/log');
const app = require("./api/app/app");
const http = require("http");

const port = app.get("port");
const server = http.createServer(app);
server.listen(port, async () => {
    Log.BgGreen(`Servidor corriendo en http://localhost:${port}`);
});

const DataManager = require("./api/services/dataManager");
(async () => {
    await DataManager.InitializeCache();
    require("./api/services/notificationManager");
    require("./api/services/socketManager")(server);
})()

