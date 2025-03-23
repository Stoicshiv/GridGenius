import React from 'react';
import { clsx } from 'clsx';
import { Power, Zap } from 'lucide-react';

interface CircuitLineProps {
  active: boolean;
  direction?: 'horizontal' | 'vertical' | 'corner-tr' | 'corner-tl' | 'corner-br' | 'corner-bl';
}

const CircuitLine: React.FC<CircuitLineProps> = ({ active, direction = 'horizontal' }) => {
  return (
    <div
      className={clsx(
        'transition-colors duration-300',
        {
          'horizontal': 'h-0.5 w-full',
          'vertical': 'w-0.5 h-full',
          'corner-tr': 'w-1/2 h-1/2 border-t border-r',
          'corner-tl': 'w-1/2 h-1/2 border-t border-l',
          'corner-br': 'w-1/2 h-1/2 border-b border-r',
          'corner-bl': 'w-1/2 h-1/2 border-b border-l',
        }[direction],
        active ? 'bg-green-500 border-green-500' : 'bg-gray-300 border-gray-300'
      )}
    />
  );
};

interface CircuitNodeProps {
  active: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
}

const CircuitNode: React.FC<CircuitNodeProps> = ({ active, onClick, icon, label }) => {
  return (
    <div className="relative" onClick={onClick}>
      <div
        className={clsx(
          'w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300',
          active ? 'bg-green-500' : 'bg-gray-300'
        )}
      >
        {icon}
      </div>
      {label && (
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};

interface CircuitBoardProps {
  systems: {
    streetlights: boolean;
    traffic: boolean;
    buildings: boolean;
  };
  onToggle: (system: string) => void;
}

const CircuitBoard: React.FC<CircuitBoardProps> = ({ systems, onToggle }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-8">System Control Circuit</h2>
      <div className="relative h-64 flex items-center justify-center">
        {/* Main Power Node */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <CircuitNode
            active={Object.values(systems).some(Boolean)}
            icon={<Power className="w-4 h-4 text-white" />}
            label="Main Power"
          />
        </div>

        {/* Distribution Lines */}
        <div className="absolute left-14 top-1/2 w-24 transform -translate-y-1/2">
          <CircuitLine active={Object.values(systems).some(Boolean)} />
        </div>

        {/* Subsystem Nodes */}
        <div className="grid grid-cols-3 gap-24">
          {/* Streetlights */}
          <div className="flex flex-col items-center">
            <CircuitNode
              active={systems.streetlights}
              onClick={() => onToggle('streetlights')}
              icon={<Zap className="w-4 h-4 text-white" />}
              label="Streetlights"
            />
            <div className="h-12 mt-2">
              <CircuitLine active={systems.streetlights} direction="vertical" />
            </div>
          </div>

          {/* Traffic Signals */}
          <div className="flex flex-col items-center">
            <CircuitNode
              active={systems.traffic}
              onClick={() => onToggle('traffic')}
              icon={<Zap className="w-4 h-4 text-white" />}
              label="Traffic Signals"
            />
            <div className="h-12 mt-2">
              <CircuitLine active={systems.traffic} direction="vertical" />
            </div>
          </div>

          {/* Buildings */}
          <div className="flex flex-col items-center">
            <CircuitNode
              active={systems.buildings}
              onClick={() => onToggle('buildings')}
              icon={<Zap className="w-4 h-4 text-white" />}
              label="Buildings"
            />
            <div className="h-12 mt-2">
              <CircuitLine active={systems.buildings} direction="vertical" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitBoard;