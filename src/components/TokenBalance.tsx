
import { useState } from 'react';
import { useAccount, useContractRead, useNetwork, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tokenContracts } from '@/data/gameListings';
import { useToast } from "@/hooks/use-toast";

// ERC20 ABI for balanceOf function
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
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  }
];

export function TokenBalance() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [selectedToken, setSelectedToken] = useState<string>("ETH");
  const { toast } = useToast();
  
  const chainIdString = chain?.id?.toString() || '';
  const tokenAddress = selectedToken !== "ETH" && chainIdString ? 
    tokenContracts[chainIdString as keyof typeof tokenContracts]?.[selectedToken as keyof typeof tokenContracts[keyof typeof tokenContracts]] : 
    undefined;

  // Get ETH balance
  const { data: ethBalance, isLoading: isEthLoading } = useBalance({
    address: address,
    enabled: isConnected && selectedToken === "ETH",
  });

  // Get token balance
  const { data: rawBalance, isLoading: isBalanceLoading, isError: isBalanceError } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address && !!tokenAddress && selectedToken !== "ETH",
    onError: (error) => {
      console.error(`Error fetching ${selectedToken} balance:`, error);
      toast({
        title: `${selectedToken} Balance Error`,
        description: `Could not fetch ${selectedToken} balance. Contract may not be accessible on this network.`,
        variant: "destructive",
      });
    }
  });

  // Get token decimals
  const { data: decimals, isLoading: isDecimalsLoading, isError: isDecimalsError } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: 'decimals',
    enabled: !!tokenAddress && selectedToken !== "ETH",
    onError: (error) => {
      console.error(`Error fetching ${selectedToken} decimals:`, error);
    }
  });

  const isLoading = (selectedToken === "ETH" ? isEthLoading : (isBalanceLoading || isDecimalsLoading));
  const isError = selectedToken !== "ETH" && (isBalanceError || isDecimalsError);
  
  // Format the balance
  let formattedBalance = '0.00000000';
  if (selectedToken === "ETH") {
    formattedBalance = ethBalance ? Number(ethBalance.formatted).toFixed(8) : '0.00000000';
  } else if (rawBalance && decimals && !isError) {
    try {
      const fullBalance = formatUnits(rawBalance as bigint, decimals as number);
      formattedBalance = Number(fullBalance).toFixed(8);
    } catch (error) {
      console.error('Error formatting balance:', error);
      formattedBalance = '0.00000000';
    }
  }

  const handleTokenChange = (token: string) => {
    setSelectedToken(token);
  };

  // Define available tokens based on the chain
  const getAvailableTokens = () => {
    const tokens = ["ETH"]; // ETH is always available
    
    if (chainIdString && tokenContracts[chainIdString as keyof typeof tokenContracts]) {
      const chainTokens = tokenContracts[chainIdString as keyof typeof tokenContracts];
      return [...tokens, ...Object.keys(chainTokens)];
    }
    
    return tokens;
  };

  return (
    <Card className="bg-web3-card-bg border-web3-accent/20 shadow-lg shadow-web3-accent/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-web3-text text-xl">Token Balance</CardTitle>
        <CardDescription className="text-web3-text-secondary">
          {isConnected ? "Your current token balance" : "Connect wallet to view balance"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {getAvailableTokens().map((token) => (
              <button
                key={token}
                onClick={() => handleTokenChange(token)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedToken === token 
                    ? 'bg-web3-accent text-white' 
                    : 'bg-web3-background text-web3-text-secondary hover:bg-web3-accent/20'
                } transition-colors`}
              >
                {token}
              </button>
            ))}
          </div>
          
          <div className="mt-2 p-4 rounded-md bg-web3-background flex items-center justify-between">
            <span className="text-web3-text text-xl font-bold">
              {isLoading 
                ? "Loading..." 
                : isError
                ? "Contract Error"
                : !isConnected 
                  ? "—" 
                  : `${formattedBalance} ${selectedToken}`}
            </span>
            <span className="text-web3-highlight text-xs uppercase">Balance</span>
          </div>
          {isError && (
            <div className="mt-1 text-xs text-destructive">
              Failed to load {selectedToken} balance. The token contract may not be accessible on this network.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
