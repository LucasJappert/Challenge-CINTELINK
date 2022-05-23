const MSSQL = require("mssql");
const sqlConn = require("../db/sqlConn");
const Log = require("../utils/log");

const User = function (user){
    this.Id = user.Id;
    this.Nick = user.Nick;
    this.Pass = user.Pass;
    this.CreationDate = user.CreationDate;
    this.CanceledDate = user.CanceledDate;
}

User.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, Nick, Pass, CreationDate, CanceledDate
                    FROM [User]`;
        let data = await pool
            .request()
            .query(q);
        MSSQL.close();

        data.recordset.forEach(row => {
            result[row.Id] = new User(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = User;
