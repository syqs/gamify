
import { useState } from 'react';
import { GameCard } from './GameCard';
import { Input } from "@/components/ui/input";
import { mockGames, Game } from '@/data/gameListings';

export function GameList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredGames = mockGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = !filter || game.tags.includes(filter);
    
    return matchesSearch && matchesFilter;
  });
  
  // Get unique tags from all games
  const allTags = Array.from(new Set(mockGames.flatMap(game => game.tags)));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-web3-background border-web3-accent/20 text-web3-text placeholder:text-web3-text-secondary/70 focus-visible:ring-web3-accent"
        />
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === null 
                ? 'bg-web3-accent text-white' 
                : 'bg-web3-background text-web3-text-secondary hover:bg-web3-accent/20'
            } transition-colors`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === tag 
                  ? 'bg-web3-accent text-white' 
                  : 'bg-web3-background text-web3-text-secondary hover:bg-web3-accent/20'
              } transition-colors`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {filteredGames.length === 0 ? (
        <div className="text-center py-10 text-web3-text-secondary">
          No games found matching your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
