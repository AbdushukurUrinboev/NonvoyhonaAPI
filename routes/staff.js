"use strict";
const mongoose = require("mongoose");
const fs = require('fs');

// Schemas
const { staffSchema } = require("./../schemas/schemas");
// Model
const Staff = mongoose.model('staff', staffSchema);

exports.staff = (_req, res) => {
    Staff.find({}).then((result) => {
        res.send(result);
    });
};

exports.updateStaffHistory = async (nameOfTheEmployee, addingObj, tulov) => {
    // given name must be spaced between firstName and lastName
    const foundEmployee = await Staff.findOne({ firstName: nameOfTheEmployee.split(" ")[0], lastName: nameOfTheEmployee.split(" ")[1] });
    if (foundEmployee.workHistory.length >= 30) {
        const newArr = [...(foundEmployee.workHistory)];
        newArr.shift();
        foundEmployee.workHistory = [...(newArr), { ...addingObj, tulov }];
    } else {
        foundEmployee.workHistory = [...(foundEmployee.workHistory), { ...addingObj, tulov }];
    }
    foundEmployee.additionalSalary += tulov;
    return await foundEmployee.save();
}

exports.specificStaff = (req, res) => {
    Staff.findOne({ _id: req.params.id }).then((result) => {
        res.send(result);
    });
}

exports.addSalary = async (req, res) => {
    const staffID = req.params.id;
    const foundStaff = await Staff.findOne({ _id: staffID });
    if (foundStaff.AllsalaryHistory >= 12) {
        const newArr = [...(foundStaff.AllsalaryHistory)];
        newArr.shift();
        foundStaff.AllsalaryHistory = [...(newArr), req.body];
    } else {
        foundStaff.AllsalaryHistory = [...(foundStaff.AllsalaryHistory), req.body];
    }
    foundStaff.additionalSalary = 0;
    const saved = await foundStaff.save();
    res.send(saved);
}

exports.addNewStaff = async (req, res) => {
    const newStaff = new Staff({ ...(req.body), image: req.file ? req.file.path : "none" });
    newStaff.save(function (err, doc) {
        if (err) {
            res.send(err)
        } else {
            res.send("success!")
        };
        // saved!
    });
};

exports.deleteStaff = async (req, res) => {
    const deletingStaff = await Staff.findOne({ _id: req.body.id });
    if (deletingStaff.image != "none") {
        fs.unlink(deletingStaff.image, (err) => err);
    }
    const result = await deletingStaff.remove()
    res.send(result);

}
exports.updateStaff = (req, res) => {
    Staff.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}