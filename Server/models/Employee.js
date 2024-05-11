const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    password: String
});

module.exports = mongoose.model("Employee", EmployeeSchema);
