
import React from 'react';
import { AnalysisResult, RiskLevel } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const chartData = [
    { name: 'Hate Speech', value: result.breakdown.hate_speech },
    { name: 'Violence', value: result.breakdown.violence },
    { name: 'Medical', value: result.breakdown.medical },
    { name: 'Political', value: result.breakdown.political },
  ];

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'LOW': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'MEDIUM': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'HIGH': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    }
  };

  const getLabelColor = (label: string) => {
    return label === 'REAL' ? 'text-emerald-400' : 'text-rose-400';
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Misinformation Card */}
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Veracity Check</p>
          <p className={`text-2xl font-black ${getLabelColor(result.misinformation_label)}`}>
            {result.misinformation_label}
          </p>
        </div>

        {/* Score Card */}
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Harmfulness Score</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-white">{result.harmfulness_score}</p>
            <p className="text-slate-500 font-medium">/ 100</p>
          </div>
        </div>

        {/* Risk Card */}
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Risk Assessment</p>
          <span className={`inline-block px-3 py-1 rounded-full border text-sm font-bold mt-1 ${getRiskColor(result.risk_level)}`}>
            {result.risk_level} RISK
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col gap-4">
          <h3 className="font-bold text-slate-300">Hazard Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={80} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 70 ? '#fb7185' : entry.value > 30 ? '#fbbf24' : '#34d399'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col gap-4">
          <h3 className="font-bold text-slate-300">AI Narrative & Context</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Combined Content Analysis</p>
              <p className="text-sm text-slate-300 line-clamp-4 leading-relaxed italic bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                "{result.combined_text}"
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Analysis Summary</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
