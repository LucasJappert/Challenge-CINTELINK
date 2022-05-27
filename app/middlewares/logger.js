const Log = require('../utils/log');
module.exports = (req, res, next) => {
    let start = performance.now();
    LogBeginRequest(req);
    next();
    let miliseconds = performance.now() - start;
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
