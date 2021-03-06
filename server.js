const mysql = require("mysql2"); //object from my sql pkg
const inquirer = require("inquirer");
require("dotenv").config();
const cTable = require("console.table");

//create connection method take an obj (the host, port, db, user, pw) as its peram. which allow that connection to happen
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "empTrac_db",
  user: "root",
  password: "password1",
});

//connect method take a function call back => and asks for an err is there is a problem no err- the console.log runs. response and start application which requires a connection call back '=>' and catch any error that may be produced by the attempt to connect from createConnection
connection.connect((err) => {
  if (err) throw err;
  console.log(`now connected to id ${connection.threadId}`);
  start();
});

const start = () => {
  
  inquirer
    .prompt({
      name: "action",
      message: "What would you like to do?",
      type: "rawlist",
      choices: [
        //1///////////////////////
        "view all employees",
        "view all roles",
        "view all departments",
        //2///////////////////////
        "add new employee",
        "add new role",
        "add new department",
        //3///////////////////////
        "update employee role",
        "exit employee tracker",
      ],
     
    })
    .then((answers) => {
      switch (answers.action) {
        //1/////////////////////////
        case "view all employees":
          viewEmployees();
          break;

        case "view all roles":
          viewAllRoles();
          break;

        case "view all departments":
          viewAllDepartments();
          break;

        //2//////////////////////////////
        case "add new employee":
          addNewEmployee();
          break;

        case "add new role":
          addNewRole();
          break;

        case "add new department":
          addNewDepartment();
          break;

        //3///////////////////////////////
        case "update employee role":
          updateEmployeeRole();
          break;

        // case "view all employees by role":
        //   viewAllEmployeesByRole();
        //   break;

        // case "view all employees by department":
        //   viewAllEmployeesByDepartment();
        //   break;

        // case "view all employees by manager":
        //   viewAllEmployeesByManager();
        //   break;

        case "exit employee tracker":
          exitEmployeeTracker();
          break;
      }
    });
};
//////////////// View employees, roles, departments////////////////
const viewEmployees = () => {
  console.log("console abc")
  let sql = `SELECT id AS 'employee id', CONCAT(first_name, ' ', last_name) AS 'name' FROM employee`;
  connection.query(sql, (err, res) => {
    console.log(err);
    console.log(res);
    if (err) {
      console.log(err);
      throw err;
    }
    console.table(res);
    console.log("View your Employees Above");
    
    start();
  });
};

const viewAllRoles = () => {
  //console.log('efg')
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("View All Roles Above");
    start();
  });
};

const viewAllDepartments = () => {
  //console.log('hij');
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("View All Departments Above");
    start();
  });
};

//////////////// 2. add new employees, roles, departments////////////////
const addNewEmployee = () => {
  console.log("you are in add new employee");
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "Enter first name of new employee",
        type: "input",
      },

      {
        name: "lastName",
        message: "Enter last name of new employee",
        type: "input",
      },

      {
        name: "roleId",
        message: "Enter role ID of new employee",
        type: "input",
      },

      {
        name: "managerId",
        message: "Enter new employees manager ID",
        type: "input",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleId,
          manager_id: answers.managerId,
        },
        (err) => {
          if (err) throw err;
          console.log("The new Employee was created.");
          start();
        }
      );
    });
};

const addNewRole = () => {
  console.log("you are in add new role");

  inquirer
    .prompt([
      {
        name: "title",
        message: "Enter new role title",
        type: "input",
      },

      {
        name: "salary",
        message: "Enter new role salary",
        type: "input",
      },

      {
        name: "departmentId",
        message: "Enter department ID of new role",
        type: "input",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.departmentId,
        },
        (err) => {
          if (err) throw err;
          console.log("The new Role was created.");
          start();
        }
      );
    });
};

const addNewDepartment = () => {
  console.log("you are in add new department");

  inquirer
    .prompt([
      {
        name: "name",
        message: "Enter new department name",
        type: "input",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.name,
        },
        (err) => {
          if (err) throw err;
          console.log("The new Department was created.");
          start();
        }
      );
    });
};

//3. Update Employee Role ///////////////

const updateEmployeeRole = () => {
  console.log("you are in update employee role");

  inquirer
    .prompt([
      {
        name: "role_id",
        message: "Which role ID are you updating?",
        type: "input",
      },
      {
        name: "role_title",
        message: "What is the role title?",
        type: "input",
      },
      {
        name: "role_salary",
        message: "What is the role salary?",
        type: "input",
      },
    ])
    .then((answers) => {
      console.log(answers);
      connection.query(
        "UPDATE role SET ? WHERE ?",
        [{ title: answers.role_title }, { id: answers.role_id }],
        (err) => {
          if (err) throw err;
          console.log("The employee's role id was updated.");
          start();
        }
      );
    });
};

// const viewAllEmployeesByRole = () => {
//   console.log("view all employees by role");

//   setTimeout(function () {
//     start();
//   }, 1000);
// };

// const viewAllEmployeesByDepartment = () => {
//   console.log("view all employees by department");

//   setTimeout(function () {
//     start();
//   }, 1000);
// };

// const viewAllEmployeesByManager = () => {
//   console.log("view all employees by manager");

//   setTimeout(function () {
//     start();
//   }, 1000);
// };

const exitEmployeeTracker = () => {
  console.log("Have a nice Day!");
  connection.end();
};
