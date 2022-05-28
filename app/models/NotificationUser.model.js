const MSSQL = require("mssql");
const sqlConn = require("../db/sqlConn");
const Log = require("../utils/log");

const NotificationUser = function (notificationUser){
    this.Id = Number(notificationUser.Id);
    this.IdNotification = notificationUser.IdNotification;
    this.IdUser = notificationUser.IdUser;
    this.ReadingDate = notificationUser.ReadingDate;
    this.CreationDate = notificationUser.CreationDate;
    this.CanceledDate = notificationUser.CanceledDate;
}
NotificationUser.GetNewObject = (userId, notiId) => {
    return new NotificationUser({
        IdNotification: notiId,
        IdUser: userId,
        ReadingDate: null,
        CanceledDate: null
    })
}

NotificationUser.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, IdNotification, IdUser, ReadingDate, CreationDate, CanceledDate
                FROM [NotificationUser] WHERE CanceledDate IS NULL`;
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

// NotificationUser.createOrUpdate = async (userId, notiId, readingDate = null) => {
NotificationUser.createOrUpdate = async (notiUser) => {
    if (notiUser == null) throw new Error("notiUser can't be null!");//TODO: Crear test aca
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `
                DECLARE @IdNotificationUser int = 0;
                IF EXISTS(SELECT TOP 1 Id FROM NotificationUser WHERE IdUser=@IdUser AND IdNotification=@IdNotification)
                    BEGIN
                        UPDATE NotificationUser
                            SET ReadingDate=@ReadingDate, CanceledDate=@CanceledDate
                            WHERE IdUser=@IdUser AND IdNotification=@IdNotification;
                        SELECT @IdNotificationUser=Id FROM NotificationUser
                            WHERE IdUser=@IdUser AND IdNotification=@IdNotification;
                    END
                ELSE
                    BEGIN
                        INSERT INTO NotificationUser (IdNotification, IdUser, SentDate)
                            VALUES (@IdNotification, @IdUser, getdate());
                        SELECT @IdNotificationUser=SCOPE_IDENTITY();
                    END

                SELECT Id, IdNotification, IdUser, SentDate, ReadingDate, CreationDate, CanceledDate
                        FROM [NotificationUser] WHERE Id=@IdNotificationUser;
                `;
        let data = await pool
            .request()
            .input('IdNotification', MSSQL.Int, notiUser.IdNotification)
            .input('ReadingDate', MSSQL.DateTime, notiUser.ReadingDate)
            .input('IdUser', MSSQL.Int, notiUser.IdUser)
            .input('CanceledDate', MSSQL.DateTime, notiUser.CanceledDate)
            .query(q);
        MSSQL.close();

        data.recordset.forEach(row => {
            result = new NotificationUser(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = NotificationUser;
