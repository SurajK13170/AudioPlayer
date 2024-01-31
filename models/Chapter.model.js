const mongoose  = require('mongoose')

const chapterSchema = mongoose.Schema({
    title:{type:String, required:true},
    chapter_Number:{type:String,required:true},
    audio:{type:String, required:true},
    duration:{type:String,required:true}
})

const chapterModel = mongoose.model('Chapter', chapterSchema)

module.exports={chapterModel}