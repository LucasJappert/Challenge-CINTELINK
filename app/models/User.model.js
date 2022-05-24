const MSSQL = require("mssql");
const sqlConn = require("../db/sqlConn");
const Log = require("../utils/log");

const User = function (user){
    this.Id = user.Id;
    this.Nick = user.Nick ?? '';
    this.Pass = user.Pass ?? '1234';
    this.CreationDate = user.CreationDate ?? new Date();
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
User.add = async (user) => {
    let result = null;
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `
            IF EXISTS(SELECT TOP 1 Id FROM [User] WHERE Nick=@Nick)
                BEGIN
                    SELECT Id, Nick, Pass, CreationDate, CanceledDate FROM [User] WHERE Nick=@Nick;
                END
            ELSE
                BEGIN
                    INSERT INTO [User] (Nick, Pass) VALUES (@Nick, '123');
                    SELECT Id, Nick, Pass, CreationDate, CanceledDate FROM [User] WHERE Id=SCOPE_IDENTITY();
                END
        `;
        let data = await pool
            .request()
            .input('Nick', MSSQL.VarChar, user.Nick)
            .query(q);
        MSSQL.close();

        data.recordset.forEach(row => {
            result = new User(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = User;
