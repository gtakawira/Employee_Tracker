
const inquirer = require("inquirer");
const db = require("./db/index.js");
const conTable = require("console.table");
const chalk = require("chalk");
const mysql = require("mysql2");

let currentdept = [];
const currentdeptsql = db.query('SELECT * FROM department', (err, rows) => {
    if (err) throw err; currentdept = rows.map((row) => (`${row.id}: ${row.deptname}`))

})

let currentroles = [];
const currentrolesql = db.query('SELECT * FROM role', (err, rows) => {
    if (err) throw err; currentroles = rows.map((row) => (`${row.id}: ${row.title}`))

})


let currentemployees = [];
const currentemplsql = db.query('SELECT * FROM employee', (err, rows) => {
    if (err) throw err; (currentemployees = rows.map((row) => (`${row.id}: ${row.first_name} ${row.last_name}`)))

})

const adddep = [
    {
        type: 'input',
        name: 'departname',
        message: `Enter new department name.`,

    }
];


const sPageoptions = [
    {
        type: 'list',
        name: 'select',
        message: `Select an option.`,
        choices: ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role']

    }
];

//View Departments
function viewdepart() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        startPage()
            ;
    })

};

//View Roles
function viewroles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        startPage()
            ;
    })

};

//View Employee
function viewempl() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        startPage()
            ;
    })
};

//Add Department
function adddepart() {
    inquirer.prompt(adddep).then((data) => {

        db.query(`INSERT INTO department(deptname) VALUES (?)`, `${data.departname}`, function (err, results) {
            console.table(results);
            startPage()
        })


    })
};


//Add Role
function addrole() {


    const addroleq = [
        {
            type: 'list',
            name: 'departname',
            message: `Select the department to add the role.`,
            choices: currentdept,

        },

        {
            type: 'input',
            name: 'rolename',
            message: `Enter new Role name.`,

        },
        {
            type: 'input',
            name: 'salary',
            message: `Enter the salary.`,

        }

    ];
    inquirer.prompt(addroleq).then((data) => {

        const deptid = data.departname.split(":")


        db.query(`INSERT INTO role(title,salary,department_id) VALUES (?,?,?)`, [data.rolename, data.salary, deptid[0]], function (err, results) {
            console.table(results);
            startPage()
        })

    })
};

//Add Employee
function addempl() {

    const addempq = [
        {
            type: 'list',
            name: 'role',
            message: `Select the employee's role.`,
            choices: currentroles,

        },

        {
            type: 'input',
            name: 'first_name',
            message: `Enter employee's first name.`,

        },

        {
            type: 'input',
            name: 'last_name',
            message: `Enter employee's last name.`,

        },
        {
            type: 'list',
            name: 'manageropt',
            message: `Does the employee have a manager?.`,
            choices: ['Yes', 'No']

        },

        {
            type: 'list',
            name: 'managerid',
            message: `Select the employee's manager.`,
            choices: currentemployees,
            when: (addempq) => addempq.manageropt == 'yes'


        },
    ];
    inquirer.prompt(addempq).then((data) => {

        const roleid = data.role.split(":")

        let manid = ''

        if (data.managerid) { const manid = data.managerid.split(":") || 'null' }

        db.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`, [data.first_name, data.last_name, roleid[0], manid[0]], function (err, results) {
            console.table(results);
            startPage()
        })

    })

};

//Update employee
function updtempl() {
    const uptemplq = [
        {
            type: 'list',
            name: 'employee',
            message: `Select the employee to edit.`,
            choices: currentemployees,

        },
        {
            type: 'list',
            name: 'role',
            message: `Select the new role.`,
            choices: currentroles,

        }


    ];
    inquirer.prompt(uptemplq).then((data) => {


        const id = data.employee.split(":");
        const role = data.role.split(":");



        db.query(`UPDATE employee SET role_id=? WHERE id= ? `, [role[0], id[0]], function (err, results) {
            console.log(results);
            startPage()

        })

    })

};

function startPage() {
    console.log(chalk.blue(`
    ********************************************************************
                            Employee Tracker
    *******************************************************************`));
    inquirer.prompt(sPageoptions).then((data) => {
        data.select == 'View all departments' ? viewdepart() :
            data.select == 'View all employees' ? viewempl() :
                data.select == 'View all roles' ? viewroles() :
                    data.select == 'Add a department' ? adddepart() :
                        data.select == 'Add a role' ? addrole() :
                            data.select == 'Add an employee' ? addempl() :
                                data.select == 'Update an employee role' ? updtempl() : console.log('failed')

    })
}
startPage()
