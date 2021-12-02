const Pool = require('pg').Pool;
const pool = new Pool({
 user: "postgres",
 password: "manyfunzz",
 database: "manyfuns",
 host: "localhost",
 port: "5432"
});
module.exports = pool