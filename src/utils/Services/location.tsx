import { instance } from "../Axios/axiosConfig";
import { country, city, state, zipcode } from "../endpoints/endepoints";

export const getCountry = async () => {
    const res = await instance.get(`${country}`)
    return res.data
}

export const getState = async (country_id: number) => {
    const res = await instance.get(`${state}/${country_id}`)
    return res.data
}

export const getCity = async (state_id: number) => {
    const res = await instance.get(`${city}/${state_id}`)
    return res.data
}

export const getZipcode = async (city_id: number) => {
    const res = await instance.get(`${zipcode}/${city_id}`)
    return res.data
}