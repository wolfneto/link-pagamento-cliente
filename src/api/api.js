import axios from 'axios'

const apiBaseUrl = process.env.VUE_APP_PAGAMENTO_API_URL

export default axios.create({
    baseURL: apiBaseUrl,
    timeout: 60000
})