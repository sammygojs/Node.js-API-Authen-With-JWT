const express = require('express')
const app = express()
const mongoose = require(`mongoose`)
const dotenv = require(`dotenv`)
dotenv.config()
app.use(express.json())
//import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
//connect mongo
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser:true
    }
    );
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });

app.use(`/api/user`, authRoute)
app.use('/api/posts', postRoute)




app.listen(3000,()=>{console.log(`server running on 3000`)})