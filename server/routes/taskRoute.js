const express = require('express')
const taskController = require('../controllers/taskContollers')
const { auth, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.post('/createTask', auth, admin, taskController.createTask)

router.get("/getAllTasks", auth, admin, taskController.getAllTasks)

router.get("/getTaskById/:ID", auth, taskController.getTaskById)

router.put("/updateTask/:ID", auth, admin, taskController.updateTask)

router.delete("/deleteTask/:ID", auth, admin, taskController.deleteTask)

router.get("/queryTaskTitel",auth, taskController.queryTaskTitle)


// New apis 
router.get('/getCompletdTasks',auth,admin, taskController.getCompletedTasks)

router.get('/getHighestPriorityTasks',auth, taskController.getHighestPriorityTasks)

router.get('/completedBetween',auth,admin, taskController.getTasksCompletedBetween)

// router.patch("/statusUpdate/:ID",)

// router.get("/getTasksByAssignedUsers,auth")

module.exports = router