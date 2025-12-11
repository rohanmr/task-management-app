const { sequelize } = require('../config/db')
const { DataTypes } = require('sequelize')


const AssignTask = sequelize.define('AssignTask', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    taskId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: "tasks",
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
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
            model: "users",
            key: "id"
        }
    }

}, { timestamps: true, tableName: "assignTasks" })


module.exports = AssignTask