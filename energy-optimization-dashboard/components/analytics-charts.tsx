"use client"

import { useState, useEffect, useRef } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

// Sample data for consumption trend
const initialConsumptionData = [
  { month: "Jan", streetlights: 4200, trafficLights: 2400, buildings: 6800 },
  { month: "Feb", streetlights: 3800, trafficLights: 2100, buildings: 6500 },
  { month: "Mar", streetlights: 3600, trafficLights: 2000, buildings: 6200 },
  { month: "Apr", streetlights: 3200, trafficLights: 1800, buildings: 5800 },
  { month: "May", streetlights: 2800, trafficLights: 1600, buildings: 5400 },
  { month: "Jun", streetlights: 2400, trafficLights: 1400, buildings: 5000 },
  { month: "Jul", streetlights: 2600, trafficLights: 1500, buildings: 5200 },
  { month: "Aug", streetlights: 2800, trafficLights: 1600, buildings: 5400 },
  { month: "Sep", streetlights: 3200, trafficLights: 1800, buildings: 5800 },
  { month: "Oct", streetlights: 3600, trafficLights: 2000, buildings: 6200 },
  { month: "Nov", streetlights: 3800, trafficLights: 2100, buildings: 6500 },
  { month: "Dec", streetlights: 4200, trafficLights: 2400, buildings: 6800 },
]

// Sample data for energy distribution
const initialDistributionData = [
  { name: "Streetlights", value: 40.7 },
  { name: "Traffic Signals", value: 12.8 },
  { name: "Public Buildings", value: 46.5 },
]

// Sample data for optimization opportunities
const initialOptimizationData = [
  { name: "Streetlights", current: 18420, potential: 14736 },
  { name: "Traffic Signals", current: 5811, potential: 4940 },
  { name: "Public Buildings", current: 21000, potential: 16800 },
]

// Sample data for streetlight analysis
const initialStreetlightData = [
  { time: "6PM", usage: 800 },
  { time: "8PM", usage: 1200 },
  { time: "10PM", usage: 1500 },
  { time: "12AM", usage: 1800 },
  { time: "2AM", usage: 1600 },
  { time: "4AM", usage: 1400 },
  { time: "6AM", usage: 1000 },
]

// Sample data for traffic signal analysis
const initialTrafficSignalData = [
  { time: "6AM", usage: 400 },
  { time: "8AM", usage: 600 },
  { time: "10AM", usage: 500 },
  { time: "12PM", usage: 450 },
  { time: "2PM", usage: 480 },
  { time: "4PM", usage: 620 },
  { time: "6PM", usage: 580 },
  { time: "8PM", usage: 400 },
  { time: "10PM", usage: 300 },
]

// Sample data for public building analysis
const initialBuildingData = [
  { name: "City Hall", usage: 5200 },
  { name: "Library", usage: 3800 },
  { name: "Police Station", usage: 4500 },
  { name: "Fire Station", usage: 2800 },
  { name: "Community Center", usage: 2400 },
  { name: "Municipal Court", usage: 2300 },
]

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"]

// Function to create dynamic data with variations
const createDynamicData = (baseData: any[], variationPercent = 10) => {
  return baseData.map((item) => {
    const newItem = { ...item }

    // Apply random variations to numeric properties
    Object.keys(newItem).forEach((key) => {
      if (typeof newItem[key] === "number") {
        const variation = (Math.random() * 2 - 1) * (variationPercent / 100)
        newItem[key] = Math.round(newItem[key] * (1 + variation))
      }
    })

    return newItem
  })
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md p-3 shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} {entry.unit || "kWh"}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Dynamic chart component with animation
const DynamicChart = ({
  ChartComponent,
  initialData,
  dataKeys,
  xAxisKey,
  chartProps = {},
  children,
  height = "100%",
}: any) => {
  const [data, setData] = useState(initialData)
  const [isAnimating, setIsAnimating] = useState(true)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const animationRef = useRef<number>()
  const [time, setTime] = useState(0)

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return

    let lastTime = 0
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Update time (24-hour cycle in 5 seconds)
      setTime((prevTime) => {
        const newTime = (prevTime + (deltaTime / 5000) * 24) % 24

        // Update data based on time
        if (Math.floor(newTime) !== Math.floor(prevTime)) {
          setData(createDynamicData(initialData))
        }

        return newTime
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, initialData])

  return (
    <div className="relative h-full">
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data} {...chartProps}>
          {children}
        </ChartComponent>
      </ResponsiveContainer>

      <div className="absolute top-2 right-2 flex gap-1">
        <Button
          variant="outline"
          size="sm"
          className="text-xs py-1 px-2 h-auto"
          onClick={() => setIsAnimating(!isAnimating)}
        >
          {isAnimating ? "Pause" : "Play"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs py-1 px-2 h-auto"
          onClick={() => setShowDisclaimer(!showDisclaimer)}
        >
          ?
        </Button>
      </div>

      {showDisclaimer && (
        <Card className="absolute bottom-2 left-2 right-2 z-10">
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                <strong>Simulation Notice:</strong> This chart is showing a dynamic simulation where 24 hours of data
                changes are compressed into 5 seconds for demonstration purposes. The variations represent typical daily
                patterns with some randomization to simulate real-world conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export function ConsumptionTrendChart() {
  return (
    <DynamicChart ChartComponent={LineChart} initialData={initialConsumptionData} xAxisKey="month">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line type="monotone" dataKey="streetlights" stroke="#10b981" activeDot={{ r: 8 }} name="Streetlights" />
      <Line type="monotone" dataKey="trafficLights" stroke="#3b82f6" name="Traffic Lights" />
      <Line type="monotone" dataKey="buildings" stroke="#8b5cf6" name="Public Buildings" />
    </DynamicChart>
  )
}

export function DistributionPieChart() {
  return (
    <DynamicChart ChartComponent={PieChart} initialData={initialDistributionData}>
      <Pie
        data={initialDistributionData}
        cx="50%"
        cy="50%"
        labelLine={true}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, value }) => `${name}: ${value}%`}
      >
        {initialDistributionData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value}%`} />
      <Legend />
    </DynamicChart>
  )
}

export function OptimizationOpportunitiesChart() {
  return (
    <DynamicChart
      ChartComponent={BarChart}
      initialData={initialOptimizationData}
      chartProps={{
        margin: {
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        },
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="current" fill="#ef4444" name="Current Usage (kWh)" />
      <Bar dataKey="potential" fill="#10b981" name="Potential Usage (kWh)" />
    </DynamicChart>
  )
}

export function StreetlightAnalysisChart() {
  return (
    <DynamicChart
      ChartComponent={AreaChart}
      initialData={initialStreetlightData}
      chartProps={{
        margin: {
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        },
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Area type="monotone" dataKey="usage" stroke="#10b981" fill="#10b98140" name="Energy Usage (kWh)" />
    </DynamicChart>
  )
}

export function TrafficSignalAnalysisChart() {
  return (
    <DynamicChart
      ChartComponent={LineChart}
      initialData={initialTrafficSignalData}
      chartProps={{
        margin: {
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        },
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line type="monotone" dataKey="usage" stroke="#3b82f6" activeDot={{ r: 8 }} name="Energy Usage (kWh)" />
    </DynamicChart>
  )
}

export function PublicBuildingAnalysisChart() {
  return (
    <DynamicChart
      ChartComponent={BarChart}
      initialData={initialBuildingData}
      chartProps={{
        margin: {
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        },
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="usage" fill="#8b5cf6" name="Energy Usage (kWh)" />
    </DynamicChart>
  )
}

