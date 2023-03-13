"use strict";
const mongoose = require("mongoose");
// Schemas
const { plansSchema } = require("./../schemas/schemas");
// Model
const Plans = mongoose.model('plans', plansSchema);

exports.plans = (_req, res) => {
    Plans.find({}).then((result) => {
        res.send(result);
    });
};

exports.onePlan = (req, res) => {
    Plans.findOne({ _id: req.params.id }).then((result) => {
        res.send(result);
    });
};

exports.addPlan = (req, res) => {
    const newOrder = new Plans(req.body);
    newOrder.save((err, newOrderDoc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(newOrderDoc);
        };
        // saved!
    });
};

exports.deletePlan = (req, res) => {
    Plans.deleteOne({ _id: req.body.id }, (err) => {
        if (err) res.send(err);
        res.send("success!");
    });
}
exports.updatePlan = (req, res) => {
    Plans.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}