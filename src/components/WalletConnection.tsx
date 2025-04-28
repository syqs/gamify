
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { connect, isLoading: isConnecting, connectors } = useConnect({
    onSuccess: (data) => {
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
    },
    onError: (error) => {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet.",
        variant: "destructive",
      });
    }
  });
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = (chainId?: number) => {
    switch(chainId) {
      case 1: return 'Ethereum Mainnet';
      case 5: return 'Goerli Testnet';
      case 11155111: return 'Sepolia Testnet';
      case 137: return 'Polygon Mainnet';
      case 80001: return 'Mumbai Testnet';
      case 42161: return 'Arbitrum One';
      case 421613: return 'Arbitrum Goerli';
      case 10: return 'Optimism';
      case 8453: return 'Base';
      case 84531: return 'Base Goerli';
      default: return `Chain ID: ${chainId || 'unknown'}`;
    }
  };

  const handleConnect = () => {
    const connector = connectors[0]; // Using the first connector (injected)
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <Card className="bg-web3-card-bg border-web3-accent/20 shadow-lg shadow-web3-accent/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-web3-text text-xl">Wallet Connection</CardTitle>
        <CardDescription className="text-web3-text-secondary">
          {isConnected 
            ? `Connected to ${getNetworkName(chain?.id)}` 
            : "Connect your wallet to access games"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected && address ? (
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="px-4 py-2 rounded-md bg-web3-background text-web3-text flex-1">
              {formatAddress(address)}
            </div>
            <Button 
              onClick={() => disconnect()} 
              variant="outline" 
              className="bg-transparent border-web3-accent text-web3-accent hover:bg-web3-accent hover:text-white transition-colors"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleConnect} 
            className="w-full bg-web3-accent hover:bg-web3-accent-hover text-white transition-colors"
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
