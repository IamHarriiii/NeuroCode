// 📁 frontend/src/services/auth.js
import axios from 'axios';

const API = 'http://localhost:8000';

export const signup = (formData) => axios.post(`${API}/signup/`, formData).then(res => res.data);
export const login = ({ email, password }) => axios.post(`${API}/login/`, { email, password }).then(res => res.data);


// 🧩 Auth wrapper (App.js or route level)
import { useState, useEffect } from 'react';
import AuthPage from '../pages/AuthPage';
import CodeEditor from '../components/CodeEditor';

export default function App() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
        setAuth(!!token);
    }, []);

    if (!auth) return <AuthPage onLogin={() => setAuth(true)} />;
    return <CodeEditor />;  // 👈 Protected route
}
