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

        case "Add Department":
          addDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        default:
          break;
      }
    })
    .catch((err) => console.log("ERROR: ", err));
};

promptUser();

getAllDepartments = () => {
  db.query("SELECT * FROM `departments`", function (err, depresults) {
    console.table(depresults);

    promptUser(); // results contains rows returned by server
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
      promptUser();
    })
    .catch((err) => console.log("ERROR: ", err));
};

getAllRoles = () => {
  db.query("SELECT * FROM `roles`", function (err, results) {
    console.table(results);
    promptUser(); // results contains rows returned by server
  });
};

addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the role you'd like to create?",
      },
      {
        type: "input",
        name: "Salary",
        message: "What is the salary for this role?",
      },
      {
        type: "list",
        name: "departmentName",
        message: "What department does this role belong?",
        choices: ["Tech", "Sales", "Finance", "Service"],
      },
    ])
    .then((answers) => {
      const { role, Salary, departmentName } = answers;
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: role,
          salary: Salary,
          department_id: departmentName,
        },

        function (err, results) {
          console.table(results); // results contains rows returned by server
        }
      );
    })
    .catch((err) => console.log("ERROR: ", err));
};

getAllEmployees = () => {
  db.query("SELECT * FROM `employees`", function (err, results) {
    console.table(results);
    promptUser(); // results contains rows returned by server
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
      {
        type: "list",
        name: "role",
        message: "What is the role for this employee?",
        choices: ["Manager", "Advisor", "Assitant", "New role"],
      },
      {
        type: "list",
        name: "managerName",
        message: "Who is the manager of this employee?",
        choices: ["John", "Sarah", "Alex", "New Manager"],
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
      promptUser();
    })
    .catch((err) => console.log("ERROR: ", err));
};

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
