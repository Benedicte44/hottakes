// We define the sauce datas model

const mongoose = require('mongoose'); // we import mongoose to create a sauce model

const sauceSchema = mongoose.Schema({ // we create our sauce schema
    userId: { type: String, required: true }, // the userId of the person who have created the sauce
    name: {type: String, required: true}, // the name of the sauce
    manufacturer: {type: String, required: true}, // the manufacturer 
    description: {type: String, required: true}, // its description
    mainPepper: {type: String, required: true}, // its main spiced ingredient
    imageUrl: {type: String, required: true}, // the url of the user's downloaded image
    heat: {type: Number, required: true}, // the sauce's score
    likes: {type: Number}, // number of people who like the sauce
    dislikes: {type: Number}, // number of people who dislike the sauce
    usersLiked: {type: Array}, // id of people who liked the sauce
    usersDisliked: {type: Array} // id of people who disliked the sauce
});

module.exports = mongoose.model('Sauce', sauceSchema);


