

const axios = require('axios');
const activityUrl = 'https://deckofcardsapi.com/api/deck'
 
console
const instance = axios.create({
    baseURL: activityUrl ,
    timeout: 1000000,
});

// Also add configure interceptors && all the other cool stuff
instance.interceptors.request.use(
    async config => {
        config.headers = {
            //'Authorization': `Bearer ${value}`,
            'Accept': 'application/json',

        }
        return config;
    },
    error => {
        Promise.reject(error)
    });


export default instance;  