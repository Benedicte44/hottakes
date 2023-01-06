// This file is used to controle the respect of email creation security rules in the signup user middleware

const emailValidator = require("email-validator"); // we import this package to use conditions on the email wording

emailValidator.validate("test@email.com");

module.exports = (req, res, next) => {
	if (emailValidator.validate(req.body.email)) {
		next();
	} else {
		return res.status(400).json({ error: `L'email est erroné` });
	}
};
