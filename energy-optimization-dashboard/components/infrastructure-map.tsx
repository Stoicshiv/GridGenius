"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import { MapPin, Zap, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample data for energy hotspots
// const hotspots = [
//   { id: 1, name: "Downtown District", lat: 40, lng: 50, energyUsage: 1200, type: "high" },
//   { id: 2, name: "North Bridge", lat: 60, lng: 70, energyUsage: 800, type: "medium" },
//   { id: 3, name: "City Hall", lat: 30, lng: 40, energyUsage: 1500, type: "high" },
//   { id: 4, name: "East Park", lat: 50, lng: 80, energyUsage: 400, type: "low" },
//   { id: 5, name: "Industrial Zone", lat: 70, lng: 30, energyUsage: 2000, type: "critical" },
// ]

// Generate random locations in Bhopal area
const generateBhopalLocations = (count: number) => {
  // Bhopal approximate coordinates
  const BHOPAL_CENTER_LAT = 23.2599
  const BHOPAL_CENTER_LNG = 77.4126
  const BHOPAL_RADIUS = 0.15 // Roughly covers Bhopal city area

  const locations = []
  const areas = [
    "MP Nagar",
    "Arera Colony",
    "Shahpura",
    "Kolar Road",
    "Bairagarh",
    "Habibganj",
    "TT Nagar",
    "New Market",
    "Shyamla Hills",
    "Bittan Market",
    "Chunabhatti",
    "Govindpura",
    "Ayodhya Nagar",
    "Karond",
    "Piplani",
    "Indrapuri",
    "Saket Nagar",
    "BHEL",
    "Katara Hills",
    "Misrod",
    "Nehru Nagar",
    "Ashoka Garden",
    "Gautam Nagar",
    "Jawahar Chowk",
    "Kamla Nagar",
  ]

  for (let i = 0; i < count; i++) {
    // Random angle and distance from center
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * BHOPAL_RADIUS

    // Convert to cartesian coordinates
    const lat = BHOPAL_CENTER_LAT + distance * Math.cos(angle)
    const lng = BHOPAL_CENTER_LNG + distance * Math.sin(angle)

    // Random energy usage between 50 and 500 kWh
    const energyUsage = Math.floor(Math.random() * 450) + 50

    // Determine type based on energy usage
    let type
    if (energyUsage > 400) type = "critical"
    else if (energyUsage > 300) type = "high"
    else if (energyUsage > 150) type = "medium"
    else type = "low"

    // Random area from the list
    const areaName = areas[Math.floor(Math.random() * areas.length)]
    const locationName = `${areaName} ${["Zone", "Block", "Sector", "Area"][Math.floor(Math.random() * 4)]}-${Math.floor(Math.random() * 20) + 1}`

    locations.push({
      id: i + 1,
      name: locationName,
      lat,
      lng,
      energyUsage,
      type,
      potentialSavings: Math.floor(energyUsage * (Math.random() * 0.3 + 0.1)), // 10-40% potential savings
    })
  }

  return locations
}

