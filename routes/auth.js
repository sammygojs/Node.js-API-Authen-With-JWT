const router = require('express').Router()
const User = require(`../models/User`)

router.post('/register', async (req,res)=>{
    console.log(`name:` ,req.body.name)
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