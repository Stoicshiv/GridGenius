"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample weather data - in a real app, this would come from a weather API
const weatherData = {
  current: {
    temp: 28,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
  },
  forecast: [
    { day: "Today", temp: 28, condition: "Sunny" },
    { day: "Tomorrow", temp: 26, condition: "Cloudy" },
    { day: "Wed", temp: 24, condition: "Rainy" },
  ],
  impact: {
    energyUsage: "High temperatures increase cooling demand in public buildings by approximately 8% per 5°C increase.",
    recommendations: [
      "Adjust HVAC schedules to reduce cooling during non-peak hours",
      "Dim streetlights by 15% during clear weather conditions",
      "Implement dynamic traffic light timing based on reduced traffic during rainy conditions",
    ],
  },
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(weatherData)
  const [loading, setLoading] = useState(false)

  // In a real app, you would fetch weather data from an API
  useEffect(() => {
    // Simulating API fetch
    setLoading(true)
    setTimeout(() => {
      setWeather(weatherData)
      setLoading(false)
    }, 1000)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-400" />
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-[180px]">Loading weather data...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getWeatherIcon(weather.current.condition)}
          <div className="ml-3">
            <p className="text-2xl font-bold">{weather.current.temp}°C</p>
            <p className="text-sm text-muted-foreground">{weather.current.condition}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Wind className="h-4 w-4 mr-1" />
            <span>{weather.current.windSpeed} km/h</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Cloud className="h-4 w-4 mr-1" />
            <span>{weather.current.humidity}% humidity</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 border-t pt-4">
        {weather.forecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-sm font-medium">{day.day}</p>
            <div className="flex justify-center my-1">{getWeatherIcon(day.condition)}</div>
            <p className="text-sm">{day.temp}°C</p>
          </div>
        ))}
      </div>

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="impact">
          <AccordionTrigger className="text-sm font-medium">Weather Impact on Energy Usage</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground mb-2">{weather.impact.energyUsage}</p>
            <div className="mt-3">
              <p className="text-sm font-medium flex items-center">
                <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                Energy Saving Recommendations:
              </p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                {weather.impact.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              Apply Weather-Based Optimizations
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-4 bg-muted/30">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Research insight:</span> According to a 2024 study by the Energy Efficiency
            Institute, weather-responsive energy management can reduce municipal energy costs by up to 18% annually.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

