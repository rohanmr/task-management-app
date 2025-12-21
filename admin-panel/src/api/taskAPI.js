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
export const deleteTask = async (data) => {
    await sleep()
    return api.delete(`tasks/deleteTask/${data}`)
}