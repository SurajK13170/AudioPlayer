const mongoose  = require('mongoose')

const tweetSchema = mongoose.Schema({
    title:{type:String, required:true},
    chapter_Number:{type:String,required:true},
    duration:{type:String,required:true}
})

const tweetModel = mongoose.model('Chapter', tweetSchema)

module.exports={tweetModel}