const jwt = require('jsonwebtoken')

module.exports = function auth(req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(400).send('access denied')

    try{
        const v = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user=v
        console.log("verified: ",v)
        next()
    }catch(err){
        res.status(400).send('invalid token')
    }
}