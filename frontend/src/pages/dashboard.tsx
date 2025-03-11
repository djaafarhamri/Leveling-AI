"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Trophy, Zap, Brain, Dumbbell, Heart, Star } from "lucide-react"
import StatCard from "../components/stat-card"
import DailyChallenge from "../components/daily-challenge"
import { useToast } from "../hooks/use-toast"
import { BossChallenge } from "../components/boss-challenge"

export default function Dashboard() {
  const { toast } = useToast()

  const handleClaimReward = () => {
    toast({
      title: "Daily reward claimed!",
      description: "You've earned 50 XP and unlocked a new challenge.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Adventurer!</h1>
          <p className="text-muted-foreground">Level 7 Productivity Warrior | 650/1000 XP</p>
        </div>
        <Button onClick={handleClaimReward} className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Claim Daily Reward
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Vigor" value={72} icon={Heart} description="Physical health & energy" color="text-red-500" />
        <StatCard
          title="Intelligence"
          value={85}
          icon={Brain}
          description="Learning & problem solving"
          color="text-blue-500"
        />
        <StatCard
          title="Strength"
          value={64}
          icon={Dumbbell}
          description="Discipline & resilience"
          color="text-amber-500"
        />
        <StatCard
          title="Charisma"
          value={78}
          icon={Star}
          description="Social skills & influence"
          color="text-purple-500"
        />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Featured Boss Challenge</h2>
        <BossChallenge
          name="Productivity Marathon"
          description="Complete a series of focused work sessions with minimal breaks to defeat the Procrastination Demon."
          difficulty="Normal"
          requirements={[
            "Complete 5 pomodoro sessions (25 min each)",
            "Take breaks of only 5 minutes between sessions",
            "No social media during work sessions",
          ]}
          reward="Unlock 'Deep Focus' skill + 150 XP"
          timeLimit="48 hours"
          progress={40}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Level Progress
          </CardTitle>
          <CardDescription>650/1000 XP to reach Level 8</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={65} className="h-3" />
          <div className="mt-2 text-sm text-muted-foreground">
            Complete challenges to earn XP and level up your character
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Challenges</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DailyChallenge
              title="Morning Meditation"
              description="Complete a 10-minute guided meditation session"
              xp={50}
              difficulty="Easy"
              completed={true}
              statBoost="Vigor +2"
            />
            <DailyChallenge
              title="Learning Sprint"
              description="Study a new topic for 25 minutes without distractions"
              xp={75}
              difficulty="Medium"
              completed={false}
              statBoost="Intelligence +3"
            />
            <DailyChallenge
              title="Cold Shower Challenge"
              description="Take a cold shower for at least 60 seconds"
              xp={100}
              difficulty="Hard"
              completed={false}
              statBoost="Strength +4"
            />
            <DailyChallenge
              title="Social Connection"
              description="Reach out to a friend you haven't spoken to in a while"
              xp={60}
              difficulty="Medium"
              completed={false}
              statBoost="Charisma +3"
            />
          </div>
        </TabsContent>
        <TabsContent value="weekly" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Weekly goals will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Your achievements will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

