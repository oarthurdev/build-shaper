import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BuildData } from "@/types/build";
import { 
  Star, 
  ExternalLink, 
  Save, 
  Share2, 
  Download,
  Clock, 
  Users,
  TrendingUp 
} from "lucide-react";

interface BuildDetailCardProps {
  build: BuildData;
  onSave?: (build: BuildData) => void;
  onShare?: (build: BuildData) => void;
  onExport?: (build: BuildData) => void;
}

export const BuildDetailCard = ({ build, onSave, onShare, onExport }: BuildDetailCardProps) => {
  const getStatColor = (value: number) => {
    if (value >= 80) return "text-green-400";
    if (value >= 60) return "text-diablo-gold";
    return "text-diablo-red";
  };

  return (
    <Card className="border-2 border-diablo-red/30 shadow-diablo-card">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-diablo-gold">{build.name}</CardTitle>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(build.rating) ? 'fill-diablo-gold text-diablo-gold' : 'text-muted'}`} 
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">
              {build.rating.toFixed(1)}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{build.class}</Badge>
          <Badge variant="secondary">{build.playstyle}</Badge>
          {build.difficulty && <Badge variant="secondary">{build.difficulty}</Badge>}
          {build.is_meta && <Badge className="bg-diablo-red/20 text-diablo-red">Meta</Badge>}
          {build.tags.map(tag => (
            <Badge key={tag} className="bg-diablo-gold/20 text-diablo-gold">{tag}</Badge>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {build.author && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>by {build.author}</span>
            </div>
          )}
          {build.source_site && (
            <div className="flex items-center space-x-1">
              <ExternalLink className="h-4 w-4" />
              <span>Source: {build.source_site}</span>
            </div>
          )}
          {build.season && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>{build.season}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div>
          <h3 className="text-lg font-semibold text-diablo-gold mb-3">Build Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-1">
              <div className="text-sm text-muted-foreground">Damage</div>
              <div className={`text-2xl font-bold ${getStatColor(build.stats.damage)}`}>
                {build.stats.damage}%
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-sm text-muted-foreground">Defense</div>
              <div className={`text-2xl font-bold ${getStatColor(build.stats.defense)}`}>
                {build.stats.defense}%
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-sm text-muted-foreground">Speed</div>
              <div className={`text-2xl font-bold ${getStatColor(build.stats.speed)}`}>
                {build.stats.speed}%
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-sm text-muted-foreground">Utility</div>
              <div className={`text-2xl font-bold ${getStatColor(build.stats.utility)}`}>
                {build.stats.utility}%
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
                {build.skills.primary.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-diablo-red/50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Secondary Skills</h4>
              <div className="flex flex-wrap gap-2">
                {build.skills.secondary.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-diablo-gold/50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Ultimate</h4>
              <Badge className="bg-gradient-diablo-primary text-primary-foreground">
                {build.skills.ultimate}
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
                {build.gear.weapon}
              </Badge>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Armor</h4>
              <div className="flex flex-wrap gap-2">
                {build.gear.armor.map((piece) => (
                  <Badge key={piece} variant="secondary">
                    {piece}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Accessories</h4>
              <div className="flex flex-wrap gap-2">
                {build.gear.accessories.map((accessory) => (
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
          {onSave && (
            <Button variant="diablo" onClick={() => onSave(build)}>
              <Save className="mr-2 h-4 w-4" />
              Save Build
            </Button>
          )}
          {onShare && (
            <Button variant="diabloOutline" onClick={() => onShare(build)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          )}
          {onExport && (
            <Button variant="outline" onClick={() => onExport(build)}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
          {build.source_url && (
            <Button 
              variant="outline" 
              onClick={() => window.open(build.source_url, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Source
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};