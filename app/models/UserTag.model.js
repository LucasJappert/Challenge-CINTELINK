const { Log, MSSQL, sqlConn} = require("./base.model");

const UserTag = function (userTag){
    this.Id = userTag.Id;
    this.IdUser = userTag.IdUser;
    this.IdTag = userTag.IdTag;
    this.CreationDate = userTag.CreationDate;
    this.CanceledDate = userTag.CanceledDate;
}
UserTag.GetNewObject = (userId, tagId) => {
    return new UserTag({
        IdUser: userId,
        IdTag: tagId,
        CanceledDate: null
    })
}

UserTag.getAll = async () => {
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `SELECT Id, IdUser, IdTag, CreationDate, CanceledDate
                    FROM [UserTag] WHERE CanceledDate IS NULL`;
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
UserTag.createOrUpdate = async (userTag) => {
    if (userTag == null) throw new Error("userTag can't be null!");//TODO: Crear test aca
    let result = {};
    try {
        let pool = await MSSQL.connect(sqlConn);
        let q = `
                DECLARE @IdUserTag int = 0;
                IF EXISTS(SELECT TOP 1 Id FROM UserTag WHERE IdUser=@IdUser AND IdTag=@IdTag)
                    BEGIN
                        UPDATE UserTag
                            SET CanceledDate=@CanceledDate
                            WHERE IdUser=@IdUser AND IdTag=@IdTag;
                        SELECT @IdUserTag=Id FROM UserTag
                            WHERE IdUser=@IdUser AND IdTag=@IdTag;
                    END
                ELSE
                    BEGIN
                        INSERT INTO UserTag (IdUser, IdTag)
                            VALUES (@IdUser, @IdTag);
                        SELECT @IdUserTag=SCOPE_IDENTITY();
                    END

                SELECT Id, IdUser, IdTag, CreationDate, CanceledDate
                    FROM [UserTag] WHERE Id=@IdUserTag;
            `;

        let data = await pool
            .request()
            .input('IdUser', MSSQL.Int, userTag.IdUser)
            .input('IdTag', MSSQL.Int, userTag.IdTag)
            .input('CanceledDate', MSSQL.DateTime, userTag.CanceledDate)
            .query(q);
        MSSQL.close();

        data.recordset.forEach(row => {
            result = new UserTag(row)
        });
    } catch (error) {
        Log.Red(error);
    }
    return result;
}

module.exports = UserTag;
