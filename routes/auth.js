const router = require('express').Router()
const User = require(`../models/User`)
const bcrypt = require('bcryptjs')
const { registerValidation,loginValidation} = require('../validation/userValidation')
const { append } = require('express/lib/response')

//REGISTER
router.post('/register', async (req,res)=>{
    // console.log(`name:` ,req.body.name)
    //validate the data before we put into db
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //checking if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    // console.log(user)
    // const savedUser = await user.save()
    // res.send(savedUser)
    try{
        // res.send('hello')
        console.log(user)
        const savedUser = await user.save()
        res.send({user: user._id})
    }catch(err){
        res.status(400).send(err)
    }
})

//LOGIN
router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    
    //checking if email exists
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email not found')
    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    res.send('logged in')

})


module.exports =  router