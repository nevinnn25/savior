import { useEffect, useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const VB = { w: 1280, h: 860 }
const LOOP_MS = 15000

const NODES = {
  users: { id: 'users', label: 'Eco Users', x: 640, y: 74, w: 250, h: 70 },
  scan: { id: 'scan', label: 'EcoScan', x: 640, y: 202, w: 250, h: 70 },
  credit: { id: 'credit', label: 'EcoCredit', x: 640, y: 330, w: 250, h: 70 },
  recycling: { id: 'recycling', label: 'Recycling Companies', x: 294, y: 510, w: 280, h: 72 },
  businesses: { id: 'businesses', label: 'Businesses', x: 986, y: 510, w: 250, h: 72 },
  saviour: { id: 'saviour', label: 'SAVIOUR AI SYSTEM', x: 640, y: 678, w: 360, h: 92 },
  government: { id: 'government', label: 'Government', x: 404, y: 810, w: 230, h: 68 },
  dataScientists: { id: 'dataScientists', label: 'Data Scientists', x: 876, y: 810, w: 250, h: 68 },
}

const top = (n) => ({ x: n.x, y: n.y - n.h / 2 })
const bottom = (n) => ({ x: n.x, y: n.y + n.h / 2 })
const left = (n) => ({ x: n.x - n.w / 2, y: n.y })
const right = (n) => ({ x: n.x + n.w / 2, y: n.y })
const center = (n) => ({ x: n.x, y: n.y })

function toPath(points) {
  return `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`
}

function sampleSegment(a, b, count, out, includeStart) {
  const start = includeStart ? 0 : 1
  for (let i = start; i < count; i += 1) {
    const t = i / (count - 1)
    out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
  }
}

function samplePolyline(points, segSamples = 22) {
  const out = []
  for (let i = 0; i < points.length - 1; i += 1) {
    sampleSegment(points[i], points[i + 1], segSamples, out, i === 0)
  }
  return out
}

function EconomyFlowSlide({ isActive }) {
  const uid = useId().replace(/:/g, '')
  const markerSystem = `uml-system-${uid}`
  const markerMoney = `uml-money-${uid}`
  const glowSystem = `uml-glow-system-${uid}`
  const glowMoney = `uml-glow-money-${uid}`
  const [clock, setClock] = useState(0)

  const { systemEdges, moneyEdges, trailPoints } = useMemo(() => {
    const U = NODES.users
    const S = NODES.scan
    const C = NODES.credit
    const R = NODES.recycling
    const B = NODES.businesses
    const A = NODES.saviour
    const G = NODES.government
    const D = NODES.dataScientists

    const systemEdges = [
      { id: 'u-s', points: [bottom(U), center(S)] },
      { id: 's-c', points: [bottom(S), center(C)] },
      {
        id: 'c-b',
        points: [
          right(C),
          { x: B.x - 90, y: C.y },
          { x: B.x - 90, y: B.y },
          center(B),
        ],
      },
      {
        id: 'c-r',
        points: [
          left(C),
          { x: R.x + 90, y: C.y },
          { x: R.x + 90, y: R.y },
          center(R),
        ],
      },
      {
        id: 'r-a',
        points: [
          right(R),
          { x: A.x - 120, y: R.y },
          { x: A.x - 120, y: A.y },
          center(A),
        ],
      },
      {
        id: 'b-a',
        points: [
          left(B),
          { x: A.x + 120, y: B.y },
          { x: A.x + 120, y: A.y },
          center(A),
        ],
      },
      {
        id: 'a-g',
        points: [
          bottom(A),
          { x: A.x, y: G.y - 36 },
          { x: G.x, y: G.y - 36 },
          center(G),
        ],
      },
      {
        id: 'a-d',
        points: [
          bottom(A),
          { x: A.x, y: D.y - 36 },
          { x: D.x, y: D.y - 36 },
          center(D),
        ],
      },
    ].map((e) => ({ ...e, d: toPath(e.points) }))

    const moneyEdges = [
      {
        id: 'm-b-a',
        label: 'Subscription + Ads',
        points: [right(B), { x: 1140, y: B.y }, { x: 1140, y: A.y + 18 }, { x: A.x + 150, y: A.y + 18 }, center(A)],
        lx: 1124,
        ly: 592,
      },
      {
        id: 'm-r-a',
        label: 'Commission',
        points: [left(R), { x: 140, y: R.y }, { x: 140, y: A.y + 36 }, { x: A.x - 150, y: A.y + 36 }, center(A)],
        lx: 152,
        ly: 592,
      },
      {
        id: 'm-g-a',
        label: 'Annual Contract',
        points: [top(G), { x: G.x, y: 736 }, { x: A.x - 92, y: 736 }, center(A)],
        lx: 520,
        ly: 768,
      },
      {
        id: 'm-a-d',
        label: 'Data Sales',
        points: [center(A), { x: A.x + 92, y: 768 }, { x: D.x, y: 768 }, center(D)],
        lx: 858,
        ly: 768,
      },
    ].map((e) => ({ ...e, d: toPath(e.points) }))

    return {
      systemEdges,
      moneyEdges,
      trailPoints: systemEdges.map((e) => samplePolyline(e.points, 20)),
    }
  }, [])

  useEffect(() => {
    if (!isActive) return undefined
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      setClock((((now - t0) % LOOP_MS) + LOOP_MS) % LOOP_MS / LOOP_MS)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isActive])

  const activeIdx = Math.floor(clock * systemEdges.length) % systemEdges.length
  const localT = (clock * systemEdges.length) % 1
  const pts = trailPoints[activeIdx] || []
  const pIdx = pts.length > 1 ? Math.floor(localT * (pts.length - 1)) : 0
  const particle = pts[pIdx] || { x: 0, y: 0 }

  return (
    <div className={`slide-content economy-flow-slide ${isActive ? 'economy-flow-slide--active' : ''}`}>
      <div className="economy-flow-bg" aria-hidden />
      <div className="economy-flow-grid" aria-hidden />

      <motion.div className="economy-flow-stage" initial={false} animate={{ opacity: isActive ? 1 : 0.45 }}>
        <svg className="economy-flow-svg" viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <marker id={markerSystem} markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00ff88" />
            </marker>
            <marker id={markerMoney} markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffcc45" />
            </marker>
            <filter id={glowSystem} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id={glowMoney} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {systemEdges.map((edge, i) => (
            <g key={edge.id} className={`economy-edge-group ${i === activeIdx ? 'economy-edge-group--lit' : ''}`}>
              <path className="economy-edge-main-ghost" d={edge.d} />
              <path className="economy-edge-main" d={edge.d} markerEnd={`url(#${markerSystem})`} filter={`url(#${glowSystem})`} />
            </g>
          ))}

          {moneyEdges.map((edge) => (
            <g key={edge.id} className="economy-money-group">
              <path className="economy-edge-money" d={edge.d} markerEnd={`url(#${markerMoney})`} filter={`url(#${glowMoney})`} />
              <text className="economy-money-label" x={edge.lx} y={edge.ly} textAnchor="middle">{edge.label}</text>
            </g>
          ))}

          <circle className="economy-flow-particle" cx={particle.x} cy={particle.y} r="6" filter={`url(#${glowSystem})`} />
        </svg>

        <div className="economy-flow-nodes">
          {Object.values(NODES).map((node, i) => {
            const leftPct = ((node.x - node.w / 2) / VB.w) * 100
            const topPct = ((node.y - node.h / 2) / VB.h) * 100
            const wPct = (node.w / VB.w) * 100
            const hPct = (node.h / VB.h) * 100
            const isSaviour = node.id === 'saviour'
            return (
              <motion.div
                key={node.id}
                className={`economy-node ${isSaviour ? 'economy-node--ai' : ''}`}
                style={{ left: `${leftPct}%`, top: `${topPct}%`, width: `${wPct}%`, height: `${hPct}%` }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isActive ? 1 : 0.45, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <span className="economy-node-label">{node.label}</span>
                {node.sub ? <span className="economy-node-sub">{node.sub}</span> : null}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default EconomyFlowSlide
