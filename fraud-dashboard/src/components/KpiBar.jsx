import React from 'react';
import { Coins, Building2, Zap, AlertOctagon } from 'lucide-react';
import { formatINR } from '../data/forensicDataset';

export default function KpiBar({ metrics }) {
  const { totalVolumeEth, nearestVasp, velocity, syndicateRisk } = metrics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {/* 1. Total Traced Volume */}
      <div className="bg-[#0D1117] border border-[#30363D] p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
          <span className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-slate-400" />
            Total Traced Volume
          </span>
          <span className="text-[10px] text-slate-400 bg-[#161B22] px-1 py-0.5 border border-[#30363D]">
            EVM / ERC-20
          </span>
        </div>
        <div className="mt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold font-mono text-slate-100 tabular-nums">
              {totalVolumeEth.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">ETH</span>
          </div>
          <div className="text-xs font-mono font-medium text-emerald-400 mt-0.5">
            ≈ {formatINR(totalVolumeEth)}
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-2 border-t border-[#21262D] pt-1.5 flex justify-between">
          <span>Seizure Scope: 100% On-Chain</span>
          <span className="text-slate-400">$99,970 USD</span>
        </div>
      </div>

      {/* 2. Nearest Identified VASP */}
      <div className="bg-[#0D1117] border border-[#30363D] p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            Nearest Identified VASP
          </span>
          {nearestVasp.fiuRegistered && (
            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1 py-0.5 border border-emerald-800">
              FIU-IND
            </span>
          )}
        </div>
        <div className="mt-1">
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
            {nearestVasp.name}
          </div>
          <div className="text-xs font-mono text-slate-400 truncate mt-0.5">
            {nearestVasp.subtext}
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-2 border-t border-[#21262D] pt-1.5 flex justify-between">
          <span>Statutory Contact: Ready</span>
          <span className="text-emerald-400">{nearestVasp.slaNotice}</span>
        </div>
      </div>

      {/* 3. Laundering Velocity */}
      <div className="bg-[#0D1117] border border-[#30363D] p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Laundering Velocity
          </span>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1 py-0.5 border border-amber-900">
            Fast Layering
          </span>
        </div>
        <div className="mt-1">
          <div className="text-lg sm:text-xl font-bold font-mono text-slate-100">
            {velocity.maxDepth}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-0.5">
            {velocity.avgSpeed}
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-2 border-t border-[#21262D] pt-1.5 flex justify-between">
          <span>Typology: Mules &rarr; Hub</span>
          <span className="text-amber-400">Layered Transit</span>
        </div>
      </div>

      {/* 4. Organized Syndicate Risk */}
      <div className="bg-[#0D1117] border border-[#30363D] p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
          <span className="flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-purple-400" />
            Syndicate Risk Assessment
          </span>
          <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950 px-1 py-0.5 border border-purple-800 animate-pulse">
            CONVERGENCE
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div>
            <div className="text-lg sm:text-xl font-bold font-mono text-red-400">
              {syndicateRisk.level} <span className="text-xs font-normal text-slate-400">({syndicateRisk.score}/100)</span>
            </div>
            <div className="text-xs font-mono text-purple-300 mt-0.5">
              {syndicateRisk.type}
            </div>
          </div>
          {/* Subtle Mini Progress Ring Gauge */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#21262D"
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeDasharray={100}
                strokeDashoffset={100 - syndicateRisk.score}
                strokeLinecap="square"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[9px] font-mono font-bold text-slate-200">
              {syndicateRisk.score}%
            </span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-2 border-t border-[#21262D] pt-1.5 flex justify-between">
          <span>Cross-Case Linkage: Active</span>
          <span className="text-red-400">High Severity</span>
        </div>
      </div>
    </div>
  );
}
