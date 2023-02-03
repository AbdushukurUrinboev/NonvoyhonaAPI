"use strict";
const mongoose = require("mongoose");
// Schemas
const { customersSchema } = require("./../schemas/schemas");
// Model
const Customers = mongoose.model('customers', customersSchema);

exports.customers = (req, res) => {
    Customers.find({}).then((result) => {
        res.send(result);
    });
};
exports.addCustomers = (req, res) => {
    const newCustomer = new Customers(req.body);
    newCustomer.save(function (err, doc) {
        if (err) {
            res.send(res.send(err))
        } else {
            res.send("success!")
        };
        // saved!
    });
};

exports.deleteCustomer = (req, res) => {
    Customers.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}
exports.updateCustomer = (req, res) => {
    Customers.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}