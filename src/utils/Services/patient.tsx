import { instance } from "../Axios/axiosConfig";
import { patients } from "../endpoints/endepoints";
import { gender } from "../endpoints/endepoints";

export const getPatient = async () => {
    const res = await instance.get(`${patients}`)
    return res.data
}

export const addPatient = async (data: any) => {
    const res = await instance.post(`${patients}`, data)
    return res.data
} 

export const deletPatient = async (id: any) => {
    const res = await instance.delete(`${patients}/${id}`)
    return res.data
}

export const editPatient = async (id: any) => {
    const res = await instance.get(`${patients}/${id}`)
    return res.data
}

export const viewPatient = async (id: any) => {
    const res = await instance.get(`${patients}/${id}`)
    return res.data
}

export const updatePatient = async (id: any, data: any) => {
    const res = await instance.put(`${patients}/${id}`, data)
    return res.data
} 

export const getGender = async () => {
    const res = await instance.get(`${gender}`)
    return res.data
}