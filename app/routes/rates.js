const express = require("express")
const Router = express.Router()
const RateModel = require("../models/rates")
const PostModel = require("../models/posts")
const UserModel = require("../models/users")

Router.post("/",async (request,response)=>{
    console.log(request.body)
    const rateData = request.body
    const rateInstance = new RateModel({rating:rateData.rating,onKey:rateData.onKey,onModel:rateData.onModel,user:rateData.user})
    try {
        const savedRaate= await   rateInstance.save()
        return response.json(savedRaate)
    }
    catch (err){
        return response.json(err)
    }

})


Router.get("/:id",async (request,response)=> {
try{
    let rate = await RateModel.findById( request.params.id).populate('user').populate('post').lean()
    let rateModelData
                if (rate.onModel == "Post")
                {
                    rateModelData =     await PostModel.findById(rate.onKey).lean()
                }
            else  if (rate.onModel == "User")
                {
                    rateModelData =     await  UserModel.findById(rate.onKey).lean()
                }
                rate.rateModelData = rateModelData
    return response.json({rate:rate})
}
catch (err){
    return response.json(err)

    }
        //     .then( ( rateData) => {
    //         for (let i = 0 ; i< rateData.length; i++)
    //         {
    //             if (rateData[i].onModel == "Post")
    //             {
    //                  PostModel.findById(rateData[i].onKey).then((err, postData)=>{
    //                      let obj = {rateData:rateData[i],postData:postData}
    //                      console.log(obj)
    //                      data.posts.push(obj)
    //
    //                      if(i==rateData.length-1)
    //                      {
    //                          console.log("finallllllllllllllllly")
    //                          return response.json(data)
    //                      }
    //                  })
    //
    //             }
    //         else  if (rateData[i].onModel == "User")
    //             {
    //                 UserModel.findById(rateData[i].onKey, ((err, userData)=>{
    //                     console.log(rateData[i].onKey)
    //                     console.log(userData , "usrrrrrrrrr data")
    //                     let obj = {rateData:rateData[i], UserData:userData}
    //                     data.users.push(obj)
    //                     console.log("here")
    //                     if(i==rateData.length-1)
    //                     {
    //
    //                         console.log("finallllllllllllllllly")
    //                         // console.log(obj)
    //                         return response.json(data)
    //                     }
    //
    //                 }))
    //             }
    //         }
    // })
    //     .catch(err =>{
    //     return response.json({err:err})
    // } )
})
module.exports = Router