const VALUE_MAP = require("../config/value_map.json")
const constants = require("../config/constants")
const functions = require("./helper/helper_functions")

function validateNumber(numberList, number, maxNumber) {
    try {
        if (numberList.includes(number)) {
            if (number > maxNumber/2) {
                return validateNumber(numberList, number - 5, maxNumber)
            } else {
                return validateNumber(numberList, number + 3, maxNumber)
            }
        } else {
            return number
        }
    } catch {
        console.log("failed to validate number", numberList, number, maxNumber)
        return 0
    }

}

function generateFromString(string, index) {
    const length = string.length
    const hashSize  = Math.floor(length/constants.NUMBERS_PER_LINE)
    let numbers = []
    for (let i = 0; i < 5; i++) {
        const startIndex = i*hashSize
        const endIndex = startIndex + hashSize
        const subString = string.slice(startIndex, endIndex)
        let acc = 0
        subString.split("").forEach(char => acc += VALUE_MAP[char])
        const number = Math.floor((acc * index * constants.LUCKY_CONST * constants.BASE_MULTIPLIERS[i]) % constants.TOTAL_NUMBERS) + 1
        numbers.push(number)
    }
    return numbers
}


function transactionIdToNumberMatrix(id) {
    const length = id.length
    const hashSize  = Math.floor(length/constants.MAX_LINES)
    let rows =[]
    for (let i = 0; i < constants.MAX_LINES; i++) {
        const startIndex = i*hashSize
        const endIndex = startIndex + hashSize
        const subString = id.slice(startIndex, endIndex)
        rows.push(generateFromString(subString, (i+1)))
    }
    return rows
}

function getDiagonalMatrix(marix) {
    let rows =[]

    for (let i = 0; i < constants.MAX_LINES; i++) {
        let row = []
        let indexI = 0
        let indexJ = 0
        for (let j = 0; j < constants.NUMBERS_PER_LINE; j++) {
            if (i < 5) {
                indexI = j
                indexJ = i + j
            } else {
                indexI = j + 5
                indexJ = i + j - 5
            }
            if (indexJ >= 5) {
                indexJ = indexJ - 5
            }
            row.push(validateNumber(row, marix[indexI][indexJ], constants.TOTAL_NUMBERS))
        }
        rows.push(row)
    }
    return rows
}

function getlinesBasedOnValue (value) {
    let lines = Math.floor(value/constants.BASE_VALUE)
    if (lines > constants.MAX_LINES) { lines = constants.MAX_LINES}
    return lines
}

function getNumbersFromTransactionIdAndLines(id, lines) {
    const orderedId = functions.orderString(id)
    const noZero = functions.removeZeroes(orderedId)
    const newHash = functions.hashText(noZero)
    const transationMatrix = transactionIdToNumberMatrix(newHash)
    const diagonalMartrix = getDiagonalMatrix(transationMatrix)
    return diagonalMartrix.splice(0, lines)
}

function getNumbersFromTransactionPayload(payload) {
    const id = payload.id
    const satoshis = payload.value
    const btc = satoshis/100000000
    const lines =  getlinesBasedOnValue(btc)
    return getNumbersFromTransactionIdAndLines(id, lines) 
}


module.exports = {
    getlinesBasedOnValue,
    getNumbersFromTransactionIdAndLines,
    getNumbersFromTransactionPayload
}