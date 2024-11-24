import axios from 'axios';

// axios 인스턴스 생성
export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
});
