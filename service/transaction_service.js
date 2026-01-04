const fetchModule = require("../gateway/fetch_data")
const transactionModule = require("./number_generation")
const constants = require("../config/constants")
const helperFunc = require("./helper/helper_functions")

function getWinner(transactionRows, drawNumbers) {
    let fourWinner = false //range 2
    let fiveWinner = false // range 1
    transactionRows.forEach(row => {
        let assertions = 0
        row.forEach(element => {
            if (drawNumbers.includes(element)) {
                assertions += 1
            }
        })
        if (assertions >= 4) {
            fourWinner = true
        }
        if (assertions === 5) {
            fiveWinner = true
        }
    })

    return ({
        is_winner: fourWinner || fiveWinner,
        winner_range: fiveWinner ? 1 : fourWinner ? 2 : null
    })
}

function getValidTransaction(transaction) {
    const draw = helperFunc.getDrawByBlockHeight(transaction.block_height)
    const wallet = constants.DRAW_INFO[`draw_${draw.draw}`].wallet_id
    const validOutputs = transaction.outputs.filter(out =>
        out.address === wallet
        && out.value >= 11 // constants.BASE_VALUE_SATOSHI
    )
    const validInput = transaction.inputs.length === 1 // will only consider valid a transaction with one input
    if (validOutputs.length > 0 && validInput) {
        return ({
            id: transaction.id,
            block_height: transaction.block_height,
            sender_address: transaction.inputs[0],
            value: validOutputs[0].value * 10//value in satoshis
        })
    }
    return null
}

async function getTransactionInformationById(id) {
    const transactionInfo = await fetchModule.fetchTransactionDetail(id)
    const validTransaction = getValidTransaction(transactionInfo)

    if (validTransaction === null) {
        return ({
            message: `Your transaction is invalid please verify that you have transfered for the right address, if you send from only 1 address. Is recomended to use a wallet and not a exchange balance`,
            transaction_id: id,
            draw: null,
            numbers: null,
            is_winner: null,
            winner_range: null,
            draw_numbers: null
        })
    }


    if (validTransaction.block_height < constants.INITIAL_BLOCK) {
        return ({
            message: `Your transaction was made on block ${validTransaction.block_height} wich is before the first draw`,
            transaction_id: id,
            draw: null,
            numbers: null,
            is_winner: null,
            winner_range: null,
            draw_numbers: null
        })
    }

    const currentBlock = await fetchModule.fetchCurrentBlock()
    const drawInformation = helperFunc.getDrawByBlockHeight(validTransaction.block_height)
    const numbers = transactionModule.getNumbersFromTransactionPayload(validTransaction)
    if (drawInformation.block_height >= currentBlock.height) {
        return ({
            draw: drawInformation.draw,
            message: `Your bet is placed, wait until block ${drawInformation.block_height} is completed`,
            numbers,
            transaction_id: id,
            is_winner: null,
            winner_range: null,
            draw_numbers: null
        })
    }

    const block = await fetchModule.fetchBlockByHeigth(drawInformation.block_height)
    const blockNumbers = transactionModule.getNumbersFromTransactionIdAndLines(block.hash, 1)[0]
    const winner = getWinner(numbers, blockNumbers)

    return ({
        draw: drawInformation.draw,
        message: `Your bet ${winner.is_winner ? "IS WINNER" : "is not winner"} of the draw ${drawInformation.draw} for the block ${drawInformation.block_height}`,
        numbers,
        transaction_id: id,
        is_winner: winner.is_winner,
        winner_range: winner.winner_range,
        draw_numbers: blockNumbers
    })
}

module.exports = {
    getWinner,
    getValidTransaction,
    getTransactionInformationById
}