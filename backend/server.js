const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./db/conn.js")
const app = express();
const multipleOption = require("./routes//MultipleOption")


//middleware
dotenv.config()
connectDB()
app.use(express.json())
app.use(cors())

// Multiple Option
app.get("/", (req, res) => {
    res.send("Server Running")
})
app.use("/api/multipleOption", multipleOption)




const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log("Server Running on Port 8001")
})