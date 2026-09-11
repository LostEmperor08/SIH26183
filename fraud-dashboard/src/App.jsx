import React, { useState, useEffect, useMemo } from 'react';
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
  Layers,
  Sun,
  Moon,
  Flame,
  Shuffle,
  GitFork,
  Radio,
  Share2,
  Lock,
  PhoneCall,
  User,
  AlertTriangle,
  FolderLock,
  Download,
  Gavel,
  BadgeCheck,
  CornerDownRight
} from 'lucide-react';

// ============================================================================
// SELF-CONTAINED HACKATHON DATASETS (POLYGON, TRON, BITCOIN)
// ============================================================================
const DEMO_CASES = {
  polygon: {
    caseInfo: {
      ncrpId: "2026/NCRP/892110",
      firNumber: "FIR-402/2026 (Cyber Crime PS, Bengaluru)",
      officer: "Insp. R. Deshmukh",
      station: "Cyber Crime PS, Bengaluru",
      timestamp: "11-Sep-2026 21:45:10 IST",
      riskScore: 92,
      riskLevel: "CRITICAL_FRAUD",
      riskLabel: "Critical Risk (Known Scam Transit Mule)",
      totalValueUsdt: "25,000 USDT",
      totalValueInr: "₹21,25,000 INR",
      targetVasp: "Binance Exchange",
      vaspComplianceEmail: "law-enforcement@binance.com",
      vaspStatus: "FIU-IND Registered (Reporting Entity #FIU-2023-VASP-88)",
      unspentStatus: "Deposit landed 18 mins ago — Unspent in Hot Wallet — Immediate Freeze Required",
      network: "Polygon",
      crimeType: "Part-Time Task Scam / Pig-Butchering Fraud"
    },
    nodes: [
      {
        id: "1",
        label: "Victim Citizen",
        subLabel: "Citizen Wallet (Pune)",
        type: "VICTIM",
        address: "0x71C85782B3a982E47833005A3A00000000000001",
        chain: "Polygon",
        status: "Clean",
        time: "10 Sep 2026, 14:10 IST",
        volume: "25,000 USDT (₹21.25L)",
        behavior: "Citizen was coerced into transferring life savings into a fake trading task platform."
      },
      {
        id: "2",
        label: "Burner Transit Mule",
        subLabel: "Rapid Layering Mule",
        type: "BURNER_MULE",
        address: "0xe6D6947c424AbbAB1C7b3866DC65614EEEC65358",
        chain: "Polygon",
        status: "Anomaly: Rapid Drain",
        timeSpent: "2m 14s",
        time: "10 Sep 2026, 14:12 IST",
        volume: "25,000 USDT (₹21.25L)",
        behavior: "Received 25,000 USDT from victim and completely emptied balance within 134 seconds."
      },
      {
        id: "3",
        label: "Cross-Chain Asset Bridge",
        subLabel: "Stargate / Across Bridge",
        type: "BRIDGE",
        address: "0x45A9102B3cda982E47833005A3A000000000088bc",
        chain: "Polygon ➔ Ethereum",
        status: "Cross-Chain Router",
        timeSpent: "5m 40s",
        time: "10 Sep 2026, 14:15 IST",
        volume: "24,980 USDT (₹21.23L)",
        behavior: "Automated swap converting Polygon token to Ethereum Mainnet to break chain tracking."
      },
      {
        id: "4",
        label: "Target Exchange (Binance)",
        subLabel: "Custodial Hot Deposit",
        type: "EXCHANGE",
        address: "0x28c6c06298d514db089934071355e5743bf21d60",
        chain: "Ethereum",
        status: "Target: Recoverable",
        time: "10 Sep 2026, 14:18 IST",
        volume: "24,950 USDT (₹21.20L)",
        isActionable: true,
        behavior: "Final consolidation deposit into Binance Centralized Account UID #8849201. Unspent and actionable."
      }
    ],
    edges: [
      { from: "1", to: "2", amount: "25,000 USDT", inr: "₹21,25,000", type: "RAPID", duration: "2m 14s", txHash: "0x9ab8134fa8892147812bc312891fa30df9821478" },
      { from: "2", to: "3", amount: "24,980 USDT", inr: "₹21,23,300", type: "BRIDGE_HOP", duration: "5m 40s", txHash: "0x1fe227918ba982147812bc312891fa30df9821489" },
      { from: "3", to: "4", amount: "24,950 USDT", inr: "₹21,20,750", type: "DEPOSIT", duration: "10m 12s", txHash: "0x7bb90a1048892147812bc312891fa30df9821404" }
    ],
    anomalies: [
      { icon: "flame", tag: "Burner Sweep", text: "100% of received funds drained within 134 seconds." },
      { icon: "shuffle", tag: "Layering / Mule", text: "Automated routing through intermediary high-velocity mule." },
      { icon: "bridge", tag: "Cross-Chain Bridge", text: "Automated bridge swap jumping from Polygon to Ethereum." }
    ]
  },
  tron: {
    caseInfo: {
      ncrpId: "2026/NCRP/781092",
      firNumber: "FIR-719/2026 (Cyberabad Cyber PS)",
      officer: "Insp. R. Deshmukh",
      station: "Cyber Crime PS, Bengaluru",
      timestamp: "11-Sep-2026 21:50:00 IST",
      riskScore: 89,
      riskLevel: "CRITICAL_FRAUD",
      riskLabel: "Critical Risk (SE Asian Telegram Syndicate)",
      totalValueUsdt: "40,000 USDT",
      totalValueInr: "₹34,00,000 INR",
      targetVasp: "CoinDCX India",
      vaspComplianceEmail: "nodal-lea@coindcx.com",
      vaspStatus: "FIU-IND Registered Domestic VASP (Neblio Technologies)",
      unspentStatus: "Landed 42 mins ago — Held in domestic account — Section 94 BNSS Order Issued",
      network: "TRON",
      crimeType: "Telegram Investment Scam"
    },
    nodes: [
      { id: "1", label: "Victim", subLabel: "Doctor (Hyderabad)", type: "VICTIM", address: "TYD1xK8...92Ka", chain: "Tron TRC-20", status: "Clean", time: "11 Sep 2026, 12:00 IST", volume: "40,000 USDT", behavior: "Sent funds under instructions of Telegram investment bot." },
      { id: "2", label: "Burner Mule", subLabel: "Syndicate Transit", type: "BURNER_MULE", address: "TJ4bK8x...dF99", chain: "Tron TRC-20", status: "Anomaly: Rapid Drain", timeSpent: "3m 10s", time: "11 Sep 2026, 12:03 IST", volume: "40,000 USDT", behavior: "High-frequency pass-through account." },
      { id: "3", label: "Mixer Router", subLabel: "TRC-20 Tumbler", type: "MIXER", address: "TUpMhEr...77Lk", chain: "Tron TRC-20", status: "Obfuscation Router", timeSpent: "8m 15s", time: "11 Sep 2026, 12:11 IST", volume: "39,900 USDT", behavior: "Splits token transfer across 3 child wallets." },
      { id: "4", label: "Target Exchange (CoinDCX)", subLabel: "Domestic Hot Wallet", type: "EXCHANGE", address: "0x72a53cd42eb1b5055835107502f5045608c0a54f", chain: "EVM", status: "Target: Domestic", isActionable: true, time: "11 Sep 2026, 12:42 IST", volume: "39,800 USDT", behavior: "Domestic custodial wallet in Mumbai. Subject to instant debit-freeze." }
    ],
    edges: [
      { from: "1", to: "2", amount: "40,000 USDT", inr: "₹34,00,000", type: "RAPID", duration: "3m 10s", txHash: "0xaa812...bc12" },
      { from: "2", to: "3", amount: "39,900 USDT", inr: "₹33,91,500", type: "MIXER_HOP", duration: "8m 15s", txHash: "0xbb923...cd34" },
      { from: "3", to: "4", amount: "39,800 USDT", inr: "₹33,83,000", type: "DEPOSIT", duration: "31m 00s", txHash: "0xcc034...de56" }
    ],
    anomalies: [
      { icon: "flame", tag: "Burner Sweep", text: "Immediate zero-balance drain in 190 seconds." },
      { icon: "shuffle", tag: "Privacy Mixer", text: "Interaction with high-risk mixer contracts." },
      { icon: "building", tag: "Domestic Cash-Out", text: "CoinDCX India destination under direct Indian PMLA jurisdiction." }
    ]
  },
  bitcoin: {
    caseInfo: {
      ncrpId: "2026/NCRP/650912",
      firNumber: "FIR-128/2026 (State Cyber Police, Delhi)",
      officer: "Insp. R. Deshmukh",
      station: "Cyber Crime PS, Bengaluru",
      timestamp: "11-Sep-2026 21:52:00 IST",
      riskScore: 96,
      riskLevel: "CRITICAL_FRAUD",
      riskLabel: "Critical Risk (LockBit Ransomware Cluster)",
      totalValueUsdt: "2.45 BTC",
      totalValueInr: "₹1,42,10,000 INR",
      targetVasp: "Kraken Exchange",
      vaspComplianceEmail: "compliance@kraken.com",
      vaspStatus: "Global Exchange (US Jurisdiction - MLAT / Interpol Channel)",
      unspentStatus: "Arrived 1 hr ago — Partial liquidation attempt detected — Freeze Notice Priority 1",
      network: "Bitcoin",
      crimeType: "Corporate Hospital Ransomware Attack"
    },
    nodes: [
      { id: "1", label: "Victim (Hospital)", subLabel: "Delhi Medical Corp", type: "VICTIM", address: "bc1qa77...99x0", chain: "Bitcoin", status: "Clean", time: "11 Sep 2026, 09:30 IST", volume: "2.45 BTC", behavior: "Ransom payout forced by data encryption locker." },
      { id: "2", label: "Burner Mule", subLabel: "Extortion Collector", type: "BURNER_MULE", address: "1A1zP1e...Divf", chain: "Bitcoin", status: "Anomaly: High Velocity", timeSpent: "4m 50s", time: "11 Sep 2026, 09:35 IST", volume: "2.45 BTC", behavior: "Single-use extortion collection wallet." },
      { id: "3", label: "Peel Chain Splitter", subLabel: "UTXO Obfuscator", type: "MIXER", address: "3J98t1W...Fk81", chain: "Bitcoin", status: "Peel Chain Split", timeSpent: "14m 20s", time: "11 Sep 2026, 09:50 IST", volume: "2.44 BTC", behavior: "Dismantles UTXOs into micro increments." },
      { id: "4", label: "Target Exchange (Kraken)", subLabel: "Custodial Deposit", type: "EXCHANGE", address: "0x2910543af39aba0cd09dbb2d50200b3e800a63d2", chain: "Bitcoin/Kraken", status: "Target: Actionable", isActionable: true, time: "11 Sep 2026, 10:45 IST", volume: "2.43 BTC", behavior: "Deposited into Kraken cold cluster. Subject to urgent MLAT / Section 94 notice." }
    ],
    edges: [
      { from: "1", to: "2", amount: "2.45 BTC", inr: "₹1,42,10,000", type: "RAPID", duration: "4m 50s", txHash: "4a5e1e4baab89...012" },
      { from: "2", to: "3", amount: "2.44 BTC", inr: "₹1,41,52,000", type: "MIXER_HOP", duration: "14m 20s", txHash: "8c91a02fe1982...345" },
      { from: "3", to: "4", amount: "2.43 BTC", inr: "₹1,40,94,000", type: "DEPOSIT", duration: "55m 10s", txHash: "1b2c3d4e5f6a7...678" }
    ],
    anomalies: [
      { icon: "flame", tag: "Ransom Extortion", text: "Associated with verified LockBit 3.0 ransomware extortion." },
      { icon: "shuffle", tag: "Peel Chain", text: "Classic multi-hop UTXO peel chain to evade basic heuristics." },
      { icon: "building", tag: "Offshore VASP", text: "Kraken custody requires immediate 24/7 law enforcement preservation notice." }
    ]
  }
};

