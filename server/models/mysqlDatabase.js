import mysql from 'mysql';

/* mysql connetction */
const mysqlConn = mysql.createConnection({
  host: "localhost", // your ip
  user: "root", // user
  password: "1234", // pw
  database: "kanban" // database name
});

mysqlConn.connect((err) => {
  if (err) throw err;
  console.log('connect mysql');
});

module.exports = mysqlConn;
