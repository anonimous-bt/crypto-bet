# Bitcoin Lottery

## Introduction

The **Bitcoin Lottery** is a decentralized lottery system that operates entirely on the Bitcoin blockchain. It is not associated with any organization, relying solely on the blockchain to exist. The methodology for generating the numbers is transparent and available in this GitHub repository. Using transaction hashes and block hashes, the numbers are generated and will always be the same when the same input is provided.

The code used to generate the lottery numbers can be found in the repository, and you can verify it at any time. The process is fully auditable and transparent to all participants.

## Lottery Rules

### 1. **Schedule and Start**
- **Start Date**: The first lottery will begin on **01/01/2026 at 00:00 UTC**.
- **Frequency**: Each lottery draw will last for **1,008 blocks** (approximately 1 week).
- **First Block**: The first draw will be based on the mining of the Bitcoin block **930210**.

### 2. **Participation and Costs**
- **Cost per Sequence**: 5,000 satoshi (0.00005 BTC) per sequence.
- **Maximum Sequences per Transaction**: You can enter up to **10 sequences per transaction**. Any amount beyond this will not be considered. 
- **Minimum Deposit**: If you deposit fewer than 5,000 satoshi, your deposit will be considered a donation and no sequence will be generated for you.
- **Handling Extra Deposits**: Only multiples of 5,000 satoshi will be considered, with a maximum accepted value of 50,000 satoshi. For example, if you deposit 9,999 satoshi, only **1 sequence** will be valid and the 4,999 sotoshi extra will be considered donation.
- **Transaction Fees**: Be sure to check the transaction fee charged by your wallet. Depending on your wallet, the fee may be deducted from your deposit, potentially affecting your entry. Please make sure the deposit is at least 5,000 satoshi after any transaction fees.

### 3. **Number Generation**
The lottery numbers are generated using the **Transaction ID (TXID)** of your transaction and the **Hash of the last block** of the lottery period. Each character in the TXID and block hash is mapped to a number, which results in a set of numbers between **1 and 50**.

You can review the code for the number generation algorithm here:  
["../service/number_generation.js"]

### 4. **Prize Distribution (90% of the Revenue)**
- **60%**: Distributed to users who match **5 numbers** in their sequence.
- **20%**: Distributed to users who match **4 numbers** in their sequence.
- **10%**: Rolled over to the next lottery.
- **10%**: Reserved for the **Super Prize** in the last lottery of the year.

If no participant matches 5 numbers, the prize will be rolled over to the next draw. The same rule applies to the 4-number prize.

### 5. **Transparency and Auditing**
- The source code for the lottery system is publicly available on **GitHub**, allowing anyone to download and run the code themselves.
- There is also a **GitHub Pages** page where you can:
  - Check the status of the current lottery.
  - Verify your number sequences using the **Transaction ID**.
  - Review previous lottery results and prizes.
  
You can find these pages here:  
https://lotto-btc.com

### 6. **Repository Structure**
The repository contains the following folders:
- **/reports**: Contains reports for each lottery draw, including winners and prize distributions.
- **/prizes**: Contains records of all prize payouts, including transaction details.

### 7. **License**
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT), unless otherwise specified.
