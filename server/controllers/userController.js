const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { name, email, password, contactNumber, address } = req.body
    try {

        if (!name || !email || !password) {
            return res.status(400).send({ msg: "Please provide name, email and password", success: false })
        }

        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            return res.status(409).send({ msg: "User already exists", success: false })
        }

        await User.create({ name, email, password, contactNumber, address })

        return res.status(201).send({ msg: "User Registerd Successfully", success: true })

    } catch (error) {

        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }

}


const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const getUser = await User.findOne({ where: { email } })

        if (!getUser) {
            return res.status(400).send({ msg: "Invalid credentials", success: false })
        }

        const checkPassword = await bcrypt.compare(password, getUser.password)

        if (!checkPassword) {
            return res.status(400).send({ msg: "Invalid credentials", success: false })
        }

        const loggedUser = {
            id: getUser.id,
            role: getUser.role
        }

        const token = jwt.sign(loggedUser, process.env.SECRET_KEY)

        return res.status(200).send({ msg: "User Login Successfully", success: true, token: token })

    } catch (error) {

        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'name', 'email', 'address'] })
        return res.status(200).send({ users: users, success: true })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }

}

const getUserInfo = async (req, res) => {

    const userId = req.user.id

    try {
        const user = await User.findOne({ where: { id: userId }, attributes: ['id', 'name', 'email', 'contactNumber', 'address', 'role'] })

        if (!user) {
            return res.status(400).send({ msg: "User id not Found", success: false })
        }

        return res.status(200).send({ success: true, user: user })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }

}

const updateUser = async (req, res) => {

    const ID = req.params.ID
    const { name, contactNumber, address } = req.body

    try {
        const [updatedUser] = await User.update({ name, contactNumber, address }, { where: { id: ID } })

        if (updatedUser === 0) {
            return res.status(400).send({ msg: "User Not Found" })
        }

        return res.status(200).send({ msg: "User updated Successfully", success: true })


    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })
    }

}


const deleteUser = async (req, res) => {
    const ID = req.params.ID

    try {
        const deletedUser = await User.destroy({ where: { id: ID } })
        if (!deletedUser) {
            return res.status(400).send({ msg: "User Not Found", success: true })
        }

        return res.status(200).send({ msg: "User Deleted Successfully", success: true })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }
}




module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers,
    updateUser,
    deleteUser
}