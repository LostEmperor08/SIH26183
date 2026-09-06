import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, ShieldCheck, ShieldAlert, GitCommit, FileText } from 'lucide-react';
import { formatINR } from '../data/forensicDataset';

export default function CaseLedgerTable({
  rows,
  onSelectNodeById,
  onFlagForFreeze,
}) {
  const [copiedWallet, setCopiedWallet] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'attributed', 'converged'

  const handleCopy = (addr) => {
    navigator.clipboard.writeText(addr);
    setCopiedWallet(addr);
    setTimeout(() => setCopiedWallet(null), 1500);
  };

  const filteredRows = rows.filter((r) => {
    if (filter === 'converged') return r.status === 'CONVERGED';
    if (filter === 'attributed') return r.status === 'Attributed';
    return true;
  });

  const exportCSV = () => {
    const headers = ['wallet_address', 'fir_number', 'hop_level', 'amount_eth', 'amount_inr', 'timestamp', 'destination_vasp', 'typology', 'status'];
    const csvData = rows.map((r) => [
      r.wallet,
      r.fir,
      r.hop,
      r.amountEth,
      r.amountInr,
      r.timestamp,
      r.destinationVasp,
      r.typology,
      r.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...csvData.map(e => e.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encoded;
    link.download = `I4C_Attribution_Ledger_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="bg-[#0D1117] border border-[#30363D] mb-4">
      {/* Table Controls Header */}
      <div className="p-3 px-4 bg-[#161B22] border-b border-[#30363D] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-100 uppercase tracking-wider">
            Attribution & Case Ledger ({rows.length} Active Records)
          </span>
          <span className="text-slate-400">| Court-Admissible Chain-of-Custody</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Tactical Filters */}
          <div className="flex border border-[#30363D] bg-[#090C10]">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 ${filter === 'all' ? 'bg-[#21262D] text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All ({rows.length})
            </button>
            <button
              onClick={() => setFilter('converged')}
              className={`px-2.5 py-1 border-l border-[#30363D] ${filter === 'converged' ? 'bg-purple-950 text-purple-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Converged Hubs (1)
            </button>
            <button
              onClick={() => setFilter('attributed')}
              className={`px-2.5 py-1 border-l border-[#30363D] ${filter === 'attributed' ? 'bg-emerald-950 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Attributed (5)
            </button>
          </div>

          <button
            onClick={exportCSV}
            className="px-3 py-1 bg-[#21262D] hover:bg-[#30363D] text-slate-200 border border-[#30363D] flex items-center gap-1.5 transition"
          >
            <Download className="w-3 h-3 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* High-Density Ledger Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#30363D] bg-[#090C10] text-slate-400 uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-4">Suspect Address</th>
              <th className="py-2.5 px-3">FIR / Case Ref</th>
              <th className="py-2.5 px-3 text-center">Depth</th>
              <th className="py-2.5 px-3 text-right">Transferred Crypto</th>
              <th className="py-2.5 px-3 text-right">Seizure Value (INR)</th>
              <th className="py-2.5 px-3">Destination Entity / VASP</th>
              <th className="py-2.5 px-3">Fraud Typology</th>
              <th className="py-2.5 px-4 text-center">Tactical Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262D]">
            {filteredRows.map((row, idx) => {
              const isConverged = row.status === 'CONVERGED';
              return (
                <tr
                  key={idx}
                  onClick={() => onSelectNodeById(row.nodeId)}
                  className={`cursor-pointer transition-colors ${
                    isConverged
                      ? 'bg-purple-950/20 hover:bg-purple-950/40 border-l-2 border-l-purple-500'
                      : 'hover:bg-[#161B22]'
                  }`}
                >
                  {/* Address */}
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono ${isConverged ? 'text-purple-300 font-bold' : 'text-slate-200'}`}>
                        {row.shortWallet}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(row.wallet);
                        }}
                        className="text-slate-500 hover:text-slate-300 p-0.5"
                        title="Copy Address"
                      >
                        {copiedWallet === row.wallet ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* FIR */}
                  <td className="py-2.5 px-3 text-slate-300">
                    <span className="px-1.5 py-0.5 bg-[#161B22] border border-[#30363D] text-[11px]">
                      {row.fir}
                    </span>
                  </td>

                  {/* Depth */}
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[11px] text-slate-300">
                      {row.hop} {row.hop === 1 ? 'hop' : 'hops'}
                    </span>
                  </td>

                  {/* Transferred Amount */}
                  <td className="py-2.5 px-3 text-right font-bold text-slate-100 tabular-nums">
                    {row.amountEth.toFixed(2)} ETH
                  </td>

                  {/* INR Value */}
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-medium tabular-nums">
                    {formatINR(row.amountEth)}
                  </td>

                  {/* Destination VASP */}
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {row.destinationVasp}
                    </span>
                  </td>

                  {/* Typology */}
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] px-1.5 py-0.5 border ${
                      isConverged
                        ? 'bg-purple-950 text-purple-300 border-purple-800 font-bold'
                        : 'bg-[#161B22] text-slate-300 border-[#30363D]'
                    }`}>
                      {row.typology}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onSelectNodeById(row.nodeId)}
                        className="px-2 py-1 bg-[#21262D] hover:bg-[#30363D] text-cyan-400 border border-[#30363D] flex items-center gap-1 text-[11px] transition"
                        title="Inspect in Graph & Open Dossier"
                      >
                        <GitCommit className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => onFlagForFreeze(row)}
                        className="px-2 py-1 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 flex items-center gap-1 text-[11px] font-bold transition"
                        title="Draft Freeze Order"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Freeze</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
