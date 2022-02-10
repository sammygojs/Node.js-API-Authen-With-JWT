const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/',verify,(req,res)=>{
    res.json({
        posts:{
            title:"my first post",
            description: "this is my first post and it's awesome"
        }
    })
})

module.exports = router