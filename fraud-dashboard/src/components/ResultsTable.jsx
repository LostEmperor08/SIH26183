import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, GitCommit, FileText, Download, ExternalLink, Copy, Check } from 'lucide-react';

export default function ResultsTable({ results, onSelectWallet, onOpenNotice }) {
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'attributed', 'in_transit'

  if (!results || results.length === 0) {
    return null;
  }

  const handleCopy = (addr) => {
    navigator.clipboard.writeText(addr);
    setCopiedAddress(addr);
    setTimeout(() => setCopiedAddress(null), 1500);
  };

  const filteredResults = results.filter((r) => {
    if (filter === 'attributed') return r.found;
    if (filter === 'in_transit') return !r.found;
    return true;
  });

  const exportCSV = () => {
    const headers = ['wallet_address', 'status', 'exchange', 'exchange_name', 'hops', 'amount_eth', 'amount_usd'];
    const rows = results.map((r) => [
      r.wallet,
      r.status,
      r.exchange || 'N/A',
      r.exchange_name || 'N/A',
      r.hops,
      r.amount_eth || 0,
      r.amount_usd || 0
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `I4C_Attribution_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl mb-8">
      {/* Table Header Controls */}
      <div className="p-4 px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            Attribution & Evidence Ledger ({results.length} Wallets Processed)
          </h3>
          <p className="text-xs text-slate-400">
            Automated hop-chain verification & VASP destination discovery
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Pills */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md transition ${filter === 'all' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              All ({results.length})
            </button>
            <button
              onClick={() => setFilter('attributed')}
              className={`px-3 py-1 rounded-md transition ${filter === 'attributed' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Attributed ({results.filter(r => r.found).length})
            </button>
            <button
              onClick={() => setFilter('in_transit')}
              className={`px-3 py-1 rounded-md transition ${filter === 'in_transit' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              In-Transit ({results.filter(r => !r.found).length})
            </button>
          </div>

          <button
            onClick={exportCSV}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export Evidence CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-6">Suspect Wallet Address</th>
              <th className="py-3.5 px-4">Attribution Status</th>
              <th className="py-3.5 px-4">Destination VASP</th>
              <th className="py-3.5 px-4 text-center">Hops</th>
              <th className="py-3.5 px-4 text-right">Value (ETH)</th>
              <th className="py-3.5 px-4 text-right">Estimated USD</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredResults.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => row.path && row.path.length > 0 && onSelectWallet(row)}
              >
                {/* Wallet */}
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {row.wallet ? `${row.wallet.substring(0, 10)}...${row.wallet.substring(row.wallet.length - 8)}` : 'N/A'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(row.wallet);
                      }}
                      className="text-slate-500 hover:text-slate-200 transition p-1"
                      title="Copy full address"
                    >
                      {copiedAddress === row.wallet ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  {row.found ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/70">
                      <ShieldCheck className="w-3.5 h-3.5" /> Attributed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-950/60 text-amber-400 border border-amber-800/60">
                      <ShieldAlert className="w-3.5 h-3.5" /> In-Transit / Mixer
                    </span>
                  )}
                </td>

                {/* Exchange */}
                <td className="py-3.5 px-4">
                  {row.found ? (
                    <div>
                      <span className="font-semibold text-cyan-300">{row.exchange}</span>
                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                        {row.exchange_name || 'VASP Hot/Cold Deposit'}
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Unidentified</span>
                  )}
                </td>

                {/* Hops */}
                <td className="py-3.5 px-4 text-center">
                  <span className="font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                    {row.hops} {row.hops === 1 ? 'hop' : 'hops'}
                  </span>
                </td>

                {/* Amount ETH */}
                <td className="py-3.5 px-4 text-right font-mono text-slate-200">
                  {row.amount_eth ? `${row.amount_eth} ETH` : '—'}
                </td>

                {/* Amount USD */}
                <td className="py-3.5 px-4 text-right font-mono font-medium text-emerald-400">
                  {row.amount_usd ? `$${row.amount_usd.toLocaleString()}` : '—'}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-2">
                    {row.path && row.path.length > 0 && (
                      <button
                        onClick={() => onSelectWallet(row)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 border border-slate-700 transition"
                        title="View Multi-Hop Graph"
                      >
                        <GitCommit className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {row.found && (
                      <button
                        onClick={() => onOpenNotice(row)}
                        className="px-2.5 py-1 rounded-lg bg-red-950/70 hover:bg-red-900/80 text-red-300 border border-red-800/80 flex items-center gap-1 font-semibold text-[11px] transition"
                        title="Generate Section 91 CrPC Freeze Notice"
                      >
                        <FileText className="w-3 h-3" />
                        Freeze Notice
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
