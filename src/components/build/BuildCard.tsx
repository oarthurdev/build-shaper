import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuildData } from "@/types/build";
import { Star, ExternalLink, Save, Clock, Users } from "lucide-react";

interface BuildCardProps {
  build: BuildData;
  onSave?: (build: BuildData) => void;
  onSelect?: (build: BuildData) => void;
  showActions?: boolean;
}

export const BuildCard = ({ build, onSave, onSelect, showActions = true }: BuildCardProps) => {
  const getStatColor = (value: number) => {
    if (value >= 80) return "text-green-400";
    if (value >= 60) return "text-diablo-gold";
    return "text-diablo-red";
  };

  return (
    <Card className="border-2 border-diablo-red/30 shadow-diablo-card hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-diablo-gold">{build.name}</CardTitle>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(build.rating) ? 'fill-diablo-gold text-diablo-gold' : 'text-muted'}`} 
              />
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{build.class}</Badge>
          <Badge variant="secondary">{build.playstyle}</Badge>
          {build.difficulty && <Badge variant="secondary">{build.difficulty}</Badge>}
          {build.is_meta && <Badge className="bg-diablo-red/20 text-diablo-red">Meta</Badge>}
          {build.tags.slice(0, 2).map(tag => (
            <Badge key={tag} className="bg-diablo-gold/20 text-diablo-gold">{tag}</Badge>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          {build.author && (
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>by {build.author}</span>
            </div>
          )}
          {build.source_site && (
            <div className="flex items-center space-x-1">
              <ExternalLink className="h-3 w-3" />
              <span>{build.source_site}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">DMG</div>
            <div className={`text-sm font-bold ${getStatColor(build.stats.damage)}`}>
              {build.stats.damage}%
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">DEF</div>
            <div className={`text-sm font-bold ${getStatColor(build.stats.defense)}`}>
              {build.stats.defense}%
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">SPD</div>
            <div className={`text-sm font-bold ${getStatColor(build.stats.speed)}`}>
              {build.stats.speed}%
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">UTL</div>
            <div className={`text-sm font-bold ${getStatColor(build.stats.utility)}`}>
              {build.stats.utility}%
            </div>
          </div>
        </div>

        {/* Skills Preview */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Key Skills</h4>
          <div className="flex flex-wrap gap-1">
            {build.skills.primary.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs border-diablo-red/50">
                {skill}
              </Badge>
            ))}
            <Badge className="text-xs bg-gradient-diablo-primary text-primary-foreground">
              {build.skills.ultimate}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2">
            {onSelect && (
              <Button 
                variant="diablo" 
                size="sm" 
                className="flex-1"
                onClick={() => onSelect(build)}
              >
                View Details
              </Button>
            )}
            {onSave && (
              <Button 
                variant="diabloOutline" 
                size="sm"
                onClick={() => onSave(build)}
              >
                <Save className="h-3 w-3" />
              </Button>
            )}
            {build.source_url && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(build.source_url, '_blank')}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};