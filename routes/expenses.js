"use strict";
const mongoose = require("mongoose");
// Schemas
const { expensesSchema } = require("./../schemas/schemas");
// Model
const Expenses = mongoose.model('expenses', expensesSchema);

exports.expenses = (_req, res) => {
    Expenses.find({}).then((result) => {
        res.send(result);
    });
};

const deletePrevMonths = async (givenMonth, givenYear) => {
    await Expenses.deleteMany({
        year: { $lt: givenYear }
    });
    if (givenMonth > 3) {
        return await Expenses.deleteMany({
            month: { $lte: givenMonth - 3 }
        });
    } else {
        return await Expenses.deleteMany({
            month: { $lte: givenMonth + 9, $gt: givenMonth }
        });
    }
}

exports.addFromStorage = async (object) => {
    let [day, month, year] = object.olinganSana.split("/");
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);
    // altered To Expense Schema
    const toExpensesSchema = { name: object.productName, quantity: object.poductQuantity, customer: object.xamkor, overallPrice: object.umumiyNarhi, day, month, year, timeStamp: object.currTimeStamp }
    const newExpense = new Expenses(toExpensesSchema);
    // deletes from last 4 months
    await deletePrevMonths(month, year);

    // need to only include 3 months data
    return await newExpense.save();
}

exports.addFromDailyTasks = async (name, expensesPerBag, qoplarSoni, quantity, date, currTimeStamp) => {
    let [day, month, year] = date.split("/");
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);
    // altered To Expense Schema
    const toExpensesSchema = { name, quantity, overallPrice: expensesPerBag * qoplarSoni, day, month, year, timeStamp: currTimeStamp }
    const newExpense = new Expenses(toExpensesSchema);
    return await newExpense.save();
}

exports.addExpense = async (req, res) => {
    const serverDate = new Date();
    let day = serverDate.getDate();
    let month = serverDate.getMonth() + 1;
    let year = serverDate.getFullYear();

    await deletePrevMonths(month, year);

    const timeStamp = Date.now()
    const newProduct = new Expenses({ ...(req.body), timeStamp, day, month, year });
    res.send(await newProduct.save());
};

const getLastWeek = async () => {
    const CurrenttimeStamp = Date.now();
    const lastWeek = CurrenttimeStamp - 10080000
    return await Expenses.find({
        timeStamp: { $lte: CurrenttimeStamp, $gt: lastWeek }
    });
}
// 12/4/2021
exports.reportExpenses = async (req, res) => {
    // const { month, day } = req.query;

    const lastWeekDT = await getLastWeek();
    res.send(lastWeekDT);
}

exports.deleteExpense = (req, res) => {
    Expenses.deleteOne({ _id: req.body.id }, (err) => {
        if (err) res.send(err);
        res.send("success!");
    });
}
exports.updateExpense = (req, res) => {
    Expenses.findOneAndUpdate({ _id: req.body.id }, req.body.new, {
        new: true
    }).then((doc) => {
        res.send(doc);
    });
}