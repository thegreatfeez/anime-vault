# 🌀 AnimeVault

A web app that allows users to search for anime, view details, and simulate renting them using a mock blockchain transaction. Powered by anime and crypto APIs. AnimeVault combines anime fandom with a taste of crypto-style payments.

---

## 🚀 Features

- 🔍 Search for anime by title
- 📄 View anime details including image, plot, rating, etc.
- 🛒 Add anime to your vault (cart-like system)
- 💸 Simulated blockchain transaction using `setTimeout` to mimic transaction delay
- 📦 Save rented anime to localStorage for persistence
- 💱 Live crypto price fetch for realistic payment simulation (based on user-selected token)

---

## 🧠 Simulated Blockchain Transaction

We simulate a blockchain payment confirmation using JavaScript’s `setTimeout` to introduce a delay, mimicking real-world blockchain confirmation time. After "payment", anime gets moved from the selection vault to the rented list.

---

## 🌐 APIs Used

1. 📺 Anime API
Source: Jikan API or similar

Used to fetch anime data based on user search queries.

2. 🪙 Crypto API
Source: CoinGecko API or any free crypto price feed

Used to display current prices of selected tokens (ETH and USDT )

Token price used to simulate total cost of renting anime.

---

## 🚧 Future Improvements

This project is a front-end simulation, but it sets the foundation for real-world blockchain integration. Here’s what can be improved and expanded:

### 🔗 1. Real Blockchain Integration
- Replace `setTimeout` simulation with actual **smart contract calls**.
- Use [**Solidity**](https://soliditylang.org/) to write a rental contract for anime assets.
- Deploy contracts on testnets like **Sepolia** or **Polygon Mumbai** using **Hardhat** or **Foundry**.
- Handle payment and ownership transfers via smart contract logic.

### 🦊 2. Wallet Integration
- Add **MetaMask** or **WalletConnect** to allow users to connect their crypto wallets.
- Use **Ethers.js** or **Web3.js** to trigger real blockchain transactions from the browser.

### 🧾 3. NFT-Style Anime Rentals
- Convert anime selections into **ERC-721** NFTs to represent unique rental rights.
- Store rental metadata (name, image, expiration time) on IPFS or Arweave.

### 💽 4. Backend Storage (Optional)
- Add a backend (Node.js, Supabase, etc.) to persist rented data in a database rather than localStorage.
- Handle user authentication using wallet signatures or JWT.

### 📊 5. More Crypto Utility
- Add support for different tokens (USDC, ETH, MATIC).
- Display live gas fees.
- Let users choose preferred token for payment.

---

## 🙏 Acknowledgements

- Thanks to [Jikan API](https://jikan.moe) for providing open access to anime data.
- Thanks to [CoinGecko API](https://www.coingecko.com/en/api) for real-time crypto price data.

---

## 📬 Feedback & Contributions

Got feedback or ideas?  
Feel free to open an issue or fork the repo and submit a pull request.  
I'm always open to suggestions and improvements!

---

## 🔗 Connect with Me

- Twitter: [@thegreatfeez](https://twitter.com/thegreatfeez)
- GitHub: [@thegreatfeez](https://github.com/thegreatfeez)

> Built with passion for anime and curiosity for blockchain tech.

