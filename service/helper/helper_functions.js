const crypto = require('crypto');
const constants = require("../../config/constants")

function generateRandom () {return Math.random()}

function orderString(string) {
    return string.split("").sort( (a,b) => a.charCodeAt(0)-b.charCodeAt(0)).join("")
}

function removeZeroes(string) {
    return string.split("").filter(it=> it !== "0").join("")
}

function hashText(message){
  const hash = crypto.createHash('sha256')
  hash.update(message)
  return hash.digest("hex")
}

function getDrawByBlockHeight(heigth) {
    const draw = Math.ceil((heigth - constants.INITIAL_BLOCK) / constants.BLOCKS_PER_DRAW)
    const resultBlock = constants.INITIAL_BLOCK + (constants.BLOCKS_PER_DRAW * draw)
    return ({
        draw: draw,
        block_height: resultBlock,
        first_block_height: resultBlock - constants.BLOCKS_PER_DRAW
    })
}
module.exports = {
    getDrawByBlockHeight,
    generateRandom,
    orderString,
    removeZeroes,
    hashText
}