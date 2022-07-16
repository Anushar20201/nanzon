const db = require('./db/connection');
// import mysql2
const mysql = require('mysql2');
// import inquirer
const inquirer = require('inquirer');
// import console.table for console level logging
const logging = require('console.table');
const questions = [
  {
    type: 'list',
    message: 'Choose from the below options',
    name: 'Options',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role' ,'None']
  },
];

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.log('^^^^@@@@@      NANZON      @@@@@^^^^^');
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    askQuestions();
  }
});

const askQuestions = () => {
  inquirer.prompt(questions).then((answers) => {});
};
