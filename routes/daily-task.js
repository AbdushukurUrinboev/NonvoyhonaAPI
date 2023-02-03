"use strict";
const mongoose = require("mongoose");
// Schemas
const { dailyTasksSchema } = require("./../schemas/schemas");
const { addSail } = require("./on-sail");
const { updateStaffHistory } = require("./staff");
// Model
const dailyTasks = mongoose.model('dailyTasks', dailyTasksSchema);
const Storage = mongoose.model('storage');
const Products = mongoose.model('products');

exports.tasks = (req, res) => {
    dailyTasks.find({}).then((result) => {
        res.send(result);
    });
};
exports.addTask = (req, res) => {
    const nonType = req.body.nonTuri;
    // const breadsArr = [
    //     { breadName: nonType, quantity: req.body.nonSoni - req.body.jastaNonSoni },
    //     { breadName: req.body.bonusNonTuri, quantity: req.body.bonusNonSoni }
    // ];
    const breadsArr = [
        { breadName: nonType, quantity: req.body.nonSoni, jastaQuantity: req.body.jastaNonSoni },
        ...(req.body.bonus)
    ];
    const newProduct = new dailyTasks(req.body);

    newProduct.save(function (err) {
        if (err) {
            res.send(res.send(err))
        } else {
            // subtract from storage
            Products.findOne({ productName: nonType }, async (_err, currProduct) => {
                for (let i = 0; i < currProduct.requiredItems.length; i++) {
                    const obj = currProduct.requiredItems[i]
                    const result = await Storage.findOne({ productName: obj.itemName })
                    result.poductQuantity -= (obj.itemQuantity * req.body.qoplarSoni);
                    await result.save();
                }
                // sends to sail
                let output = await addSail(breadsArr);
                // add to staff history
                let { group, smena, xodim, ...rest } = req.body;
                let staffHistory = await updateStaffHistory(xodim, rest);
                // add to expenses section

                res.send({ status: 200, msg: { addSail: output, history: staffHistory } })
            });
            // add to sales


        };

    });

};
exports.deleteTask = (req, res) => {
    dailyTasks.deleteOne({ _id: req.body.id }, (err) => {
        if (err) return handleError(err);
        res.send("success!");
    });
}

exports.updateTask = (req, res) => {
    dailyTasks.findOneAndUpdate(req.body.id, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}