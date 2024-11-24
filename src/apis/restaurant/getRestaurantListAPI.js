import { api } from "../API";

export const getRestaurantListAPI = async (memberIdx, foodCategory) => {
    try {
        const response = await api.get('http://feelmeal-backend:8090/restaurants/list', {
            params: {
                memberIdx,
                foodCategory
            }
        });
        console.log('전체 응답 :', response);
        return response.data;

    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        throw error; 
    }
};