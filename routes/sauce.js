// This file define the router for sauces

const express = require('express');// we import express module to create a router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router(); // we create an Express Router
const sauceCtrl = require('../controllers/sauce'); // to link the middlewares used for the sauce maangement

router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router; // the router for sauce is exported to allow its use in other files as the app.js
