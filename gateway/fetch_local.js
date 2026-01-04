const constants = require("../config/constants")
const axios = require("axios")


function getAuthorization() {
    return `Basic ${btoa(`${constants.LOCAL_USER}:${constants.LOCAL_PASSWORD}`)}`
}

async function fetchBlockByHash(id) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorization()
        }
    }
    const data = {
        'jsonrpc': "2.0",
        'id': "curltest",
        'method': "getblock",
        'params': [
            id, 3
        ]
    }

    return axios.post(constants.LOCAL_BASE_ADDRESS, data, options).then(response => {
        if (response.status !== 200) {
            throw new Error(`Failed to fetch block! status: ${response.status}`, response);
        }
        return response.data
    })
}

async function fetchBlockHash(height) {
    const data = {
        'jsonrpc': "2.0",
        'id': "curltest",
        'method': "getblockhash",
        'params': [height]
    }
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorization()
        }
    }

    return axios.post(constants.LOCAL_BASE_ADDRESS, data, options).then(response => {
        if (response.status !== 200) {
            throw new Error(`Failed to fetch block hash! status: ${response.status}`, response);
        }
        return response.data
    })
}

async function fetchBlockByHeigth(id) {
    let hashresponse = await fetchBlockHash(id)
    return await fetchBlockByHash(hashresponse.result)
}

async function fetchCurrentBlock() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorization()
        }
    }
    const data = {
        'jsonrpc': "2.0",
        'id': "curltest",
        'method': "getblockchaininfo",
        'params': []
    }


    return axios.post(constants.LOCAL_BASE_ADDRESS, data, options).then(response => {
        if (response.status !== 200) {
            throw new Error(`Failed to fetch current block! status: ${response.status}`, response);
        }
        return response.data
    })
}


module.exports = {
    fetchBlockByHash,
    fetchBlockByHeigth,
    fetchCurrentBlock
}
