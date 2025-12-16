import axiosInstance from "@/api/axiosInstance";


const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });
};

// Register User
export const registerUser = async (data) => {
    await sleep()
    return axiosInstance.post("/user/register", data);
};

// Login user 
export const loginUser = async (data) => {
    await sleep();
    return axiosInstance.post("/user/login", data)
}

// User info 
export const getUserInfo = async () => {

}