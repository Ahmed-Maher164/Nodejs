const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const RateScheme = new mongoose.Schema({
    rating:Number ,
    onKey: {
        type: Schema.Types.ObjectId,
        // required: true,
        refPath: "onModel"
    },
    onModel: {
        type: String,
        required: true,
        enum: ['User', 'Post']
    }
    ,
    user:
        {type: Schema.Types.ObjectId, ref: 'User'}

})
const RateModel = mongoose.model("Rate",RateScheme)
module.exports=RateModel