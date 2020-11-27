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
  console.log("connected as id " + connection.threadId + "\n");
  //   connection.end();
});

let allEmployeesArray = [];

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
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
      switch (response.action) {
        case "View all employees":
          allEmployees();
          break;
        case "View all employees by department":
          employeesByDepartment();
          break;
        case "View all employees by manager":
          employeesByManager();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Update employee manager":
          updateManager();
          break;
        case "Exit":
          exit();
          break;
      }
    });
};

allEmployees = () => {
  console.log("View All Employees");
  connection.query("select * from employee;", response, (err, res) => {
    if (err) throw err;
    console.table(res);
    // connection.end();
    promptStart();
  });
};

employeesByDepartment = () => {
  console.log("View All Employees by Department");
  connection.query("SELECT * FROM department;", response, (err, res) => {
    if (err) throw err;
    cTable(res);
    promptUser();
  });
};

employeesByManager = () => {
  console.log("View All Employees by Manager.");
  connection.query("SELECT * FROM manager", response, (err, res) => {
    if (err) throw err;
    cTable(res);
    // connection.end();
    promptUser();
  });
};

addEmployee = () => {
  console.log("Adding a New Employee");
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the Employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Employee's Last Name",
      },
      {
        type: "list",
        name: "role",
        message: "What is the Employees's Role?",
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the Employees's Manager?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the Employee's Salary?",
      },
    ])
    .then((response) => {
      console.log(response);
      connection.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id, salary) VALUES (${response.first_name}, ${response.last_name}, ${response.role}, ${response.manager}, ${response.salary});`,
        response,
        (err, res) => {
          if (err) throw err;
          console.log("New Employee Added!");
        }
      );
      promptUser();
    })
    .catch((err) => {
      console.log(err);
    });
};

addDepartment = () => {
  console.log("Adding a department.");
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is then name of the newly created department?",
      },
    ])
    .then((response) => {
      console.log(response);
      connection.query(`INSERT INTO department (name) VALUES ("Marketing")`, {
        department_name: response.department_name,
      });
      console.log("New department added!");
      promptUser();
    })
    .catch((err) => {
      console.log(err);
    });
};

addRole = () => {
  console.log("Adding a new role.");
  return inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What is then name of the newly created role?",
      },
    ])
    .then((response) => {
      console.log(response);
      connection.query(`INSERT INTO role SET ?`, { title: response.newRole });
      console.log("New role added!");
      promptUser();
    })
    .catch((err) => {
      console.log(err);
    });
};

removeEmployee = () => {
  console.log("Remove an employee.");
  return inquirer
    .prompt([
      {
        type: "list",
        name: "removeEmployee",
        message: "Which employee would you like to remove from the system?",
        choices: allEmployeesArray,
      },
    ])
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

updateEmployee = () => {
  console.log("Update the employee information");
  return inquirer
    .prompt([
      {
        type: "list",
        name: "updateEmployeeRole",
        message: "Which employee do you want to update their role?",
        choices: ["", "", "", ""],
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: allRolesArray,
      },
    ])
    .then(({ updateEmployeeRole, role }) => {
      console.log({ updateEmployeeRole, role });
      // update query

      promptUser();
    });
};

updateManager = () => {
  console.log("Update the employee's manager information.");
  return inquirer
    .prompt([
      {
        type: "list",
        name: "updateManager",
        message: "Which employee do you want to update manager information?",
        choices: allEmployeesArray,
      },
      {
        type: "list",
        name: "newManager",
        message: "Who is the employee's manager?",
        choices: [
          "Jennifer Aniston",
          "Lisa Kudrow",
          "Courtenay Cox",
          "Julia Louis-Dreyfus",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      promptUser();
    });
};

renderAllEmployeeNames = () => {
  `SELECT * CONCAT(first_name, ' ', last_name) FROM employee;
  `,
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        allEmployeesArray.push(res[i]["CONCAT(first_name, ' ', last_name)"]);
      }
      return allEmployeesArray;
    };
};

exit = () => {
  console.log("Exiting the application.");
  connection.end();
};

promptUser();
