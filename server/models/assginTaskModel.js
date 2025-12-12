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
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    }

}, {
    tableName: 'assignTasks',
    timestamps: true
})

module.exports = AssignTask