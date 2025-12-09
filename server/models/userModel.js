const { DataTypes } = require("sequelize")
const bcrypt = require('bcryptjs')

const { sequelize } = require("../config/db")

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactNumber: {
        type: DataTypes.STRING,

    },

    address: {
        type: DataTypes.STRING,

    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: 'user'
    }


}, { tableName: "users", timestamps: true })


User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})


module.exports = User