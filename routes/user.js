// This file define the router for users

const express = require("express"); // we import express module to create a router
const router = express.Router(); // we create an Express Router
const userCtrl = require("../controllers/user"); // to link the middlewares used for the connection of users
const password = require("../middleware/password"); // to link the middleware of controle of respect of the rules for the password
const emailControl = require("../middleware/email"); // to link the middleware of controle of respect of the rules for the email

router.post("/signup", emailControl, password, userCtrl.signup); // final part of the route to register new users in the database
router.post("/login", userCtrl.login); // final part of the route that allow the login of users

module.exports = router; // the router for user is exported to allow its use in other files as the app.js
