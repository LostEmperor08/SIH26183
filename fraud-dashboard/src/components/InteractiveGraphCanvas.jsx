import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, ShieldAlert, GitCommit, Building2, UserX } from 'lucide-react';
import { formatINR } from '../data/forensicDataset';

export default function InteractiveGraphCanvas({
  nodes,
  edges,
  selectedNode,
  onSelectNode,
}) {
  const [zoom, setZoom] = useState(1);
  const [showAmounts, setShowAmounts] = useState(true);

  // Determine node color styles
  const getNodeStyles = (type) => {
    switch (type) {
      case 'victim':
        return {
          stroke: '#EF4444',
          fill: '#180A0A',
          badgeBg: '#450A0A',
          badgeText: '#FCA5A5',
          glow: 'rgba(239, 68, 68, 0.2)',
          label: 'VICTIM',
        };
      case 'mule':
        return {
          stroke: '#F59E0B',
          fill: '#191206',
          badgeBg: '#451A03',
          badgeText: '#FCD34D',
          glow: 'rgba(245, 158, 11, 0.2)',
          label: 'MULE',
        };
      case 'syndicate':
        return {
          stroke: '#8B5CF6',
          fill: '#150D2A',
          badgeBg: '#3B0764',
          badgeText: '#D8B4FE',
          glow: 'rgba(139, 92, 246, 0.5)',
          label: 'CONVERGENCE HUB',
        };
      case 'vasp':
        return {
          stroke: '#10B981',
          fill: '#061912',
          badgeBg: '#064E3B',
          badgeText: '#6EE7B7',
          glow: 'rgba(16, 185, 129, 0.3)',
          label: 'TARGET VASP',
        };
      default:
        return {
          stroke: '#64748B',
          fill: '#0F172A',
          badgeBg: '#1E293B',
          badgeText: '#94A3B8',
          glow: 'none',
          label: 'NODE',
        };
    }
  };

  return (
    <div className="bg-[#090C10] border border-[#30363D] mb-4 relative overflow-hidden">
      {/* Canvas Header & Filter Controls */}
      <div className="p-3 px-4 bg-[#0D1117] border-b border-[#30363D] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <GitCommit className="w-4 h-4 text-purple-400" />
            Interactive On-Chain Graph Topology
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400">
            Nodes: <strong className="text-slate-200">{nodes.length}</strong> • Edges: <strong className="text-slate-200">{edges.length}</strong>
          </span>
        </div>

        {/* Legend & Display Toggles */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          {/* Legend Badges */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-none bg-red-500" />
              <span className="text-slate-400">Victim</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-none bg-amber-500" />
              <span className="text-slate-400">Mule</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-none bg-purple-500 shadow-[0_0_8px_#8B5CF6]" />
              <span className="text-purple-300 font-bold">Syndicate Hub</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-none bg-emerald-500" />
              <span className="text-emerald-400">VASP</span>
            </span>
          </div>

          {/* Toggle Value overlay */}
          <button
            onClick={() => setShowAmounts(!showAmounts)}
            className={`px-2 py-1 border border-[#30363D] flex items-center gap-1 transition ${
              showAmounts ? 'bg-[#161B22] text-slate-200' : 'bg-transparent text-slate-400'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Amounts</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center border border-[#30363D] bg-[#161B22]">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.15, 1.6))}
              className="px-2 py-1 text-slate-300 hover:text-white border-r border-[#30363D]"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.15, 0.7))}
              className="px-2 py-1 text-slate-300 hover:text-white border-r border-[#30363D]"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-2 py-1 text-slate-300 hover:text-white"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="overflow-x-auto overflow-y-hidden p-4 min-h-[520px] flex items-center justify-center bg-[#090C10] select-none">
        <svg
          width={1000 * zoom}
          height={560 * zoom}
          viewBox="0 0 1000 560"
          className="transition-transform duration-150"
        >
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#161B22" strokeWidth="1" />
            </pattern>
            {/* Arrow Marker Definitions */}
            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#EF4444" />
            </marker>
            <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#F59E0B" />
            </marker>
            <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#8B5CF6" />
            </marker>
            <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
            </marker>
          </defs>

          <rect width="1000" height="560" fill="url(#grid)" />

          {/* 1. EDGES / CONNECTING BEZIER CURVES */}
          {edges.map((edge, idx) => {
            const srcNode = nodes.find((n) => n.id === edge.from);
            const dstNode = nodes.find((n) => n.id === edge.to);
            if (!srcNode || !dstNode) return null;

            // Box dimensions: width 170, height 70
            const x1 = srcNode.x + 170;
            const y1 = srcNode.y + 35;
            const x2 = dstNode.x;
            const y2 = dstNode.y + 35;

            // Control points for smooth tactical Bezier curve
            const dx = (x2 - x1) * 0.55;
            const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            let strokeColor = '#30363D';
            let markerId = 'arrow-amber';
            if (edge.to === 'syndicate-hub') {
              strokeColor = '#8B5CF6';
              markerId = 'arrow-purple';
            } else if (edge.to === 'vasp-binance') {
              strokeColor = '#10B981';
              markerId = 'arrow-emerald';
            } else if (srcNode.type === 'victim') {
              strokeColor = '#EF4444';
              markerId = 'arrow-red';
            }

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            return (
              <g key={idx} className="group">
                {/* Flowing animated dash path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={edge.to === 'vasp-binance' || edge.to === 'syndicate-hub' ? 2.5 : 1.5}
                  strokeOpacity={0.8}
                  className="animate-flow"
                  markerEnd={`url(#${markerId})`}
                />

                {/* Edge Amount Badge */}
                {showAmounts && (
                  <g transform={`translate(${midX - 28}, ${midY - 10})`}>
                    <rect
                      x="0"
                      y="0"
                      width="56"
                      height="18"
                      fill="#0D1117"
                      stroke={strokeColor}
                      strokeWidth="1"
                    />
                    <text
                      x="28"
                      y="12"
                      fill="#E2E8F0"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {edge.amountEth} ETH
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 2. NODES */}
          {nodes.map((node) => {
            const styles = getNodeStyles(node.type);
            const isSelected = selectedNode?.id === node.id;
            const isSyndicate = node.type === 'syndicate';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => onSelectNode(node)}
                className="cursor-pointer transition-transform duration-100 group"
              >
                {/* Subtle Electric Purple Glow for Convergence Hub */}
                {isSyndicate && (
                  <rect
                    x="-4"
                    y="-4"
                    width="178"
                    height="78"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                    filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))"
                  />
                )}

                {/* Main Node Card (Strict 1px border, solid canvas) */}
                <rect
                  x="0"
                  y="0"
                  width="170"
                  height="70"
                  fill={styles.fill}
                  stroke={isSelected ? '#58A6FF' : styles.stroke}
                  strokeWidth={isSelected ? 2 : 1.5}
                  className="group-hover:brightness-110"
                />

                {/* Header Tag / Category */}
                <rect
                  x="6"
                  y="6"
                  width="72"
                  height="14"
                  fill={styles.badgeBg}
                />
                <text
                  x="42"
                  y="16"
                  fill={styles.badgeText}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {styles.label}
                </text>

                {/* FIR / Hop / Subtitle */}
                <text
                  x="84"
                  y="16"
                  fill="#94A3B8"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {node.fir?.split(' ')[0] || node.typology?.substring(0, 14)}
                </text>

                {/* Node Title / Label */}
                <text
                  x="8"
                  y="36"
                  fill="#F8FAFC"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.label}
                </text>

                {/* Shortened Monospace Address */}
                <text
                  x="8"
                  y="50"
                  fill="#64748B"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {`${node.address.substring(0, 8)}...${node.address.substring(node.address.length - 6)}`}
                </text>

                {/* Inflow / Outflow Metric */}
                <text
                  x="8"
                  y="63"
                  fill={isSyndicate ? '#D8B4FE' : node.type === 'vasp' ? '#6EE7B7' : '#CBD5E1'}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  Vol: {node.amountEth || node.inflowEth} ETH
                </text>

                {/* Active Selection Pin Indicator */}
                {isSelected && (
                  <circle cx="162" cy="10" r="4" fill="#58A6FF" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Canvas Footer Hint */}
      <div className="p-2 px-4 bg-[#0D1117] border-t border-[#30363D] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Click any node in graph to open forensic inspection drawer</span>
        <span className="text-purple-400 font-bold">Syndicate Convergence Node: 0x9b48...a100</span>
      </div>
    </div>
  );
}
