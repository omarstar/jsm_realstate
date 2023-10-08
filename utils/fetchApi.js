import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com/'

export const fetchApi = async (url) => {
console.log('url', url)
    const options = {
        url: url,
        headers: {
            'X-RapidAPI-Key': '29da28748dmsh2c607e7f4e40935p1e4b2cjsn32d30a58db8f',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    }
    // const {data} = await axios.request(options)
    const {data} = await axios.get((url),{
        headers: {
            'X-RapidAPI-Key': '29da28748dmsh2c607e7f4e40935p1e4b2cjsn32d30a58db8f',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    })

    return data;
}