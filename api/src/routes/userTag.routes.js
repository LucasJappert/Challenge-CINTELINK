module.exports = app => {
    const userTag = require("../controllers/userTag.controller");

    app.get("/api/tags/user/:iduser", userTag.getAll);

    app.post("/api/tag/:idtag/user/:iduser", userTag.update);
};
