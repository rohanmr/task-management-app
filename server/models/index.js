const Task = require("./taskModel")
const User = require("./userModel")
const AssignTask = require("./assginTaskModel")

// Join model (AssignTask)

AssignTask.belongsTo(User, { foreignKey: 'userId', as: 'user' });

AssignTask.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });


// User relations

User.hasMany(AssignTask, { foreignKey: 'userId', as: 'assignedTasks' });

User.belongsToMany(Task, {
    through: AssignTask, foreignKey: 'userId', as: 'tasksAssigned'
});


// Task relations

Task.hasMany(AssignTask, { foreignKey: 'taskId', as: 'assignedUsers' });

Task.belongsToMany(User, {
    through: AssignTask, foreignKey: 'taskId', as: 'usersAssigned'
});


// Creator / Updater

Task.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
Task.belongsTo(User, { foreignKey: 'updatedBy', as: 'updater' });

AssignTask.belongsTo(User, { foreignKey: 'createdBy', as: 'assignedBy' });
AssignTask.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

module.exports = { User, Task, AssignTask };




