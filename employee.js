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
          employeeSearch();
          break;
  
        case "View all employees by department":
          departmentSearch();
          break;
  
        case "View all employees by manager":
          managerSearch();
          break;
  
        case "Add employee":
          addEmployee();
          break;
  
        case "Remove employee":
          removeEmployee();
          break;

        case "Update employee role":
          updateRole();
          break;

        case "Update employee manager":
          updateManager();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Add manager":
          addManager();
          break;

        case "Add role":
          addRole();
          break;
        }
      });
  }

  function employeeSearch() {
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
  
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  }