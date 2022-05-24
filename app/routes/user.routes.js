module.exports = app => {
    const users = require("../controllers/user.controller");

    app.post("/api/users", users.create);

    app.get("/api/users", users.getAll);
  };
