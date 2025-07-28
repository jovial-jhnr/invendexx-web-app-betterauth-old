import axios from 'axios';

const backendUrl = axios.create({

    baseURL: import.meta.env.VITE_BACKEND_URL,
    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default backendUrl;