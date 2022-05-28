module.exports = app => {
    const notification = require("../controllers/notification.controller");

    app.post("/api/notification", notification.create);

    app.get("/api/notifications", notification.getAll);

    app.get("/api/notifications/user/:iduser", notification.getByUser);

    app.get("/api/notifications/user/:iduser/sent", notification.getByUserFilterSent);

    app.delete("/api/notification/:id", notification.delete);

};