export default function InfrastructureMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null)
  const [hotspots, setHotspots] = useState<any[]>([])
  const [isAnimating, setIsAnimating] = useState(true)
  const [showAllHotspots, setShowAllHotspots] = useState(false)
  const [mapType, setMapType] = useState<"energy" | "savings" | "reports">("energy")
  const animationRef = useRef<number>()
  const [time, setTime] = useState(0)

  // Generate hotspots on mount
  useEffect(() => {
    setHotspots(generateBhopalLocations(500))
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return

    let lastTime = 0
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      setTime((prevTime) => (prevTime + deltaTime / 1000) % 24) // 24-hour cycle

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || hotspots.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw map background - light beige for Bhopal map
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#f5f3e8")
    gradient.addColorStop(1, "#eae6d1")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines for city blocks
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 0; i < canvas.height; i += 15) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i < canvas.width; i += 15) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }

    // Draw main roads
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 3

    // Main horizontal road (Hoshangabad Road)
    ctx.beginPath()
    ctx.moveTo(0, canvas.height * 0.4)
    ctx.lineTo(canvas.width, canvas.height * 0.4)
    ctx.stroke()

    // Main vertical road (Hamidia Road)
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.5, 0)
    ctx.lineTo(canvas.width * 0.5, canvas.height)
    ctx.stroke()

    // Draw diagonal road (Link Road)
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.2, 0)
    ctx.lineTo(canvas.width * 0.8, canvas.height)
    ctx.stroke()

    // Draw curved road (VIP Road)
    ctx.beginPath()
    ctx.moveTo(0, canvas.height * 0.7)
    ctx.quadraticCurveTo(canvas.width * 0.5, canvas.height * 0.5, canvas.width, canvas.height * 0.3)
    ctx.stroke()

    // Draw lakes (Upper and Lower Lake)
    ctx.fillStyle = "#bae6fd"

    // Upper Lake
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.15, canvas.height * 0.1, 0, 0, 2 * Math.PI)
    ctx.fill()

    // Lower Lake
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.4, canvas.height * 0.5, canvas.width * 0.08, canvas.height * 0.06, 0, 0, 2 * Math.PI)
    ctx.fill()

    // Add lake labels
    ctx.fillStyle = "#0c4a6e"
    ctx.font = "10px Arial"
    ctx.fillText("Upper Lake", canvas.width * 0.28, canvas.height * 0.3)
    ctx.fillText("Lower Lake", canvas.width * 0.38, canvas.height * 0.5)

    // Add city name
    ctx.fillStyle = "#1f2937"
    ctx.font = "bold 16px Arial"
    ctx.fillText("Bhopal", canvas.width * 0.46, canvas.height * 0.15)

    // Add area names
    ctx.fillStyle = "#4b5563"
    ctx.font = "10px Arial"
    ctx.fillText("MP Nagar", canvas.width * 0.6, canvas.height * 0.6)
    ctx.fillText("Arera Colony", canvas.width * 0.7, canvas.height * 0.4)
    ctx.fillText("Shahpura", canvas.width * 0.8, canvas.height * 0.2)
    ctx.fillText("TT Nagar", canvas.width * 0.4, canvas.height * 0.3)
    ctx.fillText("New Market", canvas.width * 0.5, canvas.height * 0.25)
    ctx.fillText("BHEL", canvas.width * 0.2, canvas.height * 0.7)
    ctx.fillText("Kolar Road", canvas.width * 0.7, canvas.height * 0.8)

    // Time-based factor for animation (pulsing effect)
    const timeFactor = Math.sin(time * Math.PI) * 0.2 + 0.8 // 0.6 to 1.0

    // Draw hotspots
    hotspots.forEach((hotspot) => {
      // Scale coordinates to canvas size
      const x = ((hotspot.lng - 77.2) / 0.5) * canvas.width
      const y = ((23.4 - hotspot.lat) / 0.4) * canvas.height

      // Skip if outside canvas
      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return

      // Determine color based on map type
      let color
      let size

      if (mapType === "energy") {
        // Energy usage
        switch (hotspot.type) {
          case "critical":
            color = "#ef4444" // red
            size = 6 * timeFactor
            break
          case "high":
            color = "#f97316" // orange
            size = 5 * timeFactor
            break
          case "medium":
            color = "#eab308" // yellow
            size = 4 * timeFactor
            break
          case "low":
            color = "#22c55e" // green
            size = 3 * timeFactor
            break
          default:
            color = "#3b82f6" // blue
            size = 3 * timeFactor
        }
      } else if (mapType === "savings") {
        // Potential savings
        const savingsPercent = (hotspot.potentialSavings / hotspot.energyUsage) * 100
        if (savingsPercent > 30) {
          color = "#22c55e" // green (high savings)
          size = 6 * timeFactor
        } else if (savingsPercent > 20) {
          color = "#84cc16" // lime
          size = 5 * timeFactor
        } else if (savingsPercent > 10) {
          color = "#eab308" // yellow
          size = 4 * timeFactor
        } else {
          color = "#f97316" // orange (low savings)
          size = 3 * timeFactor
        }
      } else {
        // Public reports (simulated)
        const hasReport = hotspot.id % 10 === 0 // 10% of locations have reports
        const reportStatus = hotspot.id % 3 // 0: pending, 1: verified, 2: resolved

        if (hasReport) {
          if (reportStatus === 0) {
            color = "#f97316" // orange (pending)
            size = 5 * timeFactor
          } else if (reportStatus === 1) {
            color = "#3b82f6" // blue (verified)
            size = 4 * timeFactor
          } else {
            color = "#22c55e" // green (resolved)
            size = 3 * timeFactor
          }
        } else {
          // No report
          return // Skip drawing
        }
      }

      // Only draw critical/high or selected hotspots if not showing all
      if (
        !showAllHotspots &&
        mapType === "energy" &&
        hotspot.type !== "critical" &&
        hotspot.type !== "high" &&
        hotspot !== selectedHotspot
      ) {
        return
      }

      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, size, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()

      // Draw pulse effect for high energy areas
      if (
        (mapType === "energy" && (hotspot.type === "critical" || hotspot.type === "high")) ||
        (mapType === "savings" && (hotspot.potentialSavings / hotspot.energyUsage) * 100 > 30) ||
        (mapType === "reports" && hotspot.id % 10 === 0 && hotspot.id % 3 === 0)
      ) {
        ctx.beginPath()
        ctx.arc(x, y, size * 1.5 * timeFactor, 0, 2 * Math.PI)
        ctx.fillStyle = color + "40" // Add transparency
        ctx.fill()
      }

      // Highlight selected hotspot
      if (selectedHotspot && hotspot.id === selectedHotspot.id) {
        ctx.beginPath()
        ctx.arc(x, y, size * 2, 0, 2 * Math.PI)
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })

    // Add time indicator
    const hours = Math.floor(time)
    const minutes = Math.floor((time - hours) * 60)
    ctx.fillStyle = "#1f2937"
    ctx.font = "bold 12px Arial"
    ctx.fillText(`Time: ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`, 10, 20)
  }, [hotspots, selectedHotspot, time, showAllHotspots, mapType])

  // Handle canvas click to select hotspot
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is on a hotspot
    for (const hotspot of hotspots) {
      const hotspotX = ((hotspot.lng - 77.2) / 0.5) * canvas.width
      const hotspotY = ((23.4 - hotspot.lat) / 0.4) * canvas.height

      // Simple distance check
      const distance = Math.sqrt(Math.pow(x - hotspotX, 2) + Math.pow(y - hotspotY, 2))
      if (distance <= 15) {
        setSelectedHotspot(hotspot)
        return
      }
    }

    // If click is not on a hotspot, clear selection
    setSelectedHotspot(null)
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        <Button
          variant="outline"
          size="sm"
          className={`text-xs py-1 px-2 h-auto ${mapType === "energy" ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => setMapType("energy")}
        >
          Energy
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`text-xs py-1 px-2 h-auto ${mapType === "savings" ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => setMapType("savings")}
        >
          Savings
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`text-xs py-1 px-2 h-auto ${mapType === "reports" ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => setMapType("reports")}
        >
          Reports
        </Button>
      </div>

      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <Button
          variant="outline"
          size="sm"
          className="text-xs py-1 px-2 h-auto"
          onClick={() => setShowAllHotspots(!showAllHotspots)}
        >
          {showAllHotspots ? "Show Critical Only" : "Show All Points"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs py-1 px-2 h-auto"
          onClick={() => setIsAnimating(!isAnimating)}
        >
          {isAnimating ? "Pause" : "Play"}
        </Button>
      </div>

      <canvas ref={canvasRef} className="w-full h-full rounded-md cursor-pointer" onClick={handleCanvasClick} />

      {selectedHotspot && (
        <div className="absolute top-12 left-2 bg-background border rounded-md p-3 shadow-md max-w-[250px]">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-primary" />
            <h4 className="font-medium">{selectedHotspot.name}</h4>
          </div>
          <p className="text-sm text-muted-foreground">Energy usage: {selectedHotspot.energyUsage} kWh</p>
          <p className="text-sm">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1 ${
                selectedHotspot.type === "critical"
                  ? "bg-red-500"
                  : selectedHotspot.type === "high"
                    ? "bg-orange-500"
                    : selectedHotspot.type === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
              }`}
            />
            {selectedHotspot.type.charAt(0).toUpperCase() + selectedHotspot.type.slice(1)} consumption area
          </p>
          {mapType === "savings" && (
            <p className="text-sm text-green-600 mt-1">
              <Zap className="h-3 w-3 inline mr-1" />
              Potential savings: {selectedHotspot.potentialSavings} kWh (
              {Math.round((selectedHotspot.potentialSavings / selectedHotspot.energyUsage) * 100)}%)
            </p>
          )}
          {mapType === "reports" && selectedHotspot.id % 10 === 0 && (
            <div className="mt-1">
              <p className="text-sm flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Report status:
                <span
                  className={`ml-1 ${
                    selectedHotspot.id % 3 === 0
                      ? "text-orange-500"
                      : selectedHotspot.id % 3 === 1
                        ? "text-blue-500"
                        : "text-green-500"
                  }`}
                >
                  {selectedHotspot.id % 3 === 0 ? "Pending" : selectedHotspot.id % 3 === 1 ? "Verified" : "Resolved"}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm border rounded-md p-2 text-xs">
        <div className="flex items-center gap-1 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
          <span>High</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          <span>Low</span>
        </div>
      </div>

      <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm border rounded-md p-2 text-xs">
        <p className="text-muted-foreground">
          <strong>Note:</strong> This simulation shows 24 hours of data in 5 seconds.
          {mapType === "energy" && " Energy consumption is visualized in real-time."}
          {mapType === "savings" && " Potential savings are calculated based on AI analysis."}
          {mapType === "reports" && " Public reports are shown with their current status."}
        </p>
      </div>
    </div>
  )
}

