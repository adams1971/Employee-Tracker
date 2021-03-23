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
    Password: 'password#',  

});

//connect object and start application which requires a connection call back '=>' and catch any error that may be produced by the attempt to connect from createConnection
connection.connect((err) => {
    if(err) throw err;
    console.log(`now connected to id ${connection.threadID}`);
    start();
});

const start = (err, res) => {
    if (err) throw err;
    inquirer
    .prompt(
        {
            name: 'buildNow',
            message: 'What would you like to do?',
            type: 'list',
            choices: ['add department', 'add role', 'add employee', 'view all departments', 'view all roles', 'view all employees', 'update employee roll'],
            default: 'view all employees',
        }
    )
    .then((answers) => {
        switch (answers.buildNow) {
            case 'add department':
                addDepartment();
                break;
            case 'add role':
                addRole();
                break;
            case 'add employee':
                addEmployee();
                break;
            case 'view all departments':
                addEmployee();
                break;
            case 'view all roles':
                addDepartment();
                break;
            case 'view all employees':
                addRole();
                break;
            case 'update employee roll':
                addEmployee();
                break;
            case 'exit employee tracker':
                exitEmployeeTracker();
                break;        
        };
    });
};

//const viewAll

const exitEmployeeTracker = () => {
    console.log('Have a nice Day!')
    connection.end();
};