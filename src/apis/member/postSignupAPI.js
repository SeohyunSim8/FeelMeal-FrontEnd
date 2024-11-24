import { api } from "../API";

export const postSignupAPI = async (id, password, name, address) => {
    try {
        const response = await api.post('http://172.20.0.4:8090/member/sign-up', {
            id,
            password,
            name,
            address
        });
        console.log('전체 응답 :', response);
        return response;
        
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.error('이미 가입된 유저입니다.');
            throw new Error('이미 가입된 유저입니다.');
        } else {
            console.error('API 요청 중 오류 발생:', error);
            throw error; 
        }
    }
};