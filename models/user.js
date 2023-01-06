// We define the user datas model

const mongoose = require("mongoose"); // we import mongoose to create a user model
const uniqueValidator = require("mongoose-unique-validator"); // we import this package to add an option to make sure 2 users can't use the same email

const userSchema = mongoose.Schema({
	// we create our user schema
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // we apply the plugin on our userSchema

module.exports = mongoose.model("User", userSchema); // we export this schema as a model called User
