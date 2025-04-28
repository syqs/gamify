
import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Game } from '@/data/gameListings';

// ERC20 and ERC721 ABIs for balance checking
const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const { address, isConnected } = useAccount();
  
  const [isChecking, setIsChecking] = useState(false);
  
  // Check if user has required token
  const { data: tokenBalance, refetch: checkToken } = useContractRead({
    address: game.requiredToken?.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: false, // Don't run automatically
  });

  const hasToken = tokenBalance ? (tokenBalance as bigint) > 0n : null;
  
  const checkTokenOwnership = async () => {
    if (!isConnected || !game.requiredToken) return;
    
    try {
      setIsChecking(true);
      await checkToken();
      setIsChecking(false);
    } catch (error) {
      console.error("Error checking token ownership:", error);
      setIsChecking(false);
    }
  };
  
  const handleLaunchGame = () => {
    window.open(game.externalUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden bg-web3-card-bg border-web3-accent/20 hover:border-web3-accent/50 transition-all shadow-lg shadow-web3-accent/5 hover:shadow-web3-accent/20">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-full h-full object-cover object-center transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
          {game.tags.map((tag, index) => (
            <Badge key={index} className="bg-web3-accent/80 text-white text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-web3-text">{game.name}</CardTitle>
        <CardDescription className="text-web3-text-secondary line-clamp-2">
          {game.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-web3-text-secondary line-clamp-3">
        <p>{game.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {game.requiredToken && (
          <div className="w-full flex items-center justify-between text-sm text-web3-text-secondary mb-1 px-2 py-1 rounded-md bg-web3-background">
            <div className="flex items-center gap-2">
              <img 
                src={game.requiredToken.icon} 
                alt={game.requiredToken.name} 
                className="w-5 h-5 rounded-full"
              />
              <span>Requires {game.requiredToken.name}</span>
            </div>
            {isConnected ? (
              hasToken === null ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7 bg-transparent border-web3-highlight text-web3-highlight hover:bg-web3-highlight hover:text-white"
                  onClick={checkTokenOwnership}
                  disabled={isChecking}
                >
                  {isChecking ? "Checking..." : "Check Access"}
                </Button>
              ) : (
                <Badge className={`text-xs ${hasToken ? 'bg-green-600' : 'bg-red-600'}`}>
                  {hasToken ? 'Access Granted' : 'Access Denied'}
                </Badge>
              )
            ) : (
              <Badge className="text-xs bg-web3-background text-web3-text-secondary">
                Connect Wallet
              </Badge>
            )}
          </div>
        )}
        <Button 
          className={`w-full ${
            game.requiredToken && hasToken === false
              ? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed'
              : 'bg-web3-cta hover:bg-web3-cta-hover'
          } text-white transition-colors`}
          onClick={handleLaunchGame}
          disabled={game.requiredToken && hasToken === false}
        >
          {game.requiredToken && hasToken === false ? 'Token Required' : 'Launch Game'}
        </Button>
      </CardFooter>
    </Card>
  );
}
