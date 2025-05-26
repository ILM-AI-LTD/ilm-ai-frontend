'use client';

import React from 'react';
import ReactFlow, { Background, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { Battery, Flame, GaugeCircle, Sun, Waves, Zap } from 'lucide-react';

const CustomButtonNode = ({ data }: any) => {
  const isLeft = data.position === 'left';
  const isCenter = data.position === 'center';
  return (
    <div className="flex flex-col items-center text-white">
      <div className="relative bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center shadow-md">
        {data.icon}
        {isLeft && <Handle type="target" position={Position.Right} className="bg-cyan-500 w-2 h-2 rounded-full" />}
        {isLeft && <Handle type="source" position={Position.Left} className="bg-cyan-500 w-2 h-2 rounded-full" />}
        {isCenter && <Handle type="target" position={Position.Top} className="bg-cyan-500 w-2 h-2 rounded-full" />}
        {isCenter && <Handle type="source" position={Position.Bottom} className="bg-cyan-500 w-2 h-2 rounded-full" />}
      </div>
      <div className="mt-2 text-xs text-center max-w-[120px]">{data.label}</div>
    </div>
  );
};

const nodeTypes = {
  buttonNode: CustomButtonNode,
};

const nodes = [
  { id: 'energy', type: 'buttonNode', data: { label: 'ENERGY\n10%', icon: <Zap size={20} />, position: 'center' }, position: { x: 400, y: 0 } },

  { id: '1', type: 'buttonNode', data: { label: 'Energy Stores And Systems', icon: <Battery size={20} />, position: 'left' }, position: { x: 200, y: 150 } },
  { id: '2', type: 'buttonNode', data: { label: 'Kinetic And Potential Energy Stores', icon: <GaugeCircle size={20} />, position: 'center' }, position: { x: 400, y: 150 } },

  { id: '3', type: 'buttonNode', data: { label: 'Specific Heat Capacity', icon: <Flame size={20} />, position: 'left' }, position: { x: 200, y: 300 } },
  { id: '4', type: 'buttonNode', data: { label: 'Conservation Of Energy And Power', icon: <Sun size={20} />, position: 'center' }, position: { x: 400, y: 300 } },

  { id: '5', type: 'buttonNode', data: { label: 'Conduction And Convection', icon: <Battery size={20} />, position: 'left' }, position: { x: 200, y: 450 } },
  { id: '6', type: 'buttonNode', data: { label: 'Reducing Unwanted Energy Transfers', icon: <GaugeCircle size={20} />, position: 'center' }, position: { x: 400, y: 450 } },

  { id: '7', type: 'buttonNode', data: { label: 'Efficiency', icon: <Zap size={20} />, position: 'left' }, position: { x: 200, y: 600 } },
  { id: '8', type: 'buttonNode', data: { label: 'Energy Resources And Their Uses', icon: <Sun size={20} />, position: 'center' }, position: { x: 400, y: 600 } },

  { id: '9', type: 'buttonNode', data: { label: 'Wind, Solar, And Geothermal', icon: <Sun size={20} />, position: 'left' }, position: { x: 200, y: 750 } },
  { id: '10', type: 'buttonNode', data: { label: 'Hydro-Electricity, Waves, And Tides', icon: <Waves size={20} />, position: 'center' }, position: { x: 400, y: 750 } },

  { id: '11', type: 'buttonNode', data: { label: 'Bio-Fuels And Non-Renewables', icon: <Flame size={20} />, position: 'left' }, position: { x: 200, y: 900 } },
  { id: '12', type: 'buttonNode', data: { label: 'Trends In Energy Resource Use', icon: <GaugeCircle size={20} />, position: 'center' }, position: { x: 400, y: 900 } },
];

const edges = [
  { id: 'e0-1', source: 'energy', target: '1' },
  { id: 'e0-2', source: 'energy', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e10-11', source: '10', target: '11' },
  { id: 'e10-12', source: '10', target: '12' },
];

export default function EnergyFlowDiagram() {
  return (
    <div style={{ height: '100vh', width: '100%' }} className="bg-[#0f172a]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      >
      </ReactFlow>
    </div>
  );
}
