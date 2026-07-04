import express from "express"
import restaurantRoute from "./routes/restaurant.route.js"
import cors from 'cors'

const app = express()


import mongoose from "mongoose"
import { userRoute } from "./routes/user.route.js"
mongoose.connect('mongodb+srv://rajatkumarpanipat2004_db_user:nOIB4hTknHXrk5pK@cluster0.ji0w3jb.mongodb.net/')
.then((resp)=>{console.log("database Connected")})
.catch((err)=>{"not connected"})

app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
    console.log("i am middleware haahaahaa") // Middleware
    next()
})
app.use('/sam',(req,res,next)=>{
    console.log("Route middle ware")     // Route Middleware
    next()
})


app.get("/",(req,res)=>{
    res.send("hello rajat")
})
app.get("/sam",(req,res)=>{
    res.send("hello sam")
})

restaurantRoute(app)
userRoute(app)
const Port = 8080
app.listen(Port,()=>{
    console.log(`server is running on Port :${Port}`)
})



// nOIB4hTknHXrk5pK
// rajatkumarpanipat2004_db_user
