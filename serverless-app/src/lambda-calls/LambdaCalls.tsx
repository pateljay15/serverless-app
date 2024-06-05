import axios from "axios"

const baseUrl = "https://eoph52m9xd.execute-api.us-east-1.amazonaws.com"

export const fetchPosts = async () => {
    let response = await axios.get(`${baseUrl}/get-all-posts`)

    // console.log(response)
    return response.data
}

export const signup = async (data: object) => {
    let response = await axios.post(`${baseUrl}/register`, data)

    return response.data
}


export const login = async (data: object) => {
    let response = await axios.post(`${baseUrl}/login`, data)
    console.log(response)
    return response.data
}

export const postImage = async (filename: string, img: string) => {
    let response = await axios.post(`${baseUrl}/image-upload/${filename}`, img, 
    {
        headers: { 
            'Content-Type' : 'text/plain' 
        }
    })
    console.log(response)
    return response.data
}

export const postData = async (data: object) => {
    let response = await axios.post(`${baseUrl}/post-data`, data)
    console.log(response)
    return response.data
}

export const setAuthenticationToken = (data: object) => {
    localStorage.setItem("auth", JSON.stringify(data))
}

export const getAuthenticationToken = () => {
    let authData = localStorage.getItem("auth")

    return authData ? JSON.parse(authData) : null
}

export const removeAuthToken = () => {
    if (localStorage.getItem('auth')) {
        localStorage.removeItem('auth')
    }
    return true
}