import { api } from "../API";

export const postRestaurantLikeAPI = async (memberIdx, restaurantIdx) => {
    try {
        const response = await api.post('http://feelmeal-backend:8090/restaurants/like', {
            memberIdx,
            restaurantIdx
        });
        console.log('전체 응답 :', response);
        return response;
        
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.error('이미 좋아요를 눌렀습니다.');
            throw new Error('이미 좋아요를 눌렀습니다.');
        } else {
            console.error('API 요청 중 오류 발생:', error);
            throw error; 
        }
    }
};