const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const customersSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    phone2: String,
    cutomerType: { type: String, enum: ['temporary', 'daily'] },
    address: String
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


module.exports = {
    customersSchema,
    storageSchema,
    staffSchema
}