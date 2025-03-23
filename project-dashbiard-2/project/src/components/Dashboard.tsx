import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { 
  AlertTriangle, 
  Brain, 
  Wind, 
  ThermometerSun, 
  Car, 
  Cpu, 
  Activity,
  Zap,
  Building,
  AlertCircle,
  Terminal,
  Server
} from 'lucide-react';
import {
  generateHistoricalData,
  currentWeather,
  trafficStatus,
  aiRecommendations,
  citizenReports,
  streetlightZones,
  trafficSignals,
  buildings,
  systemStatus,
  aiFunctions
} from '../data/mockData';
import CircuitBoard from './CircuitBoard';
import SystemControls from './SystemControls';
import type { StreetlightZone, TrafficSignal, BuildingSystem, AIFunction } from '../types';

const AIFunctionCard: React.FC<{ func: AIFunction }> = ({ func }) => (
  <div className="bg-gray-700 rounded-lg p-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-300">{func.name}</span>
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${
          func.status === 'active' ? 'bg-green-400' :
          func.status === 'standby' ? 'bg-yellow-400' :
          'bg-red-400'
        } mr-2`}></div>
        <span className="text-xs text-gray-400">{func.successRate}%</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [energyData, setEnergyData] = useState(generateHistoricalData(7));
  const [systems, setSystems] = useState({
    streetlights: true,
    traffic: true,
    buildings: true
  });

  const [localStreetlights, setLocalStreetlights] = useState(streetlightZones);
  const [localTrafficSignals, setLocalTrafficSignals] = useState(trafficSignals);
  const [localBuildings, setLocalBuildings] = useState(buildings);
  const [localSystemStatus, setLocalSystemStatus] = useState(systemStatus);
  const [aiStatus, setAiStatus] = useState({
    status: 'Operational',
    confidence: 98,
    lastDecision: 'Optimizing streetlight patterns based on weather forecast',
    activeOptimizations: 3,
    incidentsPrevented: 12,
    energySaved: 2450,
    processingLoad: 78,
    activeProcesses: 1049,
    totalProcesses: 1164
  });

  const [aiLog, setAiLog] = useState<string[]>([
    'Initializing AI core systems...',
    'Loading optimization algorithms...',
    'Connecting to city infrastructure...',
    'Beginning real-time monitoring...'
  ]);

  // Simulate AI making autonomous decisions
  useEffect(() => {
    const interval = setInterval(() => {
      // Update AI status
      setAiStatus(prev => ({
        ...prev,
        confidence: Math.min(99.9, prev.confidence + (Math.random() * 2 - 1)),
        activeOptimizations: Math.min(28, prev.activeOptimizations + (Math.random() > 0.8 ? 1 : 0)),
        incidentsPrevented: prev.incidentsPrevented + (Math.random() > 0.9 ? 1 : 0),
        energySaved: prev.energySaved + Math.random() * 10,
        processingLoad: Math.min(95, Math.max(65, prev.processingLoad + (Math.random() * 10 - 5))),
        activeProcesses: Math.min(prev.totalProcesses, prev.activeProcesses + (Math.random() > 0.7 ? 1 : -1))
      }));

      // Update system status
      setLocalSystemStatus(prev => ({
        ...prev,
        voltage: Math.max(210, Math.min(230, prev.voltage + (Math.random() * 4 - 2))),
        current: Math.max(10, Math.min(20, prev.current + (Math.random() * 2 - 1))),
        power: Math.max(3000, Math.min(4000, prev.power + (Math.random() * 100 - 50))),
        systemLoad: Math.max(60, Math.min(90, prev.systemLoad + (Math.random() * 10 - 5)))
      }));

      // Add new AI log entry
      const newLogEntry = [
        'Adjusting power distribution across sectors...',
        'Optimizing traffic flow patterns...',
        'Analyzing weather impact on energy consumption...',
        'Implementing predictive maintenance protocols...',
        'Balancing grid load distribution...',
        'Monitoring system stability...',
        'Updating energy efficiency algorithms...',
        'Processing citizen feedback...',
        'Calculating optimal resource allocation...',
        'Evaluating system performance metrics...'
      ][Math.floor(Math.random() * 10)];

      setAiLog(prev => [...prev.slice(-9), newLogEntry]);

      // Update energy data
      setEnergyData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        const newConsumption = Math.max(30, Math.min(120, lastEntry.consumption + (Math.random() * 20 - 10)));
        newData.push({
          consumption: newConsumption,
          timestamp: new Date(lastEntry.timestamp.getTime() + 3000), // 3 seconds = 1 hour in simulation
          source: 'streetlights'
        });
        return newData.slice(-168); // Keep last 7 days of data
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSystemToggle = (system: string) => {
    setSystems(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  const handleStreetlightUpdate = (id: string, updates: Partial<StreetlightZone>) => {
    setLocalStreetlights(prev =>
      prev.map(light =>
        light.id === id ? { ...light, ...updates } : light
      )
    );
  };

  const handleTrafficSignalUpdate = (id: string, updates: Partial<TrafficSignal>) => {
    setLocalTrafficSignals(prev =>
      prev.map(signal =>
        signal.id === id ? { ...signal, ...updates } : signal
      )
    );
  };

  const handleBuildingUpdate = (id: string, updates: Partial<BuildingSystem>) => {
    setLocalBuildings(prev =>
      prev.map(building =>
        building.id === id ? { ...building, ...updates } : building
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-400" />
              <h1 className="ml-2 text-xl font-bold text-white">AI City Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Cpu className="h-5 w-5 text-green-400 animate-pulse" />
                <span className="ml-2 text-green-400">AI Active</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-blue-400" />
                <span className="ml-2 text-blue-400">{aiStatus.confidence.toFixed(1)}% Confidence</span>
              </div>
              <div className="flex items-center">
                <Server className="h-5 w-5 text-purple-400" />
                <span className="ml-2 text-purple-400">{aiStatus.processingLoad}% Load</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Status Dashboard */}
        <div className="mb-8 bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-300">AI Core Status</h3>
                <Brain className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{aiStatus.status}</p>
              <p className="text-sm text-gray-400 mt-1">
                Active Processes: {aiStatus.activeProcesses}/{aiStatus.totalProcesses}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-300">Active Optimizations</h3>
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{aiStatus.activeOptimizations}</p>
              <p className="text-sm text-gray-400 mt-1">Running Functions</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-300">Incidents Prevented</h3>
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{aiStatus.incidentsPrevented}</p>
              <p className="text-sm text-gray-400 mt-1">Last 24 hours</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-300">Energy Saved</h3>
                <Building className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{aiStatus.energySaved.toFixed(1)} kWh</p>
              <p className="text-sm text-gray-400 mt-1">Today</p>
            </div>
          </div>

          {/* AI Functions Grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {aiFunctions.slice(0, 8).map(func => (
              <AIFunctionCard key={func.id} func={func} />
            ))}
          </div>

          {/* AI Log Terminal */}
          <div className="mt-6 bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center mb-2">
              <Terminal className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-400">AI System Log</span>
            </div>
            <div className="space-y-1">
              {aiLog.map((log, index) => (
                <div key={index} className="text-gray-400">
                  <span className="text-green-400">[{format(new Date(), 'HH:mm:ss')}]</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Circuit Board Simulation */}
        <div className="mb-8">
          <CircuitBoard
            systems={systems}
            onToggle={handleSystemToggle}
          />
        </div>

        {/* System Controls */}
        <div className="mb-8">
          <SystemControls
            streetlights={localStreetlights}
            trafficSignals={localTrafficSignals}
            buildings={localBuildings}
            systemStatus={localSystemStatus}
            onUpdateStreetlight={handleStreetlightUpdate}
            onUpdateTrafficSignal={handleTrafficSignalUpdate}
            onUpdateBuilding={handleBuildingUpdate}
          />
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <ThermometerSun className="h-6 w-6 text-blue-400" />
              <h2 className="ml-2 text-lg font-semibold text-white">Environmental Analysis</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Temperature: {currentWeather.temperature}°C</p>
              <p className="text-gray-300">Condition: {currentWeather.condition}</p>
              <p className="text-gray-300">Sunlight: {currentWeather.sunlight}%</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <Car className="h-6 w-6 text-orange-400" />
              <h2 className="ml-2 text-lg font-semibold text-white">Traffic Analysis</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Congestion: {trafficStatus.congestionLevel}%</p>
              <p className="text-gray-300">Vehicle Count: {trafficStatus.vehicleCount}</p>
              <p className="text-gray-300">Peak Hours: {trafficStatus.peakHours ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <Wind className="h-6 w-6 text-green-400" />
              <h2 className="ml-2 text-lg font-semibold text-white">Resource Optimization</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Current Usage: {energyData[energyData.length - 1].consumption.toFixed(1)} kWh</p>
              <p className="text-gray-300">Daily Average: {(energyData.reduce((acc, curr) => acc + curr.consumption, 0) / energyData.length).toFixed(1)} kWh</p>
            </div>
          </div>
        </div>

        {/* Energy Consumption Chart */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-white">Energy Optimization Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd HH:mm')}
                  stroke="#9CA3AF"
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  labelFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd HH:mm')}
                  formatter={(value) => [`${value} kWh`, 'Consumption']}
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line type="monotone" dataKey="consumption" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations and Incident Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-white">AI Recommendations</h2>
            <div className="space-y-4">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-white">{rec.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{rec.description}</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-400 font-medium">Potential Savings: ₹{rec.potentialSavings.toLocaleString()}</span>
                    <span className={`ml-4 px-2 py-1 rounded-full text-xs ${
                      rec.priority === 'high'
                        ? 'bg-red-900 text-red-200'
                        : rec.priority === 'medium'
                        ? 'bg-yellow-900 text-yellow-200'
                        : 'bg-green-900 text-green-200'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    <span className="ml-4 text-blue-400">
                      {rec.confidence}% Confidence
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-white">Incident Reports</h2>
            <div className="space-y-4">
              {citizenReports.map((report) => (
                <div key={report.id} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg">
                  <AlertTriangle className={`h-5 w-5 ${
                    report.type === 'wastage' ? 'text-red-400' : 'text-blue-400'
                  }`} />
                  <div>
                    <p className="text-white">{report.description}</p>
                    <p className="text-sm text-blue-400 mt-1">AI Response: {report.aiResponse}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-400">
                      <span>{report.location}</span>
                      <span className="mx-2">•</span>
                      <span>{format(new Date(report.timestamp), 'MMM dd, HH:mm')}</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        report.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                        report.status === 'reviewed' ? 'bg-blue-900 text-blue-200' :
                        'bg-green-900 text-green-200'
                      }`}>
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;