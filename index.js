const mysql = require('mysql2');
const inquirer = require ('inquirer');
require('dotenv').config();
const cTable = require('console.table');

//create connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'empTrac_db', 
    user:  'root',
    password: 'password1',  

});

//connect response and start application which requires a connection call back '=>' and catch any error that may be produced by the attempt to connect from createConnection
connection.connect((err) => {
    if(err) throw err;
    console.log(`now connected to id ${connection.threadID}`);
    start();
});
//removed (err, res) from start
const start = () => {
    // if (err) throw err;
    inquirer
    .prompt({
        name: 'action',
        message: 'What would you like to do?',
        type: 'rawlist',
        choices: [
            'view all employees',
            'view all roles',
            'view all departments',
            'add employee',
            'add role',
            'add department',
            'update employee roll',
            'exit employee tracker'

        ],
            default: 'view all employees',
        }
    )
    .then((answers) => {
        switch (answers.action) {

            case 'view all employees':
                viewAllEmployees();
                break;
            
            case 'view all roles':
                viewAllRoles();
                break;
                
            case 'view all departments':
                viewAllDeparments();
                break;
                
            case 'add employee':
                addEmployee();
                break;
            
            case 'add role':
                addRole();
                break;
                    
            case 'add department':
                addDepartment();
                break;

            case 'update employee roll':
                updateEmployeeRole();
                break;

            case 'exit employee tracker':
                exitEmployeeTracker();
                break;        
        }
    });
};

const viewAllEmployees = () => {
    // let sql = `SELECT id AS 'Emp ID', CONCAT(first_name, ' ', last_name) as 'name' FROM employee`
    // connection.query(sql, (err, res) => {
    //     if (err) throw err;
    //     console.table('All Employees', res);
    //     start();
    connection.query('SELECT first_name, last_name FROM employee',(err, res) => {
        if (err) throw err;
        console.log(res);
    })
};

// const viewAllRoles = () => {

// }





const exitEmployeeTracker = () => {
    console.log('Have a nice Day!')
    connection.end();
};