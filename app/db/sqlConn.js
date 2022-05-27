const Log = require('../utils/log');

let sqlConn;
//console.error(process.env.NODE_ENV);

//TODO: Chequear
// if (devScope) {
    sqlConn = require("./development");
// } else {
//     configSQL = require("../config/production");
// }
// Log.FondoVerde(`DB server name: ${configSQL.server}`);

module.exports = sqlConn;
