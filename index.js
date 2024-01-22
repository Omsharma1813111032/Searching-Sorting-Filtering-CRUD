require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use("/uploads",express.static("./uploads"))
const getCon = require("./DB/conn")
const { user } = require("./Router/routes")
app.use('/api/v1', user)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });




app.listen(process.env.PORT,()=>{console.log("Server Running at Port "+process.env.PORT )})