const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const cTable = require("console.table");

//create connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "empTrac_db",
  user: "root",
  password: "password1",
});

//connect response and start application which requires a connection call back '=>' and catch any error that may be produced by the attempt to connect from createConnection
connection.connect((err) => {
  if (err) throw err;
  console.log(`now connected to id ${connection.threadId}`);
  start();
});
//removed (err, res) from start
const start = () => {
  // if (err) throw err;
  inquirer
    .prompt({
      name: "action",
      message: "What would you like to do?",
      type: "rawlist",
      choices: [
        "view all employees",
        "view all roles",
        "view all departments",
        //2///////////////////////
        "add new employee",
        "add new role",
        "add new department",
        //3///////////////////////
        "update employee roll",
        "exit employee tracker",
      ],
      //default: 'view all employees',
    })
    .then((answers) => {
      switch (answers.action) {
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
        case "view all employees by role":
          viewAllEmployeesByRole();
          break;

        case "view all employees by department":
          viewAllEmployeesByDepartment();
          break;

        case "view all employees by manager":
          viewAllEmployeesByManager();
          break;

        case "update employee roll":
          updateEmployeeRole();
          break;

        case "exit employee tracker":
          exitEmployeeTracker();
          break;
      }
    });
};
//////////////// View employees, roles, departments////////////////
const viewEmployees = () => {
  //console.log("abc")
  let sql = `SELECT id AS 'Emp ID', CONCAT(first_name, ' ', last_name) AS 'name' FROM employee`;
  connection.query(sql, (err, res) => {
    console.log(err);
    console.log(res);
    if (err) {
      console.log(err);
      throw err;
    }
    console.table(res);
    console.log("View your Employees Above");
    //setTimeout(function(){start();}, 1000)
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
    // inquirer
    // .prompt({
    //         name: 'chooseRole',
    //         message: 'Select a role?',
    //         type: 'rawlist',
    //         choices() {
    //             const choiceArray = []
    //             res.forEach(({ title }) => {
    //                 choiceArray.push(title);
    //             });
    //             return choiceArray;
    //         },
    //     }
    // )
    // .then ((answers) => {
    //     let sql = `SELECT employee.id AS 'emp id', CONCAT(employee.first_name, ' ', employee.last_name) AS 'name' FROM 'role'
    //     INNER JOIN employee ON role.id = employee.role_id
    //     WHERE role.title = '${answers.chooseRole}'`;
    //     connection.query(sql, (err, res) => {
    //         if (err) throw err;
    //         if (res !== '') {
    //             console.table(`Employees are assigned to ${answers.chooseRole})` , res);
    //             start();
    //         } else {
    //             console.log(`no ${answers.chooseRoles} assinged to employees`);
    //             setTimeout(function(){start();}, 1000)
    //       };
    //    });
    // });
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
  // let sql = 'SELECT * FROM role;SELECT * FROM employee';
  // connection.query(sql, (err, res) => {
  //     if (err) throw err;
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
          manager_id: answers.managerId
        },
        (err) => {
          if (err) throw err;
          console.log("new employee was entered.");
          start();
        }
      );
    });
};

//     console.log('abc');
//     start();
//     //setTimeout(function(){start();},1000);
// };

const addNewRole = () => {
  console.log("you are in add new role");

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
          // first_name: answers.firstName,
          // last_name: answers.lastName,
          // role_id: answers.roleId,
          // manager_id: answers.managerId
        },
        (err) => {
          if (err) throw err;
          console.log("new employee was entered.");
          start();
        }
      );
    });
};
  start();
};

const addNewDepartment = () => {
  console.log("you are in add new department");

  start();
};
//3///////////////
const viewAllEmployeesByRole = () => {
  console.log("view all employees by role");

  setTimeout(function () {
    start();
  }, 1000);
};

const viewAllEmployeesByDepartment = () => {
  console.log("view all employees by department");

  setTimeout(function () {
    start();
  }, 1000);
};

const viewAllEmployeesByManager = () => {
  console.log("view all employees by manager");

  setTimeout(function () {
    start();
  }, 1000);
};

const updateEmployeeRole = () => {
  console.log("you are in update employee roll");

  setTimeout(function () {
    start();
  }, 1000);
};

const exitEmployeeTracker = () => {
  console.log("Have a nice Day!");
  connection.end();
};