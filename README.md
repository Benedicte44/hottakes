# HOTTAKES API

HOTTAKES is an app opened to identified users. Once connected, they can download there favorite sauce (with its image, name, description...), modify and delete it. 
Visitors can run, like or dislike the sauces edited on the app.
Here are the backend files to make the API works.

HOW TO MAKE IT WORKS ?

You have to install :
- node.js (https://nodejs.org/en/)
- express ('npm install' on your backend terminal)
- nodemon ('npm install' on your backend terminal)(once installed, you make it run on the backend with the command on your terminal : 'nodemon server')
- dotenv ('npm install' on your backend terminal)
- mongoose ('npm install' on your backend terminal)
- bcrypt ('npm install' on your backend terminal)
- mongoose-unique-validator ('npm install' on your backend terminal)
- jsonwebtoken ('npm install' on your backend terminal)
- multer ('npm install' on your backend terminal)
- helmet ('npm install' on your backend terminal)
- email validator ('npm install' on your backend terminal)
- express-rate-validator ('npm install' on your backend terminal)
- password-validator ('npm install' on your backend terminal)

You have to config a database for example in mongoDB Atlas.

For security reasons, the backend runs with environnement variables.
You have to create a ".env" file in the backend folder (you can use the ".env.template" file as model), giving content to these following variables :
- PORT = (here you indicate the port on which the backend will run ie : 3000)
- MDBBC = (here is the connecting string you find on the mongoDB cluster you have created to stock the app datas)
- KEY_TOKEN = (here you indicate the secret key for your token)

You have to create an "images" folder at your backend root.

HOW TO TEST IT ?
You can use POSTMAN or you can download the frontend here https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

THE API ROUTES :
- POST /api/auth/signup
        - Req body : { email: string, password: string }
- POST /api/auth/login
        - Req body : { email: string, password: string }
- GET /api/sauces
- GET /api/sauces/:id
- POST /api/sauces
        - Req body : { sauce: String, image: File }
- PUT /api/sauces/:id
        - Req body : EITHER Sauce as JSON OR { sauce: String, image: File }
- DELETE /api/sauces/:id
- POST /api/sauces/:id/like
        - Req body : { userId: String, like: Number }

