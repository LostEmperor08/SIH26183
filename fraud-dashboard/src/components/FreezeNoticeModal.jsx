import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, Shield, Mail, FileCheck, Building2 } from 'lucide-react';
import { formatINR } from '../data/forensicDataset';

export default function FreezeNoticeModal({ isOpen, onClose, targetData }) {
  const [copied, setCopied] = useState(false);
  const [firNo, setFirNo] = useState('FIR-402/2026');
  const [policeStation, setPoliceStation] = useState('Special Cyber Cell, Delhi Police');
  const [officerName, setOfficerName] = useState('Insp. Vikram Singh (Investigating Officer)');

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

  if (!isOpen || !targetData) return null;

  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const exchangeName = targetData.destinationVasp || targetData.exchange || 'Binance (Global)';
  const complianceEmail = targetData.complianceEmail || 'compliance@binance.com';
  const targetWallet = targetData.wallet || targetData.address || '0x9b48c8914b31a89c8942b09085cfd138f29ea100';
  const amountEth = targetData.amountEth || 38.45;
  const inrVal = formatINR(amountEth);
  const refNoticeId = `I4C-ETH-BNSS-${Math.floor(100000 + Math.random() * 900000)}`;

  const noticeText = `================================================================================
STATUTORY ASSET PRESERVATION & EMERGENCY FREEZE DIRECTIVE
ISSUED UNDER SECTION 91 Cr.P.C. / SECTION 94 BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS), 2023
GOVERNMENT OF INDIA • MINISTRY OF HOME AFFAIRS
Indian Cyber Crime Coordination Centre (I4C), CIS Division
================================================================================

DATE OF ISSUANCE: ${dateStr}
REFERENCE CASE IDENTIFIER: ${refNoticeId}
NCRP / CRIME PORTAL CASE REF: ${firNo}
ORIGINATING POLICE JURISDICTION: ${policeStation}
AUTHORIZING INVESTIGATIVE OFFICER: ${officerName}

TO:
The Chief Compliance Officer & Law Enforcement Action Desk
${exchangeName}
Official Liaison Ingestion: ${complianceEmail}
Jurisdiction Status: Reporting Entity under PMLA / International AML Mutual Legal Assistance

SUBJECT: STATUTORY NOTICE TO IMMEDIATELY FREEZE FRAUD-LINKED PROCEEDS OF CRIME

Sir / Madam,

1. This urgent communication is issued in connection with an ongoing law enforcement investigation into an organized cryptocurrency cyber-fraud syndicate registered on the National Cyber Crime Reporting Portal (NCRP / Helpline 1930).

2. REAL-TIME FORENSIC ATTRIBUTION FINDINGS:
   Automated blockchain analytics conducted under I4C investigative supervision has established that illicit proceeds originating from cyber crime victims converged through intermediary layering wallets and have been directly deposited into your centralized exchange platform:

   - Suspect Origin / Converged Hub: ${targetWallet}
   - Destination Platform / VASP: ${exchangeName}
   - Total Tracked Crypto Proceeds: ${amountEth} ETH
   - Estimated Seizure Value: ${inrVal} INR (Approx. $${Math.round(amountEth * 2600).toLocaleString()} USD)
   - Final On-Chain Deposit Hash: 0x9c99fa812bc81412e098a834012bc09148f92418e2098412bc908124ef908124

3. STATUTORY DIRECTIVE FOR MANDATORY COMPLIANCE:
   In exercise of statutory powers conferred under Section 91 of the Code of Criminal Procedure, 1973 (read with Section 94 of Bharatiya Nagarik Suraksha Sanhita, 2023):
   
   a) ACCOUNT FREEZE: You are strictly directed to IMMEDIATELY FREEZE all accounts, user IDs, internal sub-accounts, crypto balances, and linked fiat INR/USD wallets associated with the recipient deposit transaction.
   
   b) KYC & LOG PRESERVATION: Secure and preserve all subscriber registration records, Aadhaar/PAN/Passport documents, IP login logs with port numbers & UTC timestamps, device IMEIs, and associated bank accounts.
   
   c) COMPLIANCE SLA: Acknowledge receipt and confirm freezing of assets within 4 (four) hours of transmission to prevent asset dissipation.

4. Failure to comply with this statutory directive may attract penal consequences under relevant provisions of the Indian Penal Code / Bharatiya Nyaya Sanhita and the Prevention of Money Laundering Act (PMLA).

ISSUED UNDER OFFICIAL SEAL:
${officerName}
${policeStation}
Copy to: Central Cyber Cell, I4C (cybercrime.gov.in), Ministry of Home Affairs, New Delhi.
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([noticeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `I4C_Section91_FreezeDirective_${exchangeName.replace(/\s+/g, '_')}_${refNoticeId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-none font-mono">
      <div className="bg-[#0D1117] border border-[#30363D] w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-3 px-4 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Section 91 Cr.P.C. / Section 94 BNSS Statutory Freeze Notice
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#30363D] text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Controls Bar for Police Officers */}
        <div className="p-3 px-4 bg-[#090C10] border-b border-[#30363D] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">FIR / NCRP Case Ref:</label>
            <input
              type="text"
              value={firNo}
              onChange={(e) => setFirNo(e.target.value)}
              className="w-full bg-[#161B22] border border-[#30363D] px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">Police Station:</label>
            <input
              type="text"
              value={policeStation}
              onChange={(e) => setPoliceStation(e.target.value)}
              className="w-full bg-[#161B22] border border-[#30363D] px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">Investigating Officer:</label>
            <input
              type="text"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              className="w-full bg-[#161B22] border border-[#30363D] px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Pre-Formatted Notice Body */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-[11px] text-slate-300 bg-[#090C10] whitespace-pre-wrap leading-relaxed border-b border-[#30363D]">
          {noticeText}
        </div>

        {/* Footer Actions */}
        <div className="p-3 px-4 bg-[#161B22] flex items-center justify-between text-xs">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Desk: <strong className="text-slate-200">{complianceEmail}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-[#21262D] hover:bg-[#30363D] text-slate-200 border border-[#30363D] flex items-center gap-1.5 transition text-xs font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Notice Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 bg-red-700 hover:bg-red-600 text-white border border-red-500 flex items-center gap-1.5 transition text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Directive (.TXT)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
