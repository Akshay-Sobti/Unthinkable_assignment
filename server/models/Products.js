const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }
});

// Explicitly specify the collection name
const UserModel = mongoose.model("product", UserSchema, "product");

module.exports = UserModel;
