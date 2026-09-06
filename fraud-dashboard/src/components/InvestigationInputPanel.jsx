import React, { useState, useEffect } from 'react';
import { Search, Layers, Play, Sliders, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { SINGLE_RAPID_PRESETS } from '../data/forensicDataset';

export default function InvestigationInputPanel({
  onSingleTrace,
  onMultiTrace,
  onLoadCrimeRing,
  isLoading,
}) {
  const [activeTab, setActiveTab] = useState('multi'); // 'single' or 'multi' (defaulting to multi as requested for crime ring showcase)
  const [singleAddress, setSingleAddress] = useState('0x71a4c9b2081734bc109723a491b2901234567890');
  const [maxHops, setMaxHops] = useState(3);
  const [multiInputText, setMultiInputText] = useState(
    `0x71a4c9b2081734bc109723a491b2901234567890\n0x83b14a09172648bc01928374a901234567890abc\n0x52e9c211782346bc01928374a901234567890def\n0x94d0183f671234bc01928374a901234567890111\n0x61c8339a581234bc01928374a901234567890222`
  );

  // Auto-detect network
  const detectNetwork = (addr) => {
    if (!addr) return 'UNKNOWN';
    const clean = addr.trim();
    if (clean.startsWith('0x') && clean.length >= 10) return 'ETH / EVM';
    if (clean.startsWith('T') && clean.length === 34) return 'TRON (TRC-20)';
    if (clean.startsWith('1') || clean.startsWith('3') || clean.startsWith('bc1')) return 'BITCOIN';
    return 'EVM COMPATIBLE';
  };

  const currentNetwork = detectNetwork(singleAddress);

  // Keyboard shortcut: Cmd/Ctrl + Enter to trigger active trace
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (activeTab === 'single') {
          handleExecuteSingle();
        } else {
          handleExecuteMulti();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, singleAddress, maxHops, multiInputText]);

  const handleExecuteSingle = () => {
    if (!singleAddress.trim()) return;
    onSingleTrace(singleAddress.trim(), maxHops);
  };

  const handleExecuteMulti = () => {
    const lines = multiInputText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && l.startsWith('0x'));
    onMultiTrace(lines);
  };

  return (
    <div className="bg-[#0D1117] border border-[#30363D] mb-4">
      {/* Tactical Tab Navigation Bar */}
      <div className="flex border-b border-[#30363D] bg-[#161B22] text-xs font-mono">
        <button
          onClick={() => setActiveTab('multi')}
          className={`px-4 py-2.5 flex items-center gap-2 border-r border-[#30363D] transition-colors ${
            activeTab === 'multi'
              ? 'bg-[#0D1117] text-purple-400 font-semibold border-t-2 border-t-purple-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>Syndicate Convergence Analyzer (Multi-Complaint)</span>
          <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.2 border border-purple-800">
            NCRP Batch
          </span>
        </button>

        <button
          onClick={() => setActiveTab('single')}
          className={`px-4 py-2.5 flex items-center gap-2 border-r border-[#30363D] transition-colors ${
            activeTab === 'single'
              ? 'bg-[#0D1117] text-cyan-400 font-semibold border-t-2 border-t-cyan-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Rapid Trace (Single Suspect Address)</span>
        </button>
      </div>

      {/* Panel Body */}
      <div className="p-4">
        {activeTab === 'multi' ? (
          /* Multi-Wallet Syndicate Analyzer */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>Victim-Reported Wallet Addresses (3 to 10 Complaint Inputs)</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  [1 address per line from NCRP Form / 1930 Helpline]
                </span>
              </label>
              <div className="flex items-center gap-2">
                {/* High-Contrast Demo Button as Requested */}
                <button
                  type="button"
                  onClick={onLoadCrimeRing}
                  className="px-3 py-1.5 text-xs font-mono font-semibold bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-600 flex items-center gap-1.5 transition shadow-sm"
                  title="Instantly loads 5 victim complaints converging into 1 syndicate hub"
                >
                  <Zap className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                  <span>⚡ Load 5-Victim Crime Ring Case</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={multiInputText}
                onChange={(e) => setMultiInputText(e.target.value)}
                rows={5}
                placeholder="Paste suspect crypto addresses reported by victims (one per line)...&#10;0x71a4c9b2081734bc109723a491b2901234567890&#10;0x83b14a09172648bc01928374a901234567890abc"
                className="w-full bg-[#090C10] border border-[#30363D] p-2.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-purple-500 rounded-none resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#21262D]">
              <span className="text-[11px] font-mono text-slate-400">
                Shortcut: Press <kbd className="bg-[#161B22] px-1 py-0.5 border border-[#30363D] text-slate-300">Ctrl + Enter</kbd> to analyze
              </span>
              <button
                type="button"
                onClick={handleExecuteMulti}
                disabled={isLoading}
                className="px-5 py-2 text-xs font-mono font-semibold bg-[#238636] hover:bg-[#2EA043] text-white border border-[#2EA043] flex items-center gap-2 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing On-Chain Graph...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-3.5 h-3.5" />
                    <span>Analyze Syndicate Convergence</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Single Wallet Rapid Trace */
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Address Input */}
              <div className="lg:col-span-8">
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Suspect Wallet Address (Victim Origin)</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800 px-1.5 py-0.2">
                    {currentNetwork}
                  </span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={singleAddress}
                    onChange={(e) => setSingleAddress(e.target.value)}
                    placeholder="0x..."
                    className="flex-1 bg-[#090C10] border border-[#30363D] px-3 py-2 font-mono text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 rounded-none"
                  />
                </div>
              </div>

              {/* Hop Depth Slider */}
              <div className="lg:col-span-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-slate-400" />
                    Max Traversal Depth
                  </span>
                  <span className="font-bold text-cyan-400">{maxHops} Hops</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={maxHops}
                    onChange={(e) => setMaxHops(parseInt(e.target.value))}
                    className="flex-1 accent-cyan-500 cursor-pointer h-1.5 bg-[#21262D]"
                  />
                  <span className="text-[10px] font-mono text-slate-400">1-4 Hops</span>
                </div>
              </div>
            </div>

            {/* Presets and Submit */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#21262D]">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="text-slate-400">Presets:</span>
                {SINGLE_RAPID_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSingleAddress(p.address)}
                    className="text-slate-300 hover:text-cyan-400 hover:underline px-1.5 py-0.5 bg-[#161B22] border border-[#30363D]"
                  >
                    {p.targetVasp} ({p.hops}H)
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleExecuteSingle}
                disabled={isLoading}
                className="px-5 py-2 text-xs font-mono font-semibold bg-[#238636] hover:bg-[#2EA043] text-white border border-[#2EA043] flex items-center gap-2 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Tracing Ledger...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Execute Trace</span>
                    <span className="text-[10px] opacity-75 font-normal ml-1">Ctrl+Enter</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
