"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { useTheme } from "./theme-provider"
import { useToast } from "../hooks/use-toast"
import {
  Mountain,
  Trees,
  Castle,
  Building,
  Waves,
  Sparkles,
  CheckCircle2,
  Clock,
  Trophy,
  Zap,
  Scroll,
} from "lucide-react"

interface RegionChallenge {
  id: string
  title: string
  description: string
  region: string
  difficulty: "Easy" | "Medium" | "Hard" | "Epic"
  xp: number
  completed: boolean
  timeEstimate: string
  rewards: string[]
}

interface RegionChallengesProps {
  regionId: string
}

export function RegionChallenges({ regionId }: RegionChallengesProps) {
  const { theme } = useTheme()
  const { toast } = useToast()

  // Define challenges for each region
  const allChallenges: RegionChallenge[] = [
    // Mountains of Focus Challenges
    {
      id: "focus-1",
      title: "Meditation Summit",
      description: "Complete a 10-minute guided meditation session without distractions",
      region: "mountains-of-focus",
      difficulty: "Easy",
      xp: 50,
      completed: false,
      timeEstimate: "15 minutes",
      rewards: ["Focus +2", "Clarity technique"],
    },
    {
      id: "focus-2",
      title: "Deep Work Valley",
      description: "Complete 1 hour of focused work with no distractions or interruptions",
      region: "mountains-of-focus",
      difficulty: "Medium",
      xp: 75,
      completed: false,
      timeEstimate: "1 hour",
      rewards: ["Focus +3", "Deep Work skill"],
    },
    {
      id: "focus-3",
      title: "Distraction-Free Peak",
      description: "Turn off all notifications and complete 3 important tasks",
      region: "mountains-of-focus",
      difficulty: "Medium",
      xp: 80,
      completed: false,
      timeEstimate: "2 hours",
      rewards: ["Focus +3", "Digital Minimalism technique"],
    },
    {
      id: "focus-4",
      title: "Single-Task Trail",
      description: "Work on one project without switching tasks for 90 minutes",
      region: "mountains-of-focus",
      difficulty: "Hard",
      xp: 100,
      completed: false,
      timeEstimate: "1.5 hours",
      rewards: ["Focus +4", "Flow State access"],
    },
    {
      id: "focus-5",
      title: "Mindfulness Monastery",
      description: "Practice mindfulness throughout an entire day, with hourly check-ins",
      region: "mountains-of-focus",
      difficulty: "Epic",
      xp: 150,
      completed: false,
      timeEstimate: "Full day",
      rewards: ["Focus +5", "Mindfulness Mastery skill", "Monk's Amulet item"],
    },

    // Knowledge Forest Challenges
    {
      id: "knowledge-1",
      title: "Reading Grove",
      description: "Read a chapter of a non-fiction book and take notes",
      region: "knowledge-forest",
      difficulty: "Easy",
      xp: 50,
      completed: false,
      timeEstimate: "45 minutes",
      rewards: ["Intelligence +2", "Note-taking technique"],
    },
    {
      id: "knowledge-2",
      title: "Learning Path",
      description: "Complete a lesson on a new skill or topic you want to learn",
      region: "knowledge-forest",
      difficulty: "Easy",
      xp: 60,
      completed: false,
      timeEstimate: "1 hour",
      rewards: ["Intelligence +2", "Skill acquisition boost"],
    },
    {
      id: "knowledge-3",
      title: "Teaching Clearing",
      description: "Explain a concept you've learned to someone else",
      region: "knowledge-forest",
      difficulty: "Medium",
      xp: 80,
      completed: false,
      timeEstimate: "30 minutes",
      rewards: ["Intelligence +3", "Communication +2"],
    },
    {
      id: "knowledge-4",
      title: "Research Expedition",
      description: "Research a topic in depth and create a summary of your findings",
      region: "knowledge-forest",
      difficulty: "Hard",
      xp: 100,
      completed: false,
      timeEstimate: "2 hours",
      rewards: ["Intelligence +4", "Research methodology skill"],
    },
    {
      id: "knowledge-5",
      title: "Ancient Library",
      description: "Read an entire book on a challenging subject and create a detailed summary",
      region: "knowledge-forest",
      difficulty: "Epic",
      xp: 150,
      completed: false,
      timeEstimate: "1 week",
      rewards: ["Intelligence +5", "Speed Reading skill", "Scholar's Tome item"],
    },

    // Discipline Citadel Challenges
    {
      id: "discipline-1",
      title: "Morning Routine Barracks",
      description: "Follow a structured morning routine for 3 consecutive days",
      region: "discipline-citadel",
      difficulty: "Medium",
      xp: 75,
      completed: false,
      timeEstimate: "3 days",
      rewards: ["Strength +3", "Morning Ritual technique"],
    },
    {
      id: "discipline-2",
      title: "Habit Forge",
      description: "Establish and maintain a new positive habit for 7 days",
      region: "discipline-citadel",
      difficulty: "Hard",
      xp: 100,
      completed: false,
      timeEstimate: "1 week",
      rewards: ["Strength +4", "Habit Formation skill"],
    },
    {
      id: "discipline-3",
      title: "Temptation Battleground",
      description: "Resist a specific temptation or distraction for 5 days",
      region: "discipline-citadel",
      difficulty: "Hard",
      xp: 110,
      completed: false,
      timeEstimate: "5 days",
      rewards: ["Strength +4", "Willpower +3"],
    },
    {
      id: "discipline-4",
      title: "Consistency Keep",
      description: "Complete a challenging task at the same time every day for 10 days",
      region: "discipline-citadel",
      difficulty: "Epic",
      xp: 150,
      completed: false,
      timeEstimate: "10 days",
      rewards: ["Strength +5", "Time Management mastery", "Warrior's Medallion item"],
    },
  ]

  // Filter challenges by region
  const regionChallenges = allChallenges.filter((challenge) => challenge.region === regionId)

  // Get region details
  const getRegionDetails = () => {
    switch (regionId) {
      case "mountains-of-focus":
        return {
          name: "Mountains of Focus",
          description: "A serene range where concentration and mindfulness are cultivated",
          icon: Mountain,
          color: "text-blue-500",
        }
      case "knowledge-forest":
        return {
          name: "Knowledge Forest",
          description: "A vast woodland filled with ancient wisdom and learning",
          icon: Trees,
          color: "text-green-500",
        }
      case "discipline-citadel":
        return {
          name: "Discipline Citadel",
          description: "A fortress where willpower and self-control are forged",
          icon: Castle,
          color: "text-amber-500",
        }
      case "social-metropolis":
        return {
          name: "Social Metropolis",
          description: "A bustling city where communication and leadership skills thrive",
          icon: Building,
          color: "text-purple-500",
        }
      case "creativity-shores":
        return {
          name: "Creativity Shores",
          description: "Coastal regions where innovation and imagination flow like the tides",
          icon: Waves,
          color: "text-cyan-500",
        }
      case "mastery-peaks":
        return {
          name: "Mastery Peaks",
          description: "The highest summits where true expertise is achieved",
          icon: Sparkles,
          color: "text-pink-500",
        }
      default:
        return {
          name: "Unknown Region",
          description: "A mysterious area yet to be explored",
          icon: Mountain,
          color: "text-gray-500",
        }
    }
  }

  const region = getRegionDetails()

  // Calculate region progress
  const completedChallenges = regionChallenges.filter((c) => c.completed).length
  const totalChallenges = regionChallenges.length
  const progressPercentage = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0

  // Handle challenge completion
  const handleCompleteChallenge = (challenge: RegionChallenge) => {
    toast({
      title: "Challenge completed!",
      description: `You've earned ${challenge.xp} XP and unlocked new rewards!`,
    })
  }

  // Get theme-specific classes
  const getRegionClass = () => {
    switch (theme) {
      case "elden-ring":
        return "world-elden-bg border world-elden-border"
      case "league":
        return "world-league-bg border world-league-border"
      case "wow":
        return "world-wow-bg border world-wow-border"
      default:
        return ""
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "Medium":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Hard":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "Epic":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    }
  }

  return (
    <Card className={getRegionClass()}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-card/50 ${region.color}`}>
            <region.icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>{region.name}</CardTitle>
            <CardDescription>{region.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Region Progress</span>
            <span>
              {completedChallenges}/{totalChallenges} Challenges
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Available Challenges</h3>

          {regionChallenges.length > 0 ? (
            <div className="space-y-4">
              {regionChallenges.map((challenge) => (
                <Card key={challenge.id} className={challenge.completed ? "bg-primary/5 border-primary/20" : ""}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {challenge.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{challenge.timeEstimate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-amber-500" />
                            <span>{challenge.xp} XP</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="text-xs space-y-1">
                          <div className="font-medium flex items-center gap-1">
                            <Scroll className="h-3 w-3" />
                            <span>Rewards:</span>
                          </div>
                          <ul className="space-y-0.5">
                            {challenge.rewards.map((reward, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <span className="text-primary">•</span>
                                <span>{reward}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button
                          variant={challenge.completed ? "outline" : "default"}
                          size="sm"
                          className="mt-2"
                          disabled={challenge.completed}
                          onClick={() => handleCompleteChallenge(challenge)}
                        >
                          {challenge.completed ? "Completed" : "Complete Challenge"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No challenges available for this region yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Zap className="h-4 w-4 mr-2" />
          Travel to Next Region
        </Button>
      </CardFooter>
    </Card>
  )
}

