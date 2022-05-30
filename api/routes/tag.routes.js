module.exports = app => {
    const tag = require("../controllers/tag.controller");

    app.get("/api/tags", tag.getAll);
};
