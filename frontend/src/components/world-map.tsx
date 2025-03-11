'use client';

import type React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from './theme-provider';
import { useToast } from '../hooks/use-toast';
import {
  Map,
  Compass,
  Mountain,
  Trees,
  Building,
  Scroll,
  Castle,
  Waves,
  Sparkles,
  Lock,
  Trophy,
} from 'lucide-react';

// Define region types and structure
interface Region {
  id: string;
  name: string;
  description: string;
  lore: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  icon: React.ElementType;
  unlocked: boolean;
  completed: boolean;
  progress: number;
  challenges: number;
  rewards: string[];
  requiredLevel?: number;
}

interface LocationProps {
  region: Region;
  isSelected: boolean;
  onClick: () => void;
}

// Individual location component
function Location({ region, isSelected, onClick }: LocationProps) {
  const { theme } = useTheme();

  // Get theme-specific classes
  const getLocationClass = () => {
    const baseClass = 'relative p-4 rounded-lg border transition-all duration-200 cursor-pointer';

    if (!region.unlocked) {
      return `${baseClass} opacity-60 bg-muted/30 border-muted-foreground/30`;
    }

    if (isSelected) {
      switch (theme) {
        case 'elden-ring':
          return `${baseClass} world-elden-highlight-bg border world-elden-highlight-border`;
        case 'league':
          return `${baseClass} world-league-highlight-bg border world-league-highlight-border`;
        case 'wow':
          return `${baseClass} world-wow-highlight-bg border world-wow-highlight-border`;
        default:
          return `${baseClass} bg-primary/20 border-primary`;
      }
    } else {
      switch (theme) {
        case 'elden-ring':
          return `${baseClass} world-elden-bg border world-elden-border hover:world-elden-highlight-border`;
        case 'league':
          return `${baseClass} world-league-bg border world-league-border hover:world-league-highlight-border`;
        case 'wow':
          return `${baseClass} world-wow-bg border world-wow-border hover:world-wow-highlight-border`;
        default:
          return `${baseClass} bg-card hover:bg-accent/50 border-border hover:border-primary/50`;
      }
    }
  };

  const getDifficultyColor = () => {
    switch (region.difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-500';
      case 'Intermediate':
        return 'bg-blue-500/20 text-blue-500';
      case 'Advanced':
        return 'bg-amber-500/20 text-amber-500';
      case 'Master':
        return 'bg-red-500/20 text-red-500';
    }
  };

  return (
    <div className={getLocationClass()} onClick={region.unlocked ? onClick : undefined}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-full bg-background/20">
          <region.icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">{region.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={getDifficultyColor()}>
              {region.difficulty}
            </Badge>
            {!region.unlocked && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Level {region.requiredLevel} required</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3">{region.description}</p>

      {region.unlocked && (
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1">
            <Trophy className="h-3 w-3 text-amber-500" />
            <span>{region.challenges} challenges</span>
          </div>
          <div>Progress: {region.progress}%</div>
        </div>
      )}
    </div>
  );
}

// Main world map component
export function WorldMap() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState<string | null>('mountains-of-focus');

  // Define regions
  const regions: Region[] = [
    {
      id: 'mountains-of-focus',
      name: 'Mountains of Focus',
      description: 'A serene range where concentration and mindfulness are cultivated',
      lore: 'The Mountains of Focus rise majestically from the mists, their peaks touching the clouds. Ancient monasteries dot the slopes, where monks have practiced the art of deep concentration for centuries. It is said that those who master the challenges of these mountains gain the ability to focus their mind like a laser, cutting through distractions with ease.',
      difficulty: 'Beginner',
      icon: Mountain,
      unlocked: true,
      completed: false,
      progress: 45,
      challenges: 5,
      rewards: ['Deep Focus skill', 'Meditation technique', '50 XP per challenge'],
    },
    {
      id: 'knowledge-forest',
      name: 'Knowledge Forest',
      description: 'A vast woodland filled with ancient wisdom and learning',
      lore: 'The Knowledge Forest stretches as far as the eye can see, its ancient trees holding the wisdom of ages. Scholars have built libraries among the branches, and the rustling leaves whisper secrets to those who listen carefully. Every path through this forest leads to discovery, and those who explore thoroughly find themselves enriched with understanding that transforms their mind.',
      difficulty: 'Beginner',
      icon: Trees,
      unlocked: true,
      completed: false,
      progress: 30,
      challenges: 6,
      rewards: ['Quick Learning skill', 'Memory enhancement', '60 XP per challenge'],
    },
    {
      id: 'discipline-citadel',
      name: 'Discipline Citadel',
      description: 'A fortress where willpower and self-control are forged',
      lore: "The Discipline Citadel stands as an imposing structure of unyielding stone and iron, built by ancient warriors who valued self-mastery above all else. Within its walls, challenges test not just strength but the ability to persist when every fiber of your being wishes to quit. Those who conquer the citadel's trials emerge with a will as strong as its walls, capable of maintaining habits that once seemed impossible.",
      difficulty: 'Intermediate',
      icon: Castle,
      unlocked: true,
      completed: false,
      progress: 15,
      challenges: 7,
      rewards: ['Iron Will skill', 'Habit formation boost', '75 XP per challenge'],
    },
    {
      id: 'social-metropolis',
      name: 'Social Metropolis',
      description: 'A bustling city where communication and leadership skills thrive',
      lore: "The Social Metropolis hums with activity day and night, its streets filled with people from all walks of life. In this city of a thousand conversations, the art of connection has been elevated to its highest form. Those who master the city's challenges learn to speak with clarity and listen with depth, building relationships that open doors to new opportunities and collaborations that change the world.",
      difficulty: 'Intermediate',
      icon: Building,
      unlocked: false,
      completed: false,
      progress: 0,
      challenges: 6,
      requiredLevel: 5,
      rewards: ['Persuasion skill', 'Network expansion', '70 XP per challenge'],
    },
    {
      id: 'creativity-shores',
      name: 'Creativity Shores',
      description: 'Coastal regions where innovation and imagination flow like the tides',
      lore: 'The Creativity Shores are ever-changing, shaped by the constant dance of waves upon sand. Artists, inventors, and dreamers are drawn to these beaches, where the horizon seems infinite and possibilities feel endless. The challenges of this region push adventurers to think beyond conventional boundaries, finding solutions where none seemed possible and creating beauty from the simplest elements.',
      difficulty: 'Advanced',
      icon: Waves,
      unlocked: false,
      completed: false,
      progress: 0,
      challenges: 5,
      requiredLevel: 8,
      rewards: ['Innovative Thinking skill', 'Creative flow state', '90 XP per challenge'],
    },
    {
      id: 'mastery-peaks',
      name: 'Mastery Peaks',
      description: 'The highest summits where true expertise is achieved',
      lore: 'The Mastery Peaks tower above all other regions, their summits often hidden in clouds. Few adventurers ever reach these heights, where the air is thin but the vision is clear. Those who conquer these peaks gain not just skills but true mastery - the ability to perform with excellence even under the most challenging conditions. From these heights, the interconnectedness of all skills becomes apparent, revealing patterns invisible from below.',
      difficulty: 'Master',
      icon: Sparkles,
      unlocked: false,
      completed: false,
      progress: 0,
      challenges: 3,
      requiredLevel: 12,
      rewards: ['Skill Synergy ability', 'Flow State mastery', '150 XP per challenge'],
    },
  ];

  // Get the currently selected region
  const currentRegion = regions.find((r) => r.id === selectedRegion) || regions[0];

  // Handle travel to region
  const handleTravelToRegion = () => {
    if (!currentRegion.unlocked) {
      toast({
        title: 'Region locked',
        description: `You need to reach level ${currentRegion.requiredLevel} to unlock this region.`,
      });
      return;
    }

    toast({
      title: `Traveling to ${currentRegion.name}`,
      description: 'Your journey begins! New challenges await.',
    });
  };

  // Get theme-specific classes
  const getWorldMapClass = () => {
    switch (theme) {
      case 'elden-ring':
        return 'world-elden-bg border world-elden-border';
      case 'league':
        return 'world-league-bg border world-league-border';
      case 'wow':
        return 'world-wow-bg border world-wow-border';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className={getWorldMapClass()}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            World Map
          </CardTitle>
          <CardDescription>Explore regions to find challenges and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {regions.map((region) => (
              <Location
                key={region.id}
                region={region}
                isSelected={region.id === selectedRegion}
                onClick={() => setSelectedRegion(region.id)}
              />
            ))}
          </div>

          <Card className="bg-card/50 border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Compass className="h-5 w-5" />
                {currentRegion.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <Scroll className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Region Lore</h4>
                  <p className="text-sm text-muted-foreground">{currentRegion.lore}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Trophy className="h-5 w-5 text-amber-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Rewards</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {currentRegion.rewards.map((reward, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-primary">•</span>
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                className="w-full mt-2"
                disabled={!currentRegion.unlocked}
                onClick={handleTravelToRegion}
              >
                Travel to Region
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
