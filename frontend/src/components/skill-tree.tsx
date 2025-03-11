'use client';

import type React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';
import { useToast } from '../hooks/use-toast';
import { Brain, Dumbbell, Heart, Star, Lock, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

// Define skill types and structure
type SkillCategory = 'Vigor' | 'Intelligence' | 'Strength' | 'Charisma';

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  category: SkillCategory;
  icon: React.ElementType;
  unlocked: boolean;
  acquired: boolean;
  cost: number;
  requires?: string[];
  effects: string[];
}

interface SkillNodeProps {
  skill: Skill;
  onClick: (skill: Skill) => void;
  canUnlock: boolean;
  skillPoints: number;
}

// Individual skill node component
function SkillNode({ skill, onClick, skillPoints }: SkillNodeProps) {
  const { theme } = useTheme();
  // Get theme-specific classes
  const getNodeClass = () => {
    const baseClass = 'relative p-3 rounded-lg border transition-all duration-200';

    if (skill.acquired) {
      switch (theme) {
        case 'elden-ring':
          return `${baseClass} bg-amber-900/50 border-amber-500 elden-ring-skill-acquired`;
        case 'league':
          return `${baseClass} bg-blue-900/50 border-blue-500 league-skill-acquired`;
        case 'wow':
          return `${baseClass} bg-blue-900/50 border-yellow-500 wow-skill-acquired`;
        default:
          return `${baseClass} bg-primary/20 border-primary`;
      }
    } else if (skill.unlocked && skillPoints >= skill.cost) {
      switch (theme) {
        case 'elden-ring':
          return `${baseClass} bg-amber-950/30 border-amber-700/50 hover:border-amber-500 cursor-pointer elden-ring-skill-available`;
        case 'league':
          return `${baseClass} bg-blue-950/30 border-blue-700/50 hover:border-blue-500 cursor-pointer league-skill-available`;
        case 'wow':
          return `${baseClass} bg-blue-950/30 border-yellow-700/50 hover:border-yellow-500 cursor-pointer wow-skill-available`;
        default:
          return `${baseClass} bg-muted border-muted-foreground hover:border-primary cursor-pointer`;
      }
    } else if (skill.unlocked) {
      return `${baseClass} bg-muted/20 border-muted-foreground/50 opacity-70`;
    } else {
      return `${baseClass} bg-muted/10 border-muted-foreground/30 opacity-50`;
    }
  };

  const getIconColor = () => {
    if (skill.acquired) {
      switch (skill.category) {
        case 'Vigor':
          return 'text-red-400';
        case 'Intelligence':
          return 'text-blue-400';
        case 'Strength':
          return 'text-amber-400';
        case 'Charisma':
          return 'text-purple-400';
      }
    } else if (skill.unlocked && skillPoints >= skill.cost) {
      switch (skill.category) {
        case 'Vigor':
          return 'text-red-500/70';
        case 'Intelligence':
          return 'text-blue-500/70';
        case 'Strength':
          return 'text-amber-500/70';
        case 'Charisma':
          return 'text-purple-500/70';
      }
    } else {
      return 'text-muted-foreground/50';
    }
  };

  return (
    <div
      className={getNodeClass()}
      onClick={() => {
        if (skill.unlocked && !skill.acquired && skillPoints >= skill.cost) {
          onClick(skill);
        }
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-full bg-background/20 ${getIconColor()}`}>
          <skill.icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{skill.name}</div>
          <div className="text-xs text-muted-foreground">
            Level {skill.level}/{skill.maxLevel}
          </div>
        </div>
        {!skill.unlocked && <Lock className="h-4 w-4 text-muted-foreground/70" />}
        {skill.acquired && <CheckCircle2 className="h-4 w-4 text-green-500" />}
        {skill.unlocked && !skill.acquired && (
          <div className="flex items-center gap-1 text-xs">
            <Zap className="h-3 w-3" />
            <span>{skill.cost}</span>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground mb-2">{skill.description}</div>

      {skill.effects.length > 0 && (
        <div className="text-xs space-y-1 mt-2">
          <div className="font-medium">Effects:</div>
          <ul className="space-y-0.5 text-muted-foreground">
            {skill.effects.map((effect, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-primary">•</span>
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Skill connection lines
function SkillConnector({
  from,
  to,
  acquired,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  acquired: boolean;
}) {
  const { theme } = useTheme();

  const getLineColor = () => {
    if (acquired) {
      switch (theme) {
        case 'elden-ring':
          return 'stroke-amber-500';
        case 'league':
          return 'stroke-blue-500';
        case 'wow':
          return 'stroke-yellow-500';
        default:
          return 'stroke-primary';
      }
    } else {
      return 'stroke-muted-foreground/30';
    }
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: 'visible' }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        className={`${getLineColor()} stroke-2 transition-colors duration-300`}
      />
    </svg>
  );
}

// Main skill tree component
export function SkillTree() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [skillPoints, setSkillPoints] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('Vigor');

  // Define skills for each category
  const [skills, setSkills] = useState<Skill[]>([
    // Vigor skills
    {
      id: 'vigor-1',
      name: 'Endurance',
      description: 'Increase your physical stamina',
      level: 1,
      maxLevel: 3,
      category: 'Vigor',
      icon: Heart,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Reduces fatigue by 10%', 'Improves recovery time'],
    },
    {
      id: 'vigor-2',
      name: 'Vitality',
      description: 'Improve overall health and wellness',
      level: 1,
      maxLevel: 3,
      category: 'Vigor',
      icon: Heart,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Increases energy levels', 'Improves immune system'],
    },
    {
      id: 'vigor-3',
      name: 'Resilience',
      description: 'Bounce back from setbacks faster',
      level: 1,
      maxLevel: 2,
      category: 'Vigor',
      icon: Heart,
      unlocked: false,
      acquired: false,
      cost: 2,
      requires: ['vigor-1'],
      effects: ['Reduces stress impact by 15%', 'Faster recovery from illness'],
    },
    {
      id: 'vigor-4',
      name: 'Iron Constitution',
      description: 'Develop exceptional physical resilience',
      level: 1,
      maxLevel: 3,
      category: 'Vigor',
      icon: Heart,
      unlocked: false,
      acquired: false,
      cost: 3,
      requires: ['vigor-3'],
      effects: ['Reduces sick days by 25%', 'Improves sleep quality'],
    },

    // Intelligence skills
    {
      id: 'intelligence-1',
      name: 'Quick Learning',
      description: 'Absorb information more efficiently',
      level: 1,
      maxLevel: 3,
      category: 'Intelligence',
      icon: Brain,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Increases reading comprehension by 10%', 'Improves memory retention'],
    },
    {
      id: 'intelligence-2',
      name: 'Problem Solving',
      description: 'Find solutions to complex problems',
      level: 1,
      maxLevel: 3,
      category: 'Intelligence',
      icon: Brain,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Enhances critical thinking', 'Improves decision making'],
    },
    {
      id: 'intelligence-3',
      name: 'Deep Focus',
      description: 'Maintain concentration for longer periods',
      level: 1,
      maxLevel: 2,
      category: 'Intelligence',
      icon: Brain,
      unlocked: false,
      acquired: false,
      cost: 2,
      requires: ['intelligence-1'],
      effects: ['Extends focus duration by 20%', 'Reduces distractions'],
    },
    {
      id: 'intelligence-4',
      name: 'Genius Insight',
      description: 'Gain profound understanding of complex topics',
      level: 1,
      maxLevel: 3,
      category: 'Intelligence',
      icon: Brain,
      unlocked: false,
      acquired: false,
      cost: 3,
      requires: ['intelligence-3'],
      effects: ['Unlocks advanced learning techniques', 'Improves pattern recognition'],
    },

    // Strength skills
    {
      id: 'strength-1',
      name: 'Discipline',
      description: 'Develop consistent habits',
      level: 1,
      maxLevel: 3,
      category: 'Strength',
      icon: Dumbbell,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Increases habit consistency by 15%', 'Improves self-control'],
    },
    {
      id: 'strength-2',
      name: 'Willpower',
      description: 'Resist temptations and distractions',
      level: 1,
      maxLevel: 3,
      category: 'Strength',
      icon: Dumbbell,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Reduces procrastination by 10%', 'Improves task completion'],
    },
    {
      id: 'strength-3',
      name: 'Mental Fortitude',
      description: 'Maintain composure under pressure',
      level: 1,
      maxLevel: 2,
      category: 'Strength',
      icon: Dumbbell,
      unlocked: false,
      acquired: false,
      cost: 2,
      requires: ['strength-1'],
      effects: [
        'Reduces stress in difficult situations',
        'Improves decision making under pressure',
      ],
    },
    {
      id: 'strength-4',
      name: 'Unbreakable Will',
      description: 'Achieve goals despite any obstacle',
      level: 1,
      maxLevel: 3,
      category: 'Strength',
      icon: Dumbbell,
      unlocked: false,
      acquired: false,
      cost: 3,
      requires: ['strength-3'],
      effects: ['Increases persistence by 25%', "Unlocks 'second wind' when fatigued"],
    },

    // Charisma skills
    {
      id: 'charisma-1',
      name: 'Clear Communication',
      description: 'Express ideas effectively',
      level: 1,
      maxLevel: 3,
      category: 'Charisma',
      icon: Star,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Improves verbal clarity by 15%', 'Reduces misunderstandings'],
    },
    {
      id: 'charisma-2',
      name: 'Active Listening',
      description: 'Understand others more deeply',
      level: 1,
      maxLevel: 3,
      category: 'Charisma',
      icon: Star,
      unlocked: true,
      acquired: false,
      cost: 1,
      effects: ['Increases empathy', 'Improves relationship quality'],
    },
    {
      id: 'charisma-3',
      name: 'Persuasion',
      description: 'Convince others of your ideas',
      level: 1,
      maxLevel: 2,
      category: 'Charisma',
      icon: Star,
      unlocked: false,
      acquired: false,
      cost: 2,
      requires: ['charisma-1'],
      effects: ['Enhances convincing arguments', 'Improves negotiation outcomes'],
    },
    {
      id: 'charisma-4',
      name: 'Inspiring Presence',
      description: 'Motivate and uplift those around you',
      level: 1,
      maxLevel: 3,
      category: 'Charisma',
      icon: Star,
      unlocked: false,
      acquired: false,
      cost: 3,
      requires: ['charisma-3'],
      effects: ['Creates positive atmosphere in groups', 'Improves leadership capabilities'],
    },
  ]);

  // Update skill tree based on prerequisites
  const updateSkillTree = () => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];

      // Check each skill to see if it should be unlocked
      newSkills.forEach((skill) => {
        if (skill.requires && !skill.unlocked) {
          const allRequirementsMet = skill.requires.every((reqId) => {
            const requiredSkill = newSkills.find((s) => s.id === reqId);
            return requiredSkill && requiredSkill.acquired;
          });

          if (allRequirementsMet) {
            skill.unlocked = true;
          }
        }
      });

      return newSkills;
    });
  };

  // Handle skill acquisition
  const handleSkillClick = (clickedSkill: Skill) => {
    if (skillPoints < clickedSkill.cost) {
      toast({
        title: 'Not enough skill points',
        description: `You need ${clickedSkill.cost} skill points to acquire this skill.`,
      });
      return;
    }

    setSkills((prevSkills) => {
      return prevSkills.map((skill) => {
        if (skill.id === clickedSkill.id) {
          return { ...skill, acquired: true };
        }
        return skill;
      });
    });

    setSkillPoints((prev) => prev - clickedSkill.cost);

    toast({
      title: `${clickedSkill.name} Acquired!`,
      description: `You've learned ${clickedSkill.name} (Level ${clickedSkill.level}/${clickedSkill.maxLevel})`,
    });

    // Update skill tree after acquisition
    setTimeout(updateSkillTree, 100);
  };

  // Filter skills by selected category
  const filteredSkills = skills.filter((skill) => skill.category === selectedCategory);

  // Get theme-specific classes
  const getSkillTreeClass = () => {
    switch (theme) {
      case 'elden-ring':
        return 'elden-ring-skill-tree';
      case 'league':
        return 'league-skill-tree';
      case 'wow':
        return 'wow-skill-tree';
      default:
        return '';
    }
  };

  const getCategoryButtonClass = (category: SkillCategory) => {
    const isActive = category === selectedCategory;

    if (theme === 'elden-ring') {
      return isActive
        ? 'bg-amber-900/70 border-amber-500 text-amber-100'
        : 'bg-amber-950/30 border-amber-700/50 text-amber-200/70 hover:bg-amber-900/50 hover:border-amber-600';
    } else if (theme === 'league') {
      return isActive
        ? 'bg-blue-900/70 border-blue-500 text-blue-100'
        : 'bg-blue-950/30 border-blue-700/50 text-blue-200/70 hover:bg-blue-900/50 hover:border-blue-600';
    } else if (theme === 'wow') {
      return isActive
        ? 'bg-blue-900/70 border-yellow-500 text-yellow-100'
        : 'bg-blue-950/30 border-yellow-700/50 text-yellow-200/70 hover:bg-blue-900/50 hover:border-yellow-600';
    } else {
      return isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  };

  const getCategoryIcon = (category: SkillCategory) => {
    switch (category) {
      case 'Vigor':
        return Heart;
      case 'Intelligence':
        return Brain;
      case 'Strength':
        return Dumbbell;
      case 'Charisma':
        return Star;
    }
  };

  return (
    <Card className={getSkillTreeClass()}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Skill Tree</span>
          <div className="flex items-center gap-2 text-sm font-normal">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>{skillPoints} Skill Points Available</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2">
          {(['Vigor', 'Intelligence', 'Strength', 'Charisma'] as SkillCategory[]).map(
            (category) => {
              const Icon = getCategoryIcon(category);
              return (
                <Button
                  key={category}
                  variant="outline"
                  className={`flex items-center gap-2 border ${getCategoryButtonClass(category)}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <Icon className="h-4 w-4" />
                  {category}
                </Button>
              );
            }
          )}
        </div>

        {/* Skill tree visualization */}
        <div className="relative grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* First row - basic skills */}
          {filteredSkills.slice(0, 2).map((skill) => (
            <SkillNode
              key={skill.id}
              skill={skill}
              onClick={handleSkillClick}
              canUnlock={true}
              skillPoints={skillPoints}
            />
          ))}

          {/* Second row - intermediate skills */}
          {filteredSkills.slice(2, 3).map((skill) => (
            <SkillNode
              key={skill.id}
              skill={skill}
              onClick={handleSkillClick}
              canUnlock={skill.unlocked}
              skillPoints={skillPoints}
            />
          ))}

          {/* Third row - advanced skills */}
          {filteredSkills.slice(3, 4).map((skill) => (
            <SkillNode
              key={skill.id}
              skill={skill}
              onClick={handleSkillClick}
              canUnlock={skill.unlocked}
              skillPoints={skillPoints}
            />
          ))}

          {/* Skill connections */}
          {selectedCategory === 'Vigor' && (
            <>
              <SkillConnector
                from={{ x: 100, y: 80 }}
                to={{ x: 100, y: 180 }}
                acquired={skills.find((s) => s.id === 'vigor-1')?.acquired || false}
              />
              <SkillConnector
                from={{ x: 100, y: 180 }}
                to={{ x: 100, y: 280 }}
                acquired={skills.find((s) => s.id === 'vigor-3')?.acquired || false}
              />
            </>
          )}

          {selectedCategory === 'Intelligence' && (
            <>
              <SkillConnector
                from={{ x: 100, y: 80 }}
                to={{ x: 100, y: 180 }}
                acquired={skills.find((s) => s.id === 'intelligence-1')?.acquired || false}
              />
              <SkillConnector
                from={{ x: 100, y: 180 }}
                to={{ x: 100, y: 280 }}
                acquired={skills.find((s) => s.id === 'intelligence-3')?.acquired || false}
              />
            </>
          )}

          {selectedCategory === 'Strength' && (
            <>
              <SkillConnector
                from={{ x: 100, y: 80 }}
                to={{ x: 100, y: 180 }}
                acquired={skills.find((s) => s.id === 'strength-1')?.acquired || false}
              />
              <SkillConnector
                from={{ x: 100, y: 180 }}
                to={{ x: 100, y: 280 }}
                acquired={skills.find((s) => s.id === 'strength-3')?.acquired || false}
              />
            </>
          )}

          {selectedCategory === 'Charisma' && (
            <>
              <SkillConnector
                from={{ x: 100, y: 80 }}
                to={{ x: 100, y: 180 }}
                acquired={skills.find((s) => s.id === 'charisma-1')?.acquired || false}
              />
              <SkillConnector
                from={{ x: 100, y: 180 }}
                to={{ x: 100, y: 280 }}
                acquired={skills.find((s) => s.id === 'charisma-3')?.acquired || false}
              />
            </>
          )}
        </div>

        {/* Skill point info */}
        <div className="p-4 border rounded-lg bg-card/50">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">How to earn skill points</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Level up your character (1 point per level)</li>
                <li>• Complete boss challenges (1-3 points)</li>
                <li>• Achieve milestones (1-2 points)</li>
                <li>• Complete weekly quest chains (1 point)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
