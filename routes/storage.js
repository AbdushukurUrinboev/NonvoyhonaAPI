"use strict";
const mongoose = require("mongoose");
// Schemas
const { storageSchema } = require("./../schemas/schemas");
// Model
const Storage = mongoose.model('storage', storageSchema);

exports.storage = (req, res) => {
    Storage.find({}).then((result) => {
        res.send(result);
    });
};
exports.addProduct = (req, res) => {
    const newProduct = new Storage({ ...(req.body), productImage: req.file.path });
    newProduct.save(function (err, doc) {
        if (err) {
            res.send(handleError(err))
        } else {
            res.send("success!")
        };
        // saved!
    });
};

exports.deleteProduct = (req, res) => {
    Storage.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}
exports.updateProduct = (req, res) => {
    Storage.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}