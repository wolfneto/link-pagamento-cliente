import axios from 'axios'

const url_producao = "https://solident.com.br/node"
const url_dev = "http://192.168.0.101:3000/"
const url_dev_vps = "https://edster.com.br/solident/pagamento"

export default axios.create({
    baseURL: url_dev_vps,
    timeout: 60000
})