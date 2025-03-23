import { WeatherData, TrafficData, EnergyData, AIRecommendation, CitizenReport, StreetlightZone, TrafficSignal, BuildingSystem, SystemStatus, AIFunction } from '../types';
import { addHours, subDays } from 'date-fns';

// AI Functions simulation
export const aiFunctions: AIFunction[] = [
  { id: '1', name: 'Predictive Load Balancing', status: 'active', lastExecuted: new Date(), successRate: 99.2 },
  { id: '2', name: 'Weather Pattern Analysis', status: 'active', lastExecuted: new Date(), successRate: 98.7 },
  { id: '3', name: 'Traffic Flow Optimization', status: 'active', lastExecuted: new Date(), successRate: 97.5 },
  { id: '4', name: 'Energy Distribution Control', status: 'active', lastExecuted: new Date(), successRate: 99.8 },
  { id: '5', name: 'Grid Stability Monitor', status: 'active', lastExecuted: new Date(), successRate: 99.9 },
  { id: '6', name: 'Emergency Response Protocol', status: 'standby', lastExecuted: new Date(), successRate: 100 },
  { id: '7', name: 'Peak Load Prediction', status: 'active', lastExecuted: new Date(), successRate: 98.1 },
  { id: '8', name: 'Maintenance Schedule Optimization', status: 'active', lastExecuted: new Date(), successRate: 97.8 },
  { id: '9', name: 'Resource Allocation Algorithm', status: 'active', lastExecuted: new Date(), successRate: 98.4 },
  { id: '10', name: 'Fault Detection System', status: 'active', lastExecuted: new Date(), successRate: 99.6 },
  { id: '11', name: 'Power Quality Analysis', status: 'active', lastExecuted: new Date(), successRate: 99.3 },
  { id: '12', name: 'Demand Response Management', status: 'active', lastExecuted: new Date(), successRate: 98.9 },
  { id: '13', name: 'Grid Security Monitor', status: 'active', lastExecuted: new Date(), successRate: 99.7 },
  { id: '14', name: 'Renewable Integration Control', status: 'active', lastExecuted: new Date(), successRate: 97.2 },
  { id: '15', name: 'Asset Performance Tracking', status: 'active', lastExecuted: new Date(), successRate: 98.5 },
  { id: '16', name: 'Outage Prevention System', status: 'active', lastExecuted: new Date(), successRate: 99.4 },
  { id: '17', name: 'Load Forecasting Engine', status: 'active', lastExecuted: new Date(), successRate: 98.2 },
  { id: '18', name: 'Network Configuration Optimizer', status: 'active', lastExecuted: new Date(), successRate: 97.9 },
  { id: '19', name: 'Voltage Regulation System', status: 'active', lastExecuted: new Date(), successRate: 99.1 },
  { id: '20', name: 'Power Factor Correction', status: 'active', lastExecuted: new Date(), successRate: 98.8 },
  { id: '21', name: 'Energy Storage Management', status: 'active', lastExecuted: new Date(), successRate: 98.6 },
  { id: '22', name: 'Grid Topology Analyzer', status: 'active', lastExecuted: new Date(), successRate: 97.4 },
  { id: '23', name: 'Harmonic Distortion Control', status: 'active', lastExecuted: new Date(), successRate: 98.3 },
  { id: '24', name: 'Phase Balance Monitor', status: 'active', lastExecuted: new Date(), successRate: 99.0 },
  { id: '25', name: 'Reliability Assessment System', status: 'active', lastExecuted: new Date(), successRate: 98.7 },
  { id: '26', name: 'Circuit Breaker Coordination', status: 'active', lastExecuted: new Date(), successRate: 99.5 },
  { id: '27', name: 'Power Quality Improvement', status: 'active', lastExecuted: new Date(), successRate: 98.0 },
  { id: '28', name: 'System Protection Coordination', status: 'active', lastExecuted: new Date(), successRate: 99.2 }
];

// Generate mock historical data with accelerated time
export const generateHistoricalData = (days: number): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const timestamp = subDays(addHours(now, -i), days);
    const hour = timestamp.getHours();
    
    // Simulate daily patterns
    const baseConsumption = hour >= 18 || hour <= 6 ? 100 : 50;
    const randomVariation = Math.random() * 20 - 10;
    
    data.push({
      consumption: baseConsumption + randomVariation,
      timestamp,
      source: 'streetlights'
    });
  }
  
  return data;
};

