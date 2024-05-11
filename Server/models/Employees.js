const mongoose = require('mongoose');

const EmployeeDetailsSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    designation: String,
    gender: String,
    course: [String]
});

module.exports = mongoose.model("t_employee", EmployeeDetailsSchema);
