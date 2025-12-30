import api from "@/api/apiAgent";


const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};

// Create Task
export const createTask = async (data) => {
    await sleep()
    return api.post("/tasks/createTask", data)
}

//Get all Task
export const getAllTasks = async () => {
    await sleep()
    return api.get("/tasks/getAllTasks")
}

//Delete Task
export const deleteTask = async (id) => {
    await sleep()
    return api.delete(`tasks/deleteTask/${id}`)
}

//Update Task
export const updateTask = async (taskId, data) => {
    await sleep()
    return api.put(`tasks/updateTask/${taskId}`, data)
}

export const statusUpdate = async (taskId, data) => {
    await sleep()
    return api.patch(`tasks/statusUpdate/${taskId}`, data)
}

export const assignTask = async (data) => {
    return api.post("/assign/assignTask", data);
};

export const getAllAssignTask = async () => {
    await sleep()
    return api.get("/assign/getTaskByUsers")
}

export const deleteAssignedTask = async (id) => {
    await sleep()
    return api.delete(`/assign/deleteAssignTask/${id}`)

}

export const getTaskByUser = async (userID) => {
    await sleep()
    return api.get(`/assign/getTaskBySingleUser/${userID}`)
}