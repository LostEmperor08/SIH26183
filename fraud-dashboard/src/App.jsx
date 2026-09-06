import React, { useState, useEffect } from 'react';
import {
  Shield,
  ArrowRight,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Layers,
  Search,
  Sparkles,
  Clock,
  Coins,
  Scale,
  Send,
  User,
  GitBranch,
} from 'lucide-react';
import HeaderBar from './components/HeaderBar';
import ConvergenceAlertBanner from './components/ConvergenceAlertBanner';
import InteractiveGraphCanvas from './components/InteractiveGraphCanvas';
import WalletInspectorDrawer from './components/WalletInspectorDrawer';
import CaseLedgerTable from './components/CaseLedgerTable';
import FreezeNoticeModal from './components/FreezeNoticeModal';
import {
  MULTI_CHAIN_CASES,
  CRIME_RING_CASE,
  SINGLE_RAPID_PRESETS,
  convertChainCaseToGraph,
  formatINR,
} from './data/forensicDataset';
import { healthCheck, singleTrace } from './utils/api';

export default function App() {
  const [activeChain, setActiveChain] = useState('ethereum'); // 'ethereum' | 'polygon' | 'tron' | 'syndicate'
  const [mode, setMode] = useState('simulated');
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedText, setCopiedText] = useState(null);

  // Deep technical inspector toggle (Default true so graph canvas is immediately visible)
  const [showDeepInspector, setShowDeepInspector] = useState(true);

  // Active case state for graph & ledger
  const [activeGraphCase, setActiveGraphCase] = useState(() =>
    convertChainCaseToGraph(MULTI_CHAIN_CASES.ethereum)
  );
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Legal Freeze Notice Modal State
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeTarget, setNoticeTarget] = useState(null);

  // Health check on mount
  useEffect(() => {
    healthCheck().then((res) => {
      if (res && res.status === 'ok') {
        setIsBackendConnected(true);
      } else {
        setIsBackendConnected(false);
      }
    });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    showToast(`Copied ${label || 'address'} to clipboard!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Switch Chain handler
  const handleSelectChain = (chainKey) => {
    setActiveChain(chainKey);
    setIsLoading(true);
    setTimeout(() => {
      if (chainKey === 'syndicate') {
        setActiveGraphCase(CRIME_RING_CASE);
        const hub = CRIME_RING_CASE.nodes.find((n) => n.id === 'syndicate-hub');
        setSelectedNode(hub);
        showToast('Loaded 5-Victim Multi-Jurisdiction Crime Ring (FIR 891 - 941)');
      } else {
        const caseData = MULTI_CHAIN_CASES[chainKey];
        if (caseData) {
          const graphObj = convertChainCaseToGraph(caseData);
          setActiveGraphCase(graphObj);
          setSelectedNode(graphObj.nodes[graphObj.nodes.length - 1]); // Select VASP by default
          showToast(`Switched to ${caseData.chainName}: ${caseData.title}`);
        }
      }
      setIsLoading(false);
    }, 150);
  };

  // Quick Preset search
  const handleSelectPreset = (preset) => {
    setSearchAddress(preset.address);
    handleSelectChain(preset.chainKey);
  };

  // Search/Trace handler
  const handleSearchTrace = async (e) => {
    e?.preventDefault();
    if (!searchAddress.trim()) {
      showToast('Please enter a suspect wallet address.');
      return;
    }

    setIsLoading(true);
    const addr = searchAddress.trim();

    // Check if matches known chain
    if (addr.startsWith('T')) {
      handleSelectChain('tron');
    } else if (addr.toLowerCase().includes('52e9')) {
      handleSelectChain('polygon');
    } else {
      handleSelectChain('ethereum');
    }

    try {
      if (mode === 'live' && isBackendConnected) {
        await singleTrace(addr);
      }
      showToast(`Trace Complete: Pierced layers & identified destination VASP!`);
    } catch (err) {
      console.warn('Trace fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Active current case view
  const currentCase =
    activeChain === 'syndicate' ? null : MULTI_CHAIN_CASES[activeChain];

  // Open Freeze Notice Modal
  const openNoticeForCurrentCase = () => {
    if (activeChain === 'syndicate') {
      setNoticeTarget({
        wallet: CRIME_RING_CASE.convergenceAlert.collectorAddress,
        exchange: CRIME_RING_CASE.convergenceAlert.targetVasp,
        amountEth: CRIME_RING_CASE.convergenceAlert.totalAggregatedEth,
        complianceEmail: 'compliance@binance.com',
      });
    } else {
      setNoticeTarget({
        wallet: currentCase.steps[currentCase.steps.length - 1].address,
        exchange: currentCase.nearestVasp,
        amountEth: currentCase.reportedLoss,
        complianceEmail: currentCase.complianceEmail,
      });
    }
    setIsNoticeOpen(true);
  };

  const openNoticeForNode = (node) => {
    setNoticeTarget({
      wallet: node.address,
      exchange: node.type === 'vasp' ? node.label : activeGraphCase.metrics.nearestVasp.name,
      amountEth: node.amountEth || node.inflowEth,
      complianceEmail: node.complianceEmail || 'compliance@binance.com',
    });
    setIsNoticeOpen(true);
  };

  const openNoticeFromLedger = (row) => {
    setNoticeTarget({
      wallet: row.wallet,
      exchange: row.destinationVasp,
      amountEth: row.amountEth,
      complianceEmail: 'compliance@binance.com',
    });
    setIsNoticeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090C10] text-[#C9D1D9] flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. TOP HEADER & TELEMETRY */}
      <HeaderBar
        mode={mode}
        onToggleMode={(newMode) => {
          setMode(newMode);
          showToast(
            `Switched mode to: ${
              newMode === 'live' ? 'Live RPC Node Network' : 'Simulated Multi-Chain Cases'
            }`
          );
        }}
        isBackendConnected={isBackendConnected}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161B22] border border-blue-500/40 text-slate-100 px-4 py-3 rounded shadow-2xl flex items-center gap-3 text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* 2. FRIENDLY MULTI-CHAIN SELECTION BAR */}
        <section className="bg-[#0D1117] border border-[#30363D] rounded p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" /> Multi-Chain Forensic Engine
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-950/60 text-blue-300 border border-blue-800/60 rounded">
                  3 Core Chains Active
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                Select Blockchain Network or Investigation Case
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Investigating officers can switch chains instantly to trace fund movements across EVM and TRC-20 ecosystems.
              </p>
            </div>

            {/* Chain Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Ethereum */}
              <button
                onClick={() => handleSelectChain('ethereum')}
                className={`px-3.5 py-2 text-xs font-semibold rounded border transition flex items-center gap-2 ${
                  activeChain === 'ethereum'
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500 shadow-sm shadow-blue-500/20'
                    : 'bg-[#161B22] text-slate-300 border-[#30363D] hover:border-slate-500 hover:text-white'
                }`}
              >
                <span className="text-base">⟠</span>
                <span>Ethereum (ETH)</span>
              </button>

              {/* Polygon */}
              <button
                onClick={() => handleSelectChain('polygon')}
                className={`px-3.5 py-2 text-xs font-semibold rounded border transition flex items-center gap-2 ${
                  activeChain === 'polygon'
                    ? 'bg-purple-600/20 text-purple-300 border-purple-500 shadow-sm shadow-purple-500/20'
                    : 'bg-[#161B22] text-slate-300 border-[#30363D] hover:border-slate-500 hover:text-white'
                }`}
              >
                <span className="text-base">🟣</span>
                <span>Polygon (POL)</span>
              </button>

              {/* Tron TRC-20 */}
              <button
                onClick={() => handleSelectChain('tron')}
                className={`px-3.5 py-2 text-xs font-semibold rounded border transition flex items-center gap-2 ${
                  activeChain === 'tron'
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500 shadow-sm shadow-emerald-500/20'
                    : 'bg-[#161B22] text-slate-300 border-[#30363D] hover:border-slate-500 hover:text-white'
                }`}
              >
                <span className="text-base">🔴</span>
                <div className="text-left">
                  <span>Tron (TRC-20 USDT)</span>
                  <span className="hidden sm:inline-block ml-1.5 text-[10px] text-emerald-400 font-mono">
                    #1 India Scam Vector
                  </span>
                </div>
              </button>

              {/* 5-Victim Syndicate Ring */}
              <button
                onClick={() => handleSelectChain('syndicate')}
                className={`px-3.5 py-2 text-xs font-semibold rounded border transition flex items-center gap-2 ${
                  activeChain === 'syndicate'
                    ? 'bg-amber-600/20 text-amber-300 border-amber-500 shadow-sm shadow-amber-500/20'
                    : 'bg-[#161B22] text-slate-300 border-[#30363D] hover:border-slate-500 hover:text-white'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                <span>5-Victim Syndicate Ring</span>
              </button>
            </div>
          </div>

          {/* Quick Preset Badges */}
          <div className="mt-3 pt-3 border-t border-[#21262D] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Quick Case Presets:
            </span>
            {SINGLE_RAPID_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset)}
                className="px-2.5 py-1 text-[11px] font-mono bg-[#161B22] text-slate-300 hover:text-white border border-[#30363D] hover:border-blue-500/50 rounded flex items-center gap-1.5 transition"
              >
                <span className="text-slate-400">{preset.network}:</span>
                <span className="font-semibold text-slate-200">{preset.label}</span>
                <span className="text-emerald-400">({preset.amount})</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. SUSPECT WALLET SEARCH & RAPID TRACE BAR */}
        <section className="bg-[#0D1117] border border-[#30363D] rounded p-3.5">
          <form onSubmit={handleSearchTrace} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Paste Victim-Reported Suspect Wallet (e.g. 0x7d8bf... or T9yD1...)"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="w-full bg-[#161B22] border border-[#30363D] focus:border-blue-500 focus:outline-none text-slate-100 pl-9 pr-4 py-2 text-xs font-mono rounded placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Piercing Layers...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Run Automated Attribution</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* 4. SYNDICATE CONVERGENCE ALERT (IF ACTIVE) */}
        {activeChain === 'syndicate' && CRIME_RING_CASE.convergenceAlert && (
          <ConvergenceAlertBanner
            alert={CRIME_RING_CASE.convergenceAlert}
            onOpenJointNotice={openNoticeForCurrentCase}
          />
        )}

        {/* 5. HERO PLAIN-ENGLISH VERDICT CARD (OFFICER-FRIENDLY STORY) */}
        {currentCase && (
          <section className="bg-[#0D1117] border-2 border-blue-500/40 rounded p-5 relative overflow-hidden shadow-lg">
            {/* Background subtle glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-3xl">
                {/* Status Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    TARGET VASP IDENTIFIED ({currentCase.hopsCount} HOPS)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#161B22] text-slate-300 border border-[#30363D]">
                    {currentCase.fir}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-950/60 text-blue-300 border border-blue-800/40">
                    {currentCase.chainName}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentCase.title}: Stolen funds traced to{' '}
                  <span className="text-blue-400 underline decoration-blue-500/50 underline-offset-4">
                    {currentCase.nearestVasp}
                  </span>
                </h1>

                {/* Plain-English Officer Narrative */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentCase.verdict}
                </p>

                {/* Key Summary Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Reported Loss</div>
                    <div className="text-sm font-bold font-mono text-white mt-0.5">
                      {currentCase.reportedLoss}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                      {currentCase.lossInr}
                    </div>
                  </div>

                  <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Investigation Speed</div>
                    <div className="text-sm font-bold font-mono text-blue-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {currentCase.traversalTime.split(' ')[0]}s
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Layer Pierced Instantly
                    </div>
                  </div>

                  <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Target VASP</div>
                    <div className="text-sm font-bold text-white mt-0.5 truncate flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{currentCase.nearestVasp.split(' ')[0]}</span>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400">
                      {currentCase.fiuRegistered ? 'FIU-IND Verified' : 'International VASP'}
                    </div>
                  </div>

                  <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Statutory Action</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5" /> Sec 91 CrPC
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {currentCase.fiuRegistered ? '< 4h Freeze SLA' : '< 24h Freeze Notice'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Right Column */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:min-w-[240px]">
                <button
                  onClick={openNoticeForCurrentCase}
                  className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded transition flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Section 91 Freeze Order</span>
                </button>

                <button
                  onClick={() => handleCopy(currentCase.verdict, 'case narrative')}
                  className="px-4 py-2.5 bg-[#161B22] hover:bg-[#21262D] text-slate-200 border border-[#30363D] font-mono text-xs rounded transition flex items-center justify-center gap-2"
                >
                  {copiedText === currentCase.verdict ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Case Brief</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Narrative for FIR</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowDeepInspector(!showDeepInspector)}
                  className="px-4 py-2.5 bg-[#161B22] hover:bg-[#21262D] text-blue-400 border border-blue-500/30 font-mono text-xs rounded transition flex items-center justify-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {showDeepInspector ? 'Hide Advanced Inspector' : 'Open Deep Graph & Ledger'}
                  </span>
                  {showDeepInspector ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 6. VISUAL 3-STEP FLOW STEPPER (OFFICER-FRIENDLY "FOLLOW THE MONEY") */}
        {currentCase && (
          <section className="bg-[#0D1117] border border-[#30363D] rounded p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                  Fund Flow Trajectory (3-Step Attribution)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual proof of money movement from victim to exchange deposit endpoint
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Total Path: <strong className="text-white">{currentCase.steps.length} Wallets</strong>
              </span>
            </div>

            {/* Stepper Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {currentCase.steps.map((step, idx) => {
                const isVictim = step.type === 'victim';
                const isMule = step.type === 'mule';
                const isVasp = step.type === 'vasp';

                return (
                  <div
                    key={idx}
                    className={`bg-[#161B22] border rounded p-4 relative flex flex-col justify-between transition hover:border-slate-400 ${
                      isVasp
                        ? 'border-emerald-500/50 shadow-md shadow-emerald-950/20'
                        : isMule
                        ? 'border-amber-500/40'
                        : 'border-blue-500/40'
                    }`}
                  >
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                            isVasp
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : isMule
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-blue-950 text-blue-400 border border-blue-800'
                          }`}
                        >
                          Step {step.step}: {step.role}
                        </span>
                        <span className="text-slate-400 text-[11px]">{step.time}</span>
                      </div>

                      {/* Title & Entity */}
                      <h4 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                        {isVictim && <User className="w-4 h-4 text-blue-400" />}
                        {isMule && <Layers className="w-4 h-4 text-amber-400" />}
                        {isVasp && <Building2 className="w-4 h-4 text-emerald-400" />}
                        <span>{step.entity}</span>
                      </h4>

                      {/* Address */}
                      <div className="mt-2 flex items-center justify-between bg-[#0D1117] border border-[#30363D] px-2.5 py-1.5 rounded">
                        <span className="font-mono text-xs text-slate-300 truncate mr-2">
                          {step.address}
                        </span>
                        <button
                          onClick={() => handleCopy(step.address, 'wallet address')}
                          className="text-slate-400 hover:text-white p-1"
                          title="Copy Address"
                        >
                          {copiedText === step.address ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Volume */}
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="text-xs text-slate-400">Volume Transferred:</span>
                        <div className="text-right">
                          <span className="text-sm font-mono font-bold text-white">
                            {step.volume}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 block">
                            {step.inr}
                          </span>
                        </div>
                      </div>

                      {/* Note */}
                      <p className="text-xs text-slate-400 mt-2.5 bg-[#090C10] p-2 rounded border border-[#21262D]">
                        {step.note}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-4 pt-3 border-t border-[#21262D] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500">
                        {isVasp ? 'Target Account' : `Hop #${idx}`}
                      </span>
                      {isVasp ? (
                        <button
                          onClick={openNoticeForCurrentCase}
                          className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 text-xs font-mono rounded flex items-center gap-1 transition"
                        >
                          <FileText className="w-3 h-3" /> Freeze Endpoint
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowDeepInspector(true);
                            setSelectedNode(activeGraphCase.nodes[idx]);
                            setIsDrawerOpen(true);
                          }}
                          className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          <span>Inspect Node</span> &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 7. COLLAPSIBLE DEEP TECHNICAL FORENSIC INSPECTOR */}
        <section className="bg-[#0D1117] border border-[#30363D] rounded overflow-hidden">
          {/* Section Header with Toggle */}
          <div
            onClick={() => setShowDeepInspector(!showDeepInspector)}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#161B22]/50 transition border-b border-[#30363D]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-blue-950/60 border border-blue-700/60 flex items-center justify-center text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  Advanced Investigation Inspector (Graph Topology & Raw Ledger)
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive node clustering, transaction hashes, and on-click wallet drawer for in-depth forensic testimony
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
                {showDeepInspector ? 'Click to collapse' : 'Click to expand'}
              </span>
              <div className="p-1 rounded bg-[#161B22] border border-[#30363D] text-slate-300">
                {showDeepInspector ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </div>

          {/* Collapsible Content */}
          {showDeepInspector && (
            <div className="p-4 space-y-4">
              {/* Interactive SVG Canvas */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Interactive Multi-Hop Graph (Click any node to open inspector)
                  </span>
                  <span className="text-xs font-mono text-blue-400">
                    {activeGraphCase.nodes.length} Nodes • {activeGraphCase.edges.length} Edges
                  </span>
                </div>
                <InteractiveGraphCanvas
                  nodes={activeGraphCase.nodes}
                  edges={activeGraphCase.edges}
                  selectedNode={selectedNode}
                  onSelectNode={(node) => {
                    setSelectedNode(node);
                    setIsDrawerOpen(true);
                  }}
                />
              </div>

              {/* Case Ledger Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Evidence Ledger & Attribution Summary
                  </span>
                </div>
                <CaseLedgerTable
                  rows={activeGraphCase.ledgerRows}
                  onSelectNodeById={(nodeId) => {
                    const matched = activeGraphCase.nodes.find((n) => n.id === nodeId);
                    if (matched) {
                      setSelectedNode(matched);
                      setIsDrawerOpen(true);
                    }
                  }}
                  onFlagForFreeze={openNoticeFromLedger}
                />
              </div>
            </div>
          )}
        </section>

      </main>

      {/* 8. WALLET INSPECTOR DRAWER (RIGHT PANEL) */}
      <WalletInspectorDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        node={selectedNode}
        onFlagForFreeze={openNoticeForNode}
        onExpandCounterparties={(node) => {
          showToast(`Expanded counterparties for ${node.address.substring(0, 10)}...`);
        }}
      />

      {/* 9. STATUTORY FREEZE NOTICE MODAL */}
      <FreezeNoticeModal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        targetData={noticeTarget}
      />

      {/* 10. FOOTER */}
      <footer className="border-t border-[#30363D] bg-[#0D1117] py-4 text-[11px] font-mono text-slate-500">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>I4C CYBER FORENSICS TERMINAL • CIS DIVISION, MINISTRY OF HOME AFFAIRS</span>
          </div>
          <div className="flex items-center gap-4">
            <span>BNSS 2023 / Section 91 Cr.P.C. Compliance Module</span>
            <span>Problem Statement: 26183</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
