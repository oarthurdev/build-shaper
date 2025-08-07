import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassSelector, DiabloClass } from "@/components/ClassSelector";
import { PlaystyleSelector, Playstyle } from "@/components/PlaystyleSelector";
import { BuildGenerator } from "@/components/BuildGenerator";
import { BuildHistory } from "@/components/BuildHistory";
import { useToast } from "@/hooks/use-toast";
import { BuildData } from "@/types/build";
import { 
  Flame, 
  Shield, 
  Swords, 
  History,
  Github,
  Twitter
} from "lucide-react";
import heroImage from "@/assets/diablo-hero.jpg";

const Index = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedPlaystyle, setSelectedPlaystyle] = useState<string | null>(null);
  const [savedBuilds, setSavedBuilds] = useState<BuildData[]>([]);
  const [activeTab, setActiveTab] = useState("class");
  const { toast } = useToast();

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId);
    setSelectedPlaystyle(null); // Reset playstyle when class changes
    setActiveTab("playstyle");
  };

  const handlePlaystyleSelect = (playstyleId: string) => {
    setSelectedPlaystyle(playstyleId);
    setActiveTab("generator");
  };

  const handleBuildSaved = (build: BuildData) => {
    setSavedBuilds(prev => [build, ...prev]);
  };

  const handleBuildDelete = (buildId: string) => {
    setSavedBuilds(prev => prev.filter(build => build.id !== buildId));
    toast({
      title: "Build Deleted",
      description: "The build has been removed from your collection",
    });
  };

  const handleBuildSelect = (build: BuildData) => {
    setSelectedClass(build.class);
    setSelectedPlaystyle(build.playstyle);
    setActiveTab("generator");
    toast({
      title: "Build Loaded",
      description: `${build.name} has been loaded for editing`,
    });
  };

  const canAccessTab = (tab: string) => {
    switch (tab) {
      case "class": return true;
      case "playstyle": return selectedClass !== null;
      case "generator": return selectedClass !== null && selectedPlaystyle !== null;
      case "history": return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Flame className="h-12 w-12 text-diablo-red" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Diablo IV
              </h1>
              <Flame className="h-12 w-12 text-diablo-red" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-diablo-gold">
              Build Generator
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Craft the perfect build for your playstyle. Generate optimized builds, 
              customize your loadout, and dominate Sanctuary.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button 
                variant="diablo" 
                size="lg"
                onClick={() => setActiveTab("class")}
              >
                <Swords className="mr-2 h-5 w-5" />
                Start Building
              </Button>
              <Button 
                variant="diabloOutline" 
                size="lg"
                onClick={() => setActiveTab("history")}
              >
                <History className="mr-2 h-5 w-5" />
                View Builds
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card border-2 border-border">
            <TabsTrigger 
              value="class" 
              className="data-[state=active]:bg-gradient-diablo-primary data-[state=active]:text-primary-foreground"
            >
              <Shield className="mr-2 h-4 w-4" />
              Class
            </TabsTrigger>
            <TabsTrigger 
              value="playstyle" 
              disabled={!canAccessTab("playstyle")}
              className="data-[state=active]:bg-gradient-diablo-primary data-[state=active]:text-primary-foreground disabled:opacity-50"
            >
              <Swords className="mr-2 h-4 w-4" />
              Playstyle
            </TabsTrigger>
            <TabsTrigger 
              value="generator" 
              disabled={!canAccessTab("generator")}
              className="data-[state=active]:bg-gradient-diablo-primary data-[state=active]:text-primary-foreground disabled:opacity-50"
            >
              <Flame className="mr-2 h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-gradient-diablo-primary data-[state=active]:text-primary-foreground"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="class" className="space-y-6">
              <ClassSelector 
                selectedClass={selectedClass}
                onClassSelect={handleClassSelect}
              />
            </TabsContent>

            <TabsContent value="playstyle" className="space-y-6">
              <PlaystyleSelector 
                selectedClass={selectedClass}
                selectedPlaystyle={selectedPlaystyle}
                onPlaystyleSelect={handlePlaystyleSelect}
              />
            </TabsContent>

            <TabsContent value="generator" className="space-y-6">
              {selectedClass && selectedPlaystyle ? (
                <BuildGenerator 
                  selectedClass={selectedClass}
                  selectedPlaystyle={selectedPlaystyle}
                  onBuildSaved={handleBuildSaved}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Please select a class and playstyle to generate builds.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <BuildHistory 
                builds={savedBuilds}
                onBuildSelect={handleBuildSelect}
                onBuildDelete={handleBuildDelete}
              />
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-diablo-red" />
              <span className="text-lg font-bold text-foreground">Diablo IV Build Generator</span>
            </div>
            
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>Unofficial fan-made tool for Diablo IV build optimization</p>
              <p className="mt-1">Not affiliated with Blizzard Entertainment</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;