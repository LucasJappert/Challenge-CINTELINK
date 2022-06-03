//TODO: Fill using prod variables
module.exports = {
    user: DB_USER,
    password: DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: "Cintelink",
    connectionLimit: 100,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
};
