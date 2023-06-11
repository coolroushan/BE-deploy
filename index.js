const express=require("express")
const cors=require("cors")
const {connect}=require("./db")
const {userRouter}=require("./routes/user.route")
const { noteRouter } = require("./routes/note.route")
require("dotenv").config()

const app=express()
app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connect
        console.log("now DB is connected")
        console.log(`server is running at port ${process.env.port}`)
    } catch (error) {
        console.log(error.message)
    }
    
})