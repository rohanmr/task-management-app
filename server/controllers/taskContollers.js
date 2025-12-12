
const Task = require("../models/taskModel")

const { Op } = require('sequelize')


const createTask = async (req, res) => {
    const { title, description, status, priority, startDate, endDate } = req.body
    try {
        const newTask = await Task.create({ title, description, status, priority, startDate, endDate, createdBy: req.user.id })
        if (newTask) {
            return res.status(201).send({ msg: "Task Created Succesfully", success: true })
        } else {
            return res.send(400).send({ msg: "Error While Task Creating", success: false })
        }
    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }
}

//We can find all data with this and also find or send spacific fields data also.

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ attributes: ['id', 'title', 'description', 'status', 'priority', 'startDate', 'endDate'] })
        return res.status(200).send({ taks: tasks, success: true })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })
    }
}

const getTaskById = async (req, res) => {
    const id = req.params.ID
    try {
        const task = await Task.findByPk(id)
        if (!task) {
            return res.status(400).send({ mes: "Task Not Found" })
        }
        return res.status(200).send({ task: task, success: true })

    } catch (error) {
        return res.status(500).send("Internal Server Error")

    }
}


const queryTaskTitle = async (req, res) => {

    const { titelName } = req.query

    try {
        const taskByTitel = await Task.findOne({ where: { title: titelName } })

        if (!taskByTitel) {
            return res.status(400).send({ msg: 'Task Not Found', success: false })

        }

        return res.status(200).send({ task: taskByTitel, success: true })
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}


const updateTask = async (req, res) => {
    const ID = req.params.ID
    const { status, priority, startDate, endDate } = req.body

    try {
        const [updatedTask] = await Task.update({ status, priority, startDate, endDate }, { where: { id: ID } })

        if (updatedTask === 0) {
            return res.status(400).send({ msg: "Task Not Found" })
        }

        return res.status(200).send({ success: true, msg: "Task Updated Successfully" })


    } catch (error) {
        return res.status(500).send("Internal Server Error")

    }
}

const deleteTask = async (req, res) => {
    const ID = req.params.ID

    try {
        const deletedTask = await Task.destroy({ where: { id: ID } })

        if (!deletedTask) {
            return res.status(400).send({ msg: "Task Not Found", success: false })
        }
        return res.status(200).send({ msg: "Task Deleted Succesfully", success: true })

    } catch (error) {
        return res.status(500).send("Internal Server Error")

    }
}

const getCompletedTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { status: "Completed" } })

        return res.status(200).send({ tasks: tasks, success: true })

    } catch (error) {
        return res.status(500).send("Internal Server Error")

    }
}

const getHighestPriorityTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { priority: "Critical" } })
        return res.status(200).send({ tasks: tasks, success: true })

    } catch (error) {
        return res.status(500).send("Internal Server Error")

    }
}

const getTasksCompletedBetween = async (req, res) => {
    const { startDate, endDate } = req.query
    try {
        if (!startDate || !endDate) {
            return res.status(400).json({ error: "startDate and endDate are required" });
        }

        const tasks = await Task.findAll({ where: { status: "Completed" }, endDate: { [Op.between]: [new Date(startDate), new Date(endDate)] } })

        return res.status(200).send({ tasks: tasks, success: true })

    } catch (error) {
        return res.status(500).send("Internal Server Error")

    }
}









module.exports = {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask,
    queryTaskTitle,
    getCompletedTasks,
    getHighestPriorityTasks,
    getTasksCompletedBetween
}