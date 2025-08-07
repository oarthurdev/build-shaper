import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dice6, Search, RefreshCw } from "lucide-react";
import { useState } from "react";
import { BuildData } from "@/types/build";
import { useBuilds } from "@/hooks/useBuilds";
import { BuildCard } from "@/components/build/BuildCard";
import { BuildDetailCard } from "@/components/build/BuildDetailCard";


interface BuildGeneratorProps {
  selectedClass: string;
  selectedPlaystyle: string;
  onBuildSaved: (build: BuildData) => void;
}

export const BuildGenerator = ({ selectedClass, selectedPlaystyle, onBuildSaved }: BuildGeneratorProps) => {
  const [selectedBuild, setSelectedBuild] = useState<BuildData | null>(null);
  const [scrapeSource, setScrapeSource] = useState<'maxroll' | 'd4builds'>('maxroll');
  const { builds, loading, error, fetchBuilds, scrapeBuilds } = useBuilds();
  const { toast } = useToast();

  const handleScrapeBuilds = async () => {
    await scrapeBuilds(scrapeSource, selectedClass, selectedPlaystyle);
  };

  const handleFetchBuilds = async () => {
    await fetchBuilds(selectedClass, selectedPlaystyle);
  };

  const handleBuildSelect = (build: BuildData) => {
    setSelectedBuild(build);
  };

  const handleSaveBuild = (build: BuildData) => {
    onBuildSaved(build);
    toast({
      title: "Build Saved!",
      description: "Your build has been saved to your collection",
    });
  };

  const handleShareBuild = (build: BuildData) => {
    navigator.clipboard.writeText(`Check out this ${build.name} build from ${build.source_site}!`);
    toast({
      title: "Build Link Copied!",
      description: "Share this build with your friends",
    });
  };

  const handleExportBuild = (build: BuildData) => {
    const exportText = `
${build.name}
Class: ${build.class}
Playstyle: ${build.playstyle}
Rating: ${build.rating}/5
Difficulty: ${build.difficulty}

Primary Skills: ${build.skills.primary.join(', ')}
Secondary Skills: ${build.skills.secondary.join(', ')}
Ultimate: ${build.skills.ultimate}

Weapon: ${build.gear.weapon}
Armor: ${build.gear.armor.join(', ')}
Accessories: ${build.gear.accessories.join(', ')}

Stats:
- Damage: ${build.stats.damage}%
- Defense: ${build.stats.defense}%
- Speed: ${build.stats.speed}%
- Utility: ${build.stats.utility}%

Source: ${build.source_site} - ${build.source_url}
    `.trim();

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${build.name.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Build Exported!",
      description: "Build details have been downloaded",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Build Generator</h2>
        <p className="text-muted-foreground">
          Find optimized builds for your {selectedClass} ({selectedPlaystyle})
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <div className="flex gap-2">
            <Button 
              variant={scrapeSource === 'maxroll' ? 'diablo' : 'diabloOutline'}
              size="sm"
              onClick={() => setScrapeSource('maxroll')}
            >
              Maxroll.gg
            </Button>
            <Button 
              variant={scrapeSource === 'd4builds' ? 'diablo' : 'diabloOutline'}
              size="sm"
              onClick={() => setScrapeSource('d4builds')}
            >
              D4builds.gg
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="diablo" 
              onClick={handleScrapeBuilds}
              disabled={loading}
              className="min-w-32"
            >
              <Search className="mr-2 h-4 w-4" />
              {loading ? "Scraping..." : "Scrape Builds"}
            </Button>
            <Button 
              variant="diabloOutline" 
              onClick={handleFetchBuilds}
              disabled={loading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-center py-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {selectedBuild ? (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedBuild(null)}
            className="mb-4"
          >
            ← Back to Build List
          </Button>
          <BuildDetailCard 
            build={selectedBuild}
            onSave={handleSaveBuild}
            onShare={handleShareBuild}
            onExport={handleExportBuild}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading builds...</p>
            </div>
          ) : builds.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground">
                Found {builds.length} builds
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {builds.map((build) => (
                  <BuildCard
                    key={build.id}
                    build={build}
                    onSave={handleSaveBuild}
                    onSelect={handleBuildSelect}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No builds found. Try scraping builds from {scrapeSource} to get started.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};