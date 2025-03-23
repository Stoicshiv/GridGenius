"use client"

import { useState } from "react"
import { AlertTriangle, MapPin, Check, X, Filter, Download, MessageSquare, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

type Comment = {
  id: number
  author: {
    name: string
    avatar: string
    role: string
  }
  text: string
  timestamp: string
}

type Report = {
  id: number
  title: string
  description: string
  location: string
  category: string
  status: string
  date: string
  upvotes: number
  reporter: {
    name: string
    avatar: string
  }
  images: string[]
  comments: Comment[]
  showComments?: boolean
}

export default function ReportsPage() {
  // Sample public reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: "Streetlights on during daylight",
      description: "Several streetlights on Main Street are on during daylight hours, wasting energy.",
      location: "Main Street, Downtown",
      category: "streetlights",
      status: "pending",
      date: "2025-03-22",
      upvotes: 12,
      reporter: {
        name: "Rahul Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      images: ["/placeholder.svg?height=200&width=300"],
      comments: [
        {
          id: 1,
          author: {
            name: "Priya Singh",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Energy Manager",
          },
          text: "I've noticed this issue as well. The photocell sensors might need recalibration.",
          timestamp: "2025-03-22T10:30:00",
        },
      ],
      showComments: false,
    },
    {
      id: 2,
      title: "Traffic lights not synchronized",
      description:
        "Traffic lights at the intersection of Park Avenue and 5th Street are not synchronized, causing unnecessary idling and energy waste.",
      location: "Park Avenue & 5th Street",
      category: "traffic",
      status: "verified",
      date: "2025-03-21",
      upvotes: 8,
      reporter: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      images: ["/placeholder.svg?height=200&width=300"],
      comments: [
        {
          id: 1,
          author: {
            name: "Amit Kumar",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Traffic Engineer",
          },
          text: "We're aware of this issue. The traffic control system in this area is scheduled for an upgrade next week.",
          timestamp: "2025-03-21T14:15:00",
        },
      ],
      showComments: false,
    },
    {
      id: 3,
      title: "Municipal building lights on overnight",
      description:
        "The City Hall building has all lights on overnight even though no one is working. This seems like a waste of energy.",
      location: "City Hall, Government District",
      category: "buildings",
      status: "resolved",
      date: "2025-03-20",
      upvotes: 15,
      reporter: {
        name: "Amit Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      images: ["/placeholder.svg?height=200&width=300"],
      comments: [
        {
          id: 1,
          author: {
            name: "Neha Singh",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Facility Manager",
          },
          text: "Thank you for reporting this. We've adjusted the lighting schedule and implemented motion sensors in common areas.",
          timestamp: "2025-03-20T09:45:00",
        },
        {
          id: 2,
          author: {
            name: "Amit Kumar",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Citizen",
          },
          text: "Great to see this resolved so quickly! I noticed the change last night.",
          timestamp: "2025-03-21T08:30:00",
        },
      ],
      showComments: false,
    },
    {
      id: 4,
      title: "Broken traffic sensor causing light timing issues",
      description:
        "The traffic sensor at the North Bridge intersection appears to be malfunctioning, causing the lights to stay green for too long even when there's no traffic.",
      location: "North Bridge Intersection",
      category: "traffic",
      status: "pending",
      date: "2025-03-19",
      upvotes: 6,
      reporter: {
        name: "Neha Singh",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      images: ["/placeholder.svg?height=200&width=300"],
      comments: [],
      showComments: false,
    },
  ])

  const [newComments, setNewComments] = useState<{ [key: number]: string }>({})

  const handleStatusChange = (id: number, newStatus: string) => {
    setReports(reports.map((report) => (report.id === id ? { ...report, status: newStatus } : report)))
  }

  const toggleComments = (id: number) => {
    setReports(reports.map((report) => (report.id === id ? { ...report, showComments: !report.showComments } : report)))
  }

  const handleCommentChange = (id: number, text: string) => {
    setNewComments({
      ...newComments,
      [id]: text,
    })
  }

  const addComment = (reportId: number) => {
    if (!newComments[reportId] || newComments[reportId].trim() === "") return

    const updatedReports = reports.map((report) => {
      if (report.id === reportId) {
        const newComment: Comment = {
          id: report.comments.length + 1,
          author: {
            name: "You (Admin)",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "System Administrator",
          },
          text: newComments[reportId],
          timestamp: new Date().toISOString(),
        }

        return {
          ...report,
          comments: [...report.comments, newComment],
          showComments: true,
        }
      }
      return report
    })

    setReports(updatedReports)

    // Clear the comment input
    setNewComments({
      ...newComments,
      [reportId]: "",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Public Reports</h1>
          <p className="text-muted-foreground">Citizen-reported energy waste and infrastructure issues</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Submit New Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Public Reports</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search reports..." className="w-[250px]" />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="upvotes">Most Upvotes</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{report.title}</h3>
                            <Badge
                              variant={
                                report.status === "verified"
                                  ? "default"
                                  : report.status === "resolved"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{report.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline">{report.category}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                              >
                                <path
                                  d="M7.5 0.875C7.77614 0.875 8 1.09886 8 1.375V7H13.625C13.9011 7 14.125 7.22386 14.125 7.5C14.125 7.77614 13.9011 8 13.625 8H7.5C7.22386 8 7 7.77614 7 7.5V1.375C7 1.09886 7.22386 0.875 7.5 0.875Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              {new Date(report.date).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={report.reporter.avatar} alt={report.reporter.name} />
                                <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{report.reporter.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                              >
                                <path
                                  d="M7.5 1.04999C7.66148 1.04999 7.81301 1.12342 7.90687 1.25061L14.0069 9.25061C14.1103 9.38883 14.1438 9.56429 14.0994 9.72912C14.055 9.89395 13.9367 10.0276 13.7806 10.0946L7.78064 12.8446C7.6009 12.9284 7.39338 12.9284 7.21364 12.8446L1.21364 10.0946C1.05748 10.0276 0.939163 9.89395 0.894779 9.72912C0.850394 9.56429 0.883886 9.38883 0.987223 9.25061L7.08723 1.25061C7.18109 1.12342 7.33262 1.04999 7.5 1.04999ZM7.5 2.1078L2.20724 9.02181L7.5 11.4264L12.7928 9.02181L7.5 2.1078Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              {report.upvotes} upvotes
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col gap-2">
                          {report.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img || "/placeholder.svg"}
                              alt={`Report image ${idx + 1}`}
                              className="rounded-md w-[150px] h-[100px] object-cover"
                            />
                          ))}
                        </div>
                        <div className="ml-4 flex flex-col gap-2">
                          <Button variant="outline" size="sm" onClick={() => toggleComments(report.id)}>
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {report.comments.length > 0 ? `Comments (${report.comments.length})` : "Comment"}
                          </Button>
                          {report.status === "pending" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleStatusChange(report.id, "verified")}
                            >
                              <Check className="h-4 w-4 mr-1" /> Verify
                            </Button>
                          )}
                          {report.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(report.id, "dismissed")}
                            >
                              <X className="h-4 w-4 mr-1" /> Dismiss
                            </Button>
                          )}
                          {report.status === "verified" && (
                            <Button variant="default" size="sm">
                              <Check className="h-4 w-4 mr-1" /> Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>

                      <Collapsible open={report.showComments} onOpenChange={() => toggleComments(report.id)}>
                        <CollapsibleContent>
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="text-sm font-medium mb-3">Comments</h4>

                            {report.comments.length > 0 ? (
                              <div className="space-y-3 mb-3">
                                {report.comments.map((comment) => (
                                  <div key={comment.id} className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{comment.author.name}</span>
                                        <Badge variant="outline" className="text-xs">
                                          {comment.author.role}
                                        </Badge>
                                      </div>
                                      <p className="text-sm mt-1">{comment.text}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {formatDate(comment.timestamp)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground mb-3">No comments yet.</p>
                            )}

                            <div className="flex gap-2">
                              <Textarea
                                placeholder="Add a comment..."
                                className="min-h-[80px]"
                                value={newComments[report.id] || ""}
                                onChange={(e) => handleCommentChange(report.id, e.target.value)}
                              />
                              <Button
                                className="self-end"
                                size="icon"
                                onClick={() => addComment(report.id)}
                                disabled={!newComments[report.id] || newComments[report.id].trim() === ""}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
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
              <CardTitle>Pending Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Pending reports would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verified Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Verified reports would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Resolved reports would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

