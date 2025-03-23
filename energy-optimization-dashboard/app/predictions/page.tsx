"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  TrendingUp,
  Zap,
  Users,
  Building,
  CloudRain,
  Lightbulb,
  AlertTriangle,
  BarChart3,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react"

// Define the COLORS array
const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]

// Format large numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

// Generate prediction data
const generatePredictionData = (years: number, baseValue: number, growthRate: number, volatility: number) => {
  const data = []
  let currentValue = baseValue

  for (let i = 0; i <= years; i++) {
    // Add some randomness to the growth
    const randomFactor = 1 + (Math.random() * volatility * 2 - volatility)
    currentValue = currentValue * (1 + growthRate * randomFactor)

    data.push({
      year: 2025 + i,
      value: Math.round(currentValue),
    })
  }

  return data
}

// Generate population prediction data
const generatePopulationData = (years: number) => {
  return generatePredictionData(years, 2300000, 0.015, 0.005) // Starting with 2.3M, 1.5% growth
}

// Generate energy consumption prediction data
const generateConsumptionData = (years: number) => {
  return generatePredictionData(years, 45231 * 365, 0.025, 0.01) // Starting with daily * 365, 2.5% growth
}

// Generate demand prediction data
const generateDemandData = (years: number) => {
  return generatePredictionData(years, 50000 * 365, 0.03, 0.015) // Starting with 50MWh daily * 365, 3% growth
}

// Generate potential exploitation data
const generateExploitationData = (years: number) => {
  return generatePredictionData(years, 3200000, 0.02, 0.02) // Starting with 3.2M, 2% growth
}

// Generate climate impact data
const generateClimateData = (years: number) => {
  const data = []
  const baseTemp = 28 // Base temperature in Celsius
  const basePrecipitation = 1050 // Base annual precipitation in mm

  for (let i = 0; i <= years; i++) {
    data.push({
      year: 2025 + i,
      temperature: +(baseTemp + i * 0.03 + (Math.random() * 0.4 - 0.2)).toFixed(1), // Slight increase each year
      precipitation: Math.round(basePrecipitation * (1 + i * 0.005 + (Math.random() * 0.06 - 0.03))), // Slight increase in variability
    })
  }

  return data
}

// Generate infrastructure aging data
const generateInfrastructureData = (years: number) => {
  const categories = ["Streetlights", "Traffic Signals", "Public Buildings", "Power Distribution", "Water Systems"]
  const data = []

  for (let i = 0; i <= years; i++) {
    const yearData: any = {
      year: 2025 + i,
    }

    categories.forEach((category) => {
      // Start with different base efficiency for each category
      const baseEfficiency = {
        Streetlights: 92,
        "Traffic Signals": 90,
        "Public Buildings": 85,
        "Power Distribution": 88,
        "Water Systems": 82,
      }[category]

      // Decrease efficiency over time, but allow for improvements (simulating maintenance/upgrades)
      const naturalDecline = i * 0.5 // 0.5% decline per year
      const improvements = Math.random() > 0.7 ? Math.random() * 5 : 0 // Random improvements

      yearData[category] = Math.max(60, Math.min(100, baseEfficiency - naturalDecline + improvements))
    })

    data.push(yearData)
  }

  return data
}

