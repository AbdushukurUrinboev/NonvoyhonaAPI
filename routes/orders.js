"use strict";
const mongoose = require("mongoose");
// Schemas
const { ordersSchema } = require("./../schemas/schemas");
// Model
const Orders = mongoose.model('orders', ordersSchema);
const Customers = mongoose.model('customers');

exports.orders = (req, res) => {
    Orders.find({}).then((result) => {
        res.send(result);
    });
};
// exports.addOrderForSales = (order) => {
//     const newOrder = new Orders(order);
//     newOrder.save(async (err, newOrderDoc) => {
//         if (err) {
//             res.send(handleError(err))
//         } else {
//             // given name must be spaced between firstName and lastName
//             const doc = await Customers.findOne({ firstName: order.customer.split(" ")[0], lastName: order.customer.split(" ")[1] });
//             const newOrderForCustomer = {
//                 product: order.order,
//                 date: order.date,
//                 avans: order.avans,
//                 overall: order.price,
//                 status: "To'landi"
//             }
//             doc.history = [...(doc.history), newOrderForCustomer];
//             doc.save().then(() => {
//                 res.send("success!");
//             });
//         };
//         // saved!
//     });
// };

exports.addOrder = (req, res) => {
    const newOrder = new Orders(req.body);
    newOrder.save(async (err, newOrderDoc) => {
        if (err) {
            res.send(handleError(err))
        } else {
            // given name must be spaced between firstName and lastName
            const doc = await Customers.findOne({ firstName: req.body.customer.split(" ")[0], lastName: req.body.customer.split(" ")[1] });
            const newOrderForCustomer = {
                product: req.body.order,
                date: req.body.date,
                avans: req.body.avans,
                overall: req.body.price,
                // NOT DONE
            }
            doc.history = [...(doc.history), newOrderForCustomer];
            doc.save().then(() => {
                res.send("success!");
            });
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