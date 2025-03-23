"use client"

import { useState } from "react"
import { Check, AlertTriangle, Lightbulb, Clock, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Sample recommendations - in a real app, these would come from AI analysis
const initialRecommendations = [
  {
    id: 1,
    title: "Reduce streetlight intensity by 20%",
    description: "During low traffic hours (1AM-4AM) to save energy",
    priority: "high",
    category: "streetlights",
    potentialSavings: "₹1.2M annually",
    status: "pending",
    implementationDetails: {
      steps: [
        "Identify all streetlight control systems in downtown and residential areas",
        "Update control software to enable dynamic dimming based on time and traffic",
        "Configure 20% intensity reduction during 1AM-4AM timeframe",
        "Monitor for 2 weeks to ensure safety standards are maintained",
      ],
      cost: "₹120,000",
      timeline: "3 weeks",
      roi: "10x within first year",
      research:
        "Based on a 2023 study by the Urban Lighting Institute showing 20% dimming during low-traffic hours has no impact on public safety while reducing energy consumption significantly.",
    },
  },
  {
    id: 2,
    title: "Optimize traffic light cycles",
    description: "Adjust timing based on current traffic patterns",
    priority: "medium",
    category: "traffic",
    potentialSavings: "₹800K annually",
    status: "pending",
    implementationDetails: {
      steps: [
        "Analyze traffic flow data from major intersections during peak and off-peak hours",
        "Develop AI-driven timing algorithms that adapt to real-time conditions",
        "Implement new timing patterns at 15 key intersections as pilot program",
        "Expand to all 78 signalized intersections after successful pilot",
      ],
      cost: "₹350,000",
      timeline: "6 months",
      roi: "2.3x within first year",
      research:
        "Research from the Transportation Efficiency Council indicates adaptive traffic signals reduce energy consumption by 15-20% while decreasing vehicle idle time by 17-30%.",
    },
  },
  {
    id: 3,
    title: "Adjust HVAC schedules in public buildings",
    description: "Based on occupancy patterns and weather forecast",
    priority: "high",
    category: "buildings",
    potentialSavings: "₹1.5M annually",
    status: "pending",
    implementationDetails: {
      steps: [
        "Install occupancy sensors in all municipal buildings",
        "Integrate weather forecast data with building management systems",
        "Implement AI-driven HVAC scheduling that adjusts based on occupancy and weather",
        "Train facility managers on new system operation and monitoring",
      ],
      cost: "₹680,000",
      timeline: "4 months",
      roi: "2.2x within first year",
      research:
        "According to the Energy Management Institute, weather-responsive HVAC scheduling reduces energy consumption by 22-28% in public buildings without affecting occupant comfort.",
    },
  },
]

export default function RecommendationsList({ onStatusChange = (id: number, status: string) => {} }) {
  const [recommendations, setRecommendations] = useState(initialRecommendations)
  const [expandedDetails, setExpandedDetails] = useState<number | null>(null)
  const [implementationResults, setImplementationResults] = useState<{ [key: number]: string }>({})

  const handleStatusChange = (id: number, newStatus: string) => {
    setRecommendations(recommendations.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec)))

    // Add implementation results for implemented recommendations
    if (newStatus === "implemented") {
      const recommendation = recommendations.find((r) => r.id === id)
      if (recommendation) {
        const results = {
          1: "Implementation complete. Streetlight intensity reduced by 20% during low traffic hours. Initial monitoring shows 18.5% energy reduction with no safety incidents reported.",
          2: "Implementation complete. Traffic light cycles optimized at all major intersections. Traffic flow improved by 22% and energy consumption reduced by 15.8%.",
          3: "Implementation complete. HVAC schedules adjusted based on occupancy and weather data. Energy consumption reduced by 24.3% in the first month of operation.",
        }

        setImplementationResults({
          ...implementationResults,
          [id]: results[id as keyof typeof results] || "Implementation successful. Monitoring for results.",
        })
      }
    }

    onStatusChange(id, newStatus)
  }

  const toggleDetails = (id: number) => {
    setExpandedDetails(expandedDetails === id ? null : id)
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="default">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "streetlights":
        return <Lightbulb className="h-4 w-4" />
      case "traffic":
        return <Clock className="h-4 w-4" />
      case "buildings":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              {getCategoryIcon(rec.category)}
              <h3 className="font-medium">{rec.title}</h3>
            </div>
            {getPriorityBadge(rec.priority)}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>

          <Collapsible open={expandedDetails === rec.id} onOpenChange={() => toggleDetails(rec.id)}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-green-600">{rec.potentialSavings}</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  {expandedDetails === rec.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="ml-1 text-sm">{expandedDetails === rec.id ? "Hide Details" : "View Details"}</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="bg-muted/30 p-3 rounded-md mb-3">
                <h4 className="text-sm font-medium mb-2">Implementation Details</h4>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Cost</p>
                    <p className="text-sm font-medium">{rec.implementationDetails.cost}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="text-sm font-medium">{rec.implementationDetails.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <p className="text-sm font-medium">{rec.implementationDetails.roi}</p>
                  </div>
                </div>

                <h4 className="text-sm font-medium mb-1">Implementation Steps</h4>
                <ol className="text-sm text-muted-foreground space-y-1 ml-5 list-decimal">
                  {rec.implementationDetails.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>

                <div className="mt-3 pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground italic">{rec.implementationDetails.research}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {rec.status === "implemented" && implementationResults[rec.id] && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 p-3 rounded-md mb-3">
              <h4 className="text-sm font-medium flex items-center text-green-700 dark:text-green-400 mb-1">
                <Check className="h-4 w-4 mr-1" /> Implementation Results
              </h4>
              <p className="text-sm text-muted-foreground">{implementationResults[rec.id]}</p>
            </div>
          )}

          <div className="flex justify-end items-center">
            <div className="flex gap-2">
              {rec.status === "pending" && (
                <>
                  <Button size="sm" variant="default" onClick={() => handleStatusChange(rec.id, "implemented")}>
                    <Check className="h-4 w-4 mr-1" /> Implement
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange(rec.id, "rejected")}>
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </>
              )}
              {rec.status === "implemented" && (
                <Badge variant="success" className="ml-2">
                  Implemented
                </Badge>
              )}
              {rec.status === "rejected" && (
                <Badge variant="destructive" className="ml-2">
                  Rejected
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full mt-2">
        View All Recommendations
      </Button>
    </div>
  )
}

