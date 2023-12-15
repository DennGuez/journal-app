
import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key: 'AIzaSyAEhb12oIog4P1c5gZu3ZciFoUrh4i7Png'
    }
})




export default authApi