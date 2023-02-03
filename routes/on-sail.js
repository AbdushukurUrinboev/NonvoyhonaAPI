"use strict";
const mongoose = require("mongoose");
// Schemas
const { onSailSchema } = require("./../schemas/schemas");
// Model
const OnSail = mongoose.model('onSail', onSailSchema);

exports.onSail = (_req, res) => {
    OnSail.find({}).then((result) => {
        res.send(result);
    });
};
exports.addSail = async (breadsArr) => {

    for (let i = 0; i < breadsArr.length; i++) {
        const newV = { breadName: breadsArr[i].breadName, quantity: parseInt(breadsArr[i].quantity) - parseInt(breadsArr[i].jastaQuantity) }
        const adventure = await OnSail.findOne({ breadName: breadsArr[i].breadName });
        if (!adventure || adventure === "null") {
            const newProduct = new OnSail(newV);
            await newProduct.save();
        } else {
            adventure.quantity = parseInt(adventure.quantity) + parseInt(breadsArr[i].quantity);
            await adventure.save();
        }
    }
    return "saved!!!";
};

exports.deleteSail = (req, res) => {
    OnSail.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}
exports.updateSail = (req, res) => {
    OnSail.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}