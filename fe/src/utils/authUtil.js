import { loginUser, logoutUser, signUpUser } from "../apis/user-apis";

const getUserToken = () => {
    return localStorage.getItem("token");
}

const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const setUser = async(data) => {
    localStorage.setItem("token",data.token);
    localStorage.setItem("user",JSON.stringify(data.user));
}

const loginFunction = async({email, password}) => {
    const data = await loginUser({email,password});
    setUser(data);
    return data.user;
}

const logoutFunction = async () => {
    const response = await logoutUser();
    if(!response) console.log("logout failed");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

const signupFunction = async (userData) => {
    const data = await signUpUser(userData);
    setUser(data);
    return data.user;
}

export {getUserToken, loginFunction, signupFunction, getLocalStorage, logoutFunction};