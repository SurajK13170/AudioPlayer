const mongoose  = require('mongoose')

const chapterSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    audio: {type: Object, required: true}
})

const courseSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    chapters: [chapterSchema]
})

const courseModel = mongoose.model('Course', courseSchema)

module.exports={courseModel}