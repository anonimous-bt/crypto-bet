const constants = require("../config/constants")
const fetchModule = require("../gateway/fetch_data")
const transactionService = require("./transaction_service")
const numbersService = require("./number_generation")
const helperFunc = require("./helper/helper_functions")


async function getDrawInformation(draw) {
    const start_block_heigth = constants.INITIAL_BLOCK + ((draw  -1) * constants.BLOCKS_PER_DRAW)
    const first_block_heigth = start_block_heigth + 1
    const last_block_heigth = start_block_heigth + constants.BLOCKS_PER_DRAW
    const currentBlock = await fetchModule.fetchCurrentBlock()
    const is_complete = currentBlock.height >= last_block_heigth
    let lastBlock = null
    let drawNumbers = null
    if (is_complete) {
        lastBlock = await fetchModule.fetchBlockByHeigth(last_block_heigth)
        drawNumbers = numbersService.getNumbersFromTransactionIdAndLines(lastBlock.hash, 1)[0]
    }
    return({ start_block_heigth, first_block_heigth, last_block_heigth, numbers: drawNumbers, is_complete })
}

function getBLockValidTransactions(block) {
    let validTransactions = []
    block.transactions.forEach(transaction => {
        const validTransaction = transactionService.getValidTransaction(transaction)
        if (validTransaction !== null) {
            validTransactions.push(validTransaction)
        }
    })
    return validTransactions
}

async function getBlockWinnerTransactions(block_height, draw_numbers) {
    const blockInfo = await fetchModule.fetchBlockByHeigth(block_height)
    const validTransactions = getBLockValidTransactions(blockInfo)
    let winners = []
    validTransactions.forEach(transaction => {
        const transactionNumbers = numbersService.getNumbersFromTransactionPayload(transaction)
        const winner = transactionService.getWinner(transactionNumbers, draw_numbers)
        if (winner.is_winner) {
            winners.push({
                ...transaction,
                winner_range: winner.winner_range
            })
        }
    })
    return {
        validTransactions,
        winners
    }
}

async function getDrawWinningTransactions(draw) {
    const drawInfo = await getDrawInformation(draw)
    if (!drawInfo.is_complete) {
        return "Draw not completed yet"
    }
    let current = drawInfo.first_block_heigth
    let winners = []
    while(current <= drawInfo.last_block_heigth) {
        const blockWinners = (await getBlockWinnerTransactions(current, drawInfo.numbers)).winners
        winners = [...winners, ...blockWinners]
        console.log("executed for block: ", current, `${((current - drawInfo.start_block_heigth)/(drawInfo.last_block_heigth - drawInfo.start_block_heigth))*100} %`)
        current += 1
    }
    return winners
}

async function getNextDraw() {
    const currentBlock = await fetchModule.fetchCurrentBlock()
    const drawInfo = helperFunc.getDrawByBlockHeight(currentBlock.height)
    const firstBlock = await fetchModule.fetchBlockByHeigth(drawInfo.first_block_height)
    const prevDate = new Date(firstBlock.timestamp)
    const nextDate = new Date(prevDate)
    nextDate.setDate(nextDate.getDate() + 7)
    return ({
        nxt_draw_number: drawInfo.draw,
        next_draw_block: drawInfo.block_height,
        next_draw_date: nextDate.toLocaleDateString()
    })
}

module.exports = {
    getBlockWinnerTransactions,
    getDrawWinningTransactions,
    getDrawInformation,
    getNextDraw
}