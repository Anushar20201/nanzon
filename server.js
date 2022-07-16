const db = require("./db/connection");
// import mysql2
const mysql = require("mysql2");
// import inquirer
const inquirer = require("inquirer");
// import console.table for console level logging
const logging = require("console.table");
const questions = [
  {
    type: "list",
    message: "Choose from the below options",
    name: "choices",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "None",
    ],
  },
];

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log("^^^^@@@@@      NANZON      @@@@@^^^^^");
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    askQuestions();
  }
});

const askQuestions = () => {
  inquirer.prompt(questions).then((answers) => {
    const { choices } = answers;
    if (choices === "view all departments") {
        viewDepartments();
    }
    if (choices === "view all roles") {
        viewRoles();
    }
    if (choices === "view all employees") {
        viewEmployees();
    }
    if (choices === "add a department") {
        addDepartment();
    }
    if (choices === "add a role") {
        addRole();
    }
    if (choices === "add an employee") {
        addEmployee();
    }
    if (choices === "update an employee role") {
        updateEmployee();
    }
    if (choices === "None") {
      connection.end();
    }
  });
};


const viewDepartments = () => {

}

const viewRoles = () => {

}

const viewEmployees = () => {

}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployee = () => {

}
