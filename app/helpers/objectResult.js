const { httpStatusCodes } = require('./statusCodes');

class ObjectResult {
    constructor() { }

    static Validation(res) {
        if (res == null) throw "res can´t be null or undefined!";
    }
    static SendOk = (res, json) => {
        this.Validation(res);
        res.status(httpStatusCodes.OK).json(json);
    }
    static SendNotFound = (res) => {
        this.Validation(res);
        res.status(httpStatusCodes.NOT_FOUND).json({});
    }
    static SendInternalServer = (res) => {
        this.Validation(res);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({});
    }
}

module.exports = { ObjectResult };
