// Importing;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const SharpMulter = require("sharp-multer");
const app = express();
const multer = require('multer');
require('dotenv').config()
mongoose.pluralize(null);

// routes
const {
    customers: getCustomersRoute,
    addCustomers: postCustomersRoute,
    deleteCustomer: deleteCustomerRoute,
    updateCustomer: updateCustomerRoute
} = require("./routes/customers");
const {
    storage,
    addProduct,
    deleteProduct,
    updateProduct
} = require("./routes/storage");
const {
    staff,
    addNewStaff,
    deleteStaff,
    updateStaff
} = require("./routes/staff");
const {
    orders,
    addOrder,
    deleteOrder,
    updateOrder
} = require("./routes/orders");


// PORT
const port = process.env.PORT;
// setting Up
mongoose.set('strictQuery', true);
const storageForImg = SharpMulter({
    destination: (req, file, cb) => {
        if (req.route.path === "/staff") {
            cb(null, "./uploads/staffImage");
        } else {
            cb(null, "./uploads/productImage");
        }
    },
    imageOptions: {
        fileFormat: "jpg",
        quality: 80,
        resize: { width: 500, height: 500 },
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storageForImg });
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept-Type"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors());

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NonvoyhonaDB');
}

mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
});

// Handle Customers
app.route('/customers')
    .get(getCustomersRoute)
    .post(postCustomersRoute)
    .delete(deleteCustomerRoute)
    .put(updateCustomerRoute);

// Handle Storage
app.route('/storage')
    .get(storage)
    .post(upload.single('productImage'), addProduct)
    .delete(deleteProduct)
    .put(updateProduct);

// Handle Staff
app.route('/staff')
    .get(staff)
    .post(upload.single('image'), addNewStaff)
    .delete(deleteStaff)
    .put(updateStaff);

// Handle Orders

app.route('/orders')
    .get(orders)
    .post(addOrder)
    .delete(deleteOrder)
    .put(updateOrder);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});