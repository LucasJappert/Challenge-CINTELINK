module.exports = app => {
    const userTag = require("../controllers/userTag.controller");

    // app.post("/api/users/tag", userTag.create);

    // app.delete("/api/users/tag/:id", userTag.delete);
    app.get("/api/tags/user/:iduser", userTag.getAll);
    app.post("/api/tag/:idtag/user/:iduser", userTag.update);
};
