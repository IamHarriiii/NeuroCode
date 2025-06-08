// 📁 frontend/src/services/auth.jsx
import axios from 'axios';

// Enable credentials and CSRF protection for all requests
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = 'http://localhost:8000';

export const signup = (formData) =>
    axios.post(`${BASE_URL}/signup/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
        .then(res => res.data)
        .catch(err => {
            throw err.response?.data || { detail: "Signup failed" };
        });

export const login = ({ email, password }) =>
    axios.post(`${BASE_URL}/login/`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
        .then(res => res.data)
        .catch(err => {
            throw err.response?.data || { detail: "Login failed" };
        });