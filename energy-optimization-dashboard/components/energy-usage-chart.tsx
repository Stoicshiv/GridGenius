"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, AlertTriangle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample data - in a real app, this would come from an API
const data = [
  { name: "Mon", streetlights: 4000, trafficLights: 2400, buildings: 2400, unit: "kWh" },
  { name: "Tue", streetlights: 3000, trafficLights: 1398, buildings: 2210, unit: "kWh" },
  { name: "Wed", streetlights: 2000, trafficLights: 9800, buildings: 2290, unit: "kWh" },
  { name: "Thu", streetlights: 2780, trafficLights: 3908, buildings: 2000, unit: "kWh" },
  { name: "Fri", streetlights: 1890, trafficLights: 4800, buildings: 2181, unit: "kWh" },
  { name: "Sat", streetlights: 2390, trafficLights: 3800, buildings: 2500, unit: "kWh" },
  { name: "Sun", streetlights: 3490, trafficLights: 4300, buildings: 2100, unit: "kWh" },
]

const aiInsights = [
  {
    id: 1,
    title: "Unusual Traffic Light Consumption on Wednesday",
    description:
      "Traffic light energy consumption on Wednesday is 4.9x higher than average (9,800 kWh vs. 2,000 kWh average). This anomaly requires immediate investigation.",
    severity: "high",
    recommendation:
      "Investigate traffic control systems in all districts for potential malfunctions or misconfiguration.",
  },
  {
    id: 2,
    title: "Streetlight Efficiency Pattern",
    description:
      "Streetlight consumption is consistently lower mid-week (Tue-Fri) compared to weekends and Monday. This pattern suggests optimization opportunities.",
    severity: "medium",
    recommendation:
      "Apply the mid-week lighting configuration to weekend operations to achieve potential 25% energy savings.",
  },
  {
    id: 3,
    title: "Building Energy Consistency",
    description:
      "Public building energy consumption remains relatively stable throughout the week, indicating limited responsiveness to occupancy patterns.",
    severity: "medium",
    recommendation:
      "Implement occupancy-based HVAC and lighting controls to reduce weekend consumption by an estimated 30%.",
  },
]

export default function EnergyUsageChart() {
  const [timeRange, setTimeRange] = useState("week")
  const [showAiInsights, setShowAiInsights] = useState(false)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const totalConsumption = payload.reduce((sum: number, entry: any) => sum + entry.value, 0)

      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} {data[0].unit}
            </p>
          ))}
          <p className="font-medium mt-1 pt-1 border-t">
            Total: {totalConsumption.toLocaleString()} {data[0].unit}
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <Button
          variant={showAiInsights ? "default" : "outline"}
          size="sm"
          onClick={() => setShowAiInsights(!showAiInsights)}
          className="flex items-center gap-1"
        >
          <Lightbulb className="h-4 w-4" />
          {showAiInsights ? "Hide AI Insights" : "Show AI Insights"}
        </Button>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showAiInsights && (
        <Card className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">AI-Generated Insights</h3>
            </div>
            <Accordion type="single" collapsible>
              {aiInsights.map((insight) => (
                <AccordionItem key={insight.id} value={`insight-${insight.id}`}>
                  <AccordionTrigger className="text-sm font-medium py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          insight.severity === "high"
                            ? "bg-red-500"
                            : insight.severity === "medium"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                      ></span>
                      {insight.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    <div className="bg-background p-2 rounded-md mt-2">
                      <p className="text-sm font-medium flex items-center">
                        <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                        Recommendation:
                      </p>
                      <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                    </div>
                    <Button size="sm" className="mt-2 w-full">
                      Implement Recommendation
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: "Energy Consumption (kWh)", angle: -90, position: "insideLeft" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="streetlights" fill="#10b981" name="Streetlights" />
            <Bar dataKey="trafficLights" fill="#3b82f6" name="Traffic Lights" />
            <Bar dataKey="buildings" fill="#8b5cf6" name="Public Buildings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Card className="mt-4 bg-muted/30">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Research insight:</span> According to the International Energy Agency,
            granular energy consumption monitoring can identify optimization opportunities that reduce municipal energy
            costs by 15-22% annually.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

