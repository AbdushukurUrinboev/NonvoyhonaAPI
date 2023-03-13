"use strict";
const mongoose = require("mongoose");
const { getDatesInRange } = require("./../custom/functions");
// Schemas
const { nasiyaSchema } = require("./../schemas/schemas");
// Model
const Nasiya = mongoose.model('nasiya', nasiyaSchema);
const Customers = mongoose.model('customers');

exports.nasiya = (_req, res) => {
    Nasiya.find({}).then((result) => {
        res.send(result);
    });
};

exports.addNasiyaManually = async (newObj) => {
    const timeStamp = Date.now()
    const newNasiya = new Nasiya({ ...newObj, timeStamp });
    return await newNasiya.save();
}


const getLastWeek = async () => {
    const CurrenttimeStamp = Date.now();
    const lastWeek = CurrenttimeStamp - 10080000
    return await Nasiya.find({
        timeStamp: { $lte: CurrenttimeStamp, $gt: lastWeek }
    });
}
// NEEDS TESTING
const reportWithGivenDate = async (startDate, endDate) => {
    let newStartDate = new Date(startDate);
    let newEndDate = new Date(endDate);
    const data = await Expenses.find({});

    let filteredByDate = data.filter((eachObj) => {
        let [currDay, currMonth, currYear] = eachObj.split("/").map(Number);

        const objectDate = `${currYear}-${currMonth}-${currDay}`
        let foundDate = new Date(objectDate);
        if (foundDate <= newEndDate && foundDate >= newStartDate) {
            return true;
        } else {
            return false;
        }
    });

    // Return the array of dates
    return filteredByDate;
}

exports.reportNasiya = async (_req, res) => {
    const reportResults = await getLastWeek()
    res.send(reportResults);
}


exports.addNasiya = (req, res) => {
    const serverDate = new Date();
    const timeStamp = Date.now()
    const modifiedDate = `${serverDate.getDate()}/${serverDate.getMonth() + 1}/${serverDate.getFullYear()}`
    const newNasiya = new Nasiya({ ...(req.body), date: modifiedDate, timeStamp });
    newNasiya.save(function (err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.send(doc);
        };
        // saved!
    });
};

exports.deleteNasiya = async (req, res) => {
    const foundNasiya = await Nasiya.findOne({ _id: req.body.id });
    if (foundNasiya.userId) {
        const foundCustomer = await Customers.findOne({ _id: foundNasiya.userId });
        const newHistory = foundCustomer.history.filter((elem) => elem._id != foundNasiya.productID);
        foundCustomer.history = newHistory
        const output = await foundCustomer.save();
        await foundNasiya.remove();
        res.send(output);
    } else {
        await foundNasiya.remove();
        res.send("deleted");
    }
}
exports.updateNasiya = (req, res) => {
    Nasiya.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}