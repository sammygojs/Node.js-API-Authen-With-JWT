const router = require('express').Router()
const User = require(`../models/User`)
const { registerValidation } = require('../validation/userValidation')
const { loginValidation } = require('../validation/userValidation')

//Validation

router.post('/register', async (req,res)=>{
    // console.log(`name:` ,req.body.name)
    //validate the data before we put into db
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //checking if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    // console.log(user)
    // const savedUser = await user.save()
    // res.send(savedUser)
    try{
        // res.send('hello')
        console.log(user)
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports =  router