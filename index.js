const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))


const port = process.env.PORT || 3000
app.listen(port, (err)=>{
    if(!err){
        console.log('server is running on', 'http://localhost:'+port)
    }
})