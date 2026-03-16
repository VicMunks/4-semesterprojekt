import type { ElementType } from 'react';
import { Warehouse, Truck, Wrench, Wifi, WifiOff, Activity } from 'lucide-react';
import { useProduction } from '../../context/ProductionContext';
import type { Machine } from '../../types/production';

const machineIcons: Record<Machine['type'], ElementType> = {
  warehouse: Warehouse,
  agv:       Truck,
  assembly:  Wrench,
};

function machineStateColor(state: Machine['state']): string {
  switch (state) {
    case 'idle':    return 'bg-zinc-700/40 border-zinc-700 text-zinc-400';
    case 'working': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    case 'error':   return 'bg-red-500/20 border-red-500/30 text-red-400';
    case 'offline': return 'bg-zinc-800/40 border-zinc-800 text-zinc-600';
  }
}

function MachineCard({ machine }: { machine: Machine }) {
  const Icon = machineIcons[machine.type];
  const isConnected = machine.status === 'connected';

  return (
    <div className="rounded-xl p-6 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-zinc-800">
            <Icon size={22} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">{machine.name}</h3>
            <p className="text-sm text-zinc-400 font-mono">{machine.id}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${
          isConnected
            ? 'bg-green-500/20 border-green-500/30 text-green-400'
            : 'bg-red-500/20 border-red-500/30 text-red-400'
        }`}>
          {isConnected ? <Wifi size={11} /> : <WifiOff size={11} />}
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {/* Status */}
      <div className="rounded-lg p-4 bg-zinc-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Machine State</span>
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${machineStateColor(machine.state)}`}>
            <Activity size={10} />
            {machine.state.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Current Task</span>
          <span className="text-sm text-white">{machine.currentTask}</span>
        </div>
      </div>
    </div>
  );
}

export function OperatorMachinesPage() {
  const { machines } = useProduction();

  const warehouseMachines = machines.filter(m => m.type === 'warehouse');
  const agvMachines       = machines.filter(m => m.type === 'agv');
  const assemblyMachines  = machines.filter(m => m.type === 'assembly');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Machine Status</h1>
        <p className="text-zinc-400 text-sm mt-1">Real-time monitoring of production equipment</p>
      </div>

      {/* Warehouse */}
      <section>
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Warehouse size={16} className="text-blue-400" />
          Warehouse System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warehouseMachines.map(m => <MachineCard key={m.id} machine={m} />)}
        </div>
      </section>

      {/* AGV */}
      <section>
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Truck size={16} className="text-blue-400" />
          AGV Transport System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agvMachines.map(m => <MachineCard key={m.id} machine={m} />)}
        </div>
      </section>

      {/* Assembly */}
      <section>
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Wrench size={16} className="text-blue-400" />
          Assembly Station
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assemblyMachines.map(m => <MachineCard key={m.id} machine={m} />)}
        </div>
      </section>

      {/* System overview */}
      <div className="rounded-xl p-6 bg-zinc-900 border border-zinc-800">
        <h2 className="text-base font-semibold text-white mb-4">System Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg p-4 text-center bg-zinc-800">
            <p className="text-3xl font-bold text-blue-400">
              {machines.filter(m => m.status === 'connected').length}
            </p>
            <p className="text-sm text-zinc-400 mt-1">Connected</p>
          </div>
          <div className="rounded-lg p-4 text-center bg-zinc-800">
            <p className="text-3xl font-bold text-green-400">
              {machines.filter(m => m.state === 'working').length}
            </p>
            <p className="text-sm text-zinc-400 mt-1">Active</p>
          </div>
          <div className="rounded-lg p-4 text-center bg-zinc-800">
            <p className="text-3xl font-bold text-red-400">
              {machines.filter(m => m.state === 'error').length}
            </p>
            <p className="text-sm text-zinc-400 mt-1">Errors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
