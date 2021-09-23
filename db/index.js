const mysql = require("mysql2");
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employeeTracker_db'
    },
    console.log(`Connected to the employeeTracker_db database.`)
    );

    module.exports=db