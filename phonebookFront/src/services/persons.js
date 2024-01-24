import axios from 'axios'
const url = "http://localhost:3001/api/persons"

const getData = () => {
    const request = axios.get(url)
    return request.then(response => {
        return response.data
    })
}

const setData = (object) => {
    const request = axios.post(url, object)
    return request.then(response => {
        return response.data
    })
}

const deleteData = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => {
        return response.data
    })
}

const replaceData = (id, data) => {
    const request = axios.put(`${url}/${id}`, data)
    return request.then(response => {
        return response.data
    })
}

export default {getData, setData, deleteData, replaceData}