const MSSQL = require("mssql");
const sqlConn = require("../db/sqlConn");
const Log = require("../utils/log");

const NotificationUser = function (notificationUser){
    this.Id = notificationUser.Id;
    this.IdNotification = notificationUser.IdNotification;
    this.IdUser = notificationUser.IdUser;
    this.SentDate = notificationUser.SentDate;
    this.ReadingDate = notificationUser.ReadingDate;
    this.CreationDate = notificationUser.CreationDate;
    this.CanceledDate = notificationUser.CanceledDate;
}

NotificationUser.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, IdNotification, IdUser, SentDate, ReadingDate, CreationDate, CanceledDate
                FROM [NotificationUser]`;
        let data = await pool
            .request()
            .query(q);
        MSSQL.close();

        data.recordset.forEach(row => {
            result[row.Id] = new NotificationUser(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = NotificationUser;
