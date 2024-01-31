const mongoose  = require('mongoose')

const articalSchema = mongoose.Schema({
    title:{type:String, required:true},
    image: {type:String, required:true},
    description: {type:String, required:false},
    content: {type:String, required:false}
})


const articalModel = mongoose.model('Artical', articalSchema)

module.exports={articalModel}