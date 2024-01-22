const express = require('express'); 
const router = express.Router();
const controller = require("../Controllers/userController")
const upload = require("../multerconfig/storageConfig")

// yha wo hi name dena h jo frontend pr de rkha h 
router.post("/user/register",upload.single("profile"),controller.userregister)
router.post("/user/update",upload.single("profile"),controller.updateUser)

router.get('/user',controller.getUser)

router.get('/user/:id',controller.getSingleUser)
router.get('/userdelete/:id',controller.deleteUser)

router.get('/updatestatus/:id',controller.updateStatus)
router.get('/editinfo/:id',controller.editInfo)

module.exports ={user:router}