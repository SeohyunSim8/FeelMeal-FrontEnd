import { api } from "../API";

export const getRecommendedMenuAPI = async (restaurantIdx, emotion) => {
    try {
        const response = await api.get(`http://172.20.0.4:8090/restaurants/${restaurantIdx}/recommend`, {
            params: {
                emotion
            }
        });
        console.log('전체 응답 :', response);
        return response.data;

    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        throw error; 
    }
};