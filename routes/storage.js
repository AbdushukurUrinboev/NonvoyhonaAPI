"use strict";
const mongoose = require("mongoose");
const { addFromStorage } = require("./expenses");
const fs = require("fs");
// Schemas
const { storageSchema } = require("./../schemas/schemas");
// Model
const Storage = mongoose.model('storage', storageSchema);

exports.storage = (_req, res) => {
    Storage.find({}).then((result) => {
        res.send(result);
    });
};

exports.addProduct = async (req, res) => {
    const serverDate = new Date();
    const modifiedDate = `${serverDate.getDate()}/${serverDate.getMonth() + 1}/${serverDate.getFullYear()}`;
    const exactTime = `${serverDate.getHours()}:${serverDate.getMinutes()}`;
    const currTimeStamp = Date.now()
    const result = await Storage.findOne({ productName: req.body.productName });
    if (!result) {
        const newProduct = new Storage({ ...(req.body), storageImage: req.file ? req.file.path : "none", olinganSana: modifiedDate, olinganSoat: exactTime });
        const newProductForStorage = await newProduct.save();
        // adds to expenses
        // console.log("hello")
        // console.log({ olinganSana: modifiedDate, olinganSoat: exactTime, currTimeStamp });
        await addFromStorage({ ...(req.body), olinganSana: modifiedDate, olinganSoat: exactTime, currTimeStamp })
        res.send(newProductForStorage);
    } else {
        result.poductQuantity += parseFloat(req.body.poductQuantity);
        const updatedDoc = await result.save();
        // adds to expenses
        await addFromStorage({ ...(req.body), olinganSana: modifiedDate, olinganSoat: exactTime, currTimeStamp })
        res.send(updatedDoc);
    }
};
exports.subtractFromStorage = async (obj, qop) => {
    const result = await Storage.findOne({ productName: obj.itemName });
    if (result.poductQuantity - (obj.itemQuantity * qop) <= 0) {
        if (result.storageImage != "none") {
            console.log(result.storageImage)
            fs.unlink(result.storageImage, (err) => err);
        }
        return await result.remove();
    } else {
        result.poductQuantity -= (obj.itemQuantity * qop);
        return await result.save();
    }

}

exports.deleteProduct = async (req, res) => {
    const deletingItem = await Storage.findOne({ _id: req.body.id });
    if (deletingItem.storageImage != "none") {
        fs.unlink(deletingItem.storageImage, (err) => err);
    }
    const result = await deletingItem.remove()
    res.send(result);

}
exports.updateProduct = (req, res) => {
    Storage.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}