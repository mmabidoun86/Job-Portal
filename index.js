require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Joi = require('joi');

// const customerStore = {
    
//     id
//     lastname
//     firstname
//     email
//     phone
//     Password
//     status: "in-active/true"
//     registerDate
    
// }

app.use(bodyParser.json());


app.get('/', (req, res) => {
    
    res.status(200).json({
        status: true,
        message: "Welcome to my API"
    })
})


app.post('/register', () => {
    const {lastname, firstname, email, phone, Password} = req.body
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)

    const schema = Joi.object({
        lastname: Joi.string().min(3).max(20).required(),
        firstname: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(20),
        phone: Joi.string().min(3).max(20).required(),
        Password: Joi.string().min(3).max(20).required()
    })
    const {value, error} = schema.validate(req.body)
    if(error !== undefined){
        res.status(400).json({
            status: false,
            error: error,
            message: error.details.mssage
        })
    }
})