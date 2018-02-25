const _ = require('lodash')
const Fan = require('../models/fanModel')
// var utils = require("../utils");

const FanController = {}

FanController.findAll = (req, res, next) => {
  console.log('fan find all')
  Fan.find({})
    .then(fans => res.send({ success: true, fans }))
    .catch(next)
}
FanController.create = (req, res, next) => {
  const fanData = _.pick(req.body, ['firstName', 'lastName', 'gender', 'birthDate', 'experience'])
  console.log('fanData', fanData, req.body)

  const newFan = Fan(fanData)
  newFan.save()
    .then(fan => res.send({ success: true, fan }))
    .catch(next)
}
FanController.update = (req, res, next) => {
  console.log('will update ', req.params.id, 'with data', req.body)
  Fan.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(fan => res.send({ success: true, fan }))
    .catch(next)
}
FanController.delete = (req, res, next) => {
  Fan.findByIdAndRemove(req.params.id)
    .then(() => res.send({ succes: true }))
    .catch(next)
}

module.exports = FanController

// exports.getAllEmployees = function(req, res, next) {
//
//     // Get all employees and the branch for each of them
//     Employee.find({}).populate('BranchId').exec(function(err, employees) {
//         if (err) return next(err);
//
//         // Send the fetched employees in the response
//         res.send(employees);
//     });
// };
//
// exports.createEmployee = function(req, res, next) {
//
//     // Create a new employee
//     var newEmployee = Employee({
//         Name: req.body.Name,
//         Sex: req.body.Sex,
//         Role: req.body.Role,
//         BranchId: req.body.BranchId,
//         Wage: req.body.Wage,
//         City: req.body.City,
//         Birthday: req.body.Birthday,
//         JoinDate: req.body.JoinDate
//     });
//
//     // Save the employee
//     newEmployee.save(function(err, employee) {
//         if (err) return next(err);
//
//         // We have created the employee
//         console.log('Employee created!');
//         res.send(employee._id);
//     });
// };
//
// exports.updateEmployee = function(req, res, next) {
//
//     // Find the required employee by id
//     Employee.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, employee) {
//         if (err) return next(err);
//         if (!employee) return next(new Error("There is no employee with ID: " + req.params.id));
//
//         // We have updated the employee
//         console.log('Employee updated!');
//         res.send(req.params.id);
//     });
// };
//
// exports.deleteEmployee = function(req, res, next) {
//
//     // Find the required employee by id
//     Employee.findByIdAndRemove(req.params.id, function(err, employee) {
//         if (err) return next(err);
//         if (!employee) return next(new Error("There is no employee with ID: " + req.params.id));
//
//         // We have deleted the employee
//         console.log('Employee deleted!');
//         res.send(req.params.id);
//     });
// };
//
// exports.getEmployeesCountByAges = function(req, res, next) {
//
//     var employeesCountByAges = [
//         {"age": "18-", "count": 0},
//         {"age": "19-30", "count": 0},
//         {"age": "31-40", "count": 0},
//         {"age": "41-50", "count": 0},
//         {"age": "51+", "count": 0}
//     ];
//
//     // Get birthday of all employees
//     Employee.find({}, 'Birthday -_id', function(err, employeesBirthDates) {
//         if (err) return next(err);
//
//         // Loop over all birth dates
//         employeesBirthDates.map(function(birthDate) {
//
//             // Calculate the age of the current employee
//             var employeeAge = utils.calculateAgeByBirthDate(birthDate.Birthday, new Date());
//
//             // Increase the relevant counter accordingly to the age of the current employee
//             if (employeeAge <= 18) employeesCountByAges[0].count++;
//             else if (employeeAge <= 30) employeesCountByAges[1].count++;
//             else if (employeeAge <= 40) employeesCountByAges[2].count++;
//             else if (employeeAge <= 50) employeesCountByAges[3].count++;
//             else employeesCountByAges[4].count++;
//         });
//
//         // Send the calculated data in the response
//         res.send(employeesCountByAges);
//     });
// };
//
// exports.getEmployeesWageByBranch = function(req, res, next) {
//
//     var employeesWageByBranch = [];
//
//     // Get employees average wage for each branch
//     Employee.aggregate([
//         {
//             $group: {
//                 _id: '$BranchId',
//                 BranchId: { $first: '$BranchId' },
//                 average: {$avg: '$Wage'}
//             }
//         }
//     ])
//     .exec(function(err, employeesWages) {
//         if (err) return next(err);
//
//         // Get branches data
//         Employee.populate(employeesWages, {path: 'BranchId'}, function(err, populatedBranches) {
//             if (err) return next(err);
//
//             // Loop over all fetched data
//             populatedBranches.map(function(data) {
//
//                 // Create array with the relevant fields only
//                 employeesWageByBranch.push({
//                     "branchName": data.BranchId.Name,
//                     "averageWage": data.average
//                 });
//             });
//
//             // Return the created array
//             res.send(employeesWageByBranch);
//         });
//     });
// };
