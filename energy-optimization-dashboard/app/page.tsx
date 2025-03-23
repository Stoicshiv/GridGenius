"use client"

import { useState } from "react"
import Link from "next/link"
import { Cpu, Zap, AlertTriangle, TrendingUp, MapPin, Cloud, Car } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import EnergyUsageChart from "@/components/energy-usage-chart"
import WeatherWidget from "@/components/weather-widget"
import TrafficWidget from "@/components/traffic-widget"
import RecommendationsList from "@/components/recommendations-list"
import InfrastructureMap from "@/components/infrastructure-map"
import ChatbotButton from "@/components/chatbot-button"
import LoginPanel from "@/components/login-panel"

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <LoginPanel onLogin={() => setIsLoggedIn(true)} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Grid Genius</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/analytics" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Analytics
            </Link>
            <Link href="/recommendations" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Recommendations
            </Link>
            <Link href="/reports" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Public Reports
            </Link>
            <Link href="/predictions" className="text-sm font-medium text-muted-foreground hover:text-primary">
              AI Predictions
            </Link>
            <Link href="/research" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Research
            </Link>
            <Link href="/settings" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Settings
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Energy Consumption</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231 kWh</div>
              <p className="text-xs text-muted-foreground">-2.5% from last month</p>
              <Progress value={65} className="h-2 mt-4" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3.2M</div>
              <p className="text-xs text-muted-foreground">Annual projection</p>
              <Progress value={78} className="h-2 mt-4" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Public Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 new since yesterday</p>
              <Progress value={45} className="h-2 mt-4" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 high priority</p>
              <Progress value={90} className="h-2 mt-4" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Energy Usage Trends</CardTitle>
              <CardDescription>Daily consumption across public infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <EnergyUsageChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Optimization suggestions based on data analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationsList onStatusChange={(id, status) => {}} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Weather Data</CardTitle>
                <CardDescription>Current conditions affecting energy usage</CardDescription>
              </div>
              <Cloud className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <WeatherWidget />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Traffic Conditions</CardTitle>
                <CardDescription>Real-time traffic affecting signal optimization</CardDescription>
              </div>
              <Car className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <TrafficWidget />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Infrastructure Map</CardTitle>
                <CardDescription>Bhopal city infrastructure energy hotspots</CardDescription>
              </div>
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center bg-muted/50 rounded-md">
              <InfrastructureMap />
            </CardContent>
          </Card>
        </div>
      </main>
      <ChatbotButton />
    </div>
  )
}

