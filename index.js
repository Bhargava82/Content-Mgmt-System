const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// SQL FILE 12

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Raina10!",
  database: "employeecms_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //   connection.end();
});

const promptStart = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "input",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee",
          "Update Employee Role",
          "Update Employee Manager",
        ],
      },
    ])
    .then((response) => {
      if (response.uerAction === "View All Employees") {
        selectAll();
      }
    });
};

const selectAll = () => {
  connection.query("select * from employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};

promptStart();
