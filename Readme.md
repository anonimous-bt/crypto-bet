# Bitcoin Lottery

## Overview

Welcome to the **Bitcoin Lottery**! This is a decentralized lottery system built entirely on the Bitcoin blockchain. It is designed to be transparent, auditable, and accessible for anyone interested in participating. The lottery operates without any central organization and leverages the security and transparency of the Bitcoin blockchain for number generation.

This repository contains the code for the lottery system, instructions for running it locally, and the related resources for verifying the results.

## Features

- **Decentralized**: Runs completely on the Bitcoin blockchain.
- **Multi-language Support**: Rules available in 10 languages (used IA to translate - sorry for any error).
- **Public Code**: Fully transparent and auditable via the public GitHub repository.
- **Reports & Prize Distribution**: Every lottery draw is updated with reports and prize payment receipts.
- **GitHub Pages**: A simple HTML page that runs on GitHub Pages for easy access to live results.

## Rules

The rules for the lottery are available in 10 languages. These can be found in the `/rules` folder in this repository. The available languages are:

- Chinese (ZH)
- Hindi (HI)
- Spanish (ES)
- French (FR)
- Arabic (AR)
- Bengali (BN)
- Russian (RU)
- Portuguese (PT)
- Indonesian (ID)
- English (EN)

Each language has its own dedicated markdown file inside the `/rules` folder.

## Running Locally

To run the Bitcoin Lottery project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anonimous-bt/btc-lottery.git
   cd lotto-btc
````

2. **Install dependencies**:
   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

3. **Run any available function you like**:

   If you want to run specific tasks like generating reports or updating prize distributions, refer to the scripts provided in the repository.
````
## Repository Updates

Every lottery draw will trigger an update to the repository:

* **Reports**: Each draw will generate a new report, which will be stored in the `/reports` folder. This includes information on winners, prize distributions, and transaction details.
* **Prize Payments**: Each prize payout will also be logged in the `/prizes` folder, which contains transaction receipts for every payout.

These updates will be pushed automatically after each draw, ensuring transparency and allowing anyone to review the results at any time.

## Website

This repository includes an HTML page hosted on **GitHub Pages** that provides:

* The current status of the lottery (next draw, number of entries, etc.).
* A way to verify your own sequences using the Transaction ID.
* A review of past lottery results and prize distributions.

To view the page, visit:
https://lotto-btc.com

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT), unless otherwise specified.


