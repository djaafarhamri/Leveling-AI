'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Heart, Brain, Dumbbell, Star, Award, TrendingUp, History, Swords } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { SkillTree } from '../components/skill-tree';
import { Link } from 'react-router-dom';

export default function CharacterPage() {
  const { toast } = useToast();

  const handleStatUpgrade = (stat: string) => {
    toast({
      title: `${stat} upgraded!`,
      description: "You've spent 1 skill point to upgrade this stat.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Character</h1>
        <p className="text-muted-foreground">Customize and upgrade your stats</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Character Profile</CardTitle>
              <CardDescription>Level 7 Productivity Warrior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl font-bold">7</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-medium">
                    3 Skill Points
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level Progress</span>
                    <span>650/1000 XP</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-2 w-full text-center text-sm">
                  <div className="bg-card border rounded-md p-2">
                    <div className="text-muted-foreground">Challenges</div>
                    <div className="font-bold text-lg">42</div>
                  </div>
                  <div className="bg-card border rounded-md p-2">
                    <div className="text-muted-foreground">Achievements</div>
                    <div className="font-bold text-lg">12</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Achievements
              </CardTitle>
              <CardDescription>Recent milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Early Riser</div>
                    <div className="text-xs text-muted-foreground">
                      Completed 5 morning challenges
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Knowledge Seeker</div>
                    <div className="text-xs text-muted-foreground">Read for 10 hours total</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Dumbbell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Fitness Enthusiast</div>
                    <div className="text-xs text-muted-foreground">
                      Completed 15 workout challenges
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boss Challenge Link Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-red-500" />
                Boss Challenges
              </CardTitle>
              <CardDescription>Test your limits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Take on epic challenges that will push your skills to the limit and earn special
                rewards.
              </p>
              <Button asChild className="w-full">
                <Link to="/challenges?tab=boss">View Boss Challenges</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="stats">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stats">Character Stats</TabsTrigger>
              <TabsTrigger value="skills">Skill Tree</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Character Stats</CardTitle>
                  <CardDescription>Upgrade your stats with skill points</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="font-medium">Vigor</div>
                          <div className="text-xs text-muted-foreground">
                            Physical health & energy
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xl font-bold">72</div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatUpgrade('Vigor')}
                        >
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    <Progress value={72} className="h-2" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-medium">Intelligence</div>
                          <div className="text-xs text-muted-foreground">
                            Learning & problem solving
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xl font-bold">85</div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatUpgrade('Intelligence')}
                        >
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    <Progress value={85} className="h-2" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-amber-500" />
                        <div>
                          <div className="font-medium">Strength</div>
                          <div className="text-xs text-muted-foreground">
                            Discipline & resilience
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xl font-bold">64</div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatUpgrade('Strength')}
                        >
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    <Progress value={64} className="h-2" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="font-medium">Charisma</div>
                          <div className="text-xs text-muted-foreground">
                            Social skills & influence
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xl font-bold">78</div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatUpgrade('Charisma')}
                        >
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Stat History
                  </CardTitle>
                  <CardDescription>Track your progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="vigor">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="vigor">Vigor</TabsTrigger>
                      <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
                      <TabsTrigger value="strength">Strength</TabsTrigger>
                      <TabsTrigger value="charisma">Charisma</TabsTrigger>
                    </TabsList>
                    <TabsContent value="vigor" className="pt-4">
                      <div className="h-[200px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Stat history graph will appear here</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="intelligence" className="pt-4">
                      <div className="h-[200px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Stat history graph will appear here</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="strength" className="pt-4">
                      <div className="h-[200px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Stat history graph will appear here</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="charisma" className="pt-4">
                      <div className="h-[200px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Stat history graph will appear here</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <SkillTree />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
