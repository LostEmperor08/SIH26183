import React from 'react';
import { ArrowRight, ShieldAlert, Building2, UserX, ExternalLink, Hash } from 'lucide-react';

export default function FlowVisualizer({ path, targetWallet }) {
  if (!path || path.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 text-sm bg-slate-950/60 rounded-xl border border-slate-800">
        No active transaction path selected. Click any wallet in the table below to inspect its multi-hop flow.
      </div>
    );
  }

  const finalHop = path[path.length - 1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <h3 className="text-sm font-semibold text-slate-200">
            Automated Attribution Flow Analysis ({path.length} Hop{path.length > 1 ? 's' : ''})
          </h3>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-3">
          <span>Target Exchange: <strong className="text-cyan-400 font-semibold">{finalHop.exchange || 'None'}</strong></span>
          <span>•</span>
          <span>Value: <strong className="text-emerald-400 font-semibold">{finalHop.amount_eth} ETH (${finalHop.amount_usd.toLocaleString()})</strong></span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-center min-w-[650px] gap-3 py-3">
          {/* Victim / Source Wallet Node */}
          <div className="flex-1 bg-slate-950 border border-red-500/40 rounded-xl p-4 relative shadow-lg">
            <div className="flex items-center justify-between text-xs text-red-400 font-semibold mb-2">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Suspect Wallet (Victim Report)
              </span>
              <span className="bg-red-950/80 px-2 py-0.5 rounded text-[10px] text-red-300">Origin</span>
            </div>
            <div className="font-mono text-xs text-slate-200 truncate bg-slate-900 px-2 py-1.5 rounded border border-slate-800" title={path[0].from}>
              {path[0].from}
            </div>
          </div>

          {/* Hop Steps */}
          {path.map((hop, idx) => (
            <React.Fragment key={idx}>
              {/* Directed Arrow with Details */}
              <div className="flex flex-col items-center justify-center px-1 text-center">
                <span className="text-[10px] font-mono text-cyan-400 font-semibold bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60 mb-1">
                  {hop.amount_eth} ETH
                </span>
                <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-[9px] text-slate-400 mt-1">Hop {hop.hops}</span>
              </div>

              {/* Recipient Node */}
              {idx === path.length - 1 ? (
                /* Final Destination: Known Exchange */
                <div className="flex-1 bg-gradient-to-b from-cyan-950/60 to-slate-950 border-2 border-cyan-500/80 rounded-xl p-4 shadow-lg shadow-cyan-950/40">
                  <div className="flex items-center justify-between text-xs text-cyan-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-cyan-300" />
                      {hop.exchange_name || hop.exchange}
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
                      Target VASP
                    </span>
                  </div>
                  <div className="font-mono text-xs text-cyan-200 truncate bg-slate-900/90 px-2 py-1.5 rounded border border-cyan-900/60" title={hop.to}>
                    {hop.to}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Contact: {hop.compliance_email || 'le-requests@exchange.com'}</span>
                    <span className="text-emerald-400 font-semibold">${hop.amount_usd.toLocaleString()} USD</span>
                  </div>
                </div>
              ) : (
                /* Intermediary Mule Node */
                <div className="flex-1 bg-slate-950 border border-amber-500/40 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <UserX className="w-3.5 h-3.5" /> Intermediary Mule / Splitter
                    </span>
                    <span className="bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded text-[10px]">
                      Hop {hop.hops}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-300 truncate bg-slate-900 px-2 py-1.5 rounded border border-slate-800" title={hop.to}>
                    {hop.to}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1 truncate">
                    <Hash className="w-3 h-3 text-slate-500" />
                    <span className="truncate">{hop.tx_hash}</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
