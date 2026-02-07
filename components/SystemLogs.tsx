
import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface SystemLogsProps {
  logs: LogEntry[];
}

const SystemLogs: React.FC<SystemLogsProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'error': return 'text-rose-400';
      default: return 'text-indigo-400';
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          System Pipeline Logs
        </h3>
        <span className="text-[10px] text-slate-600 font-mono">Status: Processing</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 bg-slate-950 rounded-xl p-4 font-mono text-[11px] overflow-y-auto border border-slate-800 space-y-1.5 shadow-inner"
      >
        {logs.length === 0 ? (
          <p className="text-slate-700 italic">Waiting for input analysis...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-3 leading-relaxed border-b border-slate-900/50 pb-1 last:border-0">
              <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
              <span className={getLogColor(log.type)}>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SystemLogs;
