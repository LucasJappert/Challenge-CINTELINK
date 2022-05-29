const { Log, MSSQL, sqlConn} = require("./base.model");

const User = function (user){
    this.Id = user.Id;
    this.Nick = user.Nick ?? '';
    this.Pass = user.Pass ?? '1234';
    this.Rol = user.Rol ?? 0;
    this.CreationDate = user.CreationDate ?? new Date();
    this.CanceledDate = user.CanceledDate;
}

User.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, Nick, Pass, Rol, CreationDate, CanceledDate
                    FROM [User] WHERE CanceledDate IS NULL`;
        let data = await pool
            .request()
            .query(q);
        pool.close();//FIXME: Ver error Cannot close a pool while it is connecting

        data.recordset.forEach(row => {
            result[row.Id] = {
                Id: row.Id,
                Nick: row.Nick,
                CreationDate: row.CreationDate,
                Rol: row.Rol
            };
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}
User.create = async (user) => {
    let result = null;
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `
            IF EXISTS(SELECT TOP 1 Id FROM [User] WHERE Nick=@Nick)
                BEGIN
                    SELECT Id, Nick, Pass, Rol, CreationDate, CanceledDate FROM [User] WHERE Nick=@Nick;
                END
            ELSE
                BEGIN
                    INSERT INTO [User] (Nick, Pass) VALUES (@Nick, '123');
                    SELECT Id, Nick, Pass, Rol, CreationDate, CanceledDate FROM [User] WHERE Id=SCOPE_IDENTITY();
                END
        `;
        let data = await pool
            .request()
            .input('Nick', MSSQL.VarChar, user.Nick)
            .query(q);
        pool.close();

        data.recordset.forEach(row => {
            result = {
                Id: row.Id,
                Nick: row.Nick,
                CreationDate: row.CreationDate,
                Rol: row.Rol
            };
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = User;
