require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')

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

app.use(bodyParser.json())


app.get('/', (req, res) => {
    
    res.status(200).json({
        status: true,
        message: 'Welcome to my API'
    })
})


app.post('/register', () => {
    const {lastname, firstname, email, phone, Password} = req.body
        const schema = Joi.object({
        lastname: Joi.string().min().max().required(),
        firstname: Joi.string().min().max().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min().max().required(),
        Password: Joi.string().min().max().required()
    });
    
    const {value, error} = schema.validate(req.body)
    if(error !== undefined){
        res.status(400).json({
            status: false,
            message: error
});
    }
});
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })