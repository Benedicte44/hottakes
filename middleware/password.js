// This file is used to controle the respect of password creation security rules in the signup user middleware

const passwordValidator = require("password-validator"); // we import this package to use conditions on the password creation

const passwordSchema = new passwordValidator(); // we generate a new password schema
// This schema has to fullfill these rules :
passwordSchema
	.is()
	.min(8) // Minimal length 8
	.is()
	.max(100) // Maximal length 100
	.has()
	.uppercase() // Have to contain uppercase letters
	.has()
	.lowercase() // Have to contain lowercase letters
	.has()
	.digits(2) // Have to contain minimum 2 digits
	.has()
	.not()
	.spaces() // Does not have to contain space
	.is()
	.not()
	.oneOf(["Passw0rd", "Password123"]); // Must not contain these passwords

// We verify the conformity of the user password vs the schema defined
module.exports = (req, res, next) => {
	if (passwordSchema.validate(req.body.password)) {
		next();
	} else {
		return res
			.status(400)
			.json({
				error: `Le mot de passe n'est pas assez fort : ${passwordSchema.validate(
					req.body.password,
					{ list: true }
				)}`,
			});
	}
};
