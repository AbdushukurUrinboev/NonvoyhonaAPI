"use strict";
const mongoose = require("mongoose");
// Schemas
const { expensesSchema } = require("./../schemas/schemas");
// Model
const Expenses = mongoose.model('expenses', expensesSchema);

exports.expenses = (_req, res) => {
    Expenses.find({}).then((result) => {
        res.send(result);
    });
};
exports.addProduct = (req, res) => {
    const newProduct = new Expenses(req.body);
    newProduct.save(function (err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.send("success!")
        };
        // saved!
    });
};

exports.deleteProduct = (req, res) => {
    Expenses.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}
exports.updateProduct = (req, res) => {
    Expenses.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}