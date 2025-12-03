const User = require('../models/userModel')


const createUser = async (req, res) => {

    try {
        const newUser = await User.create(req.body)
        if (newUser) {
            res.status(201).send({ msg: "User Register Successfully", success: true })
        } else {
            res.send(400).send({ msg: "Error While user register", success: false })
        }

    } catch (error) {

        res.status(500).send({ msg: "Internal Server Error", success: false })

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







module.exports = { createUser, getAllUsers }