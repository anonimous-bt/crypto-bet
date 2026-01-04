const fs = require('node:fs/promises');
const drawService = require("./draw_service")

const INITIAL_BLOCK = {
    total_value: 0,
    total_transactions: 0,
    total_range_1_winners: 0,
    range_1_winners: [],
    range_1_prize: 0,
    total_range_2_winners: 0,
    range_2_winners: [],
    range_2_prize: 0,
    blocks: []
}

function getFilePathById(id) {
    return `./reports/draw_${id}.json`
}

async function readFile(id){
    const data = await fs.readFile(getFilePathById(id))
    return JSON.parse(data)
}

async function saveToFile(id, data) {
    const filePath = getFilePathById(id)
    return await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}


async function generateReportForDraw(draw) {
    const time = Date.now()
    const drawInfo = await drawService.getDrawInformation(draw)
    if (!drawInfo.is_complete) {
        return "Draw not completed yet"
    }
    await saveToFile(draw, INITIAL_BLOCK)
    let current = drawInfo.first_block_heigth
    while(current <= drawInfo.last_block_heigth) {
        const report = await readFile(draw)
        const blockWinners = await drawService.getBlockWinnerTransactions(current, drawInfo.numbers)
        const range_1_Winners = blockWinners.winners.filter(it => it.winner_range === 1)
        const range_2_Winners = blockWinners.winners.filter(it => it.winner_range === 2)

        const currentBlock = {
            block_heigth: current,
            total_value: blockWinners.validTransactions.reduce((acc, current) => acc + current.value, 0),
            total_transactions: blockWinners.validTransactions.length,
            total_range_1_winners: range_1_Winners.length,
            total_range_2_winners: range_2_Winners.length,
            range_1_transactions: range_1_Winners,
            range_2_transactions: range_2_Winners
        }
        report.total_value = report.total_value + currentBlock.total_value
        report.total_transactions = report.total_transactions + currentBlock.total_transactions
        report.total_range_1_winners = report.total_range_1_winners + currentBlock.total_range_1_winners
        report.range_1_winners = [...report.range_1_winners, ...range_1_Winners]
        report.range_1_prize = (report.total_value * 0.9 * 0.6) / report.total_range_1_winners
        report.total_range_2_winners = report.total_range_2_winners + currentBlock.total_range_2_winners
        report.range_2_winners = [...report.range_2_winners, ...range_2_Winners]
        report.range_2_prize = (report.total_value * 0.9 * 0.2) / report.total_range_2_winners
        report.blocks = [...report.blocks, currentBlock]
        await saveToFile(draw, report)
        console.log(`${((current - drawInfo.start_block_heigth)/(drawInfo.last_block_heigth - drawInfo.start_block_heigth))*100} %`)
        current += 1
    }
    return `finished in ${Date.now() - time} seconds`
}

generateReportForDraw(3).then(it=> console.log(it))