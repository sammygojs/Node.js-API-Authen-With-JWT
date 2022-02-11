const router = require('express').Router()
const verify = require('./verifyToken')
const User = require(`../models/User`)

router.get('/',verify, async (req,res)=>{
    // if(req.user!="verified") return res.send('not verified')
    console.log("req.user._id: ", req.user._id)
    const id = req.user._id
    console.log("id: ", id)
    const user = await User.findOne({_id:req.user._id})
    // console.log('user', user)
    console.log("username: ",user.name)
    console.log("email: ",user.email)
    res.json({
        posts:{
            title:"my first post",
            description: "this is my first post and it's awesome"
        }
    })
})

module.exports = router