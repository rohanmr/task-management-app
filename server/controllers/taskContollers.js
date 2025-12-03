
const Task = require("../models/taskModel")


const createTask = async (req, res) => {
    console.log(req.body)
    try {
        const newTask = await Task.create(req.body)
        if (newTask) {
            res.status(201).send({ msg: "Task Created Succesfully", success: true })
        } else {
            res.send(400).send({ msg: "Error While Task Creating", success: false })
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error", success: false })

    }
}

//We can find all data with this and also find or send spacific fields data also.

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ attributes: ['id', 'title', 'description', 'status', 'priority', 'startDate', 'endDate'] })
        res.status(200).send({ taks: tasks, success: true })

    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error", success: false })
    }
}

const getTaskById = async (req, res) => {
    const id = req.params.ID
    try {
        const task = await Task.findByPk(id)
        if (!task) {
            res.status(400).send({ mes: "Task Not Found" })
        }
        res.status(200).send({ task: task, success: true })

    } catch (error) {
        res.status(500).send("Internal Server Error")

    }
}


const queryTaskTitle = async (req, res) => {

    const { titelName } = req.query

    try {
        const taskByTitel = await Task.findOne({ where: { title: titelName } })

        if (!taskByTitel) {
            res.status(400).send({ msg: 'Task Not Found', success: false })

        }

        res.status(200).send({ task: taskByTitel, success: true })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}


const updateTask = async (req, res) => {
    const ID = req.params.ID
    const { status, priority, startDate, endDate } = req.body
    console.log(req.body)
    console.log(ID)

    try {
        const [updatedTask] = await Task.update({ status, priority, startDate, endDate }, { where: { id: ID } })

        if (updatedTask === 0) {
            res.status(400).send({ msg: "Task Not Found" })
        }

        res.status(200).send({ success: true, msg: "Task Updated Successfully" })


    } catch (error) {
        res.status(500).send("Internal Server Error")

    }
}

const deleteTask = async (req, res) => {
    const ID = req.params.ID

    try {
        const deletedTask = await Task.destroy({ where: { id: ID } })

        if (!deletedTask) {
            res.status(400).send({ msg: "Task Not Found", success: false })
        }
        res.status(200).send({ msg: "Task Deleted Succesfully", success: true })

    } catch (error) {
        res.status(500).send("Internal Server Error")

    }
}


module.exports = { createTask, deleteTask, getAllTasks, getTaskById, updateTask, queryTaskTitle }