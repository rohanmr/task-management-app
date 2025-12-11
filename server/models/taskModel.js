const { DataTypes } = require('sequelize')

const { sequelize } = require("../config/db")


const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("Pending", "InProgress", "Completed"),
        defaultValue: "Pending"
    },
    priority: {
        type: DataTypes.ENUM("Low", "Medium", "High", "Critical"),
        defaultValue: "Medium"
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },
    createdBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'

        }
    }

}, {
    tableName: 'tasks',
    timestamps: true
})

module.exports = Task