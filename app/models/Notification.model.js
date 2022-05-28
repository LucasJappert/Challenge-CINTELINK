const MSSQL = require("mssql");
const sqlConn = require("../db/sqlConn");
const Log = require("../utils/log");
const EventEmitter = require("../helpers/eventEmitter");
const { ConvertToArgDate } = require("../utils/tools");

// const Notification = function (notification){
//     this.Id = notification.Id;
//     this.Title = notification.Title;
//     this.Message = notification.Message;
//     this.IdTag = notification.IdTag;
//     this.#DateToSend = notification.DateToSend;
//     this.CreationDate = notification.CreationDate;
//     this.CanceledDate = notification.CanceledDate;
// }
class Notification{
    constructor(notification){
        this.Id = notification.Id;
        this.Title = notification.Title;
        this.Message = notification.Message;
        this.IdTag = notification.IdTag;
        this.DateToSend = notification.DateToSend;
        this.CreationDate = notification.CreationDate;
        this.CanceledDate = notification.CanceledDate;
    }
}

Notification.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, Title, Message, IdTag, DateToSend, CreationDate, CanceledDate
                    FROM [Notification] WHERE CanceledDate IS NULL`;
        let data = await pool
            .request()
            .query(q);
        MSSQL.close();

        data.recordset.forEach(row => {
            result[row.Id] = new Notification(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

Notification.create = async (notification) => {
    let result = null;
    try {

        const fixedDate = ConvertToArgDate(notification.DateToSend);//TODO: Revisar todas estas fechas
        let pool = await MSSQL.connect(sqlConn);
        let q = `
            INSERT INTO [Notification] (Title, [Message], IdTag, DateToSend)
                VALUES (@Title, @Message, @IdTag, @DateToSend);
            SELECT Id, Title, Message, IdTag, DateToSend, CreationDate, CanceledDate
            FROM [Notification] WHERE Id=SCOPE_IDENTITY();
        `;
        let data = await pool
            .request()
            .input('Title', MSSQL.VarChar, notification.Title)
            .input('Message', MSSQL.VarChar, notification.Message)
            .input('IdTag', MSSQL.Int, notification.IdTag)
            .input('DateToSend', MSSQL.DateTime, fixedDate)
            .query(q);
        //pool.close();//TODO: Ver de cerrar de esta manera.
        MSSQL.close();

        data.recordset.forEach(row => {
            result = new Notification(row);
        });

        EventEmitter.NotificationCreated(result);
    } catch (error) {
        Log.Red(error);
    }
    return result;
}
Notification.delete = async (idNotification) => {
    let result = 0;
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `DELETE FROM [Notification] WHERE Id=@Id;`;
        let data = await pool
            .request()
            .input('Id', MSSQL.Int, idNotification)
            .query(q);
        //pool.close();//TODO: Ver de cerrar de esta manera.
        MSSQL.close();
        result = idNotification;
        EventEmitter.EmitNotificationRemoved(idNotification);
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = Notification;
