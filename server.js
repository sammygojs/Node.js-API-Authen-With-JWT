const express = require('express')
const app = express()
const mongoose = require(`mongoose`)
// const dotenv = require(`dotenv`)
// dotenv.config()
app.use(express.json())
//connect mongo
//process.env.MONGODB_URI
mongoose.connect(
    "mongodb://Sumit:secret1234@localhost:27017/usersDb?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {
        useNewUrlParser:true
    }
    );
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
//import routes
const authRoute = require('./routes/auth')

app.use(`/api/user`, authRoute)

app.listen(3000,()=>{console.log(`server running on 3000`)})