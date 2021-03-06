const { Log, MSSQL, sqlConn} = require("./base.model");

const Tag = function (tag){
    this.Id = tag.Id;
    this.Name = tag.Name;
    this.CreationDate = tag.CreationDate;
    this.CanceledDate = tag.CanceledDate;
}

Tag.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, [Name], CreationDate, CanceledDate
                FROM [Tag] WHERE CanceledDate IS NULL`;
        let data = await pool
            .request()
            .query(q);
        pool.close();

        data.recordset.forEach(row => {
            result[row.Id] = new Tag(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = Tag;
