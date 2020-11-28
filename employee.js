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
    connection.query("SELECT employee.first_name, employee.last_name, roles.title,roles.salary,roles.department_id,department.name FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id;", function(err, res) {
      if (err) throw err;
  
      // Log all results of the SELECT statement
      console.table(res);
      runSearch();
    });
  }

  function departmentSearch() {
    connection.query("SELECT * FROM department;", function(err, res) {
      if (err) throw err;
        
      inquirer
      .prompt([
        {
            name: "department",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].name);
              }
              return choiceArray;
            },
            message: "What department?"
          }
      ]).then (function(answer){
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].name === answer.department) {
            chosenItem = res[i];
          }
        }
        const query = "SELECT employee.first_name, employee.last_name, roles.title,roles.salary,roles.department_id,department.name FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id WHERE ?";
        connection.query(query, {department_id: chosenItem.id},function(err,res) {
              if (err) throw err;
              console.table(res);
              // re-prompt the user 
              runSearch();
            }
          );              
      })
    });
   }

  function addEmployee() {
    connection.query("SELECT * FROM roles", function(err,res){
        if (err) throw err;
        // connection.end();
    inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "First Name:"
      },
      {
        name: "last_name",
        type: "input",
        message: "Last Name:"
      },
      {
        name: "role",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].title);
          }
          return choiceArray;
        },
        message: "What role does this employee fill?"
      }
    //   {
    //     name: "manager",
    //     type: "input",
    //     message: "Manager:",
    //   }
    ]).then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].title === answer.role) {
            chosenItem = res[i];
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: chosenItem.id,
          },
          function(err) {
            if (err) throw err;
            console.log("Employee added!");
            // re-prompt the user for if they want to bid or post
            runSearch();
          }
        );
      });
    });
  }

    function addDepartment() {
        inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "New department name:"
            }
        ]).then(function(answer){
            connection.query(
                "INSERT INTO department SET ?",
                {
                  name: answer.name,
                },
                function(err) {
                  if (err) throw err;
                  console.log("Department added!");
                  // re-prompt the user for if they want to bid or post
                  runSearch();
                }
              );
        })
    }

    function addRole() {
        connection.query("SELECT * FROM department", function(err,res){
            if (err) throw err;
        inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "New role name:"
            },
            {
                name: "salary",
                type: "input",
                message: "New role salary:"
            },
            {
                name: "department",
                type: "rawlist",
                choices: function() {
                  var choiceArray = [];
                  for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].name);
                  }
                  return choiceArray;
                },
                message: "What department does this role fall into?"
              }
        ]).then(function(answer){
            var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].name === answer.department) {
            chosenItem = res[i];
          }
        }
            connection.query(
                "INSERT INTO roles SET ?",
                {
                  title: answer.title,
                  salary: answer.salary,
                  department_id: chosenItem.id
                },
                function(err) {
                  if (err) throw err;
                  console.log("Role added!");
                  // re-prompt the user for if they want to bid or post
                  runSearch();
                }
              );
        })
    })
    }