import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Dice6, 
  Save, 
  Share2, 
  Download,
  Star,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

interface BuildData {
  id: string;
  name: string;
  class: string;
  playstyle: string;
  rating: number;
  difficulty: string;
  author: string;
  lastUpdated: string;
  tags: string[];
  skills: {
    primary: string[];
    secondary: string[];
    ultimate: string;
  };
  gear: {
    weapon: string;
    armor: string[];
    accessories: string[];
  };
  stats: {
    damage: number;
    defense: number;
    speed: number;
    utility: number;
  };
}

// Mock build data - in a real app this would come from an API
const generateMockBuild = (className: string, playstyle: string): BuildData => {
  const builds = {
    barbarian: {
      'pve-general': {
        name: "Upheaval Barbarian",
        skills: {
          primary: ["Frenzy", "Upheaval", "Rallying Cry"],
          secondary: ["Ground Stomp", "War Cry", "Iron Skin"],
          ultimate: "Wrath of the Berserker"
        },
        gear: {
          weapon: "Two-Handed Mace",
          armor: ["Rage of Harrogath", "Aspect of Berserk Ripping", "Gohr's Devastating Grips"],
          accessories: ["Ring of Red Furor", "Amulet of the Protector"]
        }
      }
    },
    necromancer: {
      'pve-general': {
        name: "Blood Surge Necromancer",
        skills: {
          primary: ["Blood Surge", "Corpse Explosion", "Bone Armor"],
          secondary: ["Blood Mist", "Decrepify", "Corpse Tendrils"],
          ultimate: "Army of the Dead"
        },
        gear: {
          weapon: "Blood Artisan's Cuirass",
          armor: ["Aspect of Explosive Mist", "Blood Moon Breeches", "Deathless Visage"],
          accessories: ["Ring of Sacrilegious Soul", "Amulet of the Damned"]
        }
      }
    }
  };

  const classBuilds = builds[className as keyof typeof builds];
  const build = classBuilds?.[playstyle as keyof typeof classBuilds];
  
  return {
    id: `${className}-${playstyle}-${Date.now()}`,
    name: build?.name || `${className} ${playstyle} Build`,
    class: className,
    playstyle: playstyle,
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    difficulty: "Intermediate",
    author: "BuildMaster",
    lastUpdated: "2 days ago",
    tags: ["Season 2", "Meta", "Endgame"],
    skills: build?.skills || {
      primary: ["Skill 1", "Skill 2", "Skill 3"],
      secondary: ["Skill 4", "Skill 5", "Skill 6"],
      ultimate: "Ultimate Skill"
    },
    gear: build?.gear || {
      weapon: "Legendary Weapon",
      armor: ["Armor Piece 1", "Armor Piece 2", "Armor Piece 3"],
      accessories: ["Accessory 1", "Accessory 2"]
    },
    stats: {
      damage: Math.floor(Math.random() * 40) + 60,
      defense: Math.floor(Math.random() * 40) + 60,
      speed: Math.floor(Math.random() * 40) + 60,
      utility: Math.floor(Math.random() * 40) + 60
    }
  };
};

interface BuildGeneratorProps {
  selectedClass: string;
  selectedPlaystyle: string;
  onBuildSaved: (build: BuildData) => void;
}

export const BuildGenerator = ({ selectedClass, selectedPlaystyle, onBuildSaved }: BuildGeneratorProps) => {
  const [currentBuild, setCurrentBuild] = useState<BuildData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateBuild = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newBuild = generateMockBuild(selectedClass, selectedPlaystyle);
    setCurrentBuild(newBuild);
    setIsGenerating(false);
    
    toast({
      title: "Build Generated!",
      description: `Created a new ${newBuild.name} build`,
    });
  };

  const saveBuild = () => {
    if (currentBuild) {
      onBuildSaved(currentBuild);
      toast({
        title: "Build Saved!",
        description: "Your build has been saved to your collection",
      });
    }
  };

  const shareBuild = () => {
    if (currentBuild) {
      // In a real app, this would generate a shareable link
      navigator.clipboard.writeText(`Check out my ${currentBuild.name} build!`);
      toast({
        title: "Build Link Copied!",
        description: "Share this build with your friends",
      });
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return "text-green-400";
    if (value >= 60) return "text-diablo-gold";
    return "text-diablo-red";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Build Generator</h2>
        <p className="text-muted-foreground">
          Generate optimized builds for your {selectedClass} ({selectedPlaystyle})
        </p>
        
        <Button 
          variant="diablo" 
          size="lg"
          onClick={generateBuild}
          disabled={isGenerating}
          className="min-w-48"
        >
          <Dice6 className="mr-2 h-5 w-5" />
          {isGenerating ? "Generating..." : "Generate New Build"}
        </Button>
      </div>

      {currentBuild && (
        <Card className="border-2 border-diablo-red/30 shadow-diablo-card">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-diablo-gold">{currentBuild.name}</CardTitle>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < currentBuild.rating ? 'fill-diablo-gold text-diablo-gold' : 'text-muted'}`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{currentBuild.class}</Badge>
              <Badge variant="secondary">{currentBuild.playstyle}</Badge>
              <Badge variant="secondary">{currentBuild.difficulty}</Badge>
              {currentBuild.tags.map(tag => (
                <Badge key={tag} className="bg-diablo-red/20 text-diablo-red">{tag}</Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>by {currentBuild.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Updated {currentBuild.lastUpdated}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Stats Overview */}
            <div>
              <h3 className="text-lg font-semibold text-diablo-gold mb-3">Build Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-1">
                  <div className="text-sm text-muted-foreground">Damage</div>
                  <div className={`text-2xl font-bold ${getStatColor(currentBuild.stats.damage)}`}>
                    {currentBuild.stats.damage}%
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm text-muted-foreground">Defense</div>
                  <div className={`text-2xl font-bold ${getStatColor(currentBuild.stats.defense)}`}>
                    {currentBuild.stats.defense}%
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm text-muted-foreground">Speed</div>
                  <div className={`text-2xl font-bold ${getStatColor(currentBuild.stats.speed)}`}>
                    {currentBuild.stats.speed}%
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm text-muted-foreground">Utility</div>
                  <div className={`text-2xl font-bold ${getStatColor(currentBuild.stats.utility)}`}>
                    {currentBuild.stats.utility}%
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-diablo-gold mb-3">Skills</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Primary Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentBuild.skills.primary.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-diablo-red/50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Secondary Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentBuild.skills.secondary.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-diablo-gold/50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Ultimate</h4>
                  <Badge className="bg-gradient-diablo-primary text-primary-foreground">
                    {currentBuild.skills.ultimate}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Gear */}
            <div>
              <h3 className="text-lg font-semibold text-diablo-gold mb-3">Recommended Gear</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Weapon</h4>
                  <Badge variant="secondary" className="bg-diablo-gold/20 text-diablo-gold">
                    {currentBuild.gear.weapon}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Armor</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentBuild.gear.armor.map((piece) => (
                      <Badge key={piece} variant="secondary">
                        {piece}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Accessories</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentBuild.gear.accessories.map((accessory) => (
                      <Badge key={accessory} variant="secondary">
                        {accessory}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button variant="diablo" onClick={saveBuild}>
                <Save className="mr-2 h-4 w-4" />
                Save Build
              </Button>
              <Button variant="diabloOutline" onClick={shareBuild}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};