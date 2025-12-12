
const { where } = require('sequelize')
const { User } = require('../models')
const AssignTask = require('../models/assginTaskModel')
const Task = require('../models/taskModel')


const assignTask = async (req, res) => {
    try {
        const { taskId, userId } = req.body
        if (!taskId || !userId) {
            res.status(400).send({ msg: "Missing TaskID and UserId" })
        }

        await AssignTask.create({ taskId, userId, createdBy: req.user.id })

        res.status(200).send({ msg: "Task Assigned Successfully ", success: true })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })
    }

}

const getTaskByUsers = async (req, res) => {
    try {
        const assignedTask = await AssignTask.findAll({
            include: [
                {
                    model: Task,
                    as: "task",
                    attributes: ["id", "title", "status", "priority", "startDate", "endDate"]
                },
                {
                    model: User,
                    as: 'assignedBy',
                    attributes: ['name', 'role']
                }

            ]
        })
        return res.status(200).send({ assignedTasks: assignedTask })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }
}


const getTaskByUserID = async (req, res) => {
    const { userId } = req.params
    console.log(userId)

    try {
        const assignedTask = await AssignTask.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Task,
                    as: "task",
                    attributes: ["id", "title", "status", "priority", "startDate", "endDate"]
                },
                {
                    model: User,
                    as: 'assignedBy',
                    attributes: ['name', 'role']
                }

            ]
        })

        return res.status(200).send({ assignedTasks: assignedTask })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }

}


const updateAssignTask = async (req, res) => {
    const { taskId } = req.params
    const { status } = req.body

    try {
        if (!status) {
            return res.status(400).send({ msg: "Status Is Require" })
        }
        const [updateTask] = await Task.update({ status: status, updatedBy: req.user.id }, { where: { id: taskId } })


        if (updateTask === 0) {
            return res.status(400).send({ msg: "Task Not Found" })
        }

        await AssignTask.update({ updatedBy: req.user.id }, { where: { taskId } })


        return res.status(200).send({ msg: "Task updated successfully", success: true })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }
}


const deleteAssignTask = async (req, res) => {
    const { asTaskId } = req.params
    try {
        const deleteAssignTask = await AssignTask.destroy({ where: { id: asTaskId } })

        if (!deleteAssignTask) {
            return res.status(400).send({ msg: "Task not found" })
        }

        return res.status(200).send({ msg: "Assigned Task deleted suucessfully", success: true })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }

}









module.exports = { assignTask, getTaskByUserID, updateAssignTask, getTaskByUsers, deleteAssignTask }