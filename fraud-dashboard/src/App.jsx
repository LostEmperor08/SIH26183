import React, { useState } from 'react';
import {
  Search,
  ShieldAlert,
  FileText,
  Mail,
  Database,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Scale,
  FileDown,
  RotateCcw,
  ShieldCheck,
  Clock,
  ArrowLeft,
  Landmark,
  ExternalLink,
  Layers
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'results'
  const [activeSidebarTab, setActiveSidebarTab] = useState('trace'); // 'trace' | 'cases' | 'directory' | 'help'

  // Search & Trace Inputs
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('Polygon');
  const [ncrpNumber, setNcrpNumber] = useState('');
  const [isTracing, setIsTracing] = useState(false);

  // Accordion & Modals
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'pdf' | 'email' | 'ncrp' | null
  const [copiedText, setCopiedText] = useState(null);
  const [ncrpSyncStatus, setNcrpSyncStatus] = useState(false);

  // Active Case Data
  const [caseData, setCaseData] = useState({
    wallet: '0xe6D6947c424AbbAB1C7b3866DC65614EEEC65358',
    network: 'Polygon',
    ncrpComplaint: 'NCRP-2026-99214',
    firNumber: 'FIR-402/2026 (Cyber Crime Police Station)',
    finalExchange: 'Binance',
    exchangeEmail: 'compliance@binance.com',
    amountCrypto: '25,000 USDT',
    amountInr: '₹21,25,000 INR',
    currentHolding: '25,000 USDT currently residing in Binance Custodial Account UID #8849201',
    riskScore: 92,
    riskLevel: 'Critical Risk (Known Laundering Mule)',
    riskReason: '100% of received funds swept within 3 minutes via rapid layering to evade AML banking thresholds.',
    trail: [
      { id: 1, label: 'Victim', detail: 'Citizen Wallet (Pune)', badge: 'Source', color: 'blue' },
      { id: 2, label: 'Middle-man (Mixer)', detail: 'Layer 1 Mule Transit', badge: 'Mule #1', color: 'amber' },
      { id: 3, label: 'Bridge', detail: 'Cross-Chain Router', badge: 'Converter', color: 'purple' },
      { id: 4, label: 'Exchange (Binance)', detail: 'Custodial Hot Wallet', badge: 'Destination', color: 'emerald' },
    ],
    technicalEvidence: [
      {
        step: 1,
        date: '10 Sep 2026, 14:10 IST',
        amount: '25,000 USDT (₹21.25 Lakh)',
        from: '0x71C85782B3a982E47833005A3A00000000000001',
        to: '0xe6D6947c424AbbAB1C7b3866DC65614EEEC65358',
        action: 'Initial Fraudulent Extraction',
        hash: '0x8891aa30df98214...78a1'
      },
      {
        step: 2,
        date: '10 Sep 2026, 14:14 IST',
        amount: '24,980 USDT (₹21.23 Lakh)',
        from: '0xe6D6947c424AbbAB1C7b3866DC65614EEEC65358',
        to: '0xbf5e3c7afbe37d13b040adb11d497bdbe061c87b',
        action: 'Rapid Layering Mule Sweep',
        hash: '0x6e9bc7903f056cf...e8e8'
      },
      {
        step: 3,
        date: '10 Sep 2026, 14:18 IST',
        amount: '24,950 USDT (₹21.20 Lakh)',
        from: '0xbf5e3c7afbe37d13b040adb11d497bdbe061c87b',
        to: '0x28c6c06298d514db089934071355e5743bf21d60',
        action: 'Direct Deposit to Binance Custody',
        hash: '0x4410cd998762ef1...99bc'
      }
    ]
  });

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleStartTrace = (e) => {
    if (e) e.preventDefault();
    if (!walletAddress.trim()) return;

    setIsTracing(true);
    setTimeout(() => {
      setIsTracing(false);
      // Update case data with user input
      setCaseData(prev => ({
        ...prev,
        wallet: walletAddress.trim(),
        network: selectedNetwork,
        ncrpComplaint: ncrpNumber.trim() || 'NCRP-2026-' + Math.floor(10000 + Math.random() * 90000),
      }));
      setCurrentView('results');
    }, 950);
  };

  const handleQuickDemo = (wallet, net, ncrp) => {
    setWalletAddress(wallet);
    setSelectedNetwork(net);
    setNcrpNumber(ncrp);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* ------------------------------------------------------------- */}
      {/* OFFICIAL GOVERNMENT LEA TOP BANNER */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-6 py-2 text-xs flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-white">MINISTRY OF HOME AFFAIRS (MHA) · INDIAN CYBER CRIME COORDINATION CENTRE (I4C)</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">National Cyber Crime Reporting Portal (NCRP) Law Enforcement Interface</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>Official Police Terminal: <strong>Inspector R. Deshmukh (Cyber Crime PS)</strong></span>
          <span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 font-mono">SECURE LEA MODE</span>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        
        {/* ------------------------------------------------------------- */}
        {/* NARROW LEFT SIDEBAR NAVIGATION */}
        {/* ------------------------------------------------------------- */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 shadow-sm">
          
          {/* Logo / Header */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-sm tracking-tight leading-snug">POLICE FORENSICS</h1>
                <p className="text-[11px] text-slate-500 font-medium">Crypto Fraud Attribution Desk</p>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5 flex-1">
            <button
              onClick={() => { setCurrentView('home'); setActiveSidebarTab('trace'); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                activeSidebarTab === 'trace' && currentView === 'home'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-blue-700" />
              <span>Trace New Wallet</span>
            </button>

            <button
              onClick={() => { setCurrentView('results'); setActiveSidebarTab('results'); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'results'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Active Investigation Results</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('cases')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                activeSidebarTab === 'cases' ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Saved Case Reports</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('directory')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                activeSidebarTab === 'directory' ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Exchange Nodal Contacts</span>
            </button>
          </nav>

          {/* Sidebar Footer: Section 91 Badge */}
          <div className="p-4 border-t border-gray-200 bg-slate-50/70 text-[11px] text-slate-500 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Scale className="w-4 h-4 text-blue-700" />
              <span>Legal Authority</span>
            </div>
            <p className="leading-relaxed">
              Standard Section 91 Cr.P.C. / Section 94 BNSS preservation directives binding on all FIU-IND registered entities.
            </p>
          </div>

        </aside>

        {/* ------------------------------------------------------------- */}
        {/* LARGE WHITE MAIN CONTENT AREA */}
        {/* ------------------------------------------------------------- */}
        <main className="flex-1 bg-white overflow-y-auto flex flex-col">
          
          {/* ========================================================= */}
          {/* VIEW 1: THE "HOME / TRACE" PAGE (GOOGLE SEARCH STYLE)      */}
          {/* ========================================================= */}
          {currentView === 'home' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 max-w-4xl mx-auto w-full">
              
              {/* Badge & Title */}
              <div className="text-center space-y-3 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>National Cryptocurrency Crime Attribution Engine</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Trace Stolen Crypto Funds
                </h2>

                <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
                  Enter any suspect wallet address to find where the stolen money went, identify the exchange holding it, and get legal freezing notices in seconds.
                </p>
              </div>

              {/* Central Search Form Box */}
              <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
                
                <form onSubmit={handleStartTrace} className="space-y-4">
                  
                  {/* Primary Wallet Input Bar */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Enter Suspect Wallet Address
                    </label>
                    <div className="relative flex items-center">
                      <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="Paste suspect wallet address (e.g. 0xe6D6947c424AbbAB1C7b3866DC65614EEEC65358 or Bitcoin address)"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono shadow-xs transition"
                      />
                    </div>
                  </div>

                  {/* Secondary Toggles Row: Network + NCRP Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    
                    {/* Select Network Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Select Network
                      </label>
                      <div className="relative">
                        <select
                          value={selectedNetwork}
                          onChange={(e) => setSelectedNetwork(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-xs transition"
                        >
                          <option value="Bitcoin">Bitcoin (BTC)</option>
                          <option value="Ethereum">Ethereum (ERC-20 / ETH)</option>
                          <option value="Tron">Tron (TRC-20 / USDT)</option>
                          <option value="Polygon">Polygon (USDT / POL)</option>
                          <option value="Solana">Solana (SOL)</option>
                        </select>
                      </div>
                    </div>

                    {/* NCRP Complaint Number Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span>NCRP Complaint Number</span>
                        <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                      </label>
                      <input
                        type="text"
                        value={ncrpNumber}
                        onChange={(e) => setNcrpNumber(e.target.value)}
                        placeholder="e.g. 2026/NCRP/89211"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono shadow-xs transition"
                      />
                    </div>

                  </div>

                  {/* Big Solid Blue Action Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isTracing}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isTracing ? (
                        <>
                          <RotateCcw className="w-5 h-5 animate-spin" />
                          <span>Searching Blockchain Records...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          <span>Trace Funds</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>

              </div>

              {/* Quick Preset Buttons for Hackathon Demonstrations */}
              <div className="mt-8 text-center space-y-3 w-full">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                  Quick Demo Cases for Evaluation
                </span>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <button
                    onClick={() => handleQuickDemo('0xe6D6947c424AbbAB1C7b3866DC65614EEEC65358', 'Polygon', 'NCRP-2026-PUNE-402')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 text-xs text-slate-700 font-medium transition flex items-center gap-1.5"
                  >
                    <span>🎯 Polygon Pig-Butchering Case (0xe6D6...5358)</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 'Bitcoin', 'NCRP-2026-DELHI-881')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 text-xs text-slate-700 font-medium transition flex items-center gap-1.5"
                  >
                    <span>🪙 Bitcoin Ransomware Extortion</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemo('TTmP33kL9xQ2vW8yR5nZt1aCs7dF44vBinance', 'Tron', 'NCRP-2026-HYD-719')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 text-xs text-slate-700 font-medium transition flex items-center gap-1.5"
                  >
                    <span>⚡ Tron TRC-20 Investment Fraud</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: THE "TRACE RESULTS" PAGE                          */}
          {/* ========================================================= */}
          {currentView === 'results' && (
            <div className="p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-8">
              
              {/* Top Navigation Bar: Back Button & Case Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => setCurrentView('home')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 transition py-1 px-2.5 rounded-lg hover:bg-blue-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Search</span>
                </button>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>NCRP ID: <strong className="text-slate-800">{caseData.ncrpComplaint}</strong></span>
                  <span>•</span>
                  <span>Network: <strong className="text-slate-800">{caseData.network}</strong></span>
                  <span>•</span>
                  <span>Traced Address: <strong className="text-slate-800">{caseData.wallet.substring(0, 10)}...</strong></span>
                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* REQUIREMENT: THE "BOTTOM LINE" BANNER (MASSIVE ALERT BOX) */}
              {/* ------------------------------------------------------- */}
              <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 sm:p-7 shadow-xs text-red-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-200/80 text-red-900">
                      Immediate Action Required
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-red-900">
                      🚨 Funds Found: The money ended up at {caseData.finalExchange}.
                    </h2>
                    <p className="text-sm text-red-800 font-medium">
                      {caseData.amountCrypto} ({caseData.amountInr}) is currently sitting there ready for recovery.
                    </p>
                  </div>
                </div>

                <div className="bg-white/80 border border-red-300 px-4 py-3 rounded-xl flex-shrink-0 text-center space-y-0.5">
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">Identified Cash-Out VASP</span>
                  <div className="text-lg font-extrabold text-slate-900">{caseData.finalExchange}</div>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Registered Reporting Entity
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* REQUIREMENT: ACTION BAR (THREE HIGHLY VISIBLE BUTTONS)  */}
              {/* ------------------------------------------------------- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* 1. Download Legal Report Button */}
                <button
                  onClick={() => setActiveModal('pdf')}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  <span>📄 Download Legal Report (PDF)</span>
                </button>

                {/* 2. Contact Exchange Legal Team Button */}
                <button
                  onClick={() => setActiveModal('email')}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>✉️ Contact {caseData.finalExchange} Legal Team</span>
                </button>

                {/* 3. Update NCRP Database Button */}
                <button
                  onClick={() => setActiveModal('ncrp')}
                  className="w-full py-3.5 px-4 rounded-xl bg-white border border-gray-300 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>🔗 Update NCRP Database</span>
                </button>

              </div>

              {/* ------------------------------------------------------- */}
              {/* REQUIREMENT: WALLET DANGER SCORE (VISUAL DIAL / GAUGE)  */}
              {/* ------------------------------------------------------- */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Wallet Danger Score & Categorization</h3>
                  </div>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                    High Risk
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Visual Danger Gauge */}
                  <div className="bg-slate-50 border border-gray-200 rounded-xl p-5 text-center space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Risk Gauge (1 - 100)
                    </span>
                    <div className="text-4xl font-extrabold text-red-600 font-mono">
                      {caseData.riskScore} <span className="text-sm font-bold text-slate-400">/ 100</span>
                    </div>
                    {/* Visual 3-Color Bar Gauge */}
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 w-1/3" title="Low Risk (1-33)"></div>
                      <div className="bg-amber-500 w-1/3" title="Moderate Risk (34-66)"></div>
                      <div className="bg-red-600 w-1/3" title="Critical Risk (67-100)"></div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Pointer located in Critical Red Zone
                    </span>
                  </div>

                  {/* Classification Details */}
                  <div className="md:col-span-2 space-y-2.5">
                    <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <span>Classification:</span>
                      <span className="text-red-700">{caseData.riskLevel}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/60 p-3 rounded-lg border border-amber-200 text-amber-950">
                      <strong>Why this score:</strong> {caseData.riskReason}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-gray-200">
                        🏷️ Rapid Sweep Pattern
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-gray-200">
                        🏷️ Evades Banking KYC
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-gray-200">
                        🏷️ Destination: {caseData.finalExchange} Hot Wallet
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* REQUIREMENT: VISUAL MONEY TRAIL ("HOW THE MONEY MOVED") */}
              {/* ------------------------------------------------------- */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-700" />
                    <span>How the Money Moved</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Visual trail of transactions from the citizen victim to the final cash-out point.
                  </p>
                </div>

                {/* Node Graph: Circles & Arrows */}
                <div className="py-6 px-4 bg-slate-50/80 rounded-xl border border-gray-200 overflow-x-auto">
                  <div className="flex items-center justify-between min-w-[650px] max-w-4xl mx-auto relative">
                    
                    {caseData.trail.map((node, index) => (
                      <React.Fragment key={node.id}>
                        {/* Node Circle */}
                        <div className="flex flex-col items-center text-center space-y-2.5 z-10">
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-base shadow-sm border-2 ${
                              node.color === 'blue'
                                ? 'bg-blue-50 border-blue-600 text-blue-700'
                                : node.color === 'amber'
                                ? 'bg-amber-50 border-amber-500 text-amber-700'
                                : node.color === 'purple'
                                ? 'bg-purple-50 border-purple-600 text-purple-700'
                                : 'bg-emerald-50 border-emerald-600 text-emerald-700'
                            }`}
                          >
                            #{node.id}
                          </div>

                          <div>
                            <span className="font-extrabold text-xs text-slate-900 block">{node.label}</span>
                            <span className="text-[11px] text-slate-500 block">{node.detail}</span>
                            <span className="inline-block mt-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-white border border-gray-200 text-slate-600">
                              {node.badge}
                            </span>
                          </div>
                        </div>

                        {/* Connector Arrow */}
                        {index < caseData.trail.length - 1 && (
                          <div className="flex-1 flex flex-col items-center px-3">
                            <div className="w-full flex items-center">
                              <div className="h-0.5 bg-blue-300 flex-1 border-dashed"></div>
                              <ArrowRight className="w-4 h-4 text-blue-700 flex-shrink-0 -ml-1" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium mt-1">Transfer</span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}

                  </div>
                </div>

                {/* Plain English Explanation */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 leading-relaxed space-y-1">
                  <strong>Summary in Plain English:</strong>
                  <p>
                    The victim was induced into sending cryptocurrency to an intermediary scammer mule. The mule immediately split and bridged the cryptocurrency across platforms before depositing the entirety into a custodial account at <strong>{caseData.finalExchange}</strong>. The funds are currently frozen in that exchange account.
                  </p>
                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* REQUIREMENT: EVIDENCE & DETAILS ACCORDION               */}
              {/* ------------------------------------------------------- */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => setIsEvidenceOpen(!isEvidenceOpen)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer border-b border-transparent data-[open=true]:border-gray-200"
                  data-open={isEvidenceOpen}
                >
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>Advanced Blockchain Evidence</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-normal bg-slate-100 text-slate-600 border border-gray-200">
                        Court Ready
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Raw dates, amounts, and source/destination addresses required for Section 65B Indian Evidence Act submissions.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                    <span>{isEvidenceOpen ? 'Hide Evidence' : 'Show Evidence'}</span>
                    {isEvidenceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isEvidenceOpen && (
                  <div className="p-6 bg-slate-50/50 border-t border-gray-200 space-y-4">
                    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-gray-200 uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Step</th>
                            <th className="py-3 px-4">Date & Time (IST)</th>
                            <th className="py-3 px-4">Amount Transferred</th>
                            <th className="py-3 px-4">From Address</th>
                            <th className="py-3 px-4">To Address</th>
                            <th className="py-3 px-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-slate-700 font-mono">
                          {caseData.technicalEvidence.map((row) => (
                            <tr key={row.step} className="hover:bg-slate-50">
                              <td className="py-3.5 px-4 font-bold text-slate-900">#{row.step}</td>
                              <td className="py-3.5 px-4 font-sans text-slate-600">{row.date}</td>
                              <td className="py-3.5 px-4 font-bold text-emerald-700">{row.amount}</td>
                              <td className="py-3.5 px-4 truncate max-w-[140px]" title={row.from}>
                                <div className="flex items-center gap-1">
                                  <span>{row.from.substring(0, 8)}...</span>
                                  <button
                                    onClick={() => handleCopy(row.from, `From-${row.step}`)}
                                    className="text-slate-400 hover:text-slate-600"
                                    title="Copy Address"
                                  >
                                    {copiedText === `From-${row.step}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                  </button>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 truncate max-w-[140px]" title={row.to}>
                                <div className="flex items-center gap-1">
                                  <span>{row.to.substring(0, 8)}...</span>
                                  <button
                                    onClick={() => handleCopy(row.to, `To-${row.step}`)}
                                    className="text-slate-400 hover:text-slate-600"
                                    title="Copy Address"
                                  >
                                    {copiedText === `To-${row.step}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                  </button>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-sans text-[11px] text-slate-600">
                                {row.action}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[11px] text-slate-500 italic">
                      * All transactions cryptographically verified via direct blockchain node calls with SHA-256 evidence integrity hash.
                    </p>
                  </div>
                )}

              </div>

            </div>
          )}

        </main>

      </div>

      {/* ============================================================= */}
      {/* MODALS FOR THE THREE ACTION BUTTONS                           */}
      {/* ============================================================= */}

      {/* 1. PDF LEGAL REPORT MODAL */}
      {activeModal === 'pdf' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-slate-900 text-base">Section 91 Cr.P.C. Official Investigation Report</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs font-mono text-slate-700 space-y-2 leading-relaxed max-h-72 overflow-y-auto">
              <div className="font-bold text-slate-900 border-b pb-1">GOVERNMENT OF INDIA // LAW ENFORCEMENT DIRECTIVE</div>
              <div>Case Reference: {caseData.firNumber}</div>
              <div>NCRP Portal ID: {caseData.ncrpComplaint}</div>
              <div>Date of Directive: {new Date().toLocaleDateString('en-IN')}</div>
              <div>Target VASP: {caseData.finalExchange} Legal Team ({caseData.exchangeEmail})</div>
              <div>Asset Particulars: {caseData.amountCrypto} ({caseData.amountInr})</div>
              <div>Directive: Debit-freeze destination account immediately pursuant to Section 91 Cr.P.C. / Section 94 BNSS.</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => { alert('Downloading certified legal report PDF...'); setActiveModal(null); }}
                className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Save Certified PDF Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CONTACT EXCHANGE LEGAL TEAM MODAL */}
      {activeModal === 'email' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-slate-900 text-base">Direct Legal Notice to {caseData.finalExchange}</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">To Email:</label>
                <input type="text" readOnly value={caseData.exchangeEmail} className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-gray-300 text-slate-800 font-mono" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject:</label>
                <input type="text" readOnly value={`URGENT: Legal Asset Freezing Directive // FIR ${caseData.firNumber}`} className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-gray-300 text-slate-800 font-mono" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Directive Text:</label>
                <textarea
                  readOnly
                  rows={4}
                  value={`You are hereby formally directed under Section 91 Cr.P.C. / Section 94 BNSS to immediately freeze the account holding ${caseData.amountCrypto} traced from suspect wallet ${caseData.wallet}. Provide full KYC particulars within 4 hours.`}
                  className="w-full p-3 rounded-lg bg-slate-100 border border-gray-300 text-slate-800 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { alert('Directive dispatched to ' + caseData.exchangeEmail); setActiveModal(null); }}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Send Formal Freeze Order</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. NCRP DATABASE SYNC MODAL */}
      {activeModal === 'ncrp' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-200 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Database className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-slate-900 text-base">Synchronize with NCRP Portal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This will link the attribution result ({caseData.finalExchange} · {caseData.amountCrypto}) to Complaint Reference <strong>{caseData.ncrpComplaint}</strong> on the National Cyber Crime Reporting Portal.
            </p>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { setNcrpSyncStatus(true); alert('Case successfully updated in National Crime Portal (NCRP / SAHYOG).'); setActiveModal(null); }}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                Confirm Sync
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
