# InnoWalletix

InnoWalletix is an electron based non-custodial HD wallet (DApp), which allows a user to create and store a new wallet on desktop, import an existing wallet and external accounts, export the private keys, switch the test blockchain network and send ethers across the accounts in a test network.

## 🛠 Built With

<div align="left">
<a href="https://www.electronjs.org/docs/latest" target="_blank" rel="noreferrer">Electron Js | </a>
<a href="https://react.dev/learn" target="_blank" rel="noreferrer">React Js |</a>
<a href="https://docs.soliditylang.org/en/develop/" target="_blank" rel="noreferrer">Solidity |</a>
<a href="https://nodejs.org/en/docs" target="_blank" rel="noreferrer">Node Js |</a>
<a href="https://trufflesuite.com/docs/ganache/" target="_blank" rel="noreferrer">Ganache |</a>
<a href="https://getbootstrap.com/docs/4.1/getting-started/introduction/" target="_blank" rel="noreferrer">Bootstrap |</a>
<a href="https://dashboard.alchemy.com/" target="_blank" rel="noreferrer">Alchemy</a>
</div>

## Prerequisites

Node Js
Ganache

## Installation

Clone the repository

```bash
git clone https://github.com/Chainxt/InnoWalletix-HD-Wallet.git
cd hd-wallet
```

Install node packages

```bash
npm install
```
For testing on local network, run Ganache network on your system.

## Set environment configuration

Create a .env file in your root project folder, and set the following variables:

```bash
REACT_APP_ALCHEMY_API_URL=<Your-Goerli-Project-Url-From-Alchemy>
REACT_APP_POLYGON_ENDPOINT=<Your-Polygon-Project-Url-From-Alchemy>
REACT_APP_SEPOLIA_ENDPOINT=<Your-Sepolia-Project-Endpoint>
REACT_APP_GANACHE_ENDPOINT="http://127.0.0.1:7545"
REACT_APP_NETWORK="ganache"
REACT_APP_GANACHE_ACCOUNT_PRIVATE_KEY="<Your-Ganache-Account-Private-Key-For-Local-Deployment>"
```

## Run Locally

Run the following command to start your react project on browser:

```bash
npm start
```

To run the desktop app with elecron, provide the following command:

```bash
npm run electron-start
```

## 📜 License

Distributed under the MIT License.

## 🎗️ Contributing

To contribute to InnoWalletix, follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/<feature_name>`)
3. Commit your Changes (`git commit -m '<feature_name>_added'`)
4. Push to the Branch (`git push origin feature/<feature_name>`)
5. Create a Pull Request