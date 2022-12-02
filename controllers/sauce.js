// Middlewares for the sauce management

const Sauce = require ('../models/sauce'); // we import the sauce model
const fs = require('fs'); // we import the file system package that allow us to modify the architecture of files

exports.createSauce = (req, res, next) => { // Middleware to create a new sauce
    const sauceObject = JSON.parse(req.body.sauce); // we take the datas of the body request in an object
    delete sauceObject._id; // we delete the automatic id generated by mongoose
    delete sauceObject._userId;
    const sauce = new Sauce ({ // we create the new sauce thanks to our sauce model and the datas of the body request
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${ // we define the image url
			req.file.filename
		}`,
        likes: 0,
        dislike: 0,
		usersLiked: [],
		usersDisliked: [],
    });
    sauce.save() // we register the sauce in the data base
    .then(()=>res.status(201).json({message : "Nouvelle sauce générée !"})) // the ressource has been created and we send the info to the frontend
    .catch((error)=>res.status(400).json({error}));
};

exports.getAllSauces = (req, res, next) => { // the function to get all sauces
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => { // the function to get one sauce
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => { // function to modify the datas of a sauce
	const sauceObject = req.file ? {
		...JSON.parse(req.body.sauce),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	} : { ...req.body };
  
	delete sauceObject._userId;
	Sauce.findOne({_id: req.params.id})
		.then((sauce) => {
			if (sauce.userId != req.auth.userId) { // if the user is not authorized we send an error message
				res.status(401).json({ message : "Vous n'êtes pas autorisé(e) à modifier cette référence"});
			} else {
				Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id}) // if the user is authorized we modify the sauce datas
				.then(() => res.status(200).json({message : 'Sauce modifiée!'}))
				.catch(error => res.status(401).json({ error }));
			}
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
 };

 exports.deleteSauce = (req, res, next) => { // function to delete one sauce
	Sauce.findOne({ _id: req.params.id})
		.then((sauce) => {
			if (sauce.userId != req.auth.userId) {
				res.status(401).json({message: "Vous n'êtes pas autorisé(e) à modifier cette référence"});
			} else {
				const filename = sauce.imageUrl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					Sauce.deleteOne({_id: req.params.id})
						.then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
						.catch(error => res.status(401).json({ error }));
				});
			}
		})
		.catch( error => {
			res.status(500).json({ error });
		});
 };

 exports.likeDislikeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (req.body.like == 1){
            Sauce.updateOne(
            {$push: {usersLiked: req.auth.userId},
            $inc: {likes: +1}}
            )
            .then(() => res.status(200).json({message: 'Votre amour pour cette sauce est enregistré !'}))
            .catch(error => res.status(400).json({error})); 
        } else if (req.body.like == 0 && sauce.usersLiked.includes(req.auth.userId)) {
                Sauce.updateOne(
                    {_id: req.params.id},
                    {$pull: {usersLiked: req.auth.userId},
                    $inc: {likes: -1}}
                )
                .then(() => res.status(200).json({message: 'Votre souhait de ne plus soutenir cette sauce est pris en compte !'}))
                .catch(error => res.status(400).json({error}));
            } else if (req.body.like == 0 && sauce.usersDisliked.includes(req.auth.userId)){
                Sauce.updateOne(
                    {_id: req.params.id}, 
                    {$pull: {usersDisliked: req.auth.userId},
                    $inc: {dislikes: -1}}
                )
                .then(() => res.status(200).json({message: "Votre changement d'avis pour cette sauce est enregistré !"}))
                .catch(error => res.status(400).json({error}));
            } else {
                if (req.body.like == -1) {
                    Sauce.updateOne(
                        {_id: req.params.id}, 
                        {$push: {usersDisliked: req.auth.userId},
                        $inc: {dislikes: +1}}
                    )
                    .then(() => res.status(200).json({message: 'Votre non appétence pour cette sauce est enregistrée !'}))
                    .catch(error => res.status(400).json({error}));  
                }
            }
            

        
    })
    .catch(error => res.status(400).json({error}));
 }
