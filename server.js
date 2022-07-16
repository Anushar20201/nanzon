const connection = require("./db/connection");
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

connection.connect((err) => {
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
  //In this, I am presented with a formatted table showing department names and department ids
  const query = "SELECT * FROM department";
  connection.query(query, function (error, response) {
    if (error) throw error;
    console.table(response);
    askQuestions();
  });
};

const viewRoles = () => {
  //In this, I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  const query = "SELECT * FROM role";
  connection.query(query, function (error, response) {
    if (error) throw error;
    console.table(response);
    askQuestions();
  });
};

const viewEmployees = () => {
  //In this, I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  const query =
    "select employee.id, employee.first_name, employee.last_name, role.title as title, department.name as department, role.salary as salary, employee. manager_id as managerID from employee LEFT join role on role.id= employee.role_id LEFT join department on department.id = role.department_id ";
  connection.query(query, function (error, response) {
    if (error) throw error;
    console.table(response);
    askQuestions();
  });
};

const addDepartment = () => {
  //In this, I am prompted to enter the name of the department and that department is added to the database
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Please enter the name of new department",
    })
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUES ( ? )";
      connection.query(query, answer.department, function (error, response) {
        if (error) throw error;
        console.log(`department: ${answer.department} is added.`);
      });
      viewDepartments();
    });
};

const addRole = () => {
  //In this, I am prompted to enter the name, salary, and department for the role and that role is added to the database
  const query = "SELECT * FROM department";
  connection.query(query, function (error, res) {
    var deptChose = [];
    var deptChoseID = [];
    var id1;

    if (error) throw error;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "title of new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "salary of new role?",
        },
        {
          name: "dept",
          type: "list",
          message: "department of new role?",
          choices: function () {
            res.forEach((res) => {
              deptChose.push(res.name);
              deptChoseID.push(res.id);
            });
            return deptChose;
          },
        },
      ])
      .then((answer) => {
        console.log(answer);
        console.log(answer.dept);

        var query1 = "SELECT id FROM department where  name = (?)";
        let dept1 = [answer.dept];

        connection.query(query1, dept1, function (error, response) {
          console.log(response[0].id);

          if (error) throw error;
          id1 = response[0].id;
          var query =
            "INSERT INTO role (title, salary, department_id) VALUES ( ?, ? , ? )";
          let crit = [answer.title, answer.salary, id1];

          connection.query(query, crit, function (error, response) {
            if (error) throw error;
            console.log(`role: ${answer.title} is added.`);
          });
          viewRoles();

        });
      });
  });
};

const addEmployee = () => {
  //In this, I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
};

const updateEmployee = () => {
  //In this, I am prompted to select an employee to update and their new role and this information is updated in the database
};
