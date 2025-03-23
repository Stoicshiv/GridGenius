import React from 'react';
import { Sun, Moon, Gauge, Battery } from 'lucide-react';
import type { StreetlightZone, TrafficSignal, BuildingSystem, SystemStatus } from '../types';

interface ControlSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
}

const ControlSlider: React.FC<ControlSliderProps> = ({ value, onChange, label, min = 0, max = 100 }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <span className="text-xs text-gray-500">{value}%</span>
  </div>
);

interface StatusDisplayProps {
  status: SystemStatus;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => (
  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-2">
      <Battery className="w-4 h-4 text-blue-500" />
      <div>
        <p className="text-xs text-gray-500">Voltage</p>
        <p className="font-medium">{status.voltage}V</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Gauge className="w-4 h-4 text-green-500" />
      <div>
        <p className="text-xs text-gray-500">Current</p>
        <p className="font-medium">{status.current}A</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Sun className="w-4 h-4 text-yellow-500" />
      <div>
        <p className="text-xs text-gray-500">Power</p>
        <p className="font-medium">{status.power}W</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Moon className="w-4 h-4 text-purple-500" />
      <div>
        <p className="text-xs text-gray-500">Frequency</p>
        <p className="font-medium">{status.frequency}Hz</p>
      </div>
    </div>
  </div>
);

interface SystemControlsProps {
  streetlights: StreetlightZone[];
  trafficSignals: TrafficSignal[];
  buildings: BuildingSystem[];
  systemStatus: SystemStatus;
  onUpdateStreetlight: (id: string, updates: Partial<StreetlightZone>) => void;
  onUpdateTrafficSignal: (id: string, updates: Partial<TrafficSignal>) => void;
  onUpdateBuilding: (id: string, updates: Partial<BuildingSystem>) => void;
}

const SystemControls: React.FC<SystemControlsProps> = ({
  streetlights,
  trafficSignals,
  buildings,
  systemStatus,
  onUpdateStreetlight,
  onUpdateTrafficSignal,
  onUpdateBuilding,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Streetlight Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Streetlight Controls</h3>
        {streetlights.map((zone) => (
          <div key={zone.id} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">{zone.name}</h4>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={zone.autoMode}
                    onChange={(e) => onUpdateStreetlight(zone.id, { autoMode: e.target.checked })}
                  />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                  <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
                    zone.autoMode ? 'transform translate-x-full bg-green-500' : ''
                  }`}></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">Auto</span>
              </label>
            </div>
            <ControlSlider
              value={zone.brightness}
              onChange={(value) => onUpdateStreetlight(zone.id, { brightness: value })}
              label="Brightness"
            />
          </div>
        ))}
      </div>

      {/* Traffic Signal Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Traffic Signal Controls</h3>
        {trafficSignals.map((signal) => (
          <div key={signal.id} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">{signal.intersection}</h4>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={signal.autoMode}
                    onChange={(e) => onUpdateTrafficSignal(signal.id, { autoMode: e.target.checked })}
                  />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                  <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
                    signal.autoMode ? 'transform translate-x-full bg-green-500' : ''
                  }`}></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">Auto</span>
              </label>
            </div>
            <ControlSlider
              value={signal.timing}
              onChange={(value) => onUpdateTrafficSignal(signal.id, { timing: value })}
              label="Timing (seconds)"
              max={120}
            />
          </div>
        ))}
      </div>

      {/* Building Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Building Controls</h3>
        {buildings.map((building) => (
          <div key={building.id} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">{building.name}</h4>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={building.autoMode}
                    onChange={(e) => onUpdateBuilding(building.id, { autoMode: e.target.checked })}
                  />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                  <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
                    building.autoMode ? 'transform translate-x-full bg-green-500' : ''
                  }`}></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">Auto</span>
              </label>
            </div>
            <ControlSlider
              value={building.efficiency}
              onChange={(value) => onUpdateBuilding(building.id, { efficiency: value })}
              label="Energy Efficiency"
            />
          </div>
        ))}
      </div>

      {/* System Status Display */}
      <div className="lg:col-span-3">
        <StatusDisplay status={systemStatus} />
      </div>
    </div>
  );
};

export default SystemControls;