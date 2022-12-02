// The middleware that will verify on each route it is defined on if the user is authorised to modify the datas with its token

const jwt = require("jsonwebtoken"); // we import the package jsonwebtoken

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; // we get the 2nd part of the token after the bearer word
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // we validate the token if it matches with the random token secret
		console.log(decodedToken)
		const userId = decodedToken.userId; // we get the user id contained in the token
	
		console.log(userId);
		req.auth = { // we create the auth object that will be used in our app routes
			// we add the user id on the request object
			userId: userId,
		};
		next();
	} catch (error) {
		res.status(401).json({ error });
	}
};

