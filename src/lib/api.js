import axios from "./axios"

export const signUp = (data) => axios.post("/auth/signup", data).then(res => res.data)
export const signIn = (data) => axios.post("/auth/signin", data).then(res => res.data)
export const logout = () => axios.post("/auth/logout").then(res => res.data)
