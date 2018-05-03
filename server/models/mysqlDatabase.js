import mysql from 'mysql';

/* mysql connetction */
const mysqlConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "kanban"
});

mysqlConn.connect((err) => { if (err) throw err; });

module.exports = mysqlConn;
