"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Shield, Swords, Trophy, AlertTriangle } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useToast } from "../hooks/use-toast"

interface BossChallengeProps {
  name: string
  description: string
  difficulty: "Normal" | "Hard" | "Epic"
  requirements: string[]
  reward: string
  timeLimit: string
  progress: number
}

export function BossChallenge({
  name,
  description,
  difficulty,
  requirements,
  reward,
  timeLimit,
  progress,
}: BossChallengeProps) {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [accepted, setAccepted] = useState(false)

  // Get theme-specific classes
  const getBossClass = () => {
    switch (theme) {
      case "elden-ring":
        return "elden-ring-boss"
      case "league":
        return "league-boss"
      case "wow":
        return "wow-boss"
      default:
        return ""
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Normal":
        return "text-green-500"
      case "Hard":
        return "text-amber-500"
      case "Epic":
        return "text-red-500"
    }
  }

  const handleAccept = () => {
    setAccepted(true)
    toast({
      title: "Boss Challenge Accepted!",
      description: `You've accepted the challenge: ${name}`,
    })
  }

  return (
    <Card className={`${getBossClass()} relative overflow-hidden`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Swords className={`h-5 w-5 ${getDifficultyColor()}`} />
          {name}
          <span className={`text-sm ml-auto ${getDifficultyColor()}`}>{difficulty}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Requirements:
            </span>
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Time Limit: {timeLimit}
            </span>
          </div>

          <ul className="text-sm space-y-1 ml-5 list-disc">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {accepted && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="p-3 border rounded-md bg-card/50">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>Reward: {reward}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!accepted ? (
          <Button className="w-full" onClick={handleAccept}>
            Accept Challenge
          </Button>
        ) : (
          <Button className="w-full" disabled={progress < 100}>
            {progress < 100 ? "In Progress..." : "Claim Reward"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

