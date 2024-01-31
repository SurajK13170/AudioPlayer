const express = require('express')
const mongoose = require('mongoose')
const {connection} = require('./db')
const articalRoute = require("./router/Artical.route")
const tweetRoute = require("./router/Tweet.route")
const courseRoute = require("./router/Course.route")
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', courseRoute)

app.use('/api', articalRoute)
app.use('/api', tweetRoute)




app.listen(8080, async()=>{
    try{
        connection
        console.log('connected to Data base')
    } catch(err){
        console.log('can not connect to DB')
    }
    console.log('connected')
})