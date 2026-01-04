const transaltions = require("./translation.json")
const drawService = require("./service/draw_service")
const transaactionService = require("./service/transaction_service")
const constants = require("./config/constants")
const QRCode = require('qrcode');
const prefix = "https://www.lotto-btc.com"
let lang = "EN"
let environment = "remote"

function setLang(value) {
    lang = value
}

function setEnv(value) {
    environment = value
}

function capitalize(prhase) {
    return prhase.charAt(0).toUpperCase() + prhase.slice(1);
}

function translate(phrase) {
    try {
        return transaltions[phrase][lang] ?? phrase
    } catch {
        return phrase
    }
}

async function nextDrawSection(nextDrawData) {
    const section = document.getElementById("next-draw")
    const content = `
        <h2 id="next-draw-header">${capitalize(translate("next-draw"))} (${nextDrawData.nxt_draw_number})</h2>
        <div id="block-index" class="info-block">
            <p>${capitalize(translate("block index"))}</p>
            <span id="next-index">${nextDrawData.next_draw_block}</span>
        </div>
        <div id="block-date" class="info-block">
            <p>${capitalize(translate("date"))}</p>
            <span id="next-date">${nextDrawData.next_draw_date}</span>
        </div>
        `
    section.innerHTML = content
}

function walletSection(nextDrawData) {
    const walletAddress = constants.DRAW_INFO[`draw_${nextDrawData.nxt_draw_number}`].wallet_id
    const section = document.getElementById("wallet")
    const input = document.getElementById("copy-link-input")
    const content = `
        <h2>${capitalize(translate("wallet"))}</h2>
        <div id="block-index" class="info-block">
            <p>${capitalize(translate("wallet-id"))}</p>
        </div>
        `
    section.innerHTML = content
    input.setAttribute("value", walletAddress)
    const qrCode = document.getElementById("qrcode")
    const qr = QRCode.toCanvas(qrCode, walletAddress, (e) => {
        if (e) console.log("error generating qr", e)
    })
    qrCode.innerHTML = qr
}

function copyLink() {
    const btn = document.getElementById("copy-link-button")
    const walletId = document.getElementById("copy-link-input")
    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(walletId.getAttribute("value"))
    })
}

function pastDrawsSection() {
    const header = document.getElementById("past-draws-header")
    const headerContent = `
        <h2>${capitalize(translate("previous draws"))}</h2>
        <p>${capitalize(translate("select a draw to see the result"))}</p>
        `
    header.innerHTML = headerContent
    const button = document.getElementById("search-draw-result")
    button.innerHTML = capitalize(translate("search result"))
    const result = document.getElementById("past-draws-result-section")
    const resultContent = `
        <p>${capitalize(translate("input a result to view the numbers"))}</p>
        `
    result.innerHTML = resultContent

}

function validateTransactionSection() {
    const header = document.getElementById("validate-numbers-header")
    const headerContent = `
        <h2>${capitalize(translate("Validate my game"))}</h2>
        <p>${capitalize(translate("input your transaaction id"))}</p>
        `
    header.innerHTML = headerContent
    const button = document.getElementById("validate-numbers-btn")
    button.innerHTML = capitalize(translate("validate transaction"))
    const result = document.getElementById("validate-numbers-result")
    const resultContent = `
        <p>${capitalize(translate("input a transaction id to view the result"))}</p>
        `
    result.innerHTML = resultContent

}

function validateInputAndSearchDraw(input) {
    const section = document.getElementById("past-draws-result-section")
    if (input === null || input === undefined || input <= 0) {
        section.innerHTML = `
            <p>${capitalize(translate("invalid input, you must set a positive number"))}</p>
        `
    } else {
        drawService.getDrawInformation(input).then(drawResult => {
            let content = null
            if (!drawResult.is_complete) {
                content = `
                    <p>${capitalize(translate("this draw has not yet been completed"))}</p>
                `
            } else {
                content = `
                <div class="drawn-numers">
                    ${drawResult.numbers.map(it => `<span class="ball">${it}</span>`).join("")}
                </div>
                `
            }
            section.innerHTML = content
        })
    }
}

function searchDrawResult() {
    const button = document.getElementById("search-draw-result")
    const input = document.getElementById("draw-input")

    button.addEventListener("click", () => {
        validateInputAndSearchDraw(input.value)
    })

}

function validateInputAndSearcTransaction(input) {
    const section = document.getElementById("validate-numbers-result")
    if (input === null || input === undefined) {
        section.innerHTML = `
            <p>${capitalize(translate("invalid input, you must set a transaction id"))}</p>
        `
    } else {
        try {
            transaactionService.getTransactionInformationById(input).then(info => {
                let content = null
                if (info.numbers === null) {
                    content = `
                    <p>${capitalize(translate("you have inputed an invalid transaction id"))}</p>
                    <p>message: ${info.message}</p>
                `
                } else if (info.is_winner === null) {
                    content = `
                    <p>${capitalize(translate("you are participating on the next draw. your numbers are"))}</p>
                    ${info.numbers.map(row =>
                        `<div class="drawn-numers">
                        ${row.map(it => `<span class="ball">${it}</span>`).join("")}
                    </div>`
                    ).join("")}
                    `
                } else if (info.is_winner) {
                    content = `
                    <p>${capitalize(translate("you have won the draw"))}: ${info.draw}</p>
                    ${info.winner_range === 1 ? `<h2>JACKPOT<h2/>` : `<p>${capitalize(translate("you got 4 numbers"))}</p>`}
                    <p>${capitalize(translate("your numbers are"))}:</p>
                    ${info.numbers.map(row =>
                        `<div class="drawn-numers">
                        ${row.map(it => {
                            const winner = info.draw_numbers.includes(it)
                            return (`<span class="ball ${winner ? "winner-ball" : ""}">${it}</span>`)
                        }).join("")}
                    </div>`
                    ).join("")}
                    <p>${capitalize(translate("the draw numbers were"))}:</p>
                    <div class="drawn-numers">
                         ${info.draw_numbers.map(it => `<span class="ball">${it}</span>`).join("")}
                    </div>
                    `
                } else {
                    content = `
                    <p>${capitalize(translate("you have participated on the draw"))}: ${info.draw}</p>
                    <p>${capitalize(translate("your numbers are"))}:</p>
                    ${info.numbers.map(row =>
                        `<div class="drawn-numers">
                        ${row.map(it => {
                            const winner = info.draw_numbers.includes(it)
                            return (`<span class="ball ${winner ? "winner-ball" : ""}">${it}</span>`)
                        }).join("")}
                    </div>`
                    ).join("")}
                    <p>${capitalize(translate("the draw numbers were"))}:</p>
                    <div class="drawn-numers">
                         ${info.draw_numbers.map(it => `<span class="ball">${it}</span>`).join("")}
                    </div>
                    `
                }
                section.innerHTML = content
            })
        } catch (e) {
            section.innerHTML = `
                    <p>${capitalize(translate("failed to valdiate transaction id"))}</p>
                `
        }
    }
}

