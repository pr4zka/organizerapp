const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database: {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        port: process.env.MYSQLPORT,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE
    }
}