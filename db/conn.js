const mongoose = require("mongoose");
const DBURL = process.env.MONGO_URL;

mongoose.connect(DBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection start")).catch((error)=>console.log(error.message));
