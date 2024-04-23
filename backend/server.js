const express = require('express')

const app = express()

app.get('/',(req,res)=> {
    res.send('Test success. whimsical-captions-backend is up and running.')
})


app.listen(5000,()=> {
    console.log("whimsical-captions-backend is up and running on port 5000")
})