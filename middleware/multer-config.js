// Middleware to param the running of files send to the API by the user as images

const multer = require("multer"); // we import the multer package

const MIME_TYPES = {
	// our mime type correspondence
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

const storage = multer.diskStorage({
	// to register on the disk
	destination: (req, file, callback) => {
		callback(null, "images"); // to register the files in the folder images
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_"); // This method give a name to the file with its originalname replacing the spaces by '_'
		const extension = MIME_TYPES[file.mimetype]; // we give an extension to the file name thanks to its mime type
		callback(null, name + Date.now() + "." + extension); // the entire fillname is created, addind a timestamp
	},
});

module.exports = multer({ storage: storage }).single("image"); // we export our multer middleware with its storage object, and a unique file that is an image