// ============================================================================
// MAIN COMPONENT ARCHITECTURE
// ============================================================================
export default function App() {
  // Theme State: Light (Police Desk) vs Dark (24/7 Command Center)
  const [darkMode, setDarkMode] = useState(false);

  // Sync with document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Navigation State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'results'
  const [activeNav, setActiveNav] = useState('trace'); // 'trace' | 'intelligence' | 'vault' | 'directory' | 'statutory'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Search & Ingestion State
  const [inputAddress, setInputAddress] = useState('');
  const [ncrpInput, setNcrpInput] = useState('');
  const [detectedChain, setDetectedChain] = useState('POLYGON');
  const [isSearching, setIsSearching] = useState(false);

  // Active Case Dataset
  const [activeCaseKey, setActiveCaseKey] = useState('polygon');
  const activeCase = useMemo(() => DEMO_CASES[activeCaseKey], [activeCaseKey]);

  // Interactive Graph Tooltip Selection
  const [selectedNode, setSelectedNode] = useState(null);

  // Accordion & Modal States
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'bnss' | 'pdf' | 'ncrp' | null
  const [copiedBadge, setCopiedBadge] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedBadge(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedBadge(null), 2000);
  };

  // Smart Chain Auto-Detection on input
  const handleAddressChange = (val) => {
    setInputAddress(val);
    const trimmed = val.trim();
    if (trimmed.startsWith('0x') && trimmed.length === 42) {
      setDetectedChain('POLYGON');
    } else if (trimmed.startsWith('T') && trimmed.length > 25) {
      setDetectedChain('TRON');
    } else if (trimmed.startsWith('1') || trimmed.startsWith('3') || trimmed.startsWith('bc1')) {
      setDetectedChain('BITCOIN');
    } else if (trimmed.length > 30 && !trimmed.startsWith('0x')) {
      setDetectedChain('SOLANA');
    }
  };

  // Execute Trace
  const handleExecuteTrace = (e) => {
    if (e) e.preventDefault();
    if (!inputAddress.trim()) {
      showToast('Please enter a suspect wallet address.');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      // Determine case match or fallback to polygon
      if (inputAddress.toLowerCase().includes('tyd') || inputAddress.startsWith('T')) {
        setActiveCaseKey('tron');
      } else if (inputAddress.startsWith('1') || inputAddress.startsWith('3') || inputAddress.startsWith('bc1')) {
        setActiveCaseKey('bitcoin');
      } else {
        setActiveCaseKey('polygon');
      }
      setCurrentView('results');
      setActiveNav('intelligence');
      setSelectedNode(null);
      showToast('Trace complete! Funds located at receiving exchange.');
    }, 850);
  };

  const handleSelectDemo = (key, address, ncrp) => {
    setActiveCaseKey(key);
    setInputAddress(address);
    setNcrpInput(ncrp);
    handleAddressChange(address);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col font-sans ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>

      {/* ==================================================================== */}
      {/* 1. TOP AUTHORITY BAR                                                  */}
      {/* ==================================================================== */}
      <header className={`h-14 border-b px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30 transition-colors duration-200 ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        
        {/* Left: Ashoka Emblem + MHA/I4C Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="India Flag">🇮🇳</span>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 font-extrabold text-xs tracking-tight uppercase">
                <span className={darkMode ? 'text-white' : 'text-slate-900'}>Ministry of Home Affairs</span>
                <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>|</span>
                <span className="text-blue-600 dark:text-blue-400">I4C</span>
              </div>
              <div className={`text-[10px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                National Cybercrime Threat Analytics Unit (NCTAU)
              </div>
            </div>
          </div>
        </div>

        {/* Center: Live Status Indicator */}
        <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
          darkMode 
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800' 
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SECURE LEA NODE • FIU-IND GATEWAY ACTIVE</span>
        </div>

        {/* Right: Active Officer Session + Theme Switcher */}
        <div className="flex items-center gap-3 text-xs">
          <div className={`hidden sm:flex items-center gap-2 font-mono ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">Insp. R. Deshmukh, LEA-9082</span>
            <span className={darkMode ? 'text-slate-700' : 'text-slate-300'}>|</span>
            <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Cyber Crime PS, Bengaluru</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-1.5 p-1.5 px-3 rounded-lg border text-xs font-bold transition cursor-pointer ${
              darkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs'
            }`}
            title="Toggle Light / Dark Mode"
          >
            {darkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden md:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2. BODY LAYOUT: SIDEBAR + MAIN CONTENT                                */}
      {/* ==================================================================== */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">

        {/* LEFT COLLAPSIBLE NAVIGATION SIDEBAR */}
        <aside className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } transition-all duration-300 border-r flex flex-col flex-shrink-0 z-20 ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}>
          
          {/* Header with Toggle */}
          <div className={`p-3 border-b flex items-center justify-between ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            {sidebarOpen && (
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Forensic Desk</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-1 rounded transition mx-auto cursor-pointer ${
                darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
              title="Toggle Sidebar Width"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-1 flex-1">
            
            {/* 1. New Trace */}
            <button
              onClick={() => { setCurrentView('home'); setActiveNav('trace'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeNav === 'trace' && currentView === 'home'
                  ? darkMode
                    ? 'bg-blue-950/50 text-blue-300 border border-blue-800'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                  : darkMode
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              {sidebarOpen && <span>New Trace</span>}
            </button>

            {/* 2. Active Intelligence */}
            <button
              onClick={() => { setCurrentView('results'); setActiveNav('intelligence'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeNav === 'intelligence' && currentView === 'results'
                  ? darkMode
                    ? 'bg-blue-950/50 text-blue-300 border border-blue-800'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                  : darkMode
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Radio className="w-4 h-4 text-amber-500 flex-shrink-0" />
              {sidebarOpen && <span>Active Intelligence</span>}
            </button>

            {/* 3. NCRP Case Vault */}
            <button
              onClick={() => setActiveNav('vault')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeNav === 'vault'
                  ? darkMode
                    ? 'bg-blue-950/50 text-blue-300 border border-blue-800'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                  : darkMode
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FolderLock className="w-4 h-4 text-slate-500 flex-shrink-0" />
              {sidebarOpen && <span>NCRP Case Vault</span>}
            </button>

            {/* 4. VASP Nodal Directory */}
            <button
              onClick={() => setActiveNav('directory')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeNav === 'directory'
                  ? darkMode
                    ? 'bg-blue-950/50 text-blue-300 border border-blue-800'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                  : darkMode
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
              {sidebarOpen && <span>VASP Nodal Directory</span>}
            </button>

            {/* 5. Legal Statutory Desk */}
            <button
              onClick={() => setActiveNav('statutory')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeNav === 'statutory'
                  ? darkMode
                    ? 'bg-blue-950/50 text-blue-300 border border-blue-800'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                  : darkMode
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Gavel className="w-4 h-4 text-slate-500 flex-shrink-0" />
              {sidebarOpen && <span>Legal Statutory Desk</span>}
            </button>

          </nav>

          {/* Sidebar Footer: Section 94 Mandate Badge */}
          {sidebarOpen && (
            <div className={`p-3 m-3 rounded-xl border text-[10px] leading-relaxed space-y-1 ${
              darkMode 
                ? 'bg-slate-950 border-slate-800 text-slate-400' 
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <Scale className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className={darkMode ? 'text-slate-200' : 'text-slate-800'}>Statutory Mandate</span>
              </div>
              <p>Section 94 BNSS 2023 / 4-Hour Emergency Freeze Directive binding on all exchanges.</p>
            </div>
          )}
        </aside>

        {/* MAIN CONTENT WORKSPACE */}
        <main className={`flex-1 overflow-y-auto flex flex-col ${
          darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>
          
          {/* ================================================================ */}
          {/* SCREEN 1: SEARCH & INGESTION VIEW ("Google-Search Simplicity")     */}
          {/* ================================================================ */}
          {currentView === 'home' && activeNav === 'trace' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 max-w-4xl mx-auto w-full">
              
              {/* Header Title with High Contrast */}
              <div className="text-center space-y-3 mb-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                  darkMode 
                    ? 'bg-blue-950/60 text-blue-300 border-blue-800' 
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Problem ID: SIH26183 • Indian Cyber Crime Coordination Centre</span>
                </div>

                <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Instant Blockchain Fund Attribution Engine
                </h1>

                <p className={`text-sm max-w-lg mx-auto leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Autonomous fund tracking, anomaly detection, and statutory asset freezing for police officers and investigating agencies.
                </p>
              </div>

              {/* Large Centered Card */}
              <div className={`w-full rounded-2xl border p-6 sm:p-8 space-y-6 ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 shadow-sm text-white' 
                  : 'bg-white border-slate-200 shadow-sm text-slate-900'
              }`}>
                
                <form onSubmit={handleExecuteTrace} className="space-y-5">
                  
                  {/* Extra-Large Search Bar */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Enter Suspect Wallet Address (EVM 0x..., Bitcoin 1/3/bc1..., TRON T...)
                    </label>
                    <div className="relative flex items-center">
                      <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={inputAddress}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder="Paste suspect wallet address..."
                        className={`w-full pl-12 pr-24 py-4 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 transition shadow-xs ${
                          darkMode 
                            ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const clip = await navigator.clipboard.readText();
                            handleAddressChange(clip);
                            showToast('Pasted address from clipboard!');
                          } catch (e) {
                            showToast('Clipboard access denied.');
                          }
                        }}
                        className={`absolute right-3 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition border cursor-pointer ${
                          darkMode 
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                      >
                        Paste
                      </button>
                    </div>
                  </div>

                  {/* Smart Chain Detection Pills & NCRP Complaint Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    
                    {/* Chain Auto-Detection Pills */}
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Blockchain Network
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {['POLYGON', 'TRON', 'BITCOIN', 'ETH', 'SOLANA'].map((chain) => (
                          <button
                            key={chain}
                            type="button"
                            onClick={() => setDetectedChain(chain)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition border cursor-pointer ${
                              detectedChain === chain
                                ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                                : darkMode
                                  ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
                            }`}
                          >
                            {chain}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* NCRP Case Link */}
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        NCRP Complaint No. / Crime Ref No.
                      </label>
                      <input
                        type="text"
                        value={ncrpInput}
                        onChange={(e) => setNcrpInput(e.target.value)}
                        placeholder="e.g. 2026/NCRP/892110"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
                          darkMode 
                            ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                  </div>

                  {/* Primary Blue CTA Button */}
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    {isSearching ? (
                      <>
                        <RotateCcw className="w-5 h-5 animate-spin" />
                        <span>Scanning Multi-Chain Nodes & Attributing Exchange...</span>
                      </>
                    ) : (
                      <>
                        <span>⚡ Trace Funds in Real Time</span>
                      </>
                    )}
                  </button>

                </form>

              </div>

              {/* Evaluation Demo Scenario Chips */}
              <div className="mt-8 text-center space-y-3 w-full">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  darkMode ? 'text-slate-500' : 'text-slate-500'
                }`}>
                  Evaluation Demo Scenario Chips (One-Click Auto-Fill)
                </span>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <button
                    onClick={() => handleSelectDemo('polygon', '0xe6D6947c424AbbAB1C7b3866DC65614EEEC65358', '2026/NCRP/892110')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                      darkMode 
                        ? 'bg-red-950/40 text-red-300 border-red-900 hover:bg-red-900/60' 
                        : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100 shadow-xs'
                    }`}
                  >
                    <span>🔴 Demo: Polygon Pig-Butchering Scam (0xe6D6...5358)</span>
                  </button>

                  <button
                    onClick={() => handleSelectDemo('tron', 'TYD1xK8vW2yP5nRt8zC1aXs6dF992Ka', '2026/NCRP/781092')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                      darkMode 
                        ? 'bg-amber-950/40 text-amber-300 border-amber-900 hover:bg-amber-900/60' 
                        : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 shadow-xs'
                    }`}
                  >
                    <span>🟡 Demo: TRON USDT Task-Based Fraud (TYD1x...92Ka)</span>
                  </button>

                  <button
                    onClick={() => handleSelectDemo('bitcoin', 'bc1qa77j99x0k8vW2yP5nRt8zC1aXs6dF', '2026/NCRP/650912')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                      darkMode 
                        ? 'bg-purple-950/40 text-purple-300 border-purple-900 hover:bg-purple-900/60' 
                        : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100 shadow-xs'
                    }`}
                  >
                    <span>🟣 Demo: Bitcoin Ransomware Extortion (bc1qa...77x0)</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* SCREEN 2: TRACE RESULTS & ACTION DASHBOARD                        */}
          {/* ================================================================ */}
          {currentView === 'results' && (
            <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full space-y-6">
              
              {/* Back to Search Nav */}
              <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${
                darkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <button
                  onClick={() => setCurrentView('home')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Start New Trace</span>
                </button>

                <div className={`flex items-center gap-2.5 text-xs font-mono ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <span>FIR: <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{activeCase.caseInfo.firNumber}</strong></span>
                  <span>•</span>
                  <span>NCRP ID: <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{activeCase.caseInfo.ncrpId}</strong></span>
                  <span>•</span>
                  <span>Network: <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{activeCase.caseInfo.network}</strong></span>
                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* A. THE BIG VERDICT BANNER (THE "2-SECOND RULE" ALERT)        */}
              {/* ------------------------------------------------------------ */}
              <div className={`rounded-2xl p-6 sm:p-7 border-2 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                darkMode 
                  ? 'bg-red-950/30 border-red-500 text-red-100' 
                  : 'bg-red-50 border-red-500 text-red-950'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                      darkMode ? 'bg-red-900/60 text-red-200' : 'bg-red-200 text-red-900'
                    }`}>
                      <span>🚨 RECOVERABLE ASSETS IDENTIFIED AT CUSTODIAL EXCHANGE</span>
                    </div>
                    <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                      darkMode ? 'text-white' : 'text-red-950'
                    }`}>
                      Target Exchange: {activeCase.caseInfo.targetVasp}
                    </h2>
                    <p className={`text-sm font-semibold ${
                      darkMode ? 'text-red-200' : 'text-red-800'
                    }`}>
                      Located Volume: <strong className={`text-base font-extrabold ${darkMode ? 'text-white' : 'text-red-950'}`}>{activeCase.caseInfo.totalValueUsdt} ({activeCase.caseInfo.totalValueInr})</strong>
                    </p>
                    <div className={`text-xs flex items-center gap-1 font-mono ${
                      darkMode ? 'text-red-300' : 'text-red-700'
                    }`}>
                      <span>⚡ {activeCase.caseInfo.unspentStatus}</span>
                    </div>
                  </div>
                </div>

                {/* VASP Verification Card */}
                <div className={`px-5 py-3.5 rounded-xl border flex-shrink-0 text-center space-y-1 ${
                  darkMode ? 'bg-slate-900 border-red-900/60' : 'bg-white border-red-300 shadow-xs'
                }`}>
                  <span className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider block">FIU-IND Registration</span>
                  <div className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{activeCase.caseInfo.vaspStatus}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" /> Compliance Officer Active
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* B. PRIMARY POLICE DIRECTIVE ACTION BAR                       */}
              {/* ------------------------------------------------------------ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* 1. Draft Section 94 BNSS Freeze Notice */}
                <button
                  onClick={() => setActiveModal('bnss')}
                  className="py-4 px-4 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                >
                  <Gavel className="w-4 h-4" />
                  <span>🔴 Draft Section 94 BNSS Freeze Notice</span>
                </button>

                {/* 2. Export Court-Ready PDF (Section 63 BSA) */}
                <button
                  onClick={() => setActiveModal('pdf')}
                  className="py-4 px-4 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 cursor-pointer bg-blue-700 hover:bg-blue-800 text-white"
                >
                  <FileDown className="w-4 h-4" />
                  <span>📄 Export Court-Ready PDF (Section 63 BSA)</span>
                </button>

                {/* 3. Sync Finding to NCRP / SAHYOG Portal */}
                <button
                  onClick={() => setActiveModal('ncrp')}
                  className={`py-4 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer border ${
                    darkMode 
                      ? 'bg-slate-900 border-slate-700 text-slate-100 hover:bg-slate-800' 
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>🔗 Sync Finding to NCRP / SAHYOG Portal</span>
                </button>

              </div>

              {/* ------------------------------------------------------------ */}
              {/* C. THREAT METRIC & ANOMALY CATEGORIZATION DIAL               */}
              {/* ------------------------------------------------------------ */}
              <div className={`rounded-2xl p-6 border shadow-sm space-y-4 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center justify-between border-b pb-3 ${
                  darkMode ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Threat Metric & Behavioral Anomaly Engine</span>
                  </div>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                    High Confidence Forensic Tag
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Visual 1-100 Gauge */}
                  <div className={`rounded-xl p-5 border text-center space-y-2 ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Fraud Danger Score
                    </span>
                    <div className="text-4xl font-black font-mono text-red-600 dark:text-red-500">
                      {activeCase.caseInfo.riskScore} <span className="text-sm font-bold text-slate-400">/ 100</span>
                    </div>
                    {/* Semicircle / 3-Color Bar Gauge */}
                    <div className={`w-full h-3 rounded-full overflow-hidden flex ${
                      darkMode ? 'bg-slate-800' : 'bg-slate-200'
                    }`}>
                      <div className="bg-emerald-500 w-1/3" title="Low Risk (1-33)"></div>
                      <div className="bg-amber-500 w-1/3" title="Moderate Risk (34-66)"></div>
                      <div className="bg-red-600 w-1/3" title="Critical Risk (67-100)"></div>
                    </div>
                    <span className="text-[11px] font-bold text-red-600 dark:text-red-400 block">
                      Critical Scam Transit Mule
                    </span>
                  </div>

                  {/* Anomaly Tags */}
                  <div className="md:col-span-2 space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Automated Heuristic Anomaly Indicators:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {activeCase.anomalies.map((anom, idx) => (
                        <div key={idx} className={`p-3 rounded-xl border space-y-1 ${
                          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div className={`flex items-center gap-1.5 font-bold text-xs ${
                            darkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {anom.icon === 'flame' && <Flame className="w-3.5 h-3.5 text-red-500" />}
                            {anom.icon === 'shuffle' && <Shuffle className="w-3.5 h-3.5 text-amber-500" />}
                            {anom.icon === 'bridge' && <GitFork className="w-3.5 h-3.5 text-purple-500" />}
                            {anom.icon === 'building' && <Building2 className="w-3.5 h-3.5 text-emerald-500" />}
                            <span>{anom.tag}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${
                            darkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {anom.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* 5. SMART GRAPHING SYSTEM & ANOMALY DETECTION ENGINE          */}
              {/* ------------------------------------------------------------ */}
              <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm space-y-6 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center justify-between border-b pb-4 ${
                  darkMode ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <div>
                    <h3 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      <Layers className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                      <span>The Money Trail (Automated Topological Graph)</span>
                    </h3>
                    <p className={`text-xs mt-0.5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Hover or click any node circle to inspect behavioral context. Colored arrows indicate transaction velocity.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    4 Nodes • 3 Directed Hops
                  </span>
                </div>

                {/* Visual Node Graph Canvas (Interactive DOM Nodes + Edge Logic) */}
                <div className={`p-6 sm:p-8 rounded-xl border overflow-x-auto ${
                  darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between min-w-[700px] max-w-4xl mx-auto relative">
                    
                    {activeCase.nodes.map((node, index) => {
                      const isVictim = node.type === 'VICTIM';
                      const isBurner = node.type === 'BURNER_MULE';
                      const isMixer = node.type === 'MIXER';
                      const isBridge = node.type === 'BRIDGE';
                      const isExchange = node.type === 'EXCHANGE';

                      const edge = activeCase.edges[index];

                      return (
                        <React.Fragment key={node.id}>
                          {/* Node Circle */}
                          <div 
                            onClick={() => setSelectedNode(node)}
                            className="flex flex-col items-center text-center space-y-2.5 z-10 cursor-pointer group"
                          >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 transition transform group-hover:scale-110 ${
                              isVictim 
                                ? 'bg-blue-100 dark:bg-blue-950 border-blue-600 text-blue-700 dark:text-blue-300'
                                : isBurner
                                ? 'bg-red-100 dark:bg-red-950 border-red-500 text-red-600 dark:text-red-400 animate-pulse-glow'
                                : isMixer
                                ? 'bg-purple-100 dark:bg-purple-950 border-purple-600 text-purple-700 dark:text-purple-300'
                                : isBridge
                                ? 'bg-indigo-100 dark:bg-indigo-950 border-indigo-600 text-indigo-700 dark:text-indigo-300'
                                : 'bg-emerald-100 dark:bg-emerald-950 border-emerald-600 text-emerald-700 dark:text-emerald-300 ring-4 ring-emerald-500/20'
                            }`}>
                              {isVictim && <User className="w-7 h-7" />}
                              {isBurner && <Flame className="w-7 h-7" />}
                              {isMixer && <Shuffle className="w-7 h-7" />}
                              {isBridge && <GitFork className="w-7 h-7" />}
                              {isExchange && <Building2 className="w-7 h-7" />}
                            </div>

                            <div className="space-y-0.5">
                              <span className={`font-extrabold text-xs block group-hover:text-blue-600 transition ${
                                darkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                {node.label}
                              </span>
                              <span className={`text-[11px] block font-mono ${
                                darkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                {node.chain}
                              </span>
                              <span className={`inline-block mt-0.5 px-2 py-0.2 rounded-full text-[9px] font-bold border ${
                                isExchange 
                                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' 
                                  : darkMode 
                                  ? 'bg-slate-800 text-slate-300 border-slate-700' 
                                  : 'bg-white text-slate-700 border-slate-300 shadow-2xs'
                              }`}>
                                {isExchange ? 'Verified VASP ✅' : node.status}
                              </span>
                            </div>
                          </div>

                          {/* Edge Connector Arrow */}
                          {edge && (
                            <div className="flex-1 flex flex-col items-center px-2">
                              <span className={`text-[10px] font-mono font-bold mb-1 ${
                                edge.type === 'RAPID' ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-purple-600 dark:text-purple-400'
                              }`}>
                                {edge.type === 'RAPID' ? `⚡ Rapid Sweep (${edge.duration})` : `🌉 Bridge Swap (${edge.duration})`}
                              </span>
                              <div className="w-full flex items-center relative">
                                <svg className="w-full h-3" preserveAspectRatio="none">
                                  <line
                                    x1="0" y1="6" x2="100%" y2="6"
                                    className={edge.type === 'RAPID' ? 'stroke-red-500 animate-flow' : 'stroke-purple-500 animate-flow'}
                                    strokeWidth="2.5"
                                  />
                                </svg>
                                <ArrowRight className={`w-4 h-4 -ml-2 flex-shrink-0 ${
                                  edge.type === 'RAPID' ? 'text-red-600' : 'text-purple-600'
                                }`} />
                              </div>
                              <span className={`text-[11px] font-bold mt-1 font-mono ${
                                darkMode ? 'text-slate-300' : 'text-slate-800'
                              }`}>
                                {edge.amount}
                              </span>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}

                  </div>
                </div>

                {/* Interactive Selected Node Tooltip Card */}
                {selectedNode ? (
                  <div className={`p-4 rounded-xl border space-y-3 ${
                    darkMode 
                      ? 'bg-blue-950/40 border-blue-800 text-slate-200' 
                      : 'bg-blue-50/80 border-blue-200 text-slate-800 shadow-xs'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`font-extrabold text-sm ${
                          darkMode ? 'text-blue-300' : 'text-blue-900'
                        }`}>
                          Inspect Node: {selectedNode.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                          darkMode ? 'bg-slate-900 border-blue-700 text-white' : 'bg-white border-blue-200 text-blue-950'
                        }`}>
                          {selectedNode.type}
                        </span>
                      </div>
                      <button onClick={() => setSelectedNode(null)} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">✕ Close</button>
                    </div>

                    <div className="text-xs leading-relaxed">
                      <strong>Plain English Behavior:</strong> {selectedNode.behavior}
                    </div>

                    <div className={`flex flex-wrap items-center justify-between gap-2 pt-1 border-t text-xs font-mono ${
                      darkMode ? 'border-blue-800' : 'border-blue-200'
                    }`}>
                      <span>Address: <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{selectedNode.address}</strong></span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(selectedNode.address, 'Node Address')}
                          className={`px-2.5 py-1 rounded border text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition ${
                            darkMode 
                              ? 'bg-slate-900 border-blue-700 hover:bg-blue-900 text-white' 
                              : 'bg-white border-blue-300 hover:bg-blue-100 text-slate-900 shadow-xs'
                          }`}
                        >
                          {copiedBadge === 'Node Address' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>Copy Address</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3.5 rounded-xl border text-center text-xs ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    💡 Click on any circle node in the trail above to display plain-English investigative intelligence and full wallet particulars.
                  </div>
                )}

              </div>

              {/* ------------------------------------------------------------ */}
              {/* 6. COURT EVIDENCE VAULT (COLLAPSIBLE ACCORDION)              */}
              {/* ------------------------------------------------------------ */}
              <div className={`rounded-2xl border shadow-sm overflow-hidden ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => setIsEvidenceExpanded(!isEvidenceExpanded)}
                  className={`w-full p-5 sm:p-6 flex items-center justify-between text-left transition cursor-pointer ${
                    darkMode ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <h3 className={`font-bold text-sm flex items-center gap-2 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>⚖️ Advanced Forensic Evidence & Chain of Custody (Court Production)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                        darkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        Section 63 BSA Ready
                      </span>
                    </h3>
                    <p className={`text-xs ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Technical ledger showing timestamps, transaction hashes, and custodial counterparty addresses required for judicial admissibility.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>{isEvidenceExpanded ? 'Hide Technical Table' : 'Show Technical Table'}</span>
                    {isEvidenceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isEvidenceExpanded && (
                  <div className={`p-6 border-t space-y-4 ${
                    darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/60 border-slate-200'
                  }`}>
                    <div className={`overflow-x-auto rounded-xl border ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <table className="w-full text-left text-xs">
                        <thead className={`border-b uppercase text-[10px] font-mono tracking-wider ${
                          darkMode 
                            ? 'bg-slate-800/80 text-slate-300 border-slate-700' 
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          <tr>
                            <th className="py-3 px-4">Step #</th>
                            <th className="py-3 px-4">Timestamp (IST)</th>
                            <th className="py-3 px-4">Transaction Hash</th>
                            <th className="py-3 px-4">From (Label)</th>
                            <th className="py-3 px-4">To (Label)</th>
                            <th className="py-3 px-4">Amount (Crypto & INR)</th>
                            <th className="py-3 px-4">Identified Action</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y font-mono ${
                          darkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'
                        }`}>
                          {activeCase.edges.map((edge, idx) => (
                            <tr key={idx} className={darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                              <td className={`py-3.5 px-4 font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>#0{idx + 1}</td>
                              <td className={`py-3.5 px-4 font-sans ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{activeCase.nodes[idx].time}</td>
                              <td className="py-3.5 px-4 truncate max-w-[130px]" title={edge.txHash}>
                                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                                  <span>{edge.txHash.substring(0, 10)}...</span>
                                  <button onClick={() => copyToClipboard(edge.txHash, `Tx-${idx + 1}`)} className="text-slate-400 hover:text-slate-600">
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">{activeCase.nodes[idx].label}</td>
                              <td className="py-3.5 px-4">{activeCase.nodes[idx + 1].label}</td>
                              <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                                <div>{edge.amount}</div>
                                <div className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{edge.inr}</div>
                              </td>
                              <td className="py-3.5 px-4 font-sans text-[11px]">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  edge.type === 'RAPID' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                                }`}>
                                  {edge.type}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Footer Certification & SHA-256 Stamp */}
                    <div className={`p-4 rounded-xl border space-y-1.5 text-[11px] font-mono ${
                      darkMode 
                        ? 'bg-slate-900 border-slate-800 text-slate-400' 
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                          Cryptographic Hash Integrity Stamp:
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                        </span>
                      </div>
                      <p className="font-sans italic">
                        "Electronically generated and timestamped under Section 63 of Bharatiya Sakshya Adhiniyam, 2023 (BSA). Produced for formal submission to Court of Competent Jurisdiction."
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* VIEW: NCRP CASE VAULT                                             */}
          {/* ================================================================ */}
          {activeNav === 'vault' && (
            <div className="p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-6">
              <div className={`flex items-center justify-between border-b pb-4 ${
                darkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div>
                  <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    <FolderLock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span>NCRP Case Vault // Active Police Docket</span>
                  </h2>
                  <p className={`text-xs mt-0.5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Centralized cyber fraud repository synchronized with state police units.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(DEMO_CASES).map(([key, item]) => (
                  <div key={key} className={`rounded-xl border p-5 space-y-3 shadow-sm ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">{item.caseInfo.ncrpId}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                        {item.caseInfo.riskLevel}
                      </span>
                    </div>
                    <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.caseInfo.firNumber}</h3>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.caseInfo.crimeType}</p>
                    <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                      darkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <span className="font-bold text-emerald-600 font-mono">{item.caseInfo.totalValueInr}</span>
                      <button
                        onClick={() => {
                          setActiveCaseKey(key);
                          setCurrentView('results');
                          setActiveNav('intelligence');
                          showToast(`Loaded ${item.caseInfo.ncrpId} into Attribution Desk.`);
                        }}
                        className="px-3 py-1.5 rounded-lg font-bold text-xs bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                      >
                        Open Docket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* VIEW: VASP NODAL DIRECTORY                                        */}
          {/* ================================================================ */}
          {activeNav === 'directory' && (
            <div className="p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-6">
              <div className={`border-b pb-4 ${
                darkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span>VASP Nodal Law Enforcement Directory</span>
                </h2>
                <p className={`text-xs mt-0.5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Verified 24/7 law enforcement points of contact for cryptocurrency asset freeze directives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Binance Global", email: "law-enforcement@binance.com", fiu: "FIU-2023-VASP-88", time: "< 45 Mins", status: "Global Reporting Entity" },
                  { name: "CoinDCX India (Neblio Technologies)", email: "nodal-lea@coindcx.com", fiu: "FIU-IND-2023-014", time: "< 2 Hours", status: "Domestic FIU Registered" },
                  { name: "WazirX India (Zanmai Labs)", email: "lawenforcement@wazirx.com", fiu: "FIU-IND-2023-009", time: "< 2 Hours", status: "Domestic FIU Registered" },
                  { name: "CoinSwitch Kuber (Bitcipher Labs)", email: "legal-lea@coinswitch.co", fiu: "FIU-IND-2023-021", time: "< 2 Hours", status: "Domestic FIU Registered" },
                  { name: "Mudrex (Bitspay)", email: "compliance@mudrex.com", fiu: "FIU-IND-2023-033", time: "< 2 Hours", status: "Domestic FIU Registered" },
                  { name: "Kraken Exchange", email: "compliance@kraken.com", fiu: "US FinCEN Registered", time: "< 4 Hours", status: "International Exchange" }
                ].map((vasp, i) => (
                  <div key={i} className={`p-4 rounded-xl border space-y-2 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{vasp.name}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {vasp.time} SLA
                      </span>
                    </div>
                    <div className="text-xs font-mono text-blue-600 dark:text-blue-400">{vasp.email}</div>
                    <div className={`text-[11px] flex items-center justify-between pt-2 border-t ${
                      darkMode ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-slate-100'
                    }`}>
                      <span>Status: {vasp.status}</span>
                      <span className="font-mono">{vasp.fiu}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* VIEW: LEGAL STATUTORY DESK                                       */}
          {/* ================================================================ */}
          {activeNav === 'statutory' && (
            <div className="p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-6">
              <div className={`border-b pb-4 ${
                darkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Gavel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span>Legal Statutory Desk // Bharatiya Sakshya Adhiniyam & BNSS 2023</span>
                </h2>
                <p className={`text-xs mt-0.5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Standard operating procedures and statutory compliance mandates for digital asset seizure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border space-y-3 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <h3 className={`font-bold text-sm flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span>Section 94 BNSS 2023 (Former Sec 91 Cr.P.C.)</span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Empowers Investigating Officers to compel any entity operating in Indian sovereign space to immediately produce digital evidence or freeze property linked to criminal complaints.
                  </p>
                  <ul className={`text-xs space-y-1.5 list-disc pl-4 font-sans ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <li>Mandatory 4-hour freeze deadline upon formal digital delivery.</li>
                    <li>Failure to comply triggers penal liability under Section 223 BNS.</li>
                    <li>Direct applicability to all FIU-IND reporting VASPs.</li>
                  </ul>
                </div>

                <div className={`p-6 rounded-xl border space-y-3 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <h3 className={`font-bold text-sm flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Section 63 BSA 2023 (Former Sec 65B IEA)</span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Governs the admissibility of electronic records in judicial proceedings without needing physical server equipment brought to court.
                  </p>
                  <ul className={`text-xs space-y-1.5 list-disc pl-4 font-sans ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <li>Requires cryptographic SHA-256 hash verification.</li>
                    <li>Timestamped certified docket signed by investigating officer.</li>
                    <li>Chain of custody logs from node query to PDF generation.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ==================================================================== */}
      {/* 3. INTERACTIVE MODALS FOR POLICE DIRECTIVES                          */}
      {/* ==================================================================== */}

      {/* 1. SECTION 94 BNSS FREEZE NOTICE MODAL */}
      {activeModal === 'bnss' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              darkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-red-600" />
                <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>Section 94 BNSS 2023 Emergency Freeze Order</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer font-bold">✕</button>
            </div>

            <div className={`p-4 rounded-xl text-xs font-mono space-y-2 leading-relaxed max-h-80 overflow-y-auto border ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className={`font-bold border-b pb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>FORMAL ASSET SEIZURE DIRECTIVE // CONFIDENTIAL</div>
              <div>TO: Compliance Officer, {activeCase.caseInfo.targetVasp} ({activeCase.caseInfo.vaspComplianceEmail})</div>
              <div>FROM: {activeCase.caseInfo.officer}, {activeCase.caseInfo.station}</div>
              <div>CRIME REFERENCE: {activeCase.caseInfo.firNumber} | NCRP ID: {activeCase.caseInfo.ncrpId}</div>
              <div>STATUTORY TIME OF DIRECTIVE: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
              <div className="pt-2 text-red-600 font-bold">
                SUBJECT: URGENT DIRECTIVE TO DEBIT-FREEZE SUSPECT CRYPTOCURRENCY ASSETS ({activeCase.caseInfo.totalValueUsdt} / {activeCase.caseInfo.totalValueInr})
              </div>
              <p className="font-sans pt-1">
                You are hereby formally directed under Section 94 of Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 read with PMLA Regulations to immediately freeze all withdrawals and swaps on the destination account holding funds traced from suspect wallet {activeCase.nodes[1].address}. Furnish full KYC particulars within four (4) hours.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setActiveModal(null)} className={`px-4 py-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                darkMode ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'
              }`}>
                Cancel
              </button>
              <button 
                onClick={() => {
                  copyToClipboard(
                    `SECTION 94 BNSS DIRECTIVE: Immediately debit-freeze ${activeCase.caseInfo.totalValueUsdt} traced from ${activeCase.nodes[1].address}. Case: ${activeCase.caseInfo.firNumber}`,
                    'Legal Freeze Directive'
                  );
                  setActiveModal(null);
                }}
                className="px-5 py-2.5 rounded-lg font-bold text-xs bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Copy & Transmit to VASP Legal Team</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXPORT COURT-READY PDF (SECTION 63 BSA) MODAL */}
      {activeModal === 'pdf' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-md w-full p-6 space-y-4 text-center shadow-2xl border ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
              <FileDown className="w-6 h-6" />
            </div>
            <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>Generate Section 63 BSA Certified Evidence Docket</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Compiles complete topological node graph, verified on-chain ledger hashes, and SHA-256 evidentiary seal into a court-ready PDF docket.
            </p>
            <div className={`p-3 rounded-lg text-left text-[11px] font-mono space-y-1 border ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <div>Docket Ref: BSA-DOC-2026-8921</div>
              <div>Digest: SHA-256 (Hash Sealed)</div>
              <div>Magistrate Production: Ready</div>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button onClick={() => setActiveModal(null)} className={`px-4 py-2 rounded-lg border text-xs cursor-pointer ${
                darkMode ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'
              }`}>
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Court-Ready PDF Docket downloaded successfully!');
                  setActiveModal(null);
                }}
                className="px-5 py-2 rounded-lg font-bold text-xs bg-blue-700 hover:bg-blue-800 text-white cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Certified PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SYNC FINDING TO NCRP / SAHYOG PORTAL MODAL */}
      {activeModal === 'ncrp' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-md w-full p-6 space-y-4 text-center shadow-2xl border ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>Broadcast to National NCRP / SAHYOG Gateway</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Synchronize attribution findings directly to NCRP Case Ref <strong>{activeCase.caseInfo.ncrpId}</strong>. Other state cyber cells will immediately receive alert that funds have converged at {activeCase.caseInfo.targetVasp}.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button onClick={() => setActiveModal(null)} className={`px-4 py-2 rounded-lg border text-xs cursor-pointer ${
                darkMode ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'
              }`}>
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Successfully synchronized with central NCRP / SAHYOG gateway!');
                  setActiveModal(null);
                }}
                className="px-5 py-2 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Confirm Gateway Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST ALERT NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl shadow-2xl flex items-center gap-3 border transition-all duration-300 bg-slate-900 text-white border-slate-700">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

    </div>
  );
}
