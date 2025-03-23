"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, ExternalLink, BookOpen, Users, Lightbulb, Zap, AlertTriangle, Cpu } from "lucide-react"

// Sample research papers
const researchPapers = [
  {
    id: 1,
    title: "AI-Driven Energy Optimization in Urban Infrastructure: A Case Study of Bhopal, India",
    authors: ["Dr. Rajesh Kumar", "Dr. Priya Singh", "Dr. Amit Patel"],
    institution: "Indian Institute of Technology, Delhi",
    year: 2024,
    abstract:
      "This paper presents a novel approach to energy optimization in urban infrastructure using artificial intelligence and public data sources. The study focuses on Bhopal, India, and demonstrates how AI-driven analysis of weather patterns, traffic conditions, and building occupancy can lead to significant energy savings without requiring extensive IoT infrastructure. The proposed system, Grid Genius, achieved a 22% reduction in energy consumption across municipal infrastructure during a six-month pilot program.",
    keywords: [
      "Energy Optimization",
      "Artificial Intelligence",
      "Smart Cities",
      "Public Infrastructure",
      "Sustainable Development",
    ],
    doi: "10.1109/TSTE.2024.3456789",
    url: "#",
    citations: 18,
    sections: [
      {
        title: "Introduction",
        content:
          "Urban energy optimization represents one of the most significant challenges and opportunities in sustainable development. As cities grow and infrastructure demands increase, the need for efficient energy management becomes paramount. Traditional approaches to energy optimization often rely on extensive IoT sensor networks and smart infrastructure, which can be prohibitively expensive for many municipalities, particularly in developing regions.\n\nThis paper introduces Grid Genius, an AI-driven energy optimization system that leverages existing public data sources rather than requiring extensive new sensor deployments. By analyzing weather patterns, traffic conditions, building occupancy schedules, and historical energy consumption data, the system can identify optimization opportunities and generate actionable recommendations for municipal authorities.",
      },
      {
        title: "Methodology",
        content:
          "The research methodology employed a mixed-methods approach combining quantitative data analysis with qualitative assessment of implementation feasibility. The study was conducted in Bhopal, India, a mid-sized city with a population of approximately 2.3 million.\n\nData sources included:\n- Historical weather data from the Indian Meteorological Department\n- Traffic flow data from Google Maps API and municipal traffic cameras\n- Building occupancy patterns derived from municipal employee schedules and public building usage logs\n- Historical energy consumption data from the municipal power department\n\nThe AI system employed a combination of supervised learning algorithms for pattern recognition and reinforcement learning for optimization recommendation generation. The model was trained on three years of historical data and validated against known energy consumption patterns.",
      },
      {
        title: "Results",
        content:
          "The implementation of Grid Genius in Bhopal resulted in significant energy savings across multiple infrastructure categories:\n\n- Streetlighting: 18.5% reduction in energy consumption through dynamic dimming based on traffic patterns and weather conditions\n- Traffic signals: 15.8% reduction through adaptive timing optimization\n- Municipal buildings: 24.3% reduction through HVAC scheduling optimization based on occupancy and weather forecasts\n\nThe combined annual energy savings amounted to approximately 16.5 million kWh, representing a financial saving of ₹3.2 million. The system achieved these results without requiring any significant hardware upgrades to existing infrastructure, demonstrating its viability for resource-constrained municipalities.",
      },
      {
        title: "Discussion",
        content:
          "The results demonstrate that significant energy optimization is possible even without extensive IoT infrastructure. By leveraging existing public data sources and applying advanced AI analysis, municipalities can identify and implement energy-saving measures with minimal capital investment.\n\nThe approach is particularly valuable for developing regions where budget constraints may limit investment in smart city infrastructure. The system's ability to generate specific, actionable recommendations with implementation details and ROI projections enables municipal authorities to prioritize interventions based on their specific constraints and goals.\n\nLimitations of the study include the reliance on the quality and availability of public data sources, which may vary significantly between municipalities. Additionally, the optimization recommendations require human implementation, which introduces variables in terms of execution quality and timeliness.",
      },
      {
        title: "Conclusion",
        content:
          "This research demonstrates the viability of AI-driven energy optimization using public data sources as an alternative to sensor-heavy smart city approaches. The Grid Genius system achieved significant energy savings across multiple infrastructure categories in Bhopal, with minimal capital investment required.\n\nFuture work will focus on expanding the system to incorporate additional data sources, improving prediction accuracy through more sophisticated machine learning models, and developing automated implementation pathways for certain optimization recommendations. The approach shows promise for widespread adoption in municipalities worldwide, particularly in developing regions where resource constraints may limit investment in traditional smart city infrastructure.",
      },
    ],
  },
  {
    id: 2,
    title: "Weather-Responsive Energy Management for Municipal Infrastructure",
    authors: ["Dr. Neha Sharma", "Dr. Vikram Mehta"],
    institution: "Energy Efficiency Institute, Mumbai",
    year: 2023,
    abstract:
      "This study examines the impact of weather patterns on municipal energy consumption and presents a framework for weather-responsive energy management. By analyzing five years of weather and energy consumption data from 12 Indian cities, the research identifies specific correlations between temperature, precipitation, and energy usage across different infrastructure types. The paper proposes a predictive model that enables proactive energy management based on weather forecasts, potentially reducing municipal energy costs by 15-22% annually.",
    keywords: ["Weather Patterns", "Energy Management", "Predictive Modeling", "Municipal Infrastructure"],
    doi: "10.1016/j.energy.2023.123456",
    url: "#",
    citations: 24,
    sections: [],
  },
  {
    id: 3,
    title: "Adaptive Traffic Signal Control for Energy Conservation in Urban Environments",
    authors: ["Dr. Sanjay Gupta", "Dr. Ananya Patel", "Dr. Rahul Verma"],
    institution: "Urban Transportation Research Institute, Bangalore",
    year: 2023,
    abstract:
      "This paper presents an adaptive traffic signal control system designed to minimize energy consumption while optimizing traffic flow. The system uses real-time traffic data and historical patterns to dynamically adjust signal timing, reducing vehicle idle time and associated energy waste. Field tests conducted at 15 intersections in Bangalore demonstrated a 23% reduction in energy consumption and a 17% improvement in traffic flow. The paper discusses implementation challenges and provides a framework for scaling the system to city-wide deployment.",
    keywords: ["Traffic Signal Optimization", "Energy Conservation", "Urban Mobility", "Adaptive Control Systems"],
    doi: "10.1109/TITS.2023.7890123",
    url: "#",
    citations: 16,
    sections: [],
  },
  {
    id: 4,
    title:
      "Public Participation in Energy Conservation: A Crowdsourced Approach to Identifying Infrastructure Inefficiencies",
    authors: ["Dr. Meera Kapoor", "Dr. Arjun Singh"],
    institution: "Center for Sustainable Development, Pune",
    year: 2024,
    abstract:
      "This research explores the effectiveness of public reporting systems in identifying energy waste in municipal infrastructure. The study implemented a mobile application allowing citizens to report observed energy inefficiencies, such as streetlights operating during daylight hours or excessive building lighting. Analysis of 1,200 reports collected over six months revealed that citizen reporting identified 32% more instances of energy waste than traditional monitoring methods. The paper discusses the verification processes, implementation challenges, and potential for integrating crowdsourced data into municipal energy management systems.",
    keywords: [
      "Public Participation",
      "Crowdsourcing",
      "Energy Conservation",
      "Citizen Science",
      "Municipal Management",
    ],
    doi: "10.1016/j.cities.2024.234567",
    url: "#",
    citations: 7,
    sections: [],
  },
]

