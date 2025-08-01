const db = require("../models")
const Users = db.Users
const {RegisterSchema} = require("../validations/userValidations");
const bcrypt = require("bcrypt");

module.exports.register = async(req, res, next)=>{
    let{error} = RegisterSchema.validate(req.body)

    if(error){
        return res.status(400).json({error: error.message})
    }

    let{name, username, email, companyName} = req.body

    const userExists = await Users.findOne({
        where:{email:email}
    })

    if(userExists){
        return res.status(400).json({error: "user already exists"})
    }

    const userCreated = await Users.create({
        name: name,
        username: username,
        email: email,
        companyName: companyName
    })

    res.status(200).json({success: "user Created", user: userCreated})

    next()
}