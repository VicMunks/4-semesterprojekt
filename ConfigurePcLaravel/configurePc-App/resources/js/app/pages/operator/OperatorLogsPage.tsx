import { useState } from 'react';
import type { ElementType } from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle, Filter } from 'lucide-react';
import { useProduction } from '../../context/ProductionContext';
import type { LogLevel } from '../../types/production';

const logIcons: Record<LogLevel, ElementType> = {
  info:    Info,
  warning: AlertTriangle,
  error:   XCircle,
  success: CheckCircle,
};

const logColors: Record<LogLevel, string> = {
  info:    'bg-blue-500/20 border-blue-500/30 text-blue-400',
  warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
  error:   'bg-red-500/20 border-red-500/30 text-red-400',
  success: 'bg-green-500/20 border-green-500/30 text-green-400',
};

export function OperatorLogsPage() {
  const { logs } = useProduction();
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');

  const filteredLogs = filter === 'all' ? logs : logs.filter(l => l.level === filter);

  const counts = {
    info:    logs.filter(l => l.level === 'info').length,
    warning: logs.filter(l => l.level === 'warning').length,
    error:   logs.filter(l => l.level === 'error').length,
    success: logs.filter(l => l.level === 'success').length,
  };

  const statCards: Array<{ level: LogLevel | 'total'; label: string; count: number; color: string; icon: ElementType }> = [
    { level: 'total',   label: 'Total Logs', count: logs.length,      color: 'text-white',       icon: Filter },
    { level: 'info',    label: 'Info',       count: counts.info,      color: 'text-blue-400',    icon: Info },
    { level: 'success', label: 'Success',    count: counts.success,   color: 'text-green-400',   icon: CheckCircle },
    { level: 'warning', label: 'Warnings',   count: counts.warning,   color: 'text-yellow-400',  icon: AlertTriangle },
    { level: 'error',   label: 'Errors',     count: counts.error,     color: 'text-red-400',     icon: XCircle },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Production Logs</h1>
        <p className="text-zinc-400 text-sm mt-1">Historical production events and system messages</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-4">
        {statCards.map(({ level, label, count, color, icon: Icon }) => {
          const isFilterable = level !== 'total';
          const isActive = filter === level;
          return (
            <div
              key={level}
              onClick={isFilterable ? () => setFilter(isActive ? 'all' : level as LogLevel) : undefined}
              className={`rounded-xl p-4 bg-zinc-900 border transition-colors ${
                isFilterable ? 'cursor-pointer' : ''
              } ${
                isActive
                  ? logColors[level as LogLevel].split(' ')[1]  // use the border color class
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${color}`}>{count}</p>
                  <p className="text-sm text-zinc-400 mt-0.5">{label}</p>
                </div>
                <Icon size={28} className={`${color} opacity-60`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active filter banner */}
      {filter !== 'all' && (
        <div className="flex items-center justify-between rounded-lg p-3 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border ${logColors[filter]}`}>
              Filtering: {filter.toUpperCase()}
            </span>
            <span className="text-sm text-zinc-400">
              Showing {filteredLogs.length} of {logs.length} logs
            </span>
          </div>
          <button
            onClick={() => setFilter('all')}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Log table */}
      <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              {['Timestamp', 'Level', 'Source', 'Type', 'Description'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => {
              const Icon = logIcons[log.level];
              return (
                <tr key={log.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3 text-zinc-300 font-mono text-xs whitespace-nowrap">
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${logColors[log.level]}`}>
                      <Icon size={10} />
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-mono text-xs">{log.source}</td>
                  <td className="px-4 py-3 text-zinc-300 text-xs">{log.type}</td>
                  <td className="px-4 py-3 text-zinc-300 text-xs">{log.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <p className="text-center py-12 text-zinc-400 text-sm">No logs to display</p>
        )}
      </div>
    </div>
  );
}
