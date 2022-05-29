const Log = require('../utils/log');

const ISDEV = process.env.NODE_ENV == "development";
const sqlConn = ISDEV ? require("./development") : require("./production");

Log.BgGreen(`DB server name: ${sqlConn.server}`);
module.exports = sqlConn;
