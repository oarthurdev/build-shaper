import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BuildData } from "@/types/build";
import { 
  Star, 
  Clock, 
  Edit, 
  Trash2, 
  Share2,
  History
} from "lucide-react";

interface BuildHistoryProps {
  builds: BuildData[];
  onBuildSelect: (build: BuildData) => void;
  onBuildDelete: (buildId: string) => void;
}

export const BuildHistory = ({ builds, onBuildSelect, onBuildDelete }: BuildHistoryProps) => {
  if (builds.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-diablo-dark flex items-center justify-center">
          <History className="w-8 h-8 text-diablo-red" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">No Saved Builds</h3>
          <p className="text-muted-foreground">
            Generate and save your first build to see it here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Build History</h2>
        <p className="text-muted-foreground">
          Manage your saved builds ({builds.length} total)
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {builds.map((build) => (
          <Card 
            key={build.id}
            className="group cursor-pointer transition-all duration-300 hover:shadow-diablo-card hover:scale-105 border-2 border-border hover:border-diablo-red/50"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-diablo-gold line-clamp-1">
                    {build.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < build.rating ? 'fill-diablo-gold text-diablo-gold' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBuildDelete(build.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">{build.class}</Badge>
                <Badge variant="secondary" className="text-xs">{build.playstyle}</Badge>
                <Badge variant="secondary" className="text-xs">{build.difficulty}</Badge>
              </div>
              
               <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{build.created_at ? new Date(build.created_at).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Mini Stats */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">DMG</div>
                  <div className="text-sm font-semibold text-diablo-red">
                    {build.stats.damage}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">DEF</div>
                  <div className="text-sm font-semibold text-blue-400">
                    {build.stats.defense}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">SPD</div>
                  <div className="text-sm font-semibold text-green-400">
                    {build.stats.speed}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">UTL</div>
                  <div className="text-sm font-semibold text-diablo-gold">
                    {build.stats.utility}%
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {build.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} className="bg-diablo-red/20 text-diablo-red text-xs">
                    {tag}
                  </Badge>
                ))}
                {build.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{build.tags.length - 2}
                  </Badge>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="diablo" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onBuildSelect(build)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Load
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                     e.stopPropagation();
                    const shareText = build.source_url 
                      ? `Check out this ${build.name} build from ${build.source_site}: ${build.source_url}`
                      : `Check out my ${build.name} build!`;
                    navigator.clipboard.writeText(shareText);
                  }}
                >
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};