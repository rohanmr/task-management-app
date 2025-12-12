const express = require('express')
const assignTaskController = require("../controllers/assignTaskController")
const { admin, auth } = require("../middleware/authMiddleware")
const router = express.Router()


// /assignTask

router.post('/assignTask', auth, admin, assignTaskController.assignTask)

// get all tasks by user /getTasksByUsers
router.get('/getTaskByUsers', auth, assignTaskController.getTaskByUsers)

// /getTasksByUserId/:userID
router.get('/getTaskByUser/:userId', auth, admin, assignTaskController.getTaskByUserID)

// /updateAssignTask

router.put("/updateAssignTask/:taskId", auth, assignTaskController.updateAssignTask)

// /deleteAssignTask

router.delete("/deleteAssignTask/:asTaskId", auth, admin, assignTaskController.deleteAssignTask)












module.exports = router