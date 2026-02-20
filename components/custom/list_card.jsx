import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export function ListCard({ children }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-4xl font-semibold text-center">Entries</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}