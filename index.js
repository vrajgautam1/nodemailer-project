const express = require("express")
const app = express()
const mainRouter = require("./src/routers/index")
const { swaggerUi, swaggerSpec } = require("./config/swagger");

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(mainRouter)
app.use("/swaggerDocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000
app.listen(port, (err)=>{
    if(!err){
        console.log('server is running on', 'http://localhost:'+port)
    }
})