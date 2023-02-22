"use strict";
const mongoose = require("mongoose");
// Schemas
const { ordersSchema } = require("./../schemas/schemas");
// Model
const Orders = mongoose.model('orders', ordersSchema);

exports.orders = (req, res) => {
    Orders.find({}).then((result) => {
        res.send(result);
    });
};

exports.addOrder = (req, res) => {
    const serverDate = new Date();
    const modifiedDate = `${serverDate.getDate()}/${serverDate.getMonth() + 1}/${serverDate.getFullYear()}`;
    const exactTime = `${serverDate.getHours()}:${serverDate.getMinutes()}`;
    const newOrder = new Orders({ ...(req.body), date: modifiedDate, time: exactTime });
    newOrder.save(async (err, newOrderDoc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(newOrderDoc);
        };
        // saved!
    });
};

exports.deleteOrderFromSale = async (customer) => {
    const result = await Orders.deleteOne({ customer });
    return result;
}
exports.deleteOrder = (req, res) => {
    Orders.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return err;
        res.send("success!");
    });
}
exports.updateOrder = (req, res) => {
    Orders.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}