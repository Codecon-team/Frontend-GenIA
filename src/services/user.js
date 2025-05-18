import api from "@/plugins/api";


class UserService {
    async loginUser(user) {
        try {
            const response = await api.post("users/login", user)
            return response.data
        }
        catch (error) {
            console.log("loginUser error:", error)
            throw error;
        }
    }
    async registerUser(user) {
        try {
            const response = await api.post("users/", user)
            return response.data
        }
        catch (error) {
            console.log("registerUser error:", error)
            throw error;
        }
    }
    async updateUser(userInfo){
        try {
            const response = await api.put("users/", userInfo)
            return response.data
        }
        catch (error) {
            console.log("registerUser error:", error)
            throw error;
        }
    }
    async getMeUser(){
        try {
            const response = await api.get("users/me", )
            return response.data
        }
        catch (error) {
            console.log("registerUser error:", error)
            throw error;
        }
    }
};

export default new UserService();