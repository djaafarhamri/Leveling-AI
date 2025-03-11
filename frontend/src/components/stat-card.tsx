import { Card, CardContent, CardFooter } from "./ui/card"
import { Progress } from "./ui/progress"
import type { LucideIcon } from "lucide-react"
import { useTheme } from "./theme-provider"

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  description: string
  color: string
}

export default function StatCard({ title, value, icon: Icon, description, color }: StatCardProps) {
  const { theme } = useTheme()

  // Add theme-specific class names
  const getThemeClasses = () => {
    switch (theme) {
      case "elden-ring":
        return "elden-ring-text-glow"
      case "league":
        return "league-text-glow"
      case "wow":
        return "wow-text-glow"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{title}</h3>
          <Icon className={`h-5 w-5 ${color} ${getThemeClasses()}`} />
        </div>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <Progress value={value} className="h-2" />
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">{description}</CardFooter>
    </Card>
  )
}

