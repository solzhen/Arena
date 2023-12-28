import axios from 'axios'

const fighterApi = axios.create({
    baseURL: 'http://localhost:8000/fighters/api/v1/fighters/'
})

export const getAllFighters = () => fighterApi.get('/');

export const getFighter = (id) => fighterApi.get(`/${id}/`);

export const createFighter = (task) => fighterApi.post('/', task);

export const deleteFighter = (id) => fighterApi.delete(`/${id}/`);

export const updateFighter = (id, task) => fighterApi.put(`/${id}/`, task);