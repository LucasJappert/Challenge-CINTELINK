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
    req.body.length ? Log.Green(req.body) : null;
    Log.Green(new Date().toLocaleString());
    Log.Bunyan.info(`--> New request: ${req.method}:${req.url}`);
    Log.Bunyan.info(req.headers['user-agent']);
    Log.Bunyan.info(req.headers.origin);
    req.body.length ? Log.Bunyan.info(req.body) : null;

}
const LogEndRequest = (res, miliseconds) => {
    Log.Yellow(`<-- End request: [${res.statusCode}] [${(miliseconds/1000).toFixed(3)}ms]`);
}
