"use strict";
const mongoose = require("mongoose");
// Schemas
const { ordersSchema } = require("./../schemas/schemas");
// Model
const Orders = mongoose.model('orders', ordersSchema);
const Customers = mongoose.model('customers', customersSchema);
exports.orders = (req, res) => {
    Orders.find({}).then((result) => {
        res.send(result);
    });
};
exports.addOrder = (req, res) => {

    // new order should be linked to the customer! 

    const newOrder = new Orders(req.body);
    newOrder.save(function (err, doc) {
        if (err) {
            res.send(handleError(err))
        } else {
            res.send("success!")
        };
        // saved!
    });
};

exports.deleteOrder = (req, res) => {
    Orders.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}
exports.updateOrder = (req, res) => {
    Orders.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}