import { api } from "../API";

export const postLoginAPI = async (id, password, name, address) => {
    try {
        const response = await api.post('http://172.20.0.4:8090/member/login', {
            id,
            password
        });
        console.log('전체 응답 :', response);
        return response;
        
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.error('존재하지 않는 유저입니다.');
            throw new Error('존재하지 않는 유저입니다.');
        } else if (error.response && error.response.status === 400) {
            console.error('비밀번호가 일치하지 않습니다.');
            throw new Error('비밀번호가 일치하지 않습니다.');
        } else {
            console.error('API 요청 중 오류 발생:', error);
            throw error; 
        }
    }
};