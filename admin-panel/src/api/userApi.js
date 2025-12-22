import api from "@/api/apiAgent";


const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
};

// Register User
export const registerUser = async (data) => {
    await sleep()
    return api.post("/user/register", data);
};

// Login user 
export const loginUser = async (data) => {
    await sleep();
    return api.post("/user/login", data)
}

// User info 
export const getUserInfo = () => {
    return api.get("/user/getUserInfo")

}

//Get All Users 
export const getAllUsers = async () => {
    await sleep()
    return api.get("/user/getAllUsers")

}

//Delete User
export const deleteUser = async (userID) => {
    await sleep();
    return api.delete(`/user/deleteUser/${userID}`)
}

//Update user

export const updateUser = async (userID, data) => {
    await sleep()
    return api.put(`/user/updateUser/${userID}`, data)

}