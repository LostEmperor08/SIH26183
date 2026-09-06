import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, ShieldAlert, ArrowDownLeft, ArrowUpRight, Wallet, AlertOctagon, Share2 } from 'lucide-react';
import { formatINR, formatUSD } from '../data/forensicDataset';

export default function WalletInspectorDrawer({
  isOpen,
  onClose,
  node,
  onFlagForFreeze,
  onExpandCounterparties,
}) {
  const [copied, setCopied] = useState(false);

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !node) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(node.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isSyndicate = node.type === 'syndicate';
  const isVasp = node.type === 'vasp';
  const isVictim = node.type === 'victim';

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0D1117] border-l border-[#30363D] shadow-2xl flex flex-col font-mono text-slate-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#30363D] bg-[#161B22] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 ${isSyndicate ? 'bg-purple-500 animate-pulse' : isVasp ? 'bg-emerald-500' : isVictim ? 'bg-red-500' : 'bg-amber-500'}`} />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Tactical Node Dossier
          </h2>
          <span className="text-[10px] text-slate-400">| I4C Intelligence</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#30363D] text-slate-400 hover:text-white transition"
          title="Close Drawer (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Category & Tag */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 uppercase">Entity Classification</span>
            <span className="text-[10px] text-slate-400">Press Esc to close</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 text-xs font-bold border ${
                isSyndicate
                  ? 'bg-purple-950 text-purple-300 border-purple-700'
                  : isVasp
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : isVictim
                  ? 'bg-red-950 text-red-300 border-red-700'
                  : 'bg-amber-950 text-amber-300 border-amber-700'
              }`}
            >
              {node.category}
            </span>
            <span className="text-xs text-slate-300 font-semibold truncate">
              {node.label}
            </span>
          </div>
          {node.fir && (
            <div className="mt-1.5 text-[11px] text-purple-300 bg-[#161B22] border border-[#30363D] px-2 py-1">
              Case Ref: <strong>{node.fir}</strong>
            </div>
          )}
        </div>

        {/* Address & Quick Actions */}
        <div className="bg-[#090C10] border border-[#30363D] p-3">
          <div className="text-[10px] text-slate-400 uppercase mb-1">On-Chain Identifier</div>
          <div className="font-mono text-xs text-slate-100 break-all bg-[#161B22] p-2 border border-[#30363D]">
            {node.address}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] bg-[#21262D] hover:bg-[#30363D] text-slate-200 border border-[#30363D] flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Hash'}</span>
            </button>
            <a
              href={`https://etherscan.io/address/${node.address}`}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 text-[11px] bg-[#21262D] hover:bg-[#30363D] text-cyan-400 border border-[#30363D] flex items-center gap-1.5 transition"
            >
              <span>Etherscan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Financial Metrics Grid (Tabular Numeric Alignment) */}
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            Financial Ledger Summary (Aggregated Volume)
          </div>
          <div className="grid grid-cols-1 gap-2">
            {/* Total Inflow */}
            <div className="bg-[#090C10] border border-[#30363D] p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>Total Inflow:</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-400 tabular-nums">
                  {node.inflowEth?.toFixed(2) || node.amountEth?.toFixed(2)} ETH
                </div>
                <div className="text-[10px] text-slate-400">
                  ≈ {formatINR(node.inflowEth || node.amountEth || 0)}
                </div>
              </div>
            </div>

            {/* Total Outflow */}
            <div className="bg-[#090C10] border border-[#30363D] p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-red-400" />
                <span>Total Outflow:</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-200 tabular-nums">
                  {node.outflowEth?.toFixed(2) || node.amountEth?.toFixed(2)} ETH
                </div>
                <div className="text-[10px] text-slate-400">
                  ≈ {formatINR(node.outflowEth || node.amountEth || 0)}
                </div>
              </div>
            </div>

            {/* Net Retained Balance */}
            <div className="bg-[#090C10] border border-[#30363D] p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Wallet className="w-3.5 h-3.5 text-cyan-400" />
                <span>Net Retained Balance:</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-cyan-400 tabular-nums">
                  {node.retainedEth !== undefined ? node.retainedEth.toFixed(4) : '0.0000'} ETH
                </div>
                <div className="text-[10px] text-slate-400">
                  ≈ {formatINR(node.retainedEth || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Counterparties Section */}
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            Top On-Chain Counterparties
          </div>
          <div className="bg-[#090C10] border border-[#30363D] p-3 space-y-3 text-xs">
            <div>
              <div className="text-[10px] text-slate-400 mb-0.5">Primary Funding Source (Top Sender):</div>
              <div className="font-bold text-slate-200">{node.primarySender || 'Direct On-Ramp'}</div>
            </div>
            <div className="border-t border-[#21262D] pt-2">
              <div className="text-[10px] text-slate-400 mb-0.5">Primary Cash-out Path (Top Receiver):</div>
              <div className="font-bold text-emerald-400">{node.primaryReceiver || 'Centralized VASP Deposit'}</div>
            </div>
          </div>
        </div>

        {/* Tactical Assessment */}
        <div className="p-3 bg-[#161B22] border border-[#30363D] text-[11px] text-slate-400 space-y-1">
          <div className="text-slate-200 font-bold uppercase">Investigative Assessment:</div>
          <p>
            {isSyndicate
              ? 'Convergence node aggregates illicit funds from multiple victims before rapid sweeping to centralized exchanges. High value seizure target.'
              : isVasp
              ? 'Custodial endpoint under AML/CFT purview. Immediate freeze order under Section 91 CrPC required.'
              : isVictim
              ? 'Source of fraud report. Funds transferred under coercive task scam/digital arrest pretenses.'
              : 'Intermediate peeling mule. Used to obfuscate fund trail across multiple hops.'}
          </p>
        </div>
      </div>

      {/* Drawer Action Footer */}
      <div className="p-4 bg-[#161B22] border-t border-[#30363D] space-y-2">
        <button
          type="button"
          onClick={() => onFlagForFreeze(node)}
          className="w-full py-2 px-3 text-xs font-mono font-bold bg-red-700 hover:bg-red-600 text-white border border-red-500 flex items-center justify-center gap-2 transition"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Flag in I4C Freeze Notice</span>
        </button>

        <button
          type="button"
          onClick={() => onExpandCounterparties(node)}
          className="w-full py-2 px-3 text-xs font-mono font-semibold bg-[#21262D] hover:bg-[#30363D] text-slate-200 border border-[#30363D] flex items-center justify-center gap-2 transition"
        >
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span>Expand Counterparties (Add to Canvas)</span>
        </button>
      </div>
    </aside>
  );
}
