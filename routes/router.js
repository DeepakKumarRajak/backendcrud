const express = require('express');
const router = express.Router();
const users = require("../models/userSchema");


// router.get("/",(req,res)=>{
//     console.log("connect");
// })

router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {username,password,email,age,mobile,post,address} = req.body;

    if(!username || !password || !email || !age || !mobile || !post || !address){
        res.status(404).json("plz fill the data");
    }
    try{
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(404).json("this is already present");
        }else{
            const adduser = new users({
                username,password,email,age,mobile,post,address
            });

            await adduser.save();
            req.status(201).json(adduser);
            console.log(adduser);
            
        }
        
    }
    catch(error){
        res.status(404).json(error);
    }
})

module.exports = router;
