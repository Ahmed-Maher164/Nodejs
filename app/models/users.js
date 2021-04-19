const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserScheme = new mongoose.Schema({
    firstname:String ,
    lastname:String,
    dob:Date,
    password:String,

    gender:{
        type: String,
        required: true,
        enum: ['Male', 'Female']
            },

    email: {type:"string"}
})
UserScheme.methods.calcAge =  function () {
    var ageDifMs = Date.now() - this.dob.getTime();
    console.log("ageDifMs",ageDifMs)
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    console.log("ageDifMs",ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
UserScheme.statics.search = function search (gender, cb) {
     this.count({gender:gender},cb);
}

UserScheme.pre('save', function(next) {
    // now we set user password to hashed password
    if (this.isNew)
    {
        bcrypt.hash(this.password,10,(err,hashedPass)=>{
            this.password = hashedPass
            next()
        })
    }
    else
    {
        next()
    }
});
const UserModel = mongoose.model("User",UserScheme)

module.exports= UserModel