import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Swords, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  Clock,
  Crown,
  Flame
} from "lucide-react";

export interface Playstyle {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  focus: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  recommendedFor: string[];
}

const playstyles: Playstyle[] = [
  {
    id: 'pve-general',
    name: 'PvE General',
    description: 'Balanced build for questing and dungeon clearing',
    icon: Swords,
    focus: ['Survivability', 'Damage', 'Utility'],
    difficulty: 'Easy',
    recommendedFor: ['New Players', 'Story Mode', 'General Farming']
  },
  {
    id: 'speed-farming',
    name: 'Speed Farming',
    description: 'Optimized for fast clear times and efficiency',
    icon: Clock,
    focus: ['Movement Speed', 'AoE Damage', 'Resource Management'],
    difficulty: 'Medium',
    recommendedFor: ['Nightmare Dungeons', 'Helltide', 'XP Farming']
  },
  {
    id: 'boss-killer',
    name: 'Boss Killer',
    description: 'High single-target damage for endgame bosses',
    icon: Target,
    focus: ['Single Target DPS', 'Burst Damage', 'Survivability'],
    difficulty: 'Hard',
    recommendedFor: ['World Bosses', 'Capstone Dungeons', 'Uber Bosses']
  },
  {
    id: 'pvp-focused',
    name: 'PvP Focused',
    description: 'Built for player vs player combat in Fields of Hatred',
    icon: Crown,
    focus: ['Burst Damage', 'Mobility', 'CC Resistance'],
    difficulty: 'Hard',
    recommendedFor: ['Fields of Hatred', 'PvP Events']
  },
  {
    id: 'group-support',
    name: 'Group Support',
    description: 'Team-oriented builds for party play',
    icon: Users,
    focus: ['Team Buffs', 'Crowd Control', 'Survivability'],
    difficulty: 'Medium',
    recommendedFor: ['Group Dungeons', 'World Events', 'Team Play']
  },
  {
    id: 'glass-cannon',
    name: 'Glass Cannon',
    description: 'Maximum damage output with minimal defense',
    icon: Flame,
    focus: ['Maximum DPS', 'Critical Strikes', 'Damage Multipliers'],
    difficulty: 'Hard',
    recommendedFor: ['Experienced Players', 'Speed Runs', 'High Risk/Reward']
  }
];

interface PlaystyleSelectorProps {
  selectedPlaystyle: string | null;
  onPlaystyleSelect: (playstyleId: string) => void;
  selectedClass: string | null;
}

export const PlaystyleSelector = ({ selectedPlaystyle, onPlaystyleSelect, selectedClass }: PlaystyleSelectorProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600';
      case 'Medium': return 'bg-diablo-gold';
      case 'Hard': return 'bg-diablo-red';
      default: return 'bg-muted';
    }
  };

  if (!selectedClass) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please select a class first to choose your playstyle.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Choose Your Playstyle</h2>
        <p className="text-muted-foreground">How do you want to play your {selectedClass}?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playstyles.map((playstyle) => {
          const Icon = playstyle.icon;
          return (
            <Card 
              key={playstyle.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-diablo-card hover:scale-105 border-2 ${
                selectedPlaystyle === playstyle.id 
                  ? 'border-diablo-red shadow-diablo-glow' 
                  : 'border-border hover:border-diablo-red/50'
              }`}
              onClick={() => onPlaystyleSelect(playstyle.id)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-diablo-dark flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-8 h-8 text-diablo-red" />
                  </div>
                  <Badge 
                    className={`absolute -top-2 -right-2 ${getDifficultyColor(playstyle.difficulty)} text-xs`}
                  >
                    {playstyle.difficulty}
                  </Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{playstyle.name}</h3>
                  <p className="text-sm text-muted-foreground">{playstyle.description}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-diablo-gold">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-1">
                    {playstyle.focus.map((focus) => (
                      <Badge key={focus} variant="secondary" className="text-xs">
                        {focus}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-diablo-gold">Best For:</h4>
                  <div className="text-xs text-muted-foreground">
                    {playstyle.recommendedFor.join(', ')}
                  </div>
                </div>
                
                {selectedPlaystyle === playstyle.id && (
                  <Button variant="diablo" className="w-full">
                    Selected ✓
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};