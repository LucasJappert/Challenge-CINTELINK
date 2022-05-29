const User = require("../models/User.model");
const { ObjectResult } = require('../helpers/objectResult');
const { body, validationResult } = require('express-validator');


exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ObjectResult.SendBadRequest(res, {
            message: "Invalid parameters!",
            errors: errors.array()
        });
        return;
    }

    const user = new User({ Nick: req.body.Nick});
    let result = await User.create(user);

    if (result == null)
        ObjectResult.SendInternalServer(res);
    else
        ObjectResult.SendOk(res, result);
};

exports.getAll = async (req, res) => {
    let result = await User.getAll();
    ObjectResult.SendOk(res, result);
};

exports.validate = (method) => {
    switch (method) {
        case "create": {
            return [
                body("Nick", "Nick doesn't exists").exists(),
            ]
        }
    }
}
