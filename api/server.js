const Log = require("./utils/log");
const app = require("./app");
const http = require("http");
const NotificationsProcess = require("./modules/notificationsProcess");

const port = app.get("port");
const server = http.createServer(app);

require("./routes/user.routes")(app);
require("./routes/tag.routes")(app);
require("./routes/notification.routes")(app);
require("./routes/notificationUser.routes")(app);
require("./routes/userTag.routes")(app);

server.listen(port, async () => {

    const CacheManager = require("./services/cacheManager");
    (async () => {
        await CacheManager.InitializeCacheAsync();
        require("./services/socketManager")(server);
        NotificationsProcess.StartProcess();
    })();

    Log.BgGreen(`Servidor corriendo en http://localhost:${port}`);
});


