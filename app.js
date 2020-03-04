const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// creating a new variable to push all employees into
const employees = [];

// invoke the function
askQ();

// creating a function to get the questions to reaccur
function askQ() {
    // prompts the user questions to put in their repo using inquirer npm
    inquirer.prompt([
        {
            type: "list",
            message: "What employee is needed?",
            name: "employee",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "none"
            ]
        },
    ]).then(function (data) {

        // choosing the different manager, intern, engineer
        switch (data.employee) {
            // asks the manager question
            case "Manager":
                manager();
                break;
            // ask the engineers question
            case "Engineer":
                engineer();
                break;
            // ask the intern questions
            case "Intern":
                intern();
                break;
            // exits the questions
            case "none":
                // calls the render js and displays all the employee attr in the html file 
                var page = render(employees);
                fs.writeFile(outputPath, page, () => {});
                break;
        };
    });
}
// creating a function for engineer inquirer
function engineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the employees id number?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your Github account?",
            name: "github",
        },
    ]).then(function (response) {
        var engineer = new Engineer(
            response.name,
            response.email,
            response.id,
            response.github);
        // pushs the responses from the engineer into the html array
        employees.push(engineer);
        // prompts the askQ function again
        askQ();
    })
}
// Creating a function to display the intern
function manager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the employees id number?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the employees office number?",
            name: "officeNumber",
        },
    ]).then(function (response) {
        var manager = new Manager(
            response.name,
            response.email,
            response.id,
            response.officeNumber);
        // pushs the responses from the manager into the html array
        employees.push(manager);
        // prompts the askQ function again
        askQ();
    })
}

// Creating a function to display the intern
function intern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the employees id number?",
            name: "id",
        },
        {
            type: "input",
            message: "What is shool does the intern go to?",
            name: "school",
        },
    ]).then(function (response) {
        var intern = new Intern(
            response.name,
            response.email,
            response.id,
            response.school);
        // pushs the responses from the engineer into the html array\
        employees.push(intern);
        // prompts the askQ function again
        askQ();
    })
}