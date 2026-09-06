import React from 'react';
import { AlertTriangle, GitFork, ShieldAlert, ArrowRight, FileCheck } from 'lucide-react';
import { formatINR } from '../data/forensicDataset';

export default function ConvergenceAlertBanner({ alert, onOpenJointNotice }) {
  if (!alert) return null;

  const {
    victimCount,
    firNumbers,
    collectorAddress,
    collectorAlias,
    targetVasp,
    totalAggregatedEth,
    riskLevel,
  } = alert;

  const shortCollector = `${collectorAddress.substring(0, 10)}...${collectorAddress.substring(collectorAddress.length - 8)}`;

  return (
    <div className="bg-[#120E24] border-2 border-purple-500/80 p-4 mb-4 shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Left: Icon & Alert Heading */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-950 border border-purple-500 text-purple-300 rounded-none mt-0.5">
            <GitFork className="w-5 h-5 text-purple-400 rotate-90" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2 py-0.5 border border-purple-800">
                CRITICAL CONVERGENCE ADVISORY
              </span>
              <span className="text-[10px] font-mono text-red-400 font-bold bg-red-950/80 px-2 py-0.5 border border-red-800">
                {riskLevel} RISK (MULTI-STATE SYNDICATE)
              </span>
            </div>

            <h3 className="text-sm font-mono font-bold text-slate-100 mt-1">
              ⚠️ Cross-Case Convergence Detected: <span className="text-purple-300">{victimCount} separate complaints</span> funnel into a single intermediate collector:
            </h3>

            {/* Tactical Funnel Details */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-1 bg-[#0D1117] border border-purple-700/80 text-purple-300 font-bold">
                {collectorAlias}
              </span>
              <span className="text-slate-400">({shortCollector})</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400">Terminal Cash-Out at:</span>
              <span className="px-2 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                {targetVasp}
              </span>
            </div>

            {/* FIR List */}
            <div className="mt-2 text-[11px] font-mono text-slate-400 flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400">Linked NCRP Records:</span>
              {firNumbers.map((fir, idx) => (
                <span key={idx} className="bg-[#161B22] border border-[#30363D] px-1.5 py-0.2 text-slate-300">
                  {fir}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Aggregated Seizure Potential & Action Button */}
        <div className="flex flex-col sm:items-end gap-2 text-right">
          <div className="text-xs font-mono text-slate-400">
            Total Aggregated Syndicate Flow:
          </div>
          <div className="text-xl font-bold font-mono text-purple-300">
            {totalAggregatedEth.toFixed(2)} ETH
            <span className="text-xs font-normal text-emerald-400 ml-1.5">
              ({formatINR(totalAggregatedEth)})
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenJointNotice}
            className="mt-1 px-4 py-2 text-xs font-mono font-bold bg-purple-700 hover:bg-purple-600 text-white border border-purple-400 flex items-center gap-2 transition shadow-md"
          >
            <FileCheck className="w-4 h-4" />
            <span>Generate Joint Syndicate Freeze Directive</span>
          </button>
        </div>
      </div>
    </div>
  );
}
