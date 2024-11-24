import { api } from "../API";

export const deleteRestaurantLikeAPI = async (memberIdx, restaurantIdx) => {
    try {
        const response = await api.delete('http://172.20.0.4:8090/restaurants/like', {
            data: {
                memberIdx,
                restaurantIdx,
            },
        });
        console.log('전체 응답 :', response);
        return response;
        
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.error('좋아요를 누르지 않은 식당입니다.');
            throw new Error('좋아요를 누르지 않은 식당입니다.');
        } else {
            console.error('API 요청 중 오류 발생:', error);
            throw error; 
        }
    }
};