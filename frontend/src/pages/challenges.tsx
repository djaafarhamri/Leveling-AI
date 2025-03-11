'use client';

import React from 'react';

import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Search,
  Filter,
  Zap,
  Brain,
  Heart,
  Dumbbell,
  Star,
  CheckCircle2,
  Clock,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';
// Add this import at the top
import { BossChallenge } from '../components/boss-challenge';
import { useSearchParams } from 'react-router-dom';

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  statBoost: {
    stat: 'Vigor' | 'Intelligence' | 'Strength' | 'Charisma';
    value: number;
  };
  category: 'Daily' | 'Weekly' | 'Monthly';
  completed: boolean;
}

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const challenges: Challenge[] = [
    {
      id: 1,
      title: 'Morning Meditation',
      description: 'Complete a 10-minute guided meditation session',
      difficulty: 'Easy',
      xp: 50,
      statBoost: { stat: 'Vigor', value: 2 },
      category: 'Daily',
      completed: true,
    },
    {
      id: 2,
      title: 'Learning Sprint',
      description: 'Study a new topic for 25 minutes without distractions',
      difficulty: 'Medium',
      xp: 75,
      statBoost: { stat: 'Intelligence', value: 3 },
      category: 'Daily',
      completed: false,
    },
    {
      id: 3,
      title: 'Cold Shower Challenge',
      description: 'Take a cold shower for at least 60 seconds',
      difficulty: 'Hard',
      xp: 100,
      statBoost: { stat: 'Strength', value: 4 },
      category: 'Daily',
      completed: false,
    },
    {
      id: 4,
      title: 'Social Connection',
      description: "Reach out to a friend you haven't spoken to in a while",
      difficulty: 'Medium',
      xp: 60,
      statBoost: { stat: 'Charisma', value: 3 },
      category: 'Daily',
      completed: false,
    },
    {
      id: 5,
      title: 'Read a Book Chapter',
      description: 'Read at least one chapter of a non-fiction book',
      difficulty: 'Medium',
      xp: 80,
      statBoost: { stat: 'Intelligence', value: 3 },
      category: 'Daily',
      completed: false,
    },
    {
      id: 6,
      title: 'Weekly Exercise Plan',
      description: 'Complete 3 workout sessions this week',
      difficulty: 'Medium',
      xp: 150,
      statBoost: { stat: 'Vigor', value: 5 },
      category: 'Weekly',
      completed: false,
    },
    {
      id: 7,
      title: 'Digital Detox',
      description: 'Spend one day with minimal screen time (max 1 hour)',
      difficulty: 'Hard',
      xp: 200,
      statBoost: { stat: 'Strength', value: 6 },
      category: 'Weekly',
      completed: false,
    },
    {
      id: 8,
      title: 'Public Speaking Practice',
      description: 'Record yourself giving a 5-minute presentation on any topic',
      difficulty: 'Hard',
      xp: 180,
      statBoost: { stat: 'Charisma', value: 6 },
      category: 'Weekly',
      completed: false,
    },
  ];

  // Add this inside your ChallengesPage component
  const bossChallenges = [
    {
      name: 'Productivity Marathon',
      description:
        'Complete a series of focused work sessions with minimal breaks to defeat the Procrastination Demon.',
      difficulty: 'Normal',
      requirements: [
        'Complete 5 pomodoro sessions (25 min each)',
        'Take breaks of only 5 minutes between sessions',
        'No social media during work sessions',
      ],
      reward: "Unlock 'Deep Focus' skill + 150 XP",
      timeLimit: '48 hours',
      progress: 40,
    },
    {
      name: 'Knowledge Colossus',
      description: 'Absorb a significant amount of new information to defeat the Ignorance Giant.',
      difficulty: 'Hard',
      requirements: [
        'Read 100 pages of educational material',
        'Take detailed notes',
        'Create a summary of what you learned',
      ],
      reward: "Unlock 'Rapid Learning' skill + 200 XP",
      timeLimit: '72 hours',
      progress: 25,
    },
    {
      name: 'Fitness Titan',
      description: 'Push your physical limits to overcome the Lethargy Behemoth.',
      difficulty: 'Epic',
      requirements: [
        'Complete 3 full workouts in 3 days',
        'Reach 10,000 steps each day',
        'Maintain proper hydration throughout',
      ],
      reward: "Unlock 'Second Wind' skill + 300 XP",
      timeLimit: '1 week',
      progress: 10,
    },
  ];

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatIcon = (stat: 'Vigor' | 'Intelligence' | 'Strength' | 'Charisma') => {
    switch (stat) {
      case 'Vigor':
        return Heart;
      case 'Intelligence':
        return Brain;
      case 'Strength':
        return Dumbbell;
      case 'Charisma':
        return Star;
      default:
        return Zap;
    }
  };

  const difficultyColor = {
    Easy: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
    Hard: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  };

  const [searchParams] = useSearchParams();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Challenges</h1>
        <p className="text-muted-foreground">Complete challenges to earn XP and boost your stats</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue={searchParams.get('tab') || 'daily'}>
        <TabsList className="grid w-full grid-cols-4">
          {/* <TabsTrigger value="all">All</TabsTrigger> */}
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="boss">Boss Challenges</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="all" className="mt-4 space-y-4">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <Card key={challenge.id} className={challenge.completed ? "bg-primary/5 border-primary/20" : ""}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {challenge.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Clock className="h-5 w-5 text-muted-foreground" />
                        )}
                        <h3 className="font-medium">{challenge.title}</h3>
                        <Badge variant="outline" className={difficultyColor[challenge.difficulty]}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-medium">{challenge.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {React.createElement(getStatIcon(challenge.statBoost.stat), {
                          className: "h-4 w-4 text-primary",
                        })}
                        <span className="text-sm font-medium">
                          {challenge.statBoost.stat} +{challenge.statBoost.value}
                        </span>
                      </div>
                      <Button
                        variant={challenge.completed ? "outline" : "default"}
                        size="sm"
                        disabled={challenge.completed}
                      >
                        {challenge.completed ? "Completed" : "Complete"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No challenges found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent> */}
        <TabsContent value="daily" className="mt-4">
          {filteredChallenges.filter((c) => c.category === 'Daily').length > 0 ? (
            filteredChallenges
              .filter((c) => c.category === 'Daily')
              .map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`mb-4 ${challenge.completed ? 'bg-primary/5 border-primary/20' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {challenge.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge
                            variant="outline"
                            className={difficultyColor[challenge.difficulty]}
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium">{challenge.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {React.createElement(getStatIcon(challenge.statBoost.stat), {
                            className: 'h-4 w-4 text-primary',
                          })}
                          <span className="text-sm font-medium">
                            {challenge.statBoost.stat} +{challenge.statBoost.value}
                          </span>
                        </div>
                        <Button
                          variant={challenge.completed ? 'outline' : 'default'}
                          size="sm"
                          disabled={challenge.completed}
                        >
                          {challenge.completed ? 'Completed' : 'Complete'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No daily challenges found matching your search.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="weekly" className="mt-4">
          {filteredChallenges.filter((c) => c.category === 'Weekly').length > 0 ? (
            filteredChallenges
              .filter((c) => c.category === 'Weekly')
              .map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`mb-4 ${challenge.completed ? 'bg-primary/5 border-primary/20' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {challenge.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge
                            variant="outline"
                            className={difficultyColor[challenge.difficulty]}
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium">{challenge.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {React.createElement(getStatIcon(challenge.statBoost.stat), {
                            className: 'h-4 w-4 text-primary',
                          })}
                          <span className="text-sm font-medium">
                            {challenge.statBoost.stat} +{challenge.statBoost.value}
                          </span>
                        </div>
                        <Button
                          variant={challenge.completed ? 'outline' : 'default'}
                          size="sm"
                          disabled={challenge.completed}
                        >
                          {challenge.completed ? 'Completed' : 'Complete'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No weekly challenges found matching your search.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="monthly" className="mt-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Monthly challenges will be available soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="boss" className="mt-4 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bossChallenges.map((challenge, index) => (
              <BossChallenge
                key={index}
                name={challenge.name}
                description={challenge.description}
                difficulty={challenge.difficulty as 'Normal' | 'Hard' | 'Epic'}
                requirements={challenge.requirements}
                reward={challenge.reward}
                timeLimit={challenge.timeLimit}
                progress={challenge.progress}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
