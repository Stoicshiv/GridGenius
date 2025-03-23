export interface WeatherData {
  temperature: number;
  condition: 'clear' | 'cloudy' | 'rainy';
  sunlight: number;
  windSpeed: number;
}

export interface TrafficData {
  congestionLevel: number;
  peakHours: boolean;
  vehicleCount: number;
}

export interface EnergyData {
  consumption: number;
  timestamp: Date;
  source: 'streetlights' | 'buildings' | 'traffic';
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  priority: 'high' | 'medium' | 'low';
  category: 'streetlights' | 'buildings' | 'traffic';
  confidence: number;
}

export interface CitizenReport {
  id: string;
  type: 'wastage' | 'improvement';
  description: string;
  location: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'implemented';
  aiResponse: string;
}

export interface StreetlightZone {
  id: string;
  name: string;
  status: 'on' | 'off' | 'dimmed';
  brightness: number;
  powerConsumption: number;
  schedule: {
    start: string;
    end: string;
  };
  autoMode: boolean;
  activeUnits: number;
  totalUnits: number;
}

export interface TrafficSignal {
  id: string;
  intersection: string;
  status: 'red' | 'yellow' | 'green';
  timing: number;
  autoMode: boolean;
  congestionLevel: number;
  activeUnits: number;
  totalUnits: number;
}

export interface BuildingSystem {
  id: string;
  name: string;
  type: 'hvac' | 'lighting' | 'elevator';
  status: 'active' | 'inactive' | 'optimized';
  powerConsumption: number;
  efficiency: number;
  autoMode: boolean;
  activeUnits: number;
  totalUnits: number;
}

export interface SystemStatus {
  voltage: number;
  current: number;
  power: number;
  frequency: number;
  totalDevices: number;
  activeDevices: number;
  systemLoad: number;
  gridStability: number;
}

export interface AIFunction {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'error';
  lastExecuted: Date;
  successRate: number;
}