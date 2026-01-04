const constants = require("../config/constants")
const axios = require("axios")

async function fetchTransactionDetail(id) {
    const url = `${constants.REMOTE_BASE_ADDRESS}/txs/${id}`
    return axios.get(url).then( response => {
        if (response.status !== 200) {
            throw new Error(`Failed to fetch transaction! status: ${response.status}`, response);
        }
        return response.data
    })
}

async function fetchBlockByHash(id) {
    const url = `${constants.REMOTE_BASE_ADDRESS}/blocks/${id}`
    return axios.get(url).then( response => {
        if (response.status !== 200) {
            throw new Error(`Failed to fetch block! status: ${response.status}`, response);
        }
        return response.data
    })
}

async function fetchBlockByHeigth(id) {
    const url = `${constants.REMOTE_BASE_ADDRESS}/blocks/${id}`
    return axios.get(url).then( response => {
        if (response.status !== 200) {
            throw new Error(`Failed to fetch block by heigth! status: ${response.status}`, response);
        }
        return response.data
    })
}

async function fetchCurrentBlock() {
    const url = `${constants.REMOTE_BASE_ADDRESS}`
    return axios.get(url).then( response => {
        if (response.status !== 200) {
            throw new Error(`Failed to fetch latest block! status: ${response.status}`, response);
        }
        return response.data
    })
}

module.exports = {
    fetchTransactionDetail,
    fetchBlockByHash,
    fetchBlockByHeigth,
    fetchCurrentBlock
}