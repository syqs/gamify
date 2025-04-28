
export interface Game {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  image: string;
  externalUrl: string;
  tags: string[];
  requiredToken?: {
    name: string;
    address: string;
    icon: string;
  };
}

export const gameListings: Game[] = [
  {
    id: '1',
    name: 'Pixel Tycoon',
    description: 'Build your pixel empire and dominate the market!',
    shortDescription: 'Build your pixel empire',
    image: '/images/pixel-tycoon.png',
    externalUrl: 'https://example.com/pixel-tycoon',
    tags: ['Strategy', 'Simulation'],
  },
  {
    id: '2',
    name: 'Crypto Gladiators',
    description: 'Battle your way to glory in this blockchain-based arena.',
    shortDescription: 'Battle in the blockchain arena',
    image: '/images/crypto-gladiators.png',
    externalUrl: 'https://example.com/crypto-gladiators',
    tags: ['Action', 'PVP'],
  },
  {
    id: '3',
    name: 'Neon Racers',
    description: 'High-speed racing game with NFT cars and token rewards.',
    shortDescription: 'Race for NFT rewards',
    image: '/images/neon-racers.png',
    externalUrl: 'https://example.com/neon-racers',
    tags: ['Racing', 'Play-to-Earn'],
  },
];

// Alias for backward compatibility with existing code
export const mockGames = gameListings;

// Updated with actual WETH addresses for each network
export const tokenContracts = {
  // Ethereum Mainnet
  '1': {  
    // These are officially verified WETH addresses
    PIXEL: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    FOXY: '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI token address (more reliable)
  },
  // Polygon
  '137': {  
    PIXEL: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH on Polygon
    FOXY: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'  // DAI on Polygon
  },
  // Sepolia testnet
  '11155111': {  
    PIXEL: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9', // Sepolia WETH-like token
    FOXY: '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6'  // Sepolia DAI-like token
  },
  // Goerli testnet
  '5': {  
    PIXEL: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', // Goerli WETH contract
    FOXY: '0x73967c6a0904aA032C103b4104747E88c566B1A2'  // Goerli DAI-like token
  },
  // Arbitrum
  '42161': {
    PIXEL: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH on Arbitrum
    FOXY: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'  // DAI on Arbitrum
  },
  // Base
  '8453': {
    PIXEL: '0x4200000000000000000000000000000000000006', // WETH on Base
    FOXY: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb'  // DAI on Base
  },
  // Optimism
  '10': {
    PIXEL: '0x4200000000000000000000000000000000000006', // WETH on Optimism
    FOXY: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'  // DAI on Optimism
  }
};
