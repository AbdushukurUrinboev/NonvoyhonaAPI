const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
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
    cutomerType: { type: String, enum: ['temporary', 'daily'] },
    address: String,
    history: [customersHistorySchema]
});
const storageSchema = new Schema({
    productName: String,
    description: String,
    productPrice: String,
    poductQuantity: String,
    productImage: String
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
    image: String
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


module.exports = {
    customersSchema,
    storageSchema,
    staffSchema,
    ordersSchema
}