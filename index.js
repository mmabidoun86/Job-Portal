// // require('dotenv').config()
// // const express = require('express')
// // const app = express()
// // const bodyParser = require('body-parser')
// // const Joi = require('joi')
// // const { v4: uuidv4 } = require('uuid')
// // const sendGrid = require('@sendgrid/mail')
// // sendGrid.setApiKey(process.env.SENDGRID_API_KEY)


// // const customerStore = [
// //     //{
    
// // //     id
// // //     lastname
// // //     firstname
// // //     email
// // //     phone
// // //     Password
// // //     status: "in-active/true"
// // //     registerDate
    
// // // }
// // ]

// // const otpStore = [
// //     // {
// //     //    id:
// //     //    otp:
// //     //    email:
// //     //    date
// //     // }
// // ]
// // const jobApplicationStore = [
// //     // {
// //     //    fullname: "",
// //     //    address: "",
// //     //    email: ""
// //     //    jobId: ""
// //     //    yearsOfExperiece: "",
// //     //    qualifications: "",
// //     //    status: 
 
// //     // }
// // ]

// // app.use(bodyParser.json())


// // app.get('/', (req, res) => {
    
// //     res.status(200).json({
// //         status: true,
// //         message: 'Welcome, Login or Register.'
// //     })
// // })


// // app.post('/register', (req, res) => {

// //     const { lastname, firstname, email, phone, password } = req.body

// //     const validateSchema = Joi.object({

// //         lastname: Joi.string().min(3).max(20).required(),
// //         firstname: Joi.string().min(3).max(20).required(),
// //         email: Joi.string().email().required(),
// //         phone: Joi.string().min(3).max(20).required(),
// //         password: Joi.string().min(3).max(20).required()

// //     })
// //     const {value, error} = validateSchema.validate(req.body)
// //     if(error !== undefined){
// //         return res.status(400).json({
// //             status: false,
// //             message: error.details[0].message
// // })
// //     }

// //     const isEmailOrPhoneAlreadyExist = customerStore.find(customer => customer.email === email || customer.phone === phone)
// //         if(isEmailOrPhoneAlreadyExist){
// //             return res.status(400).json({
// //                 status: false,
// //                 message: "Email or Phone already registered"
// //             })
// //         }

// //         const customer = {
// //             id: uuidv4(),
// //             lastname,
// //             firstname,
// //             email,
// //             phone,
// //             // salt: responseSalt,
// //             // password: responseHash,
// //             status: "in-active",
// //             registeredDate: new Date()
// // }        
// //     customerStore.push(customer)

// //     const otp = Math.floor(10000 + Math.random() * 90000)
// //     const tempOtp = {
// //         id: uuidv4(),
// //         otp,
// //         email,
// //         date: new Date()
// //     }
// //     otpStore.push(tempOtp)
// //     // send otp to email

// //     const msg = {
// //         to: email,
// //         from: process.env.EMAIL_SENDER, // Use the email address or domain you verified above
// //         subject: 'Sending with Twilio SendGrid is Fun',
// //         text: `Hi ${firstname}, your OTP is ${otp}. Kindly note that this otp expire in 5 minutes`
// //       }
    
// // sendGrid
// // .send(msg)
// // .then(() => {
// //     console.log('Email sent')
// // })
// //   .catch((error) => { 
// //     console.log('It happened oo')
// //   })
    
// //     res.status(201).json({
// //         status: true,
// //         message: "An otp has been sent to your email, kindly provide it to complete your registration"
// //     })
// // })
// //     app.listen(process.env.PORT, () => {
// //         console.log(`Server is running on port Http://localhost:${process.env.PORT}`)
// //     })

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)


let customerStore = [
    //{
    
//     id
//     lastname
//     firstname
//     email
//     phone
//     Password
//     status: "in-active/true"
//     registerDate
    
// }
]

const otpStore = [
    // {
    //    id:
    //    otp:
    //    email:
    //    date
    // }
]
const jobApplicationStore = [
    // {
    //    fullname: "",
    //    address: "",
    //    email: ""
    //    jobId: ""
    //    yearsOfExperiece: "",
    //    qualifications: "",
    //    status: 
 
    // }
]

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Belove Customer, Welcome to Sharetel. Login or Register'
    })
})