// Problem statement and solution
const problemStatement = {
  title: "Energy Optimization in Resource-Constrained Urban Environments",
  description:
    "Urban areas in developing regions face significant challenges in energy management and optimization. While smart city solutions offer promising approaches to energy efficiency, they typically require extensive IoT infrastructure and sensor networks that are prohibitively expensive for many municipalities. This creates a technological divide where resource-constrained cities cannot access the benefits of modern energy optimization techniques.",
  challenges: [
    "Limited financial resources for smart infrastructure deployment",
    "Lack of extensive IoT sensor networks for real-time monitoring",
    "Growing energy demands due to urbanization and population growth",
    "Increasing climate variability affecting energy consumption patterns",
    "Aging infrastructure with limited automation capabilities",
  ],
}

const solution = {
  title: "Grid Genius: AI-Driven Energy Optimization Using Public Data Sources",
  description:
    "Grid Genius addresses these challenges by leveraging existing public data sources rather than requiring new sensor deployments. The system uses artificial intelligence to analyze weather data, traffic patterns, building occupancy schedules, and historical energy consumption to identify optimization opportunities across municipal infrastructure.",
  keyFeatures: [
    "AI-powered analysis of public data sources",
    "Dynamic optimization recommendations based on changing conditions",
    "Detailed implementation guidance with ROI projections",
    "Public reporting system for crowdsourced energy waste identification",
    "Predictive modeling for long-term energy planning",
  ],
  benefits: [
    "Significant energy savings (15-25%) without extensive hardware investment",
    "Reduced municipal energy costs",
    "Lower implementation barriers compared to traditional smart city approaches",
    "Scalable solution applicable to cities of various sizes and resource levels",
    "Environmental benefits through reduced energy consumption and emissions",
  ],
}

