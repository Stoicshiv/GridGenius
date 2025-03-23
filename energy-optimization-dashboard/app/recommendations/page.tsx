"use client"

import { Cpu, Check, X, Filter, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Sample recommendations data
export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Reduce streetlight intensity by 20%",
      description:
        "During low traffic hours (1AM-4AM) to save energy without compromising safety. Based on traffic data analysis and weather patterns.",
      priority: "high",
      category: "streetlights",
      potentialSavings: "₹1.2M annually",
      implementation: "Easy",
      status: "pending",
      date: "2025-03-20",
    },
    {
      id: 2,
      title: "Optimize traffic light cycles",
      description:
        "Adjust timing based on current traffic patterns. AI analysis shows potential for 15% energy reduction during off-peak hours.",
      priority: "medium",
      category: "traffic",
      potentialSavings: "₹800K annually",
      implementation: "Medium",
      status: "implemented",
      date: "2025-03-15",
    },
    {
      id: 3,
      title: "Adjust HVAC schedules in public buildings",
      description:
        "Based on occupancy patterns and weather forecast. Recommendation includes specific schedule adjustments for 12 municipal buildings.",
      priority: "high",
      category: "buildings",
      potentialSavings: "₹1.5M annually",
      implementation: "Complex",
      status: "pending",
      date: "2025-03-18",
    },
    {
      id: 4,
      title: "Synchronize traffic signals on Main Street",
      description:
        "Coordinate traffic signals to reduce vehicle idle time and energy consumption. Analysis shows potential 25% reduction in wait times.",
      priority: "medium",
      category: "traffic",
      potentialSavings: "₹650K annually",
      implementation: "Medium",
      status: "pending",
      date: "2025-03-17",
    },
    {
      id: 5,
      title: "Install motion sensors for municipal parking lots",
      description:
        "Replace always-on lighting with motion-activated lighting in low-traffic areas. Sensors can reduce energy usage by up to 60% during nighttime hours.",
      priority: "low",
      category: "streetlights",
      potentialSavings: "₹450K annually",
      implementation: "Easy",
      status: "pending",
      date: "2025-03-16",
    },
  ])

  const handleStatusChange = (id: number, newStatus: string) => {
    setRecommendations(recommendations.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec)))
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Recommendations</h1>
          <p className="text-muted-foreground">Energy optimization suggestions based on data analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm">
            <Cpu className="h-4 w-4 mr-2" />
            Generate New Recommendations
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="implemented">Implemented</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Recommendations</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search recommendations..." className="w-[250px]" />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="savings">Highest Savings</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className="overflow-hidden">
                    <div
                      className={`h-1 ${
                        rec.priority === "high"
                          ? "bg-red-500"
                          : rec.priority === "medium"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge
                              variant={
                                rec.priority === "high"
                                  ? "destructive"
                                  : rec.priority === "medium"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                            </Badge>
                            <Badge variant="outline">{rec.category}</Badge>
                            <Badge variant="outline">{rec.implementation}</Badge>
                            <Badge variant={rec.status === "implemented" ? "success" : "secondary"}>
                              {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-green-600">{rec.potentialSavings}</span>
                            <span className="text-muted-foreground ml-4">
                              Generated on {new Date(rec.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                          {rec.status !== "implemented" && rec.status !== "rejected" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleStatusChange(rec.id, "implemented")}
                            >
                              <Check className="h-4 w-4 mr-1" /> Implement
                            </Button>
                          )}
                          {rec.status !== "rejected" && rec.status !== "implemented" && (
                            <Button variant="outline" size="sm" onClick={() => handleStatusChange(rec.id, "rejected")}>
                              <X className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Pending recommendations would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implemented" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Implemented Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Implemented recommendations would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Rejected recommendations would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

