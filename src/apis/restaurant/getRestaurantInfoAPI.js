import { api } from "../API";

export const getRestaurantInfoAPI = async (restaurantIdx) => {
    try {
        const response = await api.get(`http://feelmeal-backend:8090/restaurants/${restaurantIdx}/info`);
        console.log('전체 응답 :', response);
        return response.data;

    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        throw error; 
    }
};