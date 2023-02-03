"use strict";
const mongoose = require("mongoose");
// Schemas
const { productsSchema } = require("./../schemas/schemas");
// Model
const Products = mongoose.model('products', productsSchema);

exports.goods = (req, res) => {
    Products.find({}).then((result) => {
        res.send(result);
    });
};
exports.addGood = (req, res) => {
    const newProduct = new Products({ ...(req.body), productImage: req.file ? req.file.path : "none" });
    newProduct.save(function (err, doc) {
        if (err) {
            res.send(err)
        } else {
            res.send(doc)
        };
        // saved!
    });
};

exports.deleteGood = (req, res) => {
    Products.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}

exports.updateGood = (req, res) => {
    Products.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}