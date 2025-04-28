
import { WalletConnection } from '@/components/WalletConnection';
import { TokenBalance } from '@/components/TokenBalance';
import { GameList } from '@/components/GameList';

const Index = () => {
  return (
    <div className="min-h-screen bg-web3-background text-web3-text">
      <header className="border-b border-web3-accent/20 bg-web3-card-bg/70 backdrop-blur-sm">
        <div className="container py-4 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-web3-accent flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-web3-text">Web3 Game Nexus</h1>
          </div>
        </div>
      </header>
      
      <main className="container py-8 px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletConnection />
          <TokenBalance />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-web3-text mb-6">Available Games</h2>
          <GameList />
        </div>
      </main>
      
      <footer className="border-t border-web3-accent/20 bg-web3-card-bg/70 py-6">
        <div className="container px-4 sm:px-6 text-center text-web3-text-secondary">
          <p>Web3 Game Nexus &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-1">Built with React, Tailwind CSS & Web3 technologies</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
