"use client"

import { useState } from "react"
import { MessageSquare, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Sample training data for the chatbot
const trainingData = [
  {
    question: "How does weather affect energy consumption?",
    answer:
      "Weather significantly impacts energy consumption. Higher temperatures increase cooling demand in buildings, while colder temperatures increase heating requirements. Our system analyzes weather forecasts to optimize HVAC schedules and streetlight operations, potentially saving 15-20% on energy costs during extreme weather conditions.",
  },
  {
    question: "What are the benefits of optimizing traffic signals?",
    answer:
      "Optimizing traffic signals reduces vehicle idle time, which decreases fuel consumption and emissions. Our AI-driven traffic optimization can reduce energy usage by up to 23% while improving traffic flow by 17-30%. This is achieved by adjusting signal timing based on real-time traffic conditions and historical patterns.",
  },
  {
    question: "How much can we save by dimming streetlights?",
    answer:
      "Dimming streetlights during low-traffic hours (typically 1AM-4AM) can reduce energy consumption by 15-25% without compromising public safety. For a mid-sized city, this can translate to annual savings of ₹1-1.5M. Our system uses traffic data and weather conditions to dynamically adjust lighting levels.",
  },
  {
    question: "What is Grid Genius?",
    answer:
      "Grid Genius is an AI-driven energy optimization platform for cities that doesn't rely on IoT devices. It uses public data sources like weather APIs, traffic data, and historical energy usage to identify optimization opportunities across public infrastructure including streetlights, traffic signals, and municipal buildings.",
  },
  {
    question: "How does the public reporting system work?",
    answer:
      "Our public reporting system allows citizens to report energy waste they observe in the city. Reports are verified by administrators and prioritized for action. This crowdsourced approach helps identify issues that might be missed by automated systems and engages the community in energy conservation efforts.",
  },
  {
    question: "What's the ROI for implementing your recommendations?",
    answer:
      "The ROI varies by recommendation, but most energy optimization measures show returns within 6-18 months. For example, HVAC scheduling optimization typically has an ROI of 2.2x in the first year, while streetlight dimming can reach 10x ROI. We prioritize recommendations with the highest ROI and lowest implementation complexity.",
  },
  {
    question: "How accurate are your energy savings predictions?",
    answer:
      "Our energy savings predictions have proven to be 85-92% accurate based on implementations in similar municipalities. We use machine learning models trained on data from multiple cities and continuously refine our predictions based on actual results. Each recommendation includes a confidence score based on data quality.",
  },
  {
    question: "Can this system work without smart meters or IoT?",
    answer:
      "Yes, Grid Genius is specifically designed to work without requiring IoT infrastructure. Instead of real-time device-level data, we use publicly available data sources, historical energy consumption records, and predictive analytics to identify optimization opportunities. This makes it ideal for municipalities with limited smart city infrastructure.",
  },
  {
    question: "How do you handle data privacy concerns?",
    answer:
      "We prioritize data privacy by using only aggregated, anonymized public data. We don't collect personally identifiable information through our platform. For the public reporting system, users can opt to report anonymously, and all user data is stored in compliance with data protection regulations.",
  },
  {
    question: "What research backs your optimization methods?",
    answer:
      "Our optimization methods are based on peer-reviewed research from institutions like the Energy Efficiency Institute and Urban Transportation Research Institute. We incorporate findings from studies on adaptive traffic control, weather-responsive energy management, and occupancy-based building controls. All recommendations cite relevant research.",
  },
  {
    question: "How can I implement your recommendations?",
    answer:
      "Each recommendation comes with detailed implementation steps, estimated costs, timeline, and expected ROI. Our platform provides guidance on implementation priorities based on impact and complexity. For technical implementations, we can connect you with certified implementation partners in your region.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Yes, Grid Genius is designed to integrate with common municipal systems including building management systems, traffic control software, and streetlight control systems. We support standard APIs and data formats, making integration straightforward in most cases. Custom integrations can be developed if needed.",
  },
]

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm the Grid Genius Assistant. How can I help you with energy optimization today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [exampleQuestions, setExampleQuestions] = useState(trainingData.slice(0, 5))

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    // Find best matching response from training data
    setTimeout(() => {
      const botResponse = findResponse(inputValue)
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const findResponse = (query: string): string => {
    // Simple matching algorithm - in a real app, this would be more sophisticated
    query = query.toLowerCase()

    // Try to find an exact match first
    for (const item of trainingData) {
      if (item.question.toLowerCase() === query) {
        return item.answer
      }
    }

    // If no exact match, look for partial matches
    let bestMatch = null
    let highestScore = 0

    for (const item of trainingData) {
      const questionWords = item.question.toLowerCase().split(" ")
      const queryWords = query.split(" ")

      let matchScore = 0
      for (const word of queryWords) {
        if (questionWords.includes(word) && word.length > 3) {
          matchScore++
        }
      }

      if (matchScore > highestScore) {
        highestScore = matchScore
        bestMatch = item
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.answer
    }

    // Fallback response
    return "I don't have specific information about that. Would you like to know about our energy optimization recommendations, weather impact on energy usage, or traffic signal optimization?"
  }

  const handleExampleClick = (question: string) => {
    setInputValue(question)

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: question,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])

    // Find response
    setTimeout(() => {
      const botResponse = findResponse(question)
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    // Rotate example questions
    setExampleQuestions((prev) => {
      const remaining = trainingData.filter((item) => !prev.includes(item))
      const newExamples = [...prev.slice(1), remaining[Math.floor(Math.random() * remaining.length)]]
      return newExamples
    })
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg" onClick={toggleChat}>
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 md:w-96 shadow-lg z-50 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bot className="h-5 w-5 mr-2 text-primary" />
              Grid Genius Assistant
            </CardTitle>
          </CardHeader>

          <ScrollArea className="h-80">
            <CardContent>
              <div className="space-y-4 pt-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8">
                        {message.sender === "bot" ? (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>GG</AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>You</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 text-sm ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {messages.length === 1 && (
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-2">You can ask me about:</p>
                  <div className="space-y-2">
                    {exampleQuestions.map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleExampleClick(item.question)}
                      >
                        {item.question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </ScrollArea>

          <CardFooter className="border-t p-3">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend()
                  }
                }}
              />
              <Button size="icon" onClick={handleSend} disabled={inputValue.trim() === ""}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

