const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

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

        return res.status(200).send({ msg: "User Login Successfully", success: true })

    } catch (error) {

        return res.status(500).send({ msg: "Internal Server Error", success: false })

    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'name', 'email', 'address'] })
        res.status(200).send({ users: users, success: true })

    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error", success: false })

    }

}







module.exports = { register, login, getAllUsers }