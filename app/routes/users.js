const express = require("express")
const Router = express.Router()
const UserModel = require("../models/users")
const PostModel = require("../models/posts")
const RateModel = require("../models/rates")
Router.get("/",(request,response)=>{
UserModel.find({}).then(( userData)=>{
        console.log(userData)
        return  response.json(userData)
    }).catch((err=>{return response.json({msg:"error", data:err}) }))
})



Router.post("/",(request,response)=>{
    console.log(request.body)
    const userData = request.body
    const userInstance = new UserModel({firstname:userData.firstname,lastname:userData.lastname,dob:userData.dob,email:userData.email,gender:userData.gender,password:userData.password})
    console.log(userInstance)
    userInstance.save().then((userdata)=>{
         return response.json(userdata)
    }).catch((err)=>{
     return response.json({msg:"error ",body:err})
    })
    console.log("users")
})



Router.get("/:id", async (request,response)=>{
    try{
        const menCount = await UserModel.search("Male")
        console.log(menCount)
        let user = await  UserModel.findById(request.params.id).lean()
        let user_posts = await PostModel.find({user:{ _id: request.params.id}}).lean()
        let user_rates = await RateModel.find({onKey: request.params.id}).lean()
            let rateSum=0
            for(let i = 0 ; i<user_rates.length;i++)
            {
                rateSum+=user_rates[i].rating;
            }
        user.user_posts=user_posts
        user.rate=rateSum/user_rates.length
        return  response.json(user)
    }
    catch (err){
            return  response.json(err)
    }
})


Router.patch("/:id",(request,response)=>{
    const userData = request.body
    let userObj = {}
    if(userData.firstname) userObj.firstname=userData.firstname
    if(userData.lastname) userObj.lastname=userData.lastname
    if(userData.dob) userObj.dob=userData.dob
    if(userData.email) userObj.email=userData.email
    UserModel.updateOne({_id:request.params.id},userObj).then(( userData)=>{
            return response.json({msg:"update successfully",data:userData})
    }).catch(err=>    response.json({msg:"error", data:err}))
})

Router.delete("/:id",(request,response)=>{

    UserModel.deleteOne({_id:request.params.id},(err, userData)=>{
        if (!err )
        {
            return response.json({msg:"deleted successfully",data:userData})
        }
        else return response.json({msg:"error", data:err})
    })
})



module.exports = Router