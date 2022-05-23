const MSSQL = require("mssql");
const sqlConn = require("../db/sqlConn");
const Log = require("../utils/log");

const UserTag = function (userTag){
    this.Id = userTag.Id;
    this.IdUser = userTag.IdUser;
    this.IdTag = userTag.IdTag;
    this.CreationDate = userTag.CreationDate;
    this.CanceledDate = userTag.CanceledDate;
}

UserTag.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, IdUser, IdTag, CreationDate, CanceledDate
                    FROM [UserTag]`;
        let data = await pool
            .request()
            .query(q);
        MSSQL.close();

        data.recordset.forEach(row => {
            result[row.Id] = new UserTag(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = UserTag;
