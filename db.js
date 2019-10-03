var Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "vulmiqi.com",
    database: "ifp",
    password: "example",
    port: "5432"
});

module.exports = pool

