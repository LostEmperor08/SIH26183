import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldCheck, Coins, DollarSign, Activity } from 'lucide-react';

const COLORS = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function AnalyticsDash({ results, summary }) {
  if (!results || results.length === 0) return null;

  const totalWallets = results.length;
  const identifiedWallets = results.filter((r) => r.found).length;
  const attributionRate = Math.round((identifiedWallets / totalWallets) * 100);
  const totalEth = results.reduce((acc, r) => acc + (r.amount_eth || 0), 0);
  const totalUsd = Math.round(totalEth * 2600);

  // Exchange distribution
  const byExchange = {};
  results.forEach((r) => {
    if (r.found && r.exchange) {
      byExchange[r.exchange] = (byExchange[r.exchange] || 0) + 1;
    }
  });

  const chartData = Object.entries(byExchange).map(([name, count]) => ({
    exchange: name,
    count: count,
  }));

  return (
    <div className="space-y-6 mb-8">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Wallets */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-cyan-950/70 border border-cyan-800/60 rounded-lg text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Suspect Wallets</p>
            <p className="text-2xl font-bold text-slate-100">{totalWallets}</p>
          </div>
        </div>

        {/* Identified Exchanges */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-emerald-950/70 border border-emerald-800/60 rounded-lg text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Attributed to VASP</p>
            <p className="text-2xl font-bold text-emerald-400">
              {identifiedWallets} <span className="text-xs font-normal text-slate-400">({attributionRate}%)</span>
            </p>
          </div>
        </div>

        {/* Total ETH Traced */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-blue-950/70 border border-blue-800/60 rounded-lg text-blue-400">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Total Volume Traced</p>
            <p className="text-2xl font-bold text-blue-400">
              {totalEth.toFixed(2)} <span className="text-xs font-normal text-slate-400">ETH</span>
            </p>
          </div>
        </div>

        {/* Freeze Potential USD */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-purple-950/70 border border-purple-800/60 rounded-lg text-purple-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Freeze Potential</p>
            <p className="text-2xl font-bold text-purple-400">${totalUsd.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Chart: VASP Distribution */}
      {chartData.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          <h3 className="text-sm font-semibold text-slate-200 mb-1">
            Exchange Destination Distribution
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Frequency of illicit fund deposits routed to recipient VASPs
          </p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="exchange" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  formatter={(value) => [`${value} Wallets`, 'Attributed']}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
