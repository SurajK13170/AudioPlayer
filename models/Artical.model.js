const mongoose  = require('mongoose')

const articalSchema = mongoose.Schema({
    title:{type:String, required:true},
    chapter_Number:{type:String,required:true},
    duration:{type:String,required:true}
})

const articalModel = mongoose.model('Artical', articalSchema)

module.exports={articalModel}