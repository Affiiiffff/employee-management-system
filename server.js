const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const e = require("express");
//const fs = require("fs");

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
          break;

        case "View All Employees":
          console.log("View All Employees");

        default:
          break;
      }
    })
    .catch((err) => console.log("ERROR: ", err));
};

promptUser();

getAllDepartments = () => {
  db.query("SELECT * FROM `departments`", function (err, results, fields) {
    console.log(results); // results contains rows returned by server
  });
};

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
