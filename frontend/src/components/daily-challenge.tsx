'use client';

import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';
import { useTheme } from './theme-provider';

interface DailyChallengeProps {
  title: string;
  description: string;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  statBoost: string;
}

export default function DailyChallenge({
  title,
  description,
  xp,
  difficulty,
  completed,
  statBoost,
}: DailyChallengeProps) {
  const { toast } = useToast();
  const { theme } = useTheme();

  const difficultyColor = {
    Easy: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
    Hard: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  };

  // Add theme-specific class names for the badge
  const getThemeBadgeClasses = () => {
    if (theme === 'elden-ring') {
      return {
        Easy: 'bg-green-900/30 text-green-400 border border-green-700',
        Medium: 'bg-amber-900/30 text-amber-400 border border-amber-700',
        Hard: 'bg-red-900/30 text-red-400 border border-red-700',
      };
    } else if (theme === 'league') {
      return {
        Easy: 'bg-green-900/30 text-green-300 border border-green-700 clip-path-polygon',
        Medium: 'bg-amber-900/30 text-amber-300 border border-amber-700 clip-path-polygon',
        Hard: 'bg-red-900/30 text-red-300 border border-red-700 clip-path-polygon',
      };
    } else if (theme === 'wow') {
      return {
        Easy: 'bg-green-900/30 text-green-300 border-2 border-green-700',
        Medium: 'bg-amber-900/30 text-amber-300 border-2 border-amber-700',
        Hard: 'bg-red-900/30 text-red-300 border-2 border-red-700',
      };
    }

    return difficultyColor;
  };

  const handleComplete = () => {
    if (!completed) {
      toast({
        title: 'Challenge completed!',
        description: `You earned ${xp} XP and ${statBoost}`,
      });
    }
  };

  const badgeClasses = getThemeBadgeClasses();

  return (
    <Card
      className={cn(
        'transition-all duration-200',
        completed ? 'bg-primary/5 border-primary/20' : ''
      )}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {completed ? (
              <CheckCircle className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
            <h3 className="font-medium">{title}</h3>
          </div>
          <Badge variant="outline" className={badgeClasses[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm">
          <span
            className={`font-medium text-amber-500 ${theme === 'elden-ring' ? 'elden-ring-text-glow' : theme === 'wow' ? 'wow-text-glow' : ''}`}
          >
            {xp} XP
          </span>
          <span className="text-primary">{statBoost}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={completed ? 'outline' : 'default'}
          className="w-full"
          onClick={handleComplete}
          disabled={completed}
        >
          {completed ? 'Completed' : 'Complete Challenge'}
        </Button>
      </CardFooter>
    </Card>
  );
}
