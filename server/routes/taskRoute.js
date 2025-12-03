const express = require('express')
const taskController = require('../controllers/taskContollers')

const router = express.Router()

router.post('/createTask', taskController.createTask)
router.get("/getAllTasks", taskController.getAllTasks)
router.get("/getTaskById/:ID", taskController.getTaskById)
router.put("/updateTask/:ID", taskController.updateTask)
router.delete("/deleteTask/:ID", taskController.deleteTask)

router.get("/queryTaskTitel",taskController.queryTaskTitle)


// router.get("/taskOfUser")





module.exports = router