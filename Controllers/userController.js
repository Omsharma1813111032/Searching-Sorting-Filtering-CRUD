const moment = require("moment")
const User = require("../Models/userSchema")
// const moment = require("moment")
exports.userregister = async(req,res) => {
    // console.log(req.file)    
    // console.log("Backend wala h ",req.body)
    const file = req.file['filename']
    // console.log(req.file['filename'])    
    const {fname,lname,email,mobile,location,gender,status } = req.body

    if(fname==='' || lname==='' || email==='' || mobile==='' || location==='' || gender==='' || status==='' || file===''){
        res.status(400).json({Error:"All Input Required"})
    }
        
    try{
        const preuser = await User.findOne({email:email})
        if(preuser){
            res.status(400).json({Error:"User  already exists!"})
        } else{
            const datecreated = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
            const userData = new User({
                fname:fname,
                lname:lname,
                email:email,
                mobile:mobile,
                location:location,
                gender:gender,
                status:status,
                profile:file,
                datecreated:datecreated})
            await userData.save()
            res.status(200).json({msg:"registered successfully",userData})

        }

    }catch(err){
        res.status(400).json({Error:"somthing went wrong! "+err})
    }

}


exports.getUser = async(req,res) =>{
    // console.log(req.query)
    try{    

        const search = req.query.search || ""
        const gender = req.query.gender || ""
        const limit = req.query.limit || ""
        const status = req.query.status || ""
        const sort = req.query.sort || ""

        const query = {
            fname:{$regex:search,$options:"i"}
        }     
        
        if(gender){
            if(gender!=="All"){
                query.gender = gender
            }
        }

        if(status!=="All"){
            query.status=status
        }
   
        // console.log(query)
        
        let apiData = User.find(query)
       

        if(limit){
            apiData = apiData.limit(limit)
        }
        
        if(sort){
            if(sort==="desc"){
                apiData = apiData.sort("-fname")
            }else if(sort=="asc"){
                apiData = apiData.sort("fname")
            }else if(sort === "new"){
                apiData = apiData.sort("-datecreated")
            }else if(sort==="old"){
                apiData = apiData.sort("datecreated")
            }
        }

        const data = await apiData
        res.status(200).json({data})  

    }catch(err){
        res.status(400).json({err:err})
    }
}


exports.getSingleUser = async(req,res) =>{
    try{
        const data = await User.find({_id:req.params.id})
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({error:err})
    }
}

exports.deleteUser = async(req,res) =>{
    const {id} = req.params

    try{
        const response = await User.deleteOne({_id:id})
        res.status(200).json({msg:"Deleted",response})
    }catch(err){
        res.status(400).json({msg:"Something went wrong"})
    }

}

exports.updateStatus = async(req,res) =>{
    const {id} = req.params

    try{
        const data = await User.findById(id)
        console.log(data.status)

        if(data.status==='Active'){
            data.status="InActive"
        }else if(data.status==='InActive'){
            data.status="Active"
        }else{
            res.status(400).json({msg:"Error Something went wrong!!"})
        }

        await data.save();
        res.status(200).json({msg:"Yeah Done",data})      

    }catch(err){
        res.status(400).json({msg:"Error ",err})
    }
    

}


exports.editInfo  = async(req,res) =>{

    const {id} = req.params
        const data = await User.findById(id)
        res.status(200).json(data)
    try{
        
    }catch(er){
        res.status(400).json({msg:"Error ",err})
    }
    
    
}


exports.updateUser = async(req,res ) =>{
    try{
        
        // console.log(req.body._id)

        const data = await User.findByIdAndUpdate(req.body._id,req.body)
        console.log(data)
        res.status(200).json({msg:"Sahi work kr rha h ",data})



    }catch(err){    
        res.status(400).json({msg:"Error ",err})
   }
}