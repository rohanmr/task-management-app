import api from "@/api/apiAgent";


const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000);
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