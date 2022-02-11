const router = require('express').Router()
const User = require(`../models/User`)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation,loginValidation} = require('../validation/userValidation')
var obj = {one : `invalid mail`, two : `wrong password`, three : "logged in", four:"mail already exists",}

//REGISTER
router.post('/register', async (req,res)=>{
    // console.log(`name:` ,req.body.name)
    //validate the data before we put into db
    const {error} = registerValidation(req.body)
    if(error) {
        res.send(error.details[0].message)
        return 
    }
    
    //checking if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) {
        res.send(obj.four)
        return 
    }

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
    console.log(`req.body: `,req.body)
    const {error} = loginValidation(req.body)
    if(error){
        console.log('inside 1st loop')
        res.send(error.details[0].message)
        return
    } 
    console.log('error', error)
    console.log('1 validation done')

    //checking if email exists
    const user =await User.findOne({email:req.body.email})
    console.log('user', user)
    if(!user) {
        console.log('obj.one', obj.one)
        // console.log('vars.details[0].message', vars.details[0].message)
        res.send(obj.one)
        return
    }
    console.log('2 validation done')

    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    console.log('validPass', validPass)
    if(validPass===false)
    {
        console.log('inside validPass')
        console.log('obj.two', obj.two)
        res.send(obj.two)
        return 
    } 
    console.log('3 validation done')
    
    //create and assign the token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token)
    // .send(token)
    return res.send(obj.three)

})




module.exports =  router