const express = require("express")
const mongoose =  require('mongoose')
const cors = require("cors")
const EmployeeModel= require('./models/Employee')
const EmployeeDetailsSchema = require('./models/Employees')
const { validateEmail, validateMobile } = require('./validationUtils');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");
app.post('/', (req, res) => {
    const { username, password } = req.body;
    EmployeeModel.findOne({ name: username })
    .then(user => {
        if(user){
            if(user.password === password){
                res.json({ message: "Success", username: user.name }); // Return username along with success message
            } else {
                res.status(401).json("Wrong password");
            }
        } else {
            res.status(404).json("User not found");
        }
    })
    .catch(err => res.status(500).json("Internal server error"));
});



app.post('/register', (req, res) => {
    const { name, password } = req.body;

    // Check if the name already exists in the database
    EmployeeModel.findOne({ name: name })
        .then(existingEmployee => {
            if (existingEmployee) {
                // If the name already exists, return an error
                return res.status(400).json({ error: "Name already exists. Please choose a different name." });
            } else {
                // If the name doesn't exist, create a new record
                return EmployeeModel.create({ name, password })
                    .then(employee => res.json(employee))
                    .catch(err => res.status(400).json({ error: "Failed to create employee. Please try again." }));
            }
        })
        .catch(err => res.status(500).json({ error: "Internal server error." }));
});

app.post('/create-employee', (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    // Create the employee in the database
    EmployeeDetailsSchema.create({ name, email, mobile, designation, gender, course })
        .then(employees => {
            console.log('Employee created:', employees);
            res.json(employees);
        })
        .catch(error => {
            console.error('Error creating employee:', error);
            res.status(500).json({ error: 'Failed to create employee' });
        });
});

// Add this route to fetch all employees
app.get('/employees', (req, res) => {
    EmployeeDetailsSchema.find({})
        .then(employees => res.json(employees))
        .catch(error => res.status(500).json({ error: 'Failed to fetch employees' }));
});

// Add this route to delete an employee by ID
app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    EmployeeDetailsSchema.findByIdAndDelete(id)
        .then(() => res.json({ message: 'Employee deleted successfully' }))
        .catch(error => res.status(500).json({ error: 'Failed to delete employee' }));
});

// Add this route to update an employee by ID
app.put('/employees/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, mobile, designation, gender, course } = req.body;
    EmployeeDetailsSchema.findByIdAndUpdate(id, 
    {
        name,
        email,
        mobile,
        designation,
        gender,
        course
    }, { new: true }) // Set { new: true } to return the updated document
        .then(updatedEmployee => {
            if (!updatedEmployee) {
                return res.status(404).json({ error: "Employee not found" });
            }
            res.json(updatedEmployee);
        })
        .catch(error => {
            console.error('Error updating employee:', error);
            res.status(500).json({ error: 'Failed to update employee' });
        });
    });
    


app.listen(3001, () => {
    console.log("server is running")
})
