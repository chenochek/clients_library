const Pool = require('pg').Pool; // import pg pool instance
// pg database configuration

/*
ALTER DATABASE clients SET timezone TO 'Europe/Minsk';
 */

const pool = new Pool({
    user: 'postgres', // username 'postgres' by default
    password: 'user', // password of psql
    host: '93.125.114.118',  // host name
    port: 5432, // port number, 5432 by default
    database: 'clients', // database name
});
// export the configuration
module.exports = pool;