const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const pic = require('../models/pic');

//routes

//get list of students
router.get('/students', function (req, res, next) {
    Student.find({}).then(function (student) {
        res.send(student);
    });

});

// get single student
router.get('/students/:id', function (req, res, next) {
    Student.find({s_id: req.params.id}).then(function (student) {
        res.send(student);
    });

});

//add a new student
router.post('/students', function (req, res, next) {
    Student.create(req.body).then(function (student) {
        res.send(student);
    }).catch(next);
});

//update an existing student
router.put('/students/:id', function (req, res, next) {
    Student.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(function () {
        Student.findOne({
            _id: req.params.id
        }).then(function (student) {

            res.send(student);
        });
    });
});

//delete an existing student
router.delete('/students/:id', function (req, res, next) {
    Student.findByIdAndRemove({
        _id: req.params.id
    }).then(function (student) {
        res.send(student);
    });
});

module.exports = router;