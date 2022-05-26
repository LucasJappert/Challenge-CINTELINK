module.exports = app => {
    const notification = require("../controllers/notification.controller");
    const notificationUser = require("../controllers/notificationUser.controller");

    app.post("/api/notifications", notification.create);

    app.get("/api/notifications", notification.getAll);

    app.get("/api/notifications/user/:iduser", notification.getByUser);
};
