const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const bonusBreadSchema = new Schema({
    breadName: String,
    quantity: Number,
    jastaQuantity: Number
})
const customersHistorySchema = new Schema({
    product: String,
    productQuantity: Number,
    date: String,
    avans: Number,
    overall: Number,
    status: {
        type: String, enum: ["To'landi", "Chala", "To'lanmadi"]
    }
});

const salarySchema = new Schema({
    date: String,
    paid: Number
});

const customersSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    phone2: String,
    status: String,
    customerType: { type: String, enum: ['temporary', 'daily'] },
    address: String,
    history: [customersHistorySchema]
});
const storageSchema = new Schema({
    productName: String,
    description: String,
    productPrice: Number,
    poductQuantity: Number,
    olinganSana: String,
    berilganAvans: String,
    olinganSoat: String,
    xamkor: String,
    storageImage: String
});

const workHistorySchema = new Schema({
    qoplarSoni: Number,
    qoplarSoni: Number,
    nonTuri: String,
    nonSoni: Number,
    bonus: [bonusBreadSchema],
    jastaNonSoni: Number,
    tulov: Number
});

const staffSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    phone: String,
    phone2: String,
    typeOfWorker: String,
    adress: String,
    group: String,
    smena: String,
    salary: Number,
    additionalSalary: { type: Number, default: 0 },
    image: String,
    workHistory: [workHistorySchema],
    AllsalaryHistory: [salarySchema]
});
const ordersSchema = new Schema({
    order: String,
    customer: String,
    productQuantity: Number,
    date: String,
    deadline: String,
    time: String,
    avans: Number,
    price: Number,
    status: String
});

const productExpensesSchema = new Schema({
    name: String,
    spent: Number
});

const productsRequiredSchema = new Schema({
    itemName: String,
    itemQuantity: Number
});

const nasiyaSchema = new Schema({
    product: String,
    customer: String,
    productQuantity: Number,
    overall: Number,
    date: String,
    avans: Number,
    customerType: { type: String, enum: ['temporary', 'daily'] },
    productID: String,
    userId: String,
    timeStamp: String
});

const daromatSchema = new Schema({
    name: String,
    quantity: Number,
    overallPrice: Number,
    day: Number,
    month: Number,
    year: Number,
    timeStamp: Number
});

const productsSchema = new Schema({
    productName: String,
    birQopUchunTulov: Number,
    productPrice: Number,
    productImage: String,
    allExpensesPerBag: Number,
    requiredItems: { type: [productsRequiredSchema], default: [] },
    others: {
        type: [productExpensesSchema], default: []
    }
});

const dailyTasksSchema = new Schema({
    group: String,
    smena: String,
    xodim: String,
    qoplarSoni: Number,
    nonTuri: String,
    nonSoni: Number,
    bonus: [bonusBreadSchema],
    jastaNonSoni: Number,
    tulov: Number,
    bonusTulov: Number,
    jamiTulov: Number,
    date: String
});
const expensesSchema = new Schema({
    name: String,
    quantity: Number,
    customer: String,
    overallPrice: Number,
    day: Number,
    month: Number,
    year: Number,
    timeStamp: Number
});
const xamkorSchema = new Schema({
    name: String,
    phone: String,
    category: String
});
const onSailSchema = new Schema({
    breadName: String,
    quantity: Number
});
const plansSchema = new Schema({
    plan: String,
    deadline: String,
    person: String,
    status: String
});


module.exports = {
    customersSchema,
    storageSchema,
    staffSchema,
    ordersSchema,
    productsSchema,
    dailyTasksSchema,
    expensesSchema,
    onSailSchema,
    nasiyaSchema,
    daromatSchema,
    xamkorSchema,
    plansSchema
}