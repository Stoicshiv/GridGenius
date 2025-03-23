import { BarChart3, PieChart, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ConsumptionTrendChart,
  DistributionPieChart,
  OptimizationOpportunitiesChart,
  StreetlightAnalysisChart,
  TrafficSignalAnalysisChart,
  PublicBuildingAnalysisChart,
} from "@/components/analytics-charts"

export default function AnalyticsPage() {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Energy Analytics</h1>
          <p className="text-muted-foreground">
            Detailed analysis of energy consumption and optimization opportunities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Mar 1 - Mar 22, 2025
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="streetlights">Streetlights</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Signals</TabsTrigger>
          <TabsTrigger value="buildings">Public Buildings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231 kWh</div>
                <p className="text-xs text-muted-foreground">+2.5% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streetlights</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,420 kWh</div>
                <p className="text-xs text-muted-foreground">40.7% of total consumption</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Traffic Signals</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,811 kWh</div>
                <p className="text-xs text-muted-foreground">12.8% of total consumption</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Public Buildings</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">21,000 kWh</div>
                <p className="text-xs text-muted-foreground">46.5% of total consumption</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Energy Consumption Trends</CardTitle>
                <CardDescription>Monthly consumption over the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                <ConsumptionTrendChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Energy Distribution</CardTitle>
                <CardDescription>Breakdown by infrastructure type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                <DistributionPieChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Opportunities</CardTitle>
              <CardDescription>AI-identified areas for energy savings</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
              <OptimizationOpportunitiesChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streetlights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Streetlight Energy Analysis</CardTitle>
              <CardDescription>Detailed breakdown of streetlight energy usage</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
              <StreetlightAnalysisChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Signal Energy Analysis</CardTitle>
              <CardDescription>Detailed breakdown of traffic signal energy usage</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
              <TrafficSignalAnalysisChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buildings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Public Building Energy Analysis</CardTitle>
              <CardDescription>Detailed breakdown of public building energy usage</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
              <PublicBuildingAnalysisChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