export const currentWeather: WeatherData = {
  temperature: 22,
  condition: 'clear',
  sunlight: 85,
  windSpeed: 12
};

export const trafficStatus: TrafficData = {
  congestionLevel: 65,
  peakHours: true,
  vehicleCount: 1200
};

export const streetlightZones: StreetlightZone[] = [
  {
    id: '1',
    name: 'Downtown Zone',
    status: 'dimmed',
    brightness: 70,
    powerConsumption: 2.5,
    schedule: { start: '18:00', end: '06:00' },
    autoMode: true,
    activeUnits: 342,
    totalUnits: 400
  },
  {
    id: '2',
    name: 'Residential Area',
    status: 'on',
    brightness: 100,
    powerConsumption: 1.8,
    schedule: { start: '19:00', end: '05:00' },
    autoMode: true,
    activeUnits: 287,
    totalUnits: 300
  },
  {
    id: '3',
    name: 'Industrial Park',
    status: 'off',
    brightness: 0,
    powerConsumption: 0,
    schedule: { start: '17:00', end: '07:00' },
    autoMode: false,
    activeUnits: 358,
    totalUnits: 400
  }
];

export const trafficSignals: TrafficSignal[] = [
  {
    id: '1',
    intersection: 'Main St & 5th Ave',
    status: 'green',
    timing: 45,
    autoMode: true,
    congestionLevel: 75,
    activeUnits: 12,
    totalUnits: 12
  },
  {
    id: '2',
    intersection: 'Broadway & Park Rd',
    status: 'red',
    timing: 30,
    autoMode: true,
    congestionLevel: 45,
    activeUnits: 8,
    totalUnits: 8
  }
];

export const buildings: BuildingSystem[] = [
  {
    id: '1',
    name: 'City Hall',
    type: 'hvac',
    status: 'optimized',
    powerConsumption: 45.2,
    efficiency: 85,
    autoMode: true,
    activeUnits: 24,
    totalUnits: 24
  },
  {
    id: '2',
    name: 'Public Library',
    type: 'lighting',
    status: 'active',
    powerConsumption: 28.7,
    efficiency: 92,
    autoMode: true,
    activeUnits: 18,
    totalUnits: 20
  }
];

export const systemStatus: SystemStatus = {
  voltage: 220,
  current: 15.5,
  power: 3410,
  frequency: 50,
  totalDevices: 1164,
  activeDevices: 1049,
  systemLoad: 78,
  gridStability: 99.9
};

export const aiRecommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'Optimize Streetlight Schedule',
    description: 'Based on current clear weather patterns, reducing streetlight intensity by 20% between 1 AM and 4 AM could save significant energy without compromising safety.',
    potentialSavings: 15000,
    priority: 'high',
    category: 'streetlights',
    confidence: 98.5
  },
  {
    id: '2',
    title: 'Traffic Signal Timing Adjustment',
    description: 'Current traffic patterns suggest optimizing signal timing during off-peak hours could reduce energy consumption and improve flow.',
    potentialSavings: 8000,
    priority: 'medium',
    category: 'traffic',
    confidence: 97.8
  },
  {
    id: '3',
    title: 'Building HVAC Scheduling',
    description: 'Historical data shows potential for 15% energy savings by adjusting public building HVAC schedules based on occupancy patterns.',
    potentialSavings: 25000,
    priority: 'high',
    category: 'buildings',
    confidence: 99.2
  }
];

export const citizenReports: CitizenReport[] = [
  {
    id: '1',
    type: 'wastage',
    description: 'Streetlights still on at 8 AM on Main Street',
    location: 'Main Street',
    timestamp: new Date(),
    status: 'pending',
    aiResponse: 'Analyzing pattern and adjusting schedule'
  },
  {
    id: '2',
    type: 'improvement',
    description: 'Traffic lights could be synchronized better on 5th Avenue',
    location: '5th Avenue',
    timestamp: subDays(new Date(), 1),
    status: 'reviewed',
    aiResponse: 'Implementation of new timing pattern scheduled'
  }
];