import { api } from "../API";

export const patchAddressAPI = async (idx, address) => {
    try {
        const response = await api.patch('http://feelmeal-backend:8090/member/address', {
            idx,
            address
        });
        console.log('전체 응답 :', response);
        return response;
        
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
    }
};