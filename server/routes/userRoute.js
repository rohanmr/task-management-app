const express = require('express')
const userController = require("../controllers/userController")
const router = express.Router()
const { auth, admin } = require("../middleware/authMiddleware")

router.post("/register", userController.register)

router.post("/login", userController.login)

router.get("/getUserInfo", auth, userController.getUserInfo)

router.put("/updateUser/:ID", auth, userController.updateUser)



//Admin Access Routes

router.delete("/deleteUser/:ID", auth, admin, userController.deleteUser)

router.get("/getAllUsers", auth, admin, userController.getAllUsers)



module.exports = router