function validateGame() {
    const button = document.getElementById("validate-numbers-btn")
    const input = document.getElementById("validate-numbers-input")

    button.addEventListener("click", () => {
        validateInputAndSearcTransaction(input.value)
    })

}

function howToParticipateSection() {
    const section = document.getElementById("how-to-participate")

    const content = `
        <h2>${capitalize(translate("how_to_participate_title"))}</h2>
        
        <div class="step-item">
            <div class="step-number">1</div>
            <p>${translate("step_1_instruction")}</p>
        </div>
        
        <div class="step-item">
            <div class="step-number">2</div>
            <p>${translate("step_2_instruction")}</p>
        </div>
        
        <div class="step-item">
            <div class="step-number">3</div>
            <p>${translate("step_3_instruction")}</p>
        </div>

        <div class="step-item">
            <div class="step-number">4</div>
            <p>${translate("step_4_instruction")}</p>
        </div>
        <div class="step-item">
            <div class="step-number">5</div>
            <p>${translate("step_5_instruction")}</p>
        </div>
    `

    section.innerHTML = content
}

function rulesSection() {
    const container = document.getElementById('rules-container');

    container.innerHTML = `
        <section id="rules" class="card full-width">
            <header>
                <h1>${translate('rules_title')}</h1>
                <p>${translate('rules_subtitle')}</p>
            </header>

            <section>
                <h2>${translate('rules_section_1_title')}</h2>
                <p>${translate('rules_section_1_text')}</p>
            </section>

            <div class="grid-rules">
                <div class="card">
                    <h3>${translate('rules_cost_title')}</h3>
                    <p>${translate('rules_cost_detail')}</p>
                </div>
                <div class="card">
                    <h3>${translate('rules_limit_title')}</h3>
                    <p>${translate('rules_limit_detail')}</p>
                </div>
            </div>

            <section>
                <h2>${translate('rules_section_2_title')}</h2>
                <ul>
                    <li>${translate('rules_section_2_item_1')}</li>
                    <li>${translate('rules_section_2_item_2')}</li>
                </ul>
            </section>

            <section>
                <h2>${translate('rules_section_3_title')}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>${translate('rules_table_cat')}</th>
                            <th>${translate('rules_table_div')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>${translate('rules_tier_5')}</strong></td>
                            <td>${translate('rules_prizes_60')}</td>
                        </tr>
                        <tr>
                            <td><strong>${translate('rules_tier_4')}</strong></td>
                            <td>${translate('rules_prizes_20')}</td>
                        </tr>
                        <tr>
                            <td>${translate('rules_tier_next')}</td>
                            <td>${translate('rules_prizes_10_roll')}</td>
                        </tr>
                        <tr>
                            <td>${translate('rules_tier_year')}</td>
                            <td>${translate('rules_prizes_10_super')}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="alert">
                ${translate('rules_alert')}
            </section>

            <section>
                <h2>${translate('rules_section_4_title')}</h2>
                <p>${translate('rules_section_4_text')}</p>
                <a href="https://github.com/anonimous-bt/btc-lottery" class="btn-github">
                    ${translate('rules_github_btn')}
                </a>
            </section>
        </section>
    `;
}

function redirect() {
    const selector = document.getElementById("language-selector")
    selector.addEventListener("change", (e) => {
        const newLang = e.target.value.toLowerCase()
        window.location.assign(`${prefix}/${newLang}`)
    })
}

async function setTexts() {
    const nextDraw = await drawService.getNextDraw()
    nextDrawSection(nextDraw)
    walletSection(nextDraw)
    pastDrawsSection()
    validateTransactionSection()
    howToParticipateSection()
    rulesSection()
}

function addListeners() {
    // updateEnv()
    redirect()
    searchDrawResult()
    validateGame()
    copyLink()
}

function updateLangSelector(lang) {
    const selector = document.getElementById("language-selector")
    selector.value = lang
    setLang(lang)
}

function setLanguage() {
    const language = document.documentElement.lang
    updateLangSelector(language.toUpperCase())
}

function updateEnv() {
    const envSelector = document.getElementById("env-selector")
    envSelector.addEventListener("click", (e) => {
        if (envSelector.checked) {
            setEnv("local")
        } else {
            setEnv("remote")
        }
    })
}


window.onload = async () => {
    setLanguage()
    await setTexts(false)
    addListeners()
}


