const INITIAL_BLOCK = 930350
const BLOCKS_PER_DRAW = 1008
const BASE_VALUE = 0.00005000
const BASE_VALUE_SATOSHI = 5000
const MAX_LINES = 10
const NUMBERS_PER_LINE  = 5
const LUCKY_CONST = 777
const TOTAL_NUMBERS = 50
const BASE_MULTIPLIERS = [
    3.654934223446545,
    73.07456439243843,
    12.07483534598343,
    11.72839073549324,
    1.999934463239956,
]
const ENV = "remote" // remote | local
const LOCAL_BASE_ADDRESS =  "http://127.0.0.1:8332/"
const REMOTE_BASE_ADDRESS = "https://api.blockcypher.com/v1/btc/main"

const LOCAL_USER = ""
const LOCAL_PASSWORD = ""

const DRAW_INFO = {
    draw_0: {
        wallet_id: "bc1q2av9xyezz9m524h7lrxpjdx8qz0gu0cph7c8wm",
    },
    draw_1: {
        wallet_id: "bc1q2av9xyezz9m524h7lrxpjdx8qz0gu0cph7c8wm",
    },
    draw_2: {
        wallet_id: "bc1q4dk57tpakggm70xqmanqwxhp0pfug4lw6a98k8",
    },
    draw_52: {
        wallet_id: "bc1qmry28q9s4ynzwp0sc00t3758crexerrretwsun",
    }
}

module.exports = {
    INITIAL_BLOCK,
    BLOCKS_PER_DRAW,
    BASE_VALUE,
    MAX_LINES,
    NUMBERS_PER_LINE,
    LUCKY_CONST,
    TOTAL_NUMBERS,
    BASE_MULTIPLIERS,
    ENV,
    LOCAL_BASE_ADDRESS,
    REMOTE_BASE_ADDRESS,
    BASE_VALUE_SATOSHI,
    LOCAL_USER,
    LOCAL_PASSWORD,
    DRAW_INFO,

}
