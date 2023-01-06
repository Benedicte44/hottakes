// The middleware that will verify on each route it is defined on if the user is authorised to modify the datas with its token

const jwt = require("jsonwebtoken"); // we import the package jsonwebtoken

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; // we get the 2nd part of the token after the bearer word
		const tokenPayload = jwt.verify(token, process.env.KEY_TOKEN); // we validate the token if it matches with the random token secret, and we get the crypted datas
		const userId = tokenPayload.userId; // we get the user id contained in the payload

		req.auth = {
			// we give authentification details to the auth object that will be used in our app controllers
			// we add the user id on the request object
			userId: userId,
		};
		next();
	} catch (error) {
		res.status(401).json({ error });
	}
};
