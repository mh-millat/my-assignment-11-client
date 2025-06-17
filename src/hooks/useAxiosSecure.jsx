import React from 'react';
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import { AuthContext } from '../provider/AuthProvider';
// import { AuthContext } from '../';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

//axios.get('http://localhost:3000')

const useAxiosSecure = () => {
    const { user, logOut } = useContext(AuthContext);
    const token = user?.accessToken
    //intercept requests
    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config
    });

    //response interceptor
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.status === 401 || error.status === 403) {
            logOut()
                .then(() => {
                    console.log('sign out for 401 status code')
                })
                .catch(err => {
                    console.log(err)
                })
        }

        return Promise.reject(error)
    });

    return axiosInstance
};

export default useAxiosSecure;