app.post('/register', (req, res) => {

    const {lastname, firstname, email, phone, password} = req.body

    const schema = Joi.object({
        lastname: Joi.string().required(),
        firstname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().required()
    })
    const{value, error} = schema.validate(req.body)
    if(error !== undefined) {
        res.status(400).json({
            status: false,
            message: error.detail[0].message
        })
        return
    }

    const isEmailOrPhoneAlreadyExist = customerStore.find(customer => customer.email === emall || customer.phone === phone)
    if(isEmailOrPhoneAlreadyExist){
        res.status(400).json({
            status: error,
            message: 'Email or Phone number already exist'
        })
        return
    }

    const customer = {
        id: uuidv4,
        lastname,
        firstname,
        email,
        statu: 'in-active',
        phone,
        createdDate: new Date()
    }
    customerStore.push(customer)

    const otp = generateOtp()
    const tempOtp = {
        id: uuidv4,
        lastname,
        email,
        otp, 
        createdDate: new Date()
    }
    otpStore.push(tempOtp)

    sendEmail(email, 'send OTP', `Dear esteem ${lastname}, your OTP is ${Otp}. kindly check your email` )
    
    res.status(201).json({
        status: 'success',
        message: 'an otp has been sent to your email',
        data: customerStore
    })
})

app.get('/verify/:email/:otp', (req, res) => {
    const {email, otp} = req.params
    if(!email || !otp){
        res.status(400).json({
            status: false,
            message: 'Email or Otp required'
        })
    }
    const customer = otpStore.find(data => data.otp === otp && data.email === email)
    if(!customer){
        res.status(400).json({
            status: false,
            message: 'Invalid OTP',
            customer: customer
        })
        return
    }
    // check otp expiration time
    const timeDifference = new Date() - new Date(customer.date)
    const timeDifferenceInMinutes = Math.ceil(timeDifference / (1000 * 60))
    if(timeDifferenceInMinutes > 5){
        res.status(400).json({
            status: false,
            message: 'OTP expired'
        })
        return
    }

    //set status active
    const newCustomerStore = customerStore.map(data => {
        if(data.email === email){
            data.status = 'active'
        }
        return newCustomerStore
    })
    
    customerStore = [...newCustomerStore]

    res.status(200).json({
        status: true,
        message: 'OTP verified successfully',
        data: customerStore 
    })
})

//resend otp

app.get('/resend-otp/:email', (req, res) => {
    const {email} = req.params
    if(!mail){
        res.status(400).json({
            status: false,
            msg: 'email is required'
        })
        return
    }

    const customer = customerStore.find(data => data.email === email)
    if(!customer){
        res.status(400).json({
            status: false,
            msg: 'invalid email'
        })
        return
    }

    const otp = generateOtp()
    const tempOtp = {
        id: uuidv4(),
        otp,
        email,
        date: new Date()
    }

    otpStore.push(tempOtp)

    // sending otp to customer email

    sendEmail(email, 'Resend OTP', `Dear esteem ${lastname}, your new OTP is ${Otp}.`)
    
    res.status(400).json({
        status: true, 
        msg: 'Otp resent successfully'
    })
})

app.get('/customers', (req, res) => {
    const {apikey} = req.headers
    if(!apikey || apikey !== process.env. API_KEY){
        res.status(401).json({
            status: false,
            msg: 'Unathurized'
        })
        return
    }
    res.status(200).json({
        status: true,
        data: customerStore
    })
})
const sendEmail = (email, subject, text) => {
    const msg = {
        to: email,
        from: process.env.EMAIL_SENDER,
        subject: subject,
        text: text
    }

    sendGrid
    .send(msg)
    .then(() => {
        console.log('email sent successfully')
    })
    .catch((error) => {
        console.log('an error occured')
    })
}
const generateOtp = () => {
    return Math.floor(10000 + Math.random() * 90000)
}
app.listen(process.env.PORT, () => {
    console.log(`This server is host on ${process.env.PORT}`)
})
