const mongoose = require("mongoose")

const getCon = async(req,res) => {
    const response  = await mongoose.connect("mongodb://localhost:27017/internshipProjectSearchPagination").then(()=>{console.log("DB Connected")}).catch((err)=>{console.log(err)})

}

getCon();