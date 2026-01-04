const fetch_remote = require("./fetch_remote")
const fetch_local = require("./fetch_local")
const constants = require("../config/constants")

function remoteBlockMapper(block) {
    return ({
        hash: block.hash,
        heigth: block.height,
        timestamp: block.time,
        transactions: block.txids.map(transaction => ({
            id: transaction.hash,
            //block_height: block.height,
            //inputs: transaction.inputs.map(input => input.prev_out.addr),
            //outputs: transaction.out.map(out => ({value: out.value, address: out.addr}))
        }))
    })
}

function localBlockMapper(block) {
    return ({
        hash: block.result.hash,
        heigth: block.result.height,
        timestamp: block.result.time,
        transactions: block.result.tx.map(transaction => ({
            id: transaction.txid,
            block_height: block.result.height,
            inputs: transaction.vin.map(input => input.prevout?.scriptPubKey?.address),
            outputs: transaction.vout.map(out => ({value: out.value * 100000000, address: out.scriptPubKey?.address}))  
        }))
    })
}


async function fetchTransactionDetail(transaction_id) {
    const transaction = await fetch_remote.fetchTransactionDetail(transaction_id)
    return ({
        id: transaction.hash,
        block_height: transaction.block_height,
        inputs: transaction.inputs.map(input => input.addresses[0]),
        outputs: transaction.outputs.map(out => ({value: out.value, address: out.addresses[0]}))
    })
}

async function fetchBlockByHash(hash) {
    return constants.ENV === "local"
        ? await fetch_local.fetchBlockByHash(hash).then(block => localBlockMapper(block))
        : await fetch_remote.fetchBlockByHash(hash).then(block => remoteBlockMapper(block))

}

async function fetchBlockByHeigth(height) {
    return constants.ENV === "local"
        ? await fetch_local.fetchBlockByHeigth(height).then(block => localBlockMapper(block))
        : await fetch_remote.fetchBlockByHeigth(height).then(response => remoteBlockMapper(response))
}

async function fetchCurrentBlock() {
    return constants.ENV === "local"
        ? await fetch_local.fetchCurrentBlock().then(block => ({
            hash: block.result.bestblockhash,
            height: block.result.blocks,
        }))
        : await fetch_remote.fetchCurrentBlock().then(block => ({
            hash: block.hash,
            height: block.height,
        }))
}


module.exports = {
    fetchTransactionDetail,
    fetchBlockByHash,
    fetchBlockByHeigth,
    fetchCurrentBlock
}