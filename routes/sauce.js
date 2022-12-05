// This file define the router for sauces

const express = require('express');// we import express module to create a router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router(); // we create an Express Router
const sauceCtrl = require('../controllers/sauce'); // to link the middlewares used for the sauce maangement

router.post('/', auth, multer, sauceCtrl.createSauce); // the route to create one sauce
router.get('/', auth, sauceCtrl.getAllSauces); // the route to get All sauces
router.get('/:id', auth, sauceCtrl.getOneSauce); // the route to get One sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // the route to modify one sauce
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce); // the route to delete sauce
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce); // the route to like or dislike the sauce

module.exports = router; // the router for sauce is exported to allow its use in other files as the app.js
