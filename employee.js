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
    runSearch();
  });

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "Add department",
          "Add manager",
          "Add role"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
          artistSearch();
          break;
  
        case "View all employees by department":
          multiSearch();
          break;
  
        case "View all employees by manager":
          rangeSearch();
          break;
  
        case "Add employee":
          songSearch();
          break;
  
        case "Remove employee":
          songAndAlbumSearch();
          break;

        case "Update employee role":
          songAndAlbumSearch();
          break;

        case "Update employee manager":
          songAndAlbumSearch();
          break;

        case "Add department":
          songAndAlbumSearch();
          break;

        case "Add manager":
          songAndAlbumSearch();
          break;

        case "Add role":
          songAndAlbumSearch();
          break;
        }
      });
  }