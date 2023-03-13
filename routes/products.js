"use strict";
const mongoose = require("mongoose");
const fs = require("fs");
// Schemas
const { productsSchema } = require("./../schemas/schemas");
// Model
const Products = mongoose.model('products', productsSchema);

exports.goods = (req, res) => {
    Products.find({}).then((result) => {
        res.send(result);
    });
};

exports.oneGood = (req, res) => {
    Products.findOne({ _id: req.params.id }).then((result) => {
        res.send(result);
    });
};
exports.addGood = (req, res) => {
    console.log(req.body);
    req.body.requiredItems = req.body.requiredItems.map((item) => {
        return JSON.parse(item);
    });
    req.body.others = req.body.others.map((item) => {
        return JSON.parse(item);
    })
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

exports.deleteGood = async (req, res) => {
    const deletingItem = await Products.findOne({ _id: req.body.id });
    if (deletingItem.productImage != "none") {
        fs.unlink(deletingItem.productImage, (err) => err);
    }
    const result = await deletingItem.remove()
    res.send(result);

}

exports.updateGood = (req, res) => {
    Products.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}