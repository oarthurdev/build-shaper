import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import barbarianIcon from "@/assets/barbarian-icon.jpg";
import necromancerIcon from "@/assets/necromancer-icon.jpg";
import sorceressIcon from "@/assets/sorceress-icon.jpg";
import rogueIcon from "@/assets/rogue-icon.jpg";
import druidIcon from "@/assets/druid-icon.jpg";

export interface DiabloClass {
  id: string;
  name: string;
  description: string;
  icon: string;
  primaryStats: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const diabloClasses: DiabloClass[] = [
  {
    id: 'barbarian',
    name: 'Barbarian',
    description: 'Savage melee warrior with devastating physical attacks',
    icon: barbarianIcon,
    primaryStats: ['Strength', 'Fortify', 'Fury'],
    difficulty: 'Beginner'
  },
  {
    id: 'necromancer',
    name: 'Necromancer',
    description: 'Master of death magic and undead minions',
    icon: necromancerIcon,
    primaryStats: ['Intelligence', 'Corpse', 'Essence'],
    difficulty: 'Intermediate'
  },
  {
    id: 'sorceress',
    name: 'Sorceress',
    description: 'Elemental spellcaster with devastating magic',
    icon: sorceressIcon,
    primaryStats: ['Intelligence', 'Mana', 'Enchantment'],
    difficulty: 'Advanced'
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'Agile assassin specializing in precision and stealth',
    icon: rogueIcon,
    primaryStats: ['Dexterity', 'Energy', 'Combo Points'],
    difficulty: 'Intermediate'
  },
  {
    id: 'druid',
    name: 'Druid',
    description: 'Shape-shifting nature guardian with elemental powers',
    icon: druidIcon,
    primaryStats: ['Willpower', 'Spirit', 'Nature Magic'],
    difficulty: 'Advanced'
  }
];

interface ClassSelectorProps {
  selectedClass: string | null;
  onClassSelect: (classId: string) => void;
}

export const ClassSelector = ({ selectedClass, onClassSelect }: ClassSelectorProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-diablo-gold';
      case 'Advanced': return 'bg-diablo-red';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Choose Your Class</h2>
        <p className="text-muted-foreground">Select a class to begin crafting your build</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diabloClasses.map((diabloClass) => (
          <Card 
            key={diabloClass.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-diablo-card hover:scale-105 border-2 ${
              selectedClass === diabloClass.id 
                ? 'border-diablo-red shadow-diablo-glow' 
                : 'border-border hover:border-diablo-red/50'
            }`}
            onClick={() => onClassSelect(diabloClass.id)}
          >
            <CardContent className="p-6 space-y-4">
              <div className="relative">
                <img 
                  src={diabloClass.icon} 
                  alt={diabloClass.name}
                  className="w-20 h-20 mx-auto rounded-lg object-cover group-hover:shadow-lg transition-all duration-300"
                />
                <Badge 
                  className={`absolute -top-2 -right-2 ${getDifficultyColor(diabloClass.difficulty)} text-xs`}
                >
                  {diabloClass.difficulty}
                </Badge>
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground">{diabloClass.name}</h3>
                <p className="text-sm text-muted-foreground">{diabloClass.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-diablo-gold">Primary Stats:</h4>
                <div className="flex flex-wrap gap-1">
                  {diabloClass.primaryStats.map((stat) => (
                    <Badge key={stat} variant="secondary" className="text-xs">
                      {stat}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {selectedClass === diabloClass.id && (
                <Button variant="diablo" className="w-full">
                  Selected ✓
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};