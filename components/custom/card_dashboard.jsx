import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDashboard({ children, title }) {
  return (
    <div>
      <Card size="sm" className="w-80 h-80">
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full text-center text-4xl mb-5">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}