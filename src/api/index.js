import axios from 'axios';



export const getPlaceData = async (type, bounds) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
            // bl_latitude: '41.31853960260514',
            // tr_latitude: '41.348057053624274',
            // bl_longitude: '69.26768474578859',
            // tr_longitude: '69.33231525421144'
            bl_latitude: bounds.sw.lat,
            tr_latitude: bounds.ne.lat,
            bl_longitude: bounds.sw.lng,
            tr_longitude: bounds.ne.lng
        },
        headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': 'e084e8b5a1msh4fcde72b64a08adp1bb9b9jsn8d7dfdd564da'
        }
        });

        return data;
    } catch (error) {
        console.log(error)
    }
}