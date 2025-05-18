import axios from "axios"

class UserService {
    async loginUser(user) {
        try {
            const response = await axios.post("users/login", user)
            return response.data
        }
        catch (error) {
            console.log("loginUser error:", error)
            throw error;
        }
    }
    async registerUser(user) {
        try {
            const response = await axios.post("users/", user)
            return response.data
        }
        catch (error) {
            console.log("registerUser error:", error)
            throw error;
        }
    }
    async updateUser(userInfo){
        try {
            const response = await axios.put("users/", userInfo)
            return response.data
        }
        catch (error) {
            console.log("registerUser error:", error)
            throw error;
        }
    }
    async getMeUser(){
        try {
            const response = await axios.get("users/me", )
            return response.data
        }
        catch (error) {
            console.log("registerUser error:", error)
            throw error;
        }
    }
};

export default new UserService();