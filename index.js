const express = require('express')
const mongoose = require('mongoose')
const {connection} = require('./db')
const {userRouter} = require('./router/User.route')
const app = express()
app.use(express.json())

app.use('/api/user', userRouter)


app.listen(8080, async()=>{
    try{
        connection
        console.log('connected to Data base')
    } catch(err){
        console.log('can not connect to DB')
    }
    console.log('connected')
})