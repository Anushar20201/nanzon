// import db connection
const connection = require("./db/connection");
// import inquirer
const inquirer = require("inquirer");
// import console.table for console level logging
const logging = require("console.table");

//questions box for the user
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
      "view budget",
      "None",
    ],
  },
];

//Start of the app
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

//invoking corresponding function based on options
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
    if (choices === "View budget") {
      viewBudget();
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
  inquirer
    .prompt([
      {
        type: "input",
        name: "fistName",
        message: "Enter employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee's last name?",
      },
    ])
    .then((answer) => {
      const values = [answer.fistName, answer.lastName];
      const query1 = "SELECT role.id, role.title FROM role";
      const query2 = "SELECT * FROM employee";

      connection.query(query1, (err, data) => {
        if (err) throw err;

        const rolesOptions = data.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "Choose employee's role?",
              choices: rolesOptions,
            },
          ])
          .then((answer) => {
            const role = answer.role;
            values.push(role);

            connection.query(query2, (err, data) => {
              if (err) throw err;

              const managersData = data.map(
                ({ id, first_name, last_name }) => ({
                  name: first_name + " " + last_name,
                  value: id,
                })
              );

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Choose employee's manager?",
                    choices: managersData,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  values.push(manager);

                  const sql =
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

                  connection.query(sql, values, (err, result) => {
                    if (err) throw err;
                    console.log("Employee is added sucessfully");
                    viewEmployees();
                  });
                });
            });
          });
      });
    });
};

const updateEmployee = () => {
  const query1 = "SELECT * FROM employee";
  const query2 = "SELECT * FROM role";

  connection.query(query1, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which of the following employees you want to update ?",
          choices: employees,
        },
      ])
      .then((choosedEmp) => {
        connection.query(query2, (err, data) => {
          const values = [];
          values[1] = choosedEmp.name;

          if (err) throw err;
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "Choose a role from the below?",
                choices: roles,
              },
            ])
            .then((answer) => {
              const role = answer.role;
              values.push(role);
              values[0] = role;

              const updateQuery =
                "UPDATE employee SET role_id = ? WHERE id = ?";

              connection.query(updateQuery, values, (err, result) => {
                if (err) throw err;
                console.log("Employee is updated!");
                viewEmployees();
              });
            });
        });
      });
  });
};

const viewBudget = () => {
  // This allows the user to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department
  const budgetQuery = `SELECT department_id AS DepartmentId, department.name AS DepartmentName, SUM(salary) AS budget FROM  role  
              FULL JOIN department ON role.department_id = department.id GROUP BY  department_id`;

  connection.query(budgetQuery, (err, rows) => {
    if (err) throw err;
    console.log(
      "******************Budget of this company is***********************"
    );
    console.table(rows);
    askQuestions();
  });
};
