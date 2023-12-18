import axios from "axios"
import { SetPosts } from "../redux/postSlice"

const API_URL = "http://localhost:8800"

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json"
})

export const apiRequest = async({ url, token, data, method }) => {
    try{
        const result = await API(url, {
            method: method || "GET",
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            }
        })
        return result?.data
    } catch(error){
        const err = error.response.data;
        console.log(err);
        return { status: err.success, message: err.message }
    }
}

export const handleFileUpload = async(uploadFile) => {
    const formData = new FormData()
    formData.append("file", uploadFile);
    formData.append("upload_preset", "sociomedia");

    try{
        const response = await axios.post(
            `${process.env.CLOUDINARY_URI}/image/upload/`,
            formData
        )
        console.log(response)
        return response.data.secure_url
    } catch(error){
        console.log(error)
    }
}

export async function fetchPosts(token, dispatch, uri, data){
    try{
        const res = await apiRequest({
            url: uri || "/posts",
            token: token,
            method: "GET",
            data: data || {}
        })
        dispatch(SetPosts(res?.data))
        return 
    } catch(error){
        console.log(error)
    }
}

export const likePost = async({ uri, token }) => {
    try{
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "POST"
        })
    } catch(error){ 
        console.log(error)
    }
}

export const getUserInfo = async(token, id) => {
    try{
        const url = id === undefined ? "/users/get-user" : "users/get-user/" + id
        
        const res = await apiRequest({
            url: url,
            token: token,
            method: "POST"
        })

        if(res?.message === "Authentication failed"){
            localStorage.removeItem("user");
            window.alert("User session expired. Login again.");
            window.location.replace("/login");
        }
        return res?.user
    } catch(error){
        console.log(error)
    }
}



export const sendFriendRequest = async(token, id) => {
    try{
        const res = await apiRequest({
            url: "/users/friend-request",
            token: token,
            method: "POST",
            data: { requestTo: id }
        })
    } catch(error){
        console.log(error)
    }
}