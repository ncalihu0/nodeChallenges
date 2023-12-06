// Import required modules
const express = require('express'); // Express framework for building APIs
const fs = require('fs'); // File System module for file operations

// Create an Express application
const app = express();
const port = 3000; // Set the port for the server to listen on

// Endpoint to get all employees or a specific employee by ID or name
app.get('/employees', (req, res) => {
    // Read the content of the 'employees.json' file asynchronously
    fs.readFile('employees.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse the JSON data from the file
        const employees = JSON.parse(data);

        // Check if query parameters are present
        if (req.query.id) {
            // If 'id' parameter is present, filter employees by ID
            const employeeID = parseInt(req.query.id);

            // Find the employee with the specified ID
            const employee = employees.find((emp) => emp.employeeID === employeeID);

            if (employee) {
                res.send(employee); // Send the found employee as the response
            } else {
                res.status(404).send('Employee not found'); // Send 404 status if employee not found
            }
        } else if (req.query.name) {
            // If 'name' parameter is present, filter employees by name
            const employeeName = req.query.name;

            // Find the employee with the specified name
            const employee = employees.find((emp) => emp.name === employeeName);

            if (employee) {
                res.send(employee); // Send the found employee as the response
            } else {
                res.status(404).send('Employee not found'); // Send 404 status if employee not found
            }
        } else if (req.query.department) {
            // If department parameter is present, filter employees by department
            const department = req.query.department;

            // filter out our JSON based on our department
            const departments = employees.filter((emp) => emp.department === department);

            if (departments) {
                res.send(departments); // Send the found departments
            } else {
                res.status(404).send('Department not found'); // Send 404 status if department not found
            }
        }
        else if (req.query.salary) {
            // If salary parameter is present, filter employees by salary
            const employeeSalary = parseInt(req.query.salary);

            // Find the employees with the specified salary
            const salaries = employees.filter((emp) => emp.salary === employeeSalary);

            if (salaries) {
                res.send(salaries); // Send the found salaries as the response
            } else {
                res.status(404).send('department not found'); // Send 404 status if employee not found
            }
        }

        else {
            // If no query parameters, send all employees as the response
            res.send(employees);
        }
    });
});

// Default route to handle requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome!. Use /employees to get employee data.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});