const mongoose  = require('mongoose')

const tweetSchema = mongoose.Schema({
    title:{type:String, required:true},
    name:{type:String,required:true},
    image:{type:String,required:true}
})

const tweetModel = mongoose.model('Tweet', tweetSchema)

module.exports={tweetModel}