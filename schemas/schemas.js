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
    date: String,
    avans: String,
    overall: String,
    status: {
        type: String, enum: ["To'landi", "Chala", "To'lanmadi"]
    }
});
const customersSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    phone2: String,
    status: String,
    cutomerType: { type: String, enum: ['temporary', 'daily'] },
    address: String,
    history: [customersHistorySchema]
});
const storageSchema = new Schema({
    productName: String,
    description: String,
    productPrice: String,
    poductQuantity: String,
    olinganSana: String,
    olinganSoat: String,
    xamkor: String,
    xamkorTel: String,
    storageImage: String
});

const workHistorySchema = new Schema({
    qoplarSoni: Number,
    qoplarSoni: Number,
    nonTuri: String,
    nonSoni: Number,
    bonus: [bonusBreadSchema],
    jastaNonSoni: Number,
    tulov: String,
    bonusTulov: String,
    jamiTulov: String,
});

const staffSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    birthday: String,
    phone: String,
    phone2: String,
    typeOfWorker: String,
    adress: String,
    group: String,
    smena: String,
    salary: String,
    image: String,
    workHistory: [workHistorySchema]
});
const ordersSchema = new Schema({
    order: String,
    customer: String,
    phone: String,
    date: String,
    deadline: String,
    time: String,
    avans: String,
    price: String,
    status: String,
});

const productExpensesSchema = new Schema({
    name: String,
    spent: Number
});

const productsRequiredSchema = new Schema({
    itemName: String,
    itemQuantity: Number
});

const productsSchema = new Schema({
    productName: String,
    productDes: String,
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
    tulov: String,
    bonusTulov: String,
    jamiTulov: String
});
const expensesSchema = new Schema({
    name: String,
    quantity: String,
    customer: String,
    givenProductQuantity: Number,
    avans: String,
    all: Number,
    productImage: String
});
const onSailSchema = new Schema({
    breadName: String,
    quantity: String,
});


module.exports = {
    customersSchema,
    storageSchema,
    staffSchema,
    ordersSchema,
    productsSchema,
    dailyTasksSchema,
    expensesSchema,
    onSailSchema
}