import axios from 'axios';

export interface AxiosResponse<T = any> extends Promise<T> {}

export default axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/"
})
