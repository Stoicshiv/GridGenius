"use client"

import { useState } from "react"
import { Car, ArrowUp, ArrowDown, Lightbulb, PlayCircle, PauseCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample traffic data - in a real app, this would come from a traffic API
const initialTrafficData = [
  { area: "Downtown", congestion: 75, trend: "up", signalEfficiency: 65 },
  { area: "North District", congestion: 45, trend: "down", signalEfficiency: 82 },
  { area: "East Highway", congestion: 60, trend: "up", signalEfficiency: 70 },
  { area: "West Boulevard", congestion: 30, trend: "down", signalEfficiency: 88 },
]

const optimizationImpact = {
  energySavings: "12.5 kWh daily",
  congestionReduction: "18%",
  recommendations: [
    "Implement adaptive signal timing during peak hours (6-9AM, 4-7PM)",
    "Reduce signal cycle length by 15% during low traffic periods",
    "Synchronize consecutive signals along main corridors",
  ],
}

export default function TrafficWidget() {
  const [trafficData, setTrafficData] = useState(initialTrafficData)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)

  // Simulation data showing how traffic optimization works
  const simulationSteps = [
    {
      title: "Current State",
      data: initialTrafficData,
      description: "Current traffic signal timing is static and not responsive to actual traffic conditions.",
    },
    {
      title: "Analyzing Patterns",
      data: initialTrafficData.map((item) => ({ ...item, analyzing: true })),
      description: "AI analyzes traffic patterns and identifies optimization opportunities.",
    },
    {
      title: "Optimizing Downtown",
      data: initialTrafficData.map((item) =>
        item.area === "Downtown" ? { ...item, congestion: 65, trend: "down", signalEfficiency: 78 } : item,
      ),
      description: "Adaptive signal timing implemented in Downtown area, reducing congestion by 10%.",
    },
    {
      title: "Optimizing All Areas",
      data: [
        { area: "Downtown", congestion: 58, trend: "down", signalEfficiency: 85 },
        { area: "North District", congestion: 40, trend: "down", signalEfficiency: 90 },
        { area: "East Highway", congestion: 52, trend: "down", signalEfficiency: 82 },
        { area: "West Boulevard", congestion: 28, trend: "down", signalEfficiency: 92 },
      ],
      description:
        "All traffic signals optimized based on real-time conditions, reducing overall energy consumption by 12.5 kWh daily.",
    },
  ]

  const runSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false)
      return
    }

    setIsSimulating(true)
    setSimulationStep(0)

    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        const nextStep = prev + 1
        if (nextStep >= simulationSteps.length) {
          clearInterval(interval)
          setIsSimulating(false)
          return simulationSteps.length - 1
        }
        return nextStep
      })
    }, 2000)

    return () => clearInterval(interval)
  }

  return (
    <div>
      <div className="space-y-4">
        {(isSimulating ? simulationSteps[simulationStep].data : trafficData).map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <Car
                className={`h-4 w-4 mr-2 ${item.analyzing ? "text-amber-500 animate-pulse" : "text-muted-foreground"}`}
              />
              <span className="text-sm font-medium">{item.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={item.congestion} className="h-2 w-24" />
              <span className="text-sm">{item.congestion}%</span>
              {item.trend === "up" ? (
                <ArrowUp className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {isSimulating && (
        <div className="mt-3 text-sm font-medium">
          <p className="text-primary">{simulationSteps[simulationStep].title}</p>
          <p className="text-xs text-muted-foreground mt-1">{simulationSteps[simulationStep].description}</p>
        </div>
      )}

      <Button size="sm" variant="outline" className="mt-3 w-full" onClick={runSimulation}>
        {isSimulating ? (
          <>
            <PauseCircle className="h-4 w-4 mr-2" /> Stop Simulation
          </>
        ) : (
          <>
            <PlayCircle className="h-4 w-4 mr-2" /> Simulate Traffic Optimization
          </>
        )}
      </Button>

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="impact">
          <AccordionTrigger className="text-sm font-medium">Traffic Optimization Impact</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-muted/30 p-2 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Energy Savings</p>
                <p className="font-medium">{optimizationImpact.energySavings}</p>
              </div>
              <div className="bg-muted/30 p-2 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Congestion Reduction</p>
                <p className="font-medium">{optimizationImpact.congestionReduction}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium flex items-center">
                <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                Optimization Recommendations:
              </p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                {optimizationImpact.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-4 bg-muted/30">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Research insight:</span> A 2023 study by the Urban Transportation Research
            Institute found that AI-optimized traffic signals can reduce energy consumption by up to 23% while
            decreasing average wait times by 17%.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

