import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

// routes
import usersRoute from "./api/routes/users.js"
import videosRoute from "./api/routes/videos.js"
import commentsRoute from "./api/routes/comments.js"
import authRoute from "./api/routes/auth.js"

const app = express()
dotenv.config()




const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO)
        .then(() => { console.log("connected to db") })
        .catch((err) => { throw err })
}
app.use(cookieParser())
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Credentials": true})
    next()
})
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json())
// moudules
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/videos", videosRoute)
app.use("/api/comments", commentsRoute)


app.listen(process.env.PORT || 8800, () => {
    connect()
    console.log("connected to backend");
})
