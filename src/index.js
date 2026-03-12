import "dotenv/config"
import connectDB from "./db/index.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000)
    console.log(`server is running at port: ${process.env.PORT}`);
    
})
.catch((err) => {
    console.log("MONGODB Connection failed",err);
    
})























/*
import express from "express"

const app = express()

(async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("err:", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`)
        })

    } catch (error) {

        console.error("Error:", error)
        throw error

    }
})()
    */