var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "200320469",
  database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    
  });

//   function runSearch() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: [
//           "Find songs by artist",
//           "Find all artists who appear more than once",
//           "Find data within a specific range",
//           "Search for a specific song",
//           "Find artists with a top song and top album in the same year"
//         ]
//       })