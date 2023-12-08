//Import all required modules
const express = require('express') // Express framework for building APIs
const fs = require('fs') // File System module for file operations

// Create an Express application, essentially its an object which Routing HTTP requests; see for example, app.METHOD and app.param.
// Configuring middleware; see app.route.
// Rendering HTML views; see app.render.
// Registering a template engine; see app.engine.
const app = express()
const port = 3000; // Set the port for the server to listen on

//Get our data from the employees.json files and parse it
const dataString = fs.readFileSync('employees.json', 'utf-8');
const data = JSON.parse(dataString)


// Default route to handle requests to the root URL
app.get('', (req, res) => {
    // Send a welcome message with instructions on how to use the API
    res.send(`<h3>Welcome! Use localhost:${port}/employees to access employees </h3> 
    <h4>Use localhost:${port}/employees/employeeID to access a specific employee</h4>
    <h4>Use localhost:${port}/employees/division/department to access departments</h4>
    <h4>Use localhost:${port}/employees/earnings/salary to access a specific employee</h4>
    `)
})


// Endpoint to get all employees from the JSON file
//The status codes goes as follows: 
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)
app.get('/employees', (req, res) => {
    if (data === undefined) {
        res.status(500).send('Internal Server Error');
    } else {
        res.send(data);
    }
})

//Endpoint to get a specific employee from the JSON file
app.get('/employees/:employeeID', (req, res) => {
    if (data === undefined) {
        res.status(500).send('Internal Server Error');
    } else {
        // Get the employee ID from the request parameters
        const employeeID = parseInt(req.params.employeeID);
        // Find the employee with the specified ID and compare it to the one requested 
        const employee = data.find((emp) => emp.employeeID === employeeID);
        if (employee) {
            res.send(employee); // Send the found employee as the response
        } else {
            res.status(404).send('Employee not found'); // Send 404 status if employee not found
        }
    }

})

//Endpoint to find all employees with the same department
app.get('/employees/division/:department', (req, res) => {
    if (data === undefined) {
        res.status(500).send('Internal Server Error');
    } else {
        //  Get the department from the request parameters
        const str = req.params.department
        //Makes sure that even though the department is entered in all lower case, the first letter is capitalize to match our JSON file
        const department = str[0].toUpperCase() + str.slice(1);
        // Filter employees based on the specified department
        const departments = data.filter((dep) => dep.department === department);
        if (departments.length !== 0) {
            // Send the array of departments as the response
            res.send(departments);
        } else {
            res.status(404).send('Department not found'); // Send 404 status if department not found
        }
    }

})



//Endpoint to find employees with the same salary
app.get('/employees/earnings/:salary', (req, res) => {
    if (data === undefined) {
        res.status(500).send('Internal Server Error');
    } else {
        //  Get the department from the request parameters
        const salary = parseInt(req.params.salary);
        // Filter employees based on the specified department
        const salaries = data.filter((sal) => sal.salary === salary);
        if (salaries.length !== 0) {
            // Send the array of departments as the response
            res.send(salaries);
        } else {
            res.status(404).send('Department not found'); // Send 404 status if department not found
        }
    }

})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});