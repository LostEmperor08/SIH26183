import React from 'react';
import { Shield, Activity, Radio, Database, Server, RefreshCw } from 'lucide-react';

export default function HeaderBar({ mode, onToggleMode, isBackendConnected }) {
  return (
    <header className="border-b border-[#30363D] bg-[#0D1117] sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Tactical Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#161B22] border border-[#30363D] flex items-center justify-center rounded-none text-emerald-400 font-mono font-bold text-sm">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-semibold tracking-wider text-slate-100 font-mono uppercase">
                I4C | Automated Crypto Fraud Attribution System
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#161B22] text-slate-400 border border-[#30363D]">
                MHA / CIS-26183
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Indian Cyber Crime Coordination Centre • Statutory Law Enforcement Terminal
            </p>
          </div>
        </div>

        {/* Center/Right: Live Telemetry & Fail-Safe Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Subtle Telemetry Badges */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-slate-400 border-r border-[#30363D] pr-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>NCRP Sync: <strong className="text-slate-200">Active</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Mainnet: <strong className="text-slate-200">12ms</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-3 h-3 text-cyan-400" />
              <span>FIU-IND Registry: <strong className="text-slate-200">v2.4</strong></span>
            </div>
          </div>

          {/* Tactical Mode Toggle: Live RPC vs Simulated Dataset */}
          <div className="flex items-center bg-[#161B22] border border-[#30363D] p-0.5 text-xs font-mono">
            <button
              onClick={() => onToggleMode('live')}
              className={`px-3 py-1 flex items-center gap-1.5 transition-colors ${
                mode === 'live'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Queries Live Local Backend / Etherscan Node"
            >
              <Server className="w-3 h-3" />
              <span>Live RPC Node</span>
              {isBackendConnected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>
            <button
              onClick={() => onToggleMode('simulated')}
              className={`px-3 py-1 flex items-center gap-1.5 transition-colors ${
                mode === 'simulated'
                  ? 'bg-purple-950 text-purple-300 border border-purple-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Forensic Syndicate Simulation Dataset (100% Guaranteed Hackathon Demo Defense)"
            >
              <Activity className="w-3 h-3" />
              <span>Simulated Forensic Dataset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
