const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const PostScheme = new mongoose.Schema({
    title:String ,
    body:String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})


const PostModel = mongoose.model("Post",PostScheme)
module.exports=PostModel