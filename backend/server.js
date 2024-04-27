const express = require('express')
const cors = require('cors')
const multer = require('multer')

const upload = multer({dest:'./uploads/'})


const app = express()

app.use(cors())

app.get('/',(req,res)=> {
    res.send('Test success. whimsical-captions-backend is up and running.')
})

// app.get('/secrets',(req,res) => {
//     res.status(200).send(JSON.stringify(process.env))
// })

const model = require('./controllers/model')
app.post('/genai', upload.single('image'), model.handleApiCall)


app.listen(5000,()=> {
    console.log("whimsical-captions-backend is up and running on port 5000")
})