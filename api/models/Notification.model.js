const MSSQL = require("mssql");
const sqlConn = require("../db/sqlConn");
const Log = require("../utils/log");

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
    #Id;
    #Title;
    #Message;
    #IdTag;
    #DateToSend;
    #CreationDate;
    #CanceledDate;
    constructor(notification){
        this.#Id = notification.Id;
        this.#Title = notification.Title;
        this.#Message = notification.Message;
        this.#IdTag = notification.IdTag;
        this.#DateToSend = notification.DateToSend;
        this.#CreationDate = notification.CreationDate;
        this.#CanceledDate = notification.CanceledDate;
    }
    Id(){ return this.#Id; }
    Title(){ return this.#Title; }
    Message(){ return this.#Message; }
    IdTag(){ return this.#IdTag; }
    DateToSend(){ return this.#DateToSend; }
    SetDateToSend(dateToSend){ this.#DateToSend = dateToSend; }
}

Notification.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, Title, Message, IdTag, DateToSend, CreationDate, CanceledDate
                    FROM [Notification]`;
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

module.exports = Notification;
