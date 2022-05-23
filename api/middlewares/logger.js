const Log = require('../utils/log');
module.exports = (req, res, next) => {
    let start = new Date();
    LogBeginRequest(req);
    next();
    //TODO: Ver el calculo de los miliseconds
    let miliseconds = new Date().getTime() - start.getTime();
    LogEndRequest(res, miliseconds);
}
const LogBeginRequest = (req) => {
    Log.Green(`--> New request: ${req.method}:${req.url}`);
    Log.Green(req.headers['user-agent']);
    Log.Green(req.headers.origin);
    Log.Green(req.body);
    Log.Green(new Date().toLocaleString());
}
const LogEndRequest = (res, miliseconds) => {
    Log.Yellow(`<-- End request: [${res.statusCode}] [${(miliseconds/1000).toFixed(3)}ms]`);
}