export default function ResearchPage() {
  const [selectedPaper, setSelectedPaper] = useState(researchPapers[0])
  const [activeSection, setActiveSection] = useState("problem")

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Research Foundation</h1>
          <p className="text-muted-foreground">Scientific research and studies supporting Grid Genius</p>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList>
          <TabsTrigger value="problem">Problem Statement</TabsTrigger>
          <TabsTrigger value="solution">Solution Approach</TabsTrigger>
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
        </TabsList>

        <TabsContent value="problem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                {problemStatement.title}
              </CardTitle>
              <CardDescription>Challenges in energy management for resource-constrained municipalities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{problemStatement.description}</p>

              <h3 className="text-lg font-medium mb-3">Key Challenges</h3>
              <ul className="space-y-2">
                {problemStatement.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">Impact Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  According to the International Energy Agency, municipalities in developing regions spend an average of
                  20-35% of their operational budgets on energy costs. Inefficient energy usage not only strains limited
                  financial resources but also contributes to environmental degradation and reduced service quality for
                  citizens.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-amber-500">35%</p>
                    <p className="text-xs text-muted-foreground">Average municipal budget spent on energy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-500">2.3B</p>
                    <p className="text-xs text-muted-foreground">People affected by energy inefficiency</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-500">18%</p>
                    <p className="text-xs text-muted-foreground">Annual increase in municipal energy demand</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                {solution.title}
              </CardTitle>
              <CardDescription>
                An innovative approach to energy optimization without extensive IoT infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{solution.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {solution.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">Implementation Framework</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm font-medium">Data Integration</p>
                    <p className="text-xs text-muted-foreground">Connect public data sources</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm font-medium">AI Analysis</p>
                    <p className="text-xs text-muted-foreground">Pattern recognition & optimization</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm font-medium">Recommendation</p>
                    <p className="text-xs text-muted-foreground">Actionable optimization steps</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <span className="font-bold text-primary">4</span>
                    </div>
                    <p className="text-sm font-medium">Implementation</p>
                    <p className="text-xs text-muted-foreground">Execution & monitoring</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Architecture</CardTitle>
              <CardDescription>System components and data flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  The Grid Genius architecture consists of data integration layers, AI processing modules,
                  recommendation engines, and user interfaces for municipal administrators.
                </p>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Technical Architecture Diagram
                </Button>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Data Sources
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Weather APIs</li>
                    <li>• Traffic monitoring systems</li>
                    <li>• Building management systems</li>
                    <li>• Historical energy consumption</li>
                    <li>• Public transportation schedules</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    AI Processing
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Pattern recognition algorithms</li>
                    <li>• Predictive modeling</li>
                    <li>• Anomaly detection</li>
                    <li>• Optimization algorithms</li>
                    <li>• Machine learning models</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    User Interfaces
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Administrative dashboard</li>
                    <li>• Recommendation management</li>
                    <li>• Public reporting portal</li>
                    <li>• Analytics visualization</li>
                    <li>• Implementation tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="papers" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {researchPapers.map((paper) => (
              <Card
                key={paper.id}
                className={`cursor-pointer transition-all ${selectedPaper.id === paper.id ? "border-primary" : ""}`}
                onClick={() => setSelectedPaper(paper)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{paper.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {paper.authors.join(", ")} • {paper.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-xs text-muted-foreground line-clamp-3">{paper.abstract}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="text-xs">
                    Citations: {paper.citations}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {paper.institution}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedPaper.title}</CardTitle>
                  <CardDescription>
                    {selectedPaper.authors.join(", ")} • {selectedPaper.institution} • {selectedPaper.year}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    DOI: {selectedPaper.doi}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Abstract</h3>
                  <p className="text-sm text-muted-foreground">{selectedPaper.abstract}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPaper.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedPaper.sections.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Paper Content</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-1 border-r pr-4">
                        <div className="sticky top-4">
                          <h4 className="text-sm font-medium mb-2">Sections</h4>
                          <ul className="space-y-1">
                            {selectedPaper.sections.map((section, index) => (
                              <li key={index}>
                                <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-auto py-1">
                                  {section.title}
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <ScrollArea className="h-[500px] pr-4">
                          {selectedPaper.sections.map((section, index) => (
                            <div key={index} className="mb-6">
                              <h4 className="text-lg font-medium mb-2">{section.title}</h4>
                              <div className="text-sm text-muted-foreground whitespace-pre-line">{section.content}</div>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaper.sections.length === 0 && (
                  <div className="p-8 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Full Paper Content</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The complete content of this research paper is available for download.
                    </p>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Paper
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

