"use strict";
const mongoose = require("mongoose");
const fs = require('fs');
const sharp = require('sharp')
const path = require('path')

// Schemas
const { staffSchema } = require("./../schemas/schemas");
// Model
const Staff = mongoose.model('staff', staffSchema);

exports.staff = (req, res) => {
    Staff.find({}).then((result) => {
        res.send(result);
    });
};
exports.addNewStaff = async (req, res) => {
    const newProduct = new Staff({ ...(req.body), image: req.file.path });
    newProduct.save(function (err, doc) {
        if (err) {
            res.send(handleError(err))
        } else {
            res.send("success!")
        };
        // saved!
    });
};

exports.deleteStaff = (req, res) => {
    Staff.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}
exports.updateStaff = (req, res) => {
    Staff.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}