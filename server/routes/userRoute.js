const express = require('express')
const userController = require("../controllers/userController")
const router = express.Router()

router.post("/createUser", userController.createUser)

router.get("/getAllUsers",userController.getAllUsers)



module.exports = router