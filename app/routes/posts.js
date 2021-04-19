const express = require("express")
const Router = express.Router()
const PostsModel = require("../models/posts")
const RateModel = require("../models/rates")

Router.get("/",async (request,response)=>{
    try{
        let posts = await PostsModel.find({}).populate('user')
        return response.json(posts)
    }
    catch (err){
        return response.json(err)
    }
})

Router.post("/", (request,response)=>{
    console.log(request.body)
    const postData = request.body
    const postInstance = new PostsModel({title:postData.title,body:postData.body,user:postData.user})
    postInstance.save((err,postdata)=>{
        if (!err) return response.json(postdata)
        else return response.json({msg:"error ",body:err})
    })
})

Router.get("/:id",(request,response)=>{
    PostsModel.find({_id:request.params.id},(err, postData)=>{
        if (!err )
        {
            RateModel.find({onKey: request.params.id}
                ,(err, rateData)=>{
                    if (!err)
                    {
                        let rateSum=0
                        for(let i = 0 ; i<rateData.length;i++)
                        {
                            rateSum+=rateData[i].rating;
                        }

                        return  response.json({"postData":postData, "rate":rateSum/rateData.length })
                    }
                    else
                        return response.json("error")

                    // return  response.json(postData)
        })
        }
        else return response.json({msg:"error", data:err})
    })
})
Router.patch("/:id",(request,response)=>{
    const postData = request.body
    let postObject = {}
    if(postData.title) postObject.title=postData.title
    if(postData.body) postObject.body=postData.body
    if(postData.user) postObject.user=postData.user
    PostsModel.updateOne({_id:request.params.id},postObject,(err, postData)=>{
        if (!err )
        {
            return response.json({msg:"update successfully",data:postData})
        }
        else return response.json({msg:"error", data:err})
    })
})

Router.delete("/:id",(request,response)=>{

    PostsModel.deleteOne({_id:request.params.id},(err, postData)=>{
        if (!err )
        {
            return response.json({msg:"deleted successfully",data:postData})
        }
        else return response.json({msg:"error", data:err})
    })
})
module.exports = Router