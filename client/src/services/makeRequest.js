import axios from "axios"

//boilerplate code for making posts to app
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
})

//custom error message or print out Error message.
// If sucessful, return data. If failed, then return Error
export function makeRequest(url, options) {
    return api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}