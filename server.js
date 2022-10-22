const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const e = require("express");
const { exit } = require("process");
const { first } = require("rxjs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",

    user: "root",

    password: "",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      const { choice } = answers;

      switch (choice) {
        case "View All Departments":
          getAllDepartments();
          break;

        case "View All Roles":
          console.log("View All Roles");
          getAllRoles();
          break;

        case "View All Employees":
          console.log("View All Employees");
          getAllEmployees();
          break;

        case "Quit":
          exit();
          break;

        case "Add Employee":
          addEmployee();
          break;

        default:
          break;
      }
    })
    .catch((err) => console.log("ERROR: ", err));
};

promptUser();

getAllDepartments = () => {
  db.query("SELECT * FROM `departments`", function (err, results) {
    console.table(results); // results contains rows returned by server
  });
};

addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you'd like to create?",
      },
    ])
    .then((answers) => {
      const { department } = answers;
      db.query(
        "INSERT INTO departments SET ?",
        {
          department_name: department,
        },

        function (err, results) {
          console.table(results); // results contains rows returned by server
        }
      );
    })
    .catch((err) => console.log("ERROR: ", err));
};

getAllRoles = () => {
  db.query("SELECT * FROM `roles`", function (err, results) {
    console.table(results); // results contains rows returned by server
  });
};
getAllEmployees = () => {
  db.query("SELECT * FROM `employees`", function (err, results) {
    console.table(results); // results contains rows returned by server
  });
};

addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "surName",
        message: "What is the employee's last name?",
      },
    ])
    .then((answers) => {
      const { firstName, surName } = answers;
      db.query(
        "INSERT INTO Employees SET ?",
        {
          first_name: firstName,
          last_name: surName,
        },

        function (err, results) {
          console.table(results); // results contains rows returned by server
        }
      );
    })
    .catch((err) => console.log("ERROR: ", err));
};

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
