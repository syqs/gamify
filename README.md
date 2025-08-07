https://web3-game-hub.netlify.app/
# Web3 Game Nexus

A Web3 game launcher built with React, allowing users to connect their wallets, check token balances, and launch web3 games.

## Features

- **Wallet Connection**: Connect with MetaMask or other EVM-compatible wallets
- **Token Balance**: View your ERC-20 token balances
- **Game Library**: Browse and launch available Web3 games
- **Token Gating**: Games can require specific tokens for access
- **Game Filtering**: Search and filter games by categories

## Technologies Used

- **React**: For building the user interface
- **Tailwind CSS**: For styling
- **Web3 Integration**: Simulated wallet connection and blockchain interactions

## Setup and Installation

1. Clone the repository
```bash
git clone <repository-url>
cd web3-game-nexus
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:8080 in your browser

## Usage

1. Connect your MetaMask wallet using the "Connect MetaMask" button
2. View your token balances in the Token Balance card
3. Browse the available games
4. If a game requires a specific token, click "Check Access" to verify ownership
5. Launch games with the "Launch Game" button

## Notes on the Implementation

This project demonstrates a simulated Web3 integration:

- In a production environment, you'd use `wagmi` and `viem` for wallet connections and blockchain interactions
- Token balances and ownership checks use mock data for demonstration
- For actual implementation, replace the simulated checks with real blockchain calls

## Future Enhancements

- Real-time market prices for tokens
- Integration with game marketplaces
- In-game item NFT viewer
- Transaction history related to gaming activity
- Game achievements stored on-chain

## License

MIT