// Generate optimization potential data
const generateOptimizationData = (years: number) => {
  const data = []

  for (let i = 0; i <= years; i++) {
    data.push({
      year: 2025 + i,
      streetlights: Math.round(20 - i * 0.5 + Math.random() * 2), // Decreasing over time as more gets optimized
      trafficSignals: Math.round(15 - i * 0.3 + Math.random() * 2),
      buildings: Math.round(25 - i * 0.7 + Math.random() * 3),
      grid: Math.round(18 - i * 0.4 + Math.random() * 2),
    })
  }

  return data
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md p-3 shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {formatNumber(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function PredictionsPage() {
  const [predictionYears, setPredictionYears] = useState(10)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentYear, setCurrentYear] = useState(0)
  const [selectedTab, setSelectedTab] = useState("overview")

  // Generate all prediction data
  const [populationData, setPopulationData] = useState(generatePopulationData(predictionYears))
  const [consumptionData, setConsumptionData] = useState(generateConsumptionData(predictionYears))
  const [demandData, setDemandData] = useState(generateDemandData(predictionYears))
  const [exploitationData, setExploitationData] = useState(generateExploitationData(predictionYears))
  const [climateData, setClimateData] = useState(generateClimateData(predictionYears))
  const [infrastructureData, setInfrastructureData] = useState(generateInfrastructureData(predictionYears))
  const [optimizationData, setOptimizationData] = useState(generateOptimizationData(predictionYears))

  // Regenerate data when prediction years change
  useEffect(() => {
    setPopulationData(generatePopulationData(predictionYears))
    setConsumptionData(generateConsumptionData(predictionYears))
    setDemandData(generateDemandData(predictionYears))
    setExploitationData(generateExploitationData(predictionYears))
    setClimateData(generateClimateData(predictionYears))
    setInfrastructureData(generateInfrastructureData(predictionYears))
    setOptimizationData(generateOptimizationData(predictionYears))
  }, [predictionYears])

  // Animation effect
  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setCurrentYear((prev) => {
        if (prev >= predictionYears) {
          setIsAnimating(false)
          return predictionYears
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isAnimating, predictionYears])

  // Filter data based on current year for animation
  const filterDataByYear = (data: any[]) => {
    return isAnimating || currentYear > 0 ? data.slice(0, currentYear + 1) : data
  }

  // Reset and regenerate all data
  const regenerateData = () => {
    setCurrentYear(0)
    setIsAnimating(false)
    setPopulationData(generatePopulationData(predictionYears))
    setConsumptionData(generateConsumptionData(predictionYears))
    setDemandData(generateDemandData(predictionYears))
    setExploitationData(generateExploitationData(predictionYears))
    setClimateData(generateClimateData(predictionYears))
    setInfrastructureData(generateInfrastructureData(predictionYears))
    setOptimizationData(generateOptimizationData(predictionYears))
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Predictions</h1>
          <p className="text-muted-foreground">
            Long-term forecasts and trend analysis for energy optimization planning
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Prediction Years:</span>
            <Select
              value={predictionYears.toString()}
              onValueChange={(value) => setPredictionYears(Number.parseInt(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Years</SelectItem>
                <SelectItem value="10">10 Years</SelectItem>
                <SelectItem value="15">15 Years</SelectItem>
                <SelectItem value="20">20 Years</SelectItem>
                <SelectItem value="25">25 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsAnimating(!isAnimating)}
            disabled={currentYear >= predictionYears && isAnimating}
          >
            {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={regenerateData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {(isAnimating || currentYear > 0) && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Year: {2025 + currentYear}</span>
            <span className="text-xs text-muted-foreground">
              {currentYear === 0 ? "Current" : `+${currentYear} years`}
            </span>
          </div>
          <Slider
            value={[currentYear]}
            max={predictionYears}
            step={1}
            onValueChange={(value) => setCurrentYear(value[0])}
          />
        </div>
      )}

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="population">Population</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="climate">Climate Impact</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Population Forecast</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(populationData[currentYear > 0 ? currentYear : 0].value)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{((populationData[predictionYears].value / populationData[0].value - 1) * 100).toFixed(1)}% over{" "}
                  {predictionYears} years
                </p>
                <div className="h-10 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filterDataByYear(populationData)}>
                      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Consumption</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(consumptionData[currentYear > 0 ? currentYear : 0].value)} kWh
                </div>
                <p className="text-xs text-muted-foreground">
                  +{((consumptionData[predictionYears].value / consumptionData[0].value - 1) * 100).toFixed(1)}% over{" "}
                  {predictionYears} years
                </p>
                <div className="h-10 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filterDataByYear(consumptionData)}>
                      <Line type="monotone" dataKey="value" stroke="#10b981" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Demand</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(demandData[currentYear > 0 ? currentYear : 0].value)} kWh
                </div>
                <p className="text-xs text-muted-foreground">
                  +{((demandData[predictionYears].value / demandData[0].value - 1) * 100).toFixed(1)}% over{" "}
                  {predictionYears} years
                </p>
                <div className="h-10 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filterDataByYear(demandData)}>
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Potential</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{formatNumber(exploitationData[currentYear > 0 ? currentYear : 0].value)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{((exploitationData[predictionYears].value / exploitationData[0].value - 1) * 100).toFixed(1)}% over{" "}
                  {predictionYears} years
                </p>
                <div className="h-10 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filterDataByYear(exploitationData)}>
                      <Line type="monotone" dataKey="value" stroke="#f59e0b" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Long-term Energy Consumption Forecast</CardTitle>
                <CardDescription>Projected annual energy usage over {predictionYears} years</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filterDataByYear(consumptionData)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Annual Consumption (kWh)"
                      stroke="#10b981"
                      fill="#10b98140"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Optimization Potential by Category</CardTitle>
                <CardDescription>Projected savings opportunities by infrastructure type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filterDataByYear(optimizationData)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "Potential Savings (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="streetlights" name="Streetlights" fill="#10b981" />
                    <Bar dataKey="trafficSignals" name="Traffic Signals" fill="#3b82f6" />
                    <Bar dataKey="buildings" name="Buildings" fill="#8b5cf6" />
                    <Bar dataKey="grid" name="Power Grid" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Climate Impact on Energy Consumption</CardTitle>
              <CardDescription>Projected temperature changes and their effect on energy usage</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filterDataByYear(climateData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    name="Avg. Temperature (°C)"
                    stroke="#ef4444"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="precipitation"
                    name="Annual Precipitation (mm)"
                    stroke="#3b82f6"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="population" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Population Growth Forecast</CardTitle>
              <CardDescription>Projected population growth in Bhopal over {predictionYears} years</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filterDataByYear(populationData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" name="Population" stroke="#8884d8" fill="#8884d840" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Population Impact on Energy Demand</CardTitle>
                <CardDescription>Correlation between population growth and energy needs</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      type="category"
                      allowDuplicatedCategory={false}
                      data={filterDataByYear(populationData)}
                    />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      dataKey="value"
                      data={filterDataByYear(populationData)}
                      name="Population"
                      stroke="#8884d8"
                      dot={false}
                    />
                    <Line
                      yAxisId="right"
                      dataKey="value"
                      data={filterDataByYear(consumptionData)}
                      name="Energy Consumption (kWh)"
                      stroke="#10b981"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Population Density Forecast</CardTitle>
                <CardDescription>Projected changes in urban density and distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Population density visualization would appear here, showing projected changes in urban density
                    across Bhopal's districts.
                  </p>
                  <Button variant="outline">Generate Density Map</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Energy Consumption vs. Demand</CardTitle>
                <CardDescription>Projected gap between consumption and demand</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      type="category"
                      allowDuplicatedCategory={false}
                      data={filterDataByYear(consumptionData)}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="value"
                      data={filterDataByYear(consumptionData)}
                      name="Consumption (kWh)"
                      stroke="#10b981"
                      fill="#10b98140"
                      stackId="1"
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      data={filterDataByYear(demandData)}
                      name="Demand (kWh)"
                      stroke="#3b82f6"
                      fill="#3b82f640"
                      stackId="2"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Savings Potential</CardTitle>
                <CardDescription>Projected financial impact of optimization</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filterDataByYear(exploitationData)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Potential Savings (₹)" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Efficiency Forecast</CardTitle>
              <CardDescription>Projected efficiency changes across infrastructure types</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filterDataByYear(infrastructureData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="Streetlights" stroke="#10b981" />
                  <Line type="monotone" dataKey="Traffic Signals" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="Public Buildings" stroke="#8b5cf6" />
                  <Line type="monotone" dataKey="Power Distribution" stroke="#f59e0b" />
                  <Line type="monotone" dataKey="Water Systems" stroke="#64748b" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="climate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Climate Change Impact</CardTitle>
              <CardDescription>Projected temperature and precipitation changes</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filterDataByYear(climateData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    name="Avg. Temperature (°C)"
                    stroke="#ef4444"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="precipitation"
                    name="Annual Precipitation (mm)"
                    stroke="#3b82f6"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Impact on Energy Usage</CardTitle>
                <CardDescription>Correlation between temperature and consumption</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      type="category"
                      allowDuplicatedCategory={false}
                      data={filterDataByYear(climateData)}
                    />
                    <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      dataKey="temperature"
                      data={filterDataByYear(climateData)}
                      name="Temperature (°C)"
                      stroke="#ef4444"
                      dot={false}
                    />
                    <Line
                      yAxisId="right"
                      dataKey="value"
                      data={filterDataByYear(consumptionData)}
                      name="Energy Consumption (kWh)"
                      stroke="#10b981"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Climate Adaptation Strategies</CardTitle>
                <CardDescription>Recommended approaches based on climate projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CloudRain className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Precipitation Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement rainwater harvesting systems at municipal buildings to reduce water pumping energy by
                        an estimated 12-18%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Peak Load Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Deploy smart grid technologies to manage increasing cooling demand during peak summer
                        temperatures, potentially reducing peak load by 15-20%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Renewable Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Increase solar capacity to offset growing cooling demands, with potential to meet 30-40% of
                        municipal energy needs by {2025 + predictionYears}.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Building Adaptations</h4>
                      <p className="text-sm text-muted-foreground">
                        Retrofit public buildings with passive cooling features and high-efficiency HVAC systems,
                        reducing cooling energy by up to 35%.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Efficiency Trends</CardTitle>
              <CardDescription>Projected efficiency changes across infrastructure types</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filterDataByYear(infrastructureData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="Streetlights" stroke="#10b981" />
                  <Line type="monotone" dataKey="Traffic Signals" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="Public Buildings" stroke="#8b5cf6" />
                  <Line type="monotone" dataKey="Power Distribution" stroke="#f59e0b" />
                  <Line type="monotone" dataKey="Water Systems" stroke="#64748b" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Investment Needs</CardTitle>
                <CardDescription>Projected capital requirements for maintenance and upgrades</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Streetlights", value: 25 },
                        { name: "Traffic Signals", value: 15 },
                        { name: "Public Buildings", value: 35 },
                        { name: "Power Distribution", value: 20 },
                        { name: "Water Systems", value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: "Streetlights", value: 25 },
                        { name: "Traffic Signals", value: 15 },
                        { name: "Public Buildings", value: 35 },
                        { name: "Power Distribution", value: 20 },
                        { name: "Water Systems", value: 5 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Priority Matrix</CardTitle>
                <CardDescription>Recommended focus areas based on ROI and impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Critical Priority</span>
                    </div>
                    <span>Public Buildings HVAC Systems</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">High Priority</span>
                    </div>
                    <span>Streetlight Control Systems</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">Medium Priority</span>
                    </div>
                    <span>Traffic Signal Optimization</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Standard Priority</span>
                    </div>
                    <span>Power Distribution Monitoring</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Long-term Priority</span>
                    </div>
                    <span>Water System Pumping Efficiency</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 bg-muted p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="text-sm font-medium">AI Prediction Disclaimer</h3>
            <p className="text-sm text-muted-foreground mt-1">
              These predictions are generated using AI models trained on historical data and current trends. They
              represent potential scenarios rather than definitive forecasts. The simulation compresses years of data
              into a visual timeline for planning purposes. Actual outcomes may vary based on policy changes,
              technological advancements, and unforeseen events.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

