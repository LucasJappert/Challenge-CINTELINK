module.exports = app => {
    const notificationUser = require("../controllers/notificationUser.controller");

    app.delete("/api/notification/user/:id", notificationUser.delete);

};
