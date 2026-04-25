import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  BarChart2,
  Brain,
  Building2,
  Cloud,
  Coins,
  EyeOff,
  LayoutDashboard,
  Network,
  Percent,
  Recycle,
  RefreshCw,
  ScanLine,
  ShoppingBag,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'
import EconomyFlowSlide from './EconomyFlowSlide'

const FLOW_SLIDE_NODES = [
  { id: 'scan', label: 'Scan', line: 'Capture materials and impact data.', Icon: ScanLine },
  { id: 'understand', label: 'Understand', line: 'Score impact and alternatives.', Icon: Brain },
  { id: 'earn', label: 'Earn', line: 'Credits for sustainable choices.', Icon: Coins },
  { id: 'recycle', label: 'Recycle', line: 'Waste routed into circular value.', Icon: Recycle },
  { id: 'optimize', label: 'Optimize', line: 'AI tuning for cities and ops.', Icon: Activity },
]

const ECO_CYCLE_VB = 520
const ECO_CYCLE_CX = 260
const ECO_CYCLE_CY = 260
const ECO_CYCLE_ORBIT_R = 158

function polarEco(radius, deg) {
  const rad = (deg * Math.PI) / 180
  return {
    x: ECO_CYCLE_CX + radius * Math.cos(rad),
    y: ECO_CYCLE_CY + radius * Math.sin(rad),
  }
}

/** Clockwise ring; angles in degrees, 0° = east, 270° = north in SVG coords. */
function buildEcoArcRingPath(radius, angles) {
  let d = ''
  for (let i = 0; i < angles.length - 1; i += 1) {
    const p1 = polarEco(radius, angles[i])
    const p2 = polarEco(radius, angles[i + 1])
    if (i === 0) d += `M ${p1.x} ${p1.y}`
    d += ` A ${radius} ${radius} 0 0 1 ${p2.x} ${p2.y}`
  }
  return d
}

const ECO_RING_ANGLES = [270, 0, 90, 180, 270]

const ECOSCAN_SCORE = 74
const ECOSCAN_BULLETS = [
  'Scan any product instantly',
  'Get real-time eco impact score',
  'Discover better sustainable alternatives',
]

const REVENUE_STREAMS = [
  {
    id: 'subs',
    title: 'Business Subscriptions',
    line1: 'Monthly access to eco users',
    line2: 'Visibility + customer reach',
    Icon: Building2,
  },
  {
    id: 'ads',
    title: 'Featured Listings & Ads',
    line1: 'Paid offer promotion',
    line2: 'In-app recommendation boost',
    Icon: LayoutDashboard,
  },
  {
    id: 'commission',
    title: 'Recycling Commission',
    line1: 'Small fee per transaction',
    line2: 'Waste-to-value conversion',
    Icon: Percent,
  },
  {
    id: 'data',
    title: 'Data & Gov Contracts',
    line1: 'City sustainability analytics',
    line2: 'Yearly government contracts',
    Icon: BarChart2,
  },
]

function TitleSlide({ isActive }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const onMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setParallax({ x: x * 2, y: y * 2 })
  }

  const onMouseLeave = () => setParallax({ x: 0, y: 0 })

  return (
    <div className="slide-content center hero-slide" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div
        className="ecosystem-hero"
        style={{ '--px': parallax.x, '--py': parallax.y }}
      >
        <div className="ecosystem-city-layer" aria-hidden>
          <div className="ecosystem-city city-a" />
          <div className="ecosystem-city city-b" />
        </div>
        <div className="ecosystem-particles" aria-hidden>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span key={n} className={`ecosystem-particle p-${n}`} />
          ))}
        </div>
        <div className="ecosystem-fog-layer" aria-hidden />
        <div className="ecosystem-waste-layer" aria-hidden />
        <div className="ecosystem-waste-uplift" aria-hidden>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={`waste-up u-${n}`} />
          ))}
        </div>

        <div className="ecosystem-focus" aria-hidden>
          <motion.div
            className="ecosystem-ring ring-outer"
            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isActive ? { duration: 140, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }
            }
          />
          <motion.div
            className="ecosystem-ring ring-inner"
            animate={isActive ? { rotate: -360 } : { rotate: 0 }}
            transition={
              isActive ? { duration: 95, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }
            }
          />
        </div>
        <div className="ecosystem-ai-core" aria-hidden />

        <div className="ecosystem-content">
          <motion.p
            className="hero-subtitle"
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Next-Generation Sustainability System
          </motion.p>
          <motion.h1
            className="hero-wordmark"
            initial={false}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            SAVIOUR
          </motion.h1>
          <motion.p
            className="hero-punchline"
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            They Manage Waste. We Monetize It.
          </motion.p>
          <motion.p
            className="hero-support"
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            A platform where sustainability meets profit and innovation.
          </motion.p>
          <motion.p
            className="hero-credit"
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            Made by <strong><em>Sharmila Nevin Madhuria</em></strong>
          </motion.p>
        </div>
      </div>
    </div>
  )
}

function ProblemSlide({ isActive }) {
  const cards = [
    { title: 'Environmental Blindness', Icon: EyeOff },
    { title: 'Broken Recycling Systems', Icon: RefreshCw },
    { title: 'Rising Urban Waste', Icon: Trash2 },
    { title: 'No Connected Ecosystem', Icon: Network },
  ]

  return (
    <div className="slide-content problem-clean">
      <div className="problem-clean-bg" aria-hidden>
        <div className="problem-clean-gradient" />
        <div className="problem-clean-noise" />
      </div>
      <p className="eyebrow">The Problem</p>
      <h2 className="title">The world is not connected. The system is broken.</h2>
      <div className="problem-clean-grid">
        {cards.map((card, idx) => (
          <motion.article
            key={card.title}
            className="problem-clean-card glass-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: isActive ? 0.14 + idx * 0.12 : 0, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="problem-clean-head">
              <card.Icon className="problem-clean-icon" aria-hidden />
              <h3>{card.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

function SolutionSlide({ isActive }) {
  const nodes = [
    { id: 'scan', title: 'EcoScan', Icon: ScanLine, pos: 'top' },
    { id: 'credit', title: 'EcoCredit', Icon: Coins, pos: 'right' },
    { id: 'market', title: 'Marketplace', Icon: Recycle, pos: 'bottom' },
    { id: 'ai', title: 'EcoAI', Icon: Brain, pos: 'left' },
  ]

  return (
    <div className="slide-content solution-slide">
      <p className="eyebrow">The Solution</p>
      <h2 className="title">One connected system — powered by SAVIOUR.</h2>

      <div className="solution-system-wrap">
        <div className="solution-bg-glow" aria-hidden />
        <span className="solution-connection c-top" aria-hidden />
        <span className="solution-connection c-right" aria-hidden />
        <span className="solution-connection c-bottom" aria-hidden />
        <span className="solution-connection c-left" aria-hidden />

        <motion.div
          className="solution-core"
          initial={false}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.55, delay: isActive ? 0.38 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="solution-core-ring" aria-hidden />
          <div className="solution-core-text">
            <strong>SAVIOUR</strong>
            <span>Core</span>
          </div>
        </motion.div>

        {nodes.map((node, idx) => (
          <motion.article
            key={node.id}
            className={`solution-node glass-panel ${node.pos}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.45, delay: isActive ? 0.08 + idx * 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <node.Icon
              className="mini-icon"
              style={{ animation: isActive ? 'iconGentleFloat 4.2s ease-in-out infinite' : 'none' }}
              aria-hidden
            />
            <h3>{node.title}</h3>
          </motion.article>
        ))}

        <p className="solution-loop-copy">Scan &rarr; Earn &rarr; Recycle &rarr; Optimize</p>
      </div>
    </div>
  )
}

function FlowSlide({ isActive }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [flowPulseIdx, setFlowPulseIdx] = useState(-1)
  const flowPulseIntervalRef = useRef(null)

  const revenueStreams = [
    { title: 'Eco Credits Marketplace', line: 'Companies buy eco offsets.', Icon: ShoppingBag },
    { title: 'EcoLoop Exchange Fees', line: 'Small commission per trade.', Icon: Percent },
    { title: 'City AI Dashboard', line: 'Government subscriptions.', Icon: LayoutDashboard },
    { title: 'Sustainability Analytics', line: 'B2B SaaS for enterprises.', Icon: BarChart2 },
  ]

  useEffect(() => {
    let startTimerId = 0
    if (!isActive) {
      startTimerId = window.setTimeout(() => setFlowPulseIdx(-1), 0)
      return () => window.clearTimeout(startTimerId)
    }
    const stepMs = 2800
    startTimerId = window.setTimeout(() => {
      setFlowPulseIdx(0)
      flowPulseIntervalRef.current = setInterval(() => {
        setFlowPulseIdx((i) => (i + 1) % FLOW_SLIDE_NODES.length)
      }, stepMs)
    }, 0)
    return () => {
      window.clearTimeout(startTimerId)
      if (flowPulseIntervalRef.current) {
        clearInterval(flowPulseIntervalRef.current)
        flowPulseIntervalRef.current = null
      }
    }
  }, [isActive])

  const onFlowMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setParallax({ x: x * 2, y: y * 2 })
  }

  const onFlowLeave = () => setParallax({ x: 0, y: 0 })

  const n = FLOW_SLIDE_NODES.length
  const pulseForLayout = !isActive || flowPulseIdx < 0 ? 0 : flowPulseIdx
  const particleLeftPct = n <= 1 ? 50 : (pulseForLayout / (n - 1)) * 100

  return (
    <div
      className="slide-content flow-slide"
      onMouseMove={onFlowMove}
      onMouseLeave={onFlowLeave}
      style={{ '--fpx': `${parallax.x}`, '--fpy': `${parallax.y}` }}
    >
      <div className="flow-slide-depth" aria-hidden>
        <div className="flow-grid-bg" />
        <div className="flow-dust">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className={`flow-dust-bit d-${(i % 5) + 1}`} />
          ))}
        </div>
      </div>

      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        How It Works
      </motion.p>
      <motion.h2
        className="title flow-slide-title"
        initial={{ opacity: 0, y: 10 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
      >
        Operational flow and revenue logic.
      </motion.h2>

      <div className="flow-main glass-panel">
        <div className="flow-track">
          <div className="flow-particle-rail" aria-hidden>
            <motion.span
              className="flow-particle"
              animate={{ left: `${particleLeftPct}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="flow-nodes-row">
            {FLOW_SLIDE_NODES.map((node, idx) => (
              <div key={node.id} className="flow-node-cluster">
                <motion.article
                  className={`flow-node-card glass-panel ${isActive && idx === flowPulseIdx ? 'flow-node-lit' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.42, delay: isActive ? 0.12 + idx * 0.08 : 0, ease: 'easeOut' }}
                  whileHover={{ y: -3 }}
                >
                  <node.Icon className="flow-node-icon" strokeWidth={1.65} aria-hidden />
                  <h3>{node.label}</h3>
                  <p>{node.line}</p>
                </motion.article>
                {idx < FLOW_SLIDE_NODES.length - 1 ? (
                  <div
                    className={`flow-connector ${isActive && idx === flowPulseIdx ? 'flow-connector-energy' : ''}`}
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="flow-biz-block"
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, delay: isActive ? 0.55 : 0, ease: 'easeOut' }}
      >
        <p className="eyebrow flow-biz-eyebrow">Business model</p>
        <div className="flow-biz-grid-wrap">
          <div className="flow-biz-sparks" aria-hidden>
            {[0, 1, 2, 3].map((sIdx) => (
              <span key={sIdx} className={`flow-biz-spark s-${sIdx + 1}`} />
            ))}
          </div>
          <div className="flow-biz-grid">
            {revenueStreams.map((item, idx) => (
              <motion.article
                key={item.title}
                className="flow-biz-card glass-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.42, delay: isActive ? 1.22 + idx * 0.12 : 0, ease: 'easeOut' }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <item.Icon className="flow-biz-icon" strokeWidth={1.6} />
                <h4>{item.title}</h4>
                <p>{item.line}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SaviourEcosystemSlide({ isActive }) {
  const uid = useId().replace(/:/g, '')
  const blurId = `eco-arc-blur-${uid}`
  const arrowId = `eco-arrow-${uid}`

  const ringPath = useMemo(() => buildEcoArcRingPath(ECO_CYCLE_ORBIT_R, ECO_RING_ANGLES), [])
  const ringPathOuter = useMemo(() => buildEcoArcRingPath(ECO_CYCLE_ORBIT_R + 6, ECO_RING_ANGLES), [])

  const orbitNodes = useMemo(
    () => [
      { id: 'citizens', label: 'Citizens', angle: -90, Icon: Users, step: 0 },
      { id: 'recycle', label: 'Recycling companies', angle: 0, Icon: Recycle, step: 1 },
      { id: 'biz', label: 'Businesses', angle: 90, Icon: Building2, step: 2 },
      { id: 'citizens2', label: 'Citizens', angle: 180, Icon: Users, step: 3, loopClose: true },
    ],
    [],
  )

  const radialLines = useMemo(
    () =>
      [-90, 0, 90, 180].map((deg) => {
        const outer = polarEco(ECO_CYCLE_ORBIT_R - 2, deg)
        return { x2: outer.x, y2: outer.y, key: deg }
      }),
    [],
  )

  return (
    <div className="slide-content eco-cycle-slide">
      <motion.p
        className="eyebrow"
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        SAVIOUR ecosystem
      </motion.p>
      <motion.h2
        className="title eco-cycle-title"
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        Waste becomes value—round and round, without breaking the loop.
      </motion.h2>

      <div className="eco-cycle-stage">
        <div className="eco-cycle-vignette" aria-hidden />

        <svg
          className="eco-cycle-svg"
          viewBox={`0 0 ${ECO_CYCLE_VB} ${ECO_CYCLE_VB}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Circular flow between citizens, SAVIOUR, recycling, and businesses"
        >
          <defs>
            <filter id={blurId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id={arrowId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0, 255, 136, 0.55)" />
            </marker>
          </defs>

          <g className="eco-cycle-spin-layer">
            {radialLines.map(({ x2, y2, key }) => (
              <line
                key={key}
                x1={ECO_CYCLE_CX}
                y1={ECO_CYCLE_CY}
                x2={x2}
                y2={y2}
                className="eco-cycle-spoke"
              />
            ))}
            <path d={ringPathOuter} fill="none" className="eco-cycle-ring-ghost" />
            <path d={ringPath} fill="none" className="eco-cycle-ring-energy" filter={`url(#${blurId})`} />
            <path
              d={ringPath}
              fill="none"
              className="eco-cycle-ring-core"
              markerMid={`url(#${arrowId})`}
              markerEnd={`url(#${arrowId})`}
            />
          </g>
        </svg>

        <div className="eco-cycle-hub-wrap">
          <motion.div
            className="eco-cycle-hub"
            initial={false}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.55, delay: isActive ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eco-cycle-hub-ring" aria-hidden />
            <span className="eco-cycle-hub-core">SAVIOUR</span>
            <span className="eco-cycle-hub-sub">platform</span>
          </motion.div>
        </div>

        <div className="eco-cycle-nodes">
          {orbitNodes.map((node) => {
            const p = polarEco(ECO_CYCLE_ORBIT_R, node.angle)
            const leftPct = (p.x / ECO_CYCLE_VB) * 100
            const topPct = (p.y / ECO_CYCLE_VB) * 100
            return (
              <motion.div
                key={node.id}
                className={`eco-cycle-node glass-panel ${node.loopClose ? 'eco-cycle-node--return' : ''}`}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                initial={false}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
                transition={{
                  duration: 0.5,
                  delay: isActive ? 0.12 + node.step * 0.11 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <node.Icon className="eco-cycle-node-icon" aria-hidden />
                <span className="eco-cycle-node-label">{node.label}</span>
                {node.loopClose ? <span className="eco-cycle-node-note">loop</span> : null}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function EcoScanSlide({ isActive }) {
  const [scanning, setScanning] = useState(false)
  const [resultsReady, setResultsReady] = useState(false)
  const [insightsReady, setInsightsReady] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    let kickId = 0
    if (!isActive) {
      kickId = window.setTimeout(() => {
        setScanning(false)
        setResultsReady(false)
        setInsightsReady(false)
      }, 0)
      return () => window.clearTimeout(kickId)
    }
    kickId = window.setTimeout(() => {
      setScanning(false)
      setResultsReady(false)
      setInsightsReady(false)

      const t1 = setTimeout(() => setScanning(true), 520)
      const t2 = setTimeout(() => {
        setScanning(false)
        setResultsReady(true)
      }, 520 + 2550)
      const t3 = setTimeout(() => setInsightsReady(true), 520 + 2550 + 420)

      timersRef.current = [t1, t2, t3]
    }, 0)
    return () => {
      window.clearTimeout(kickId)
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [isActive])

  const tier = ECOSCAN_SCORE >= 70 ? 'good' : ECOSCAN_SCORE >= 45 ? 'medium' : 'poor'

  return (
    <div className="slide-content ecoscan-slide">
      <div className="ecoscan-depth" aria-hidden>
        <div className="ecoscan-depth-grid" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`ecoscan-dust d-${i + 1}`} />
        ))}
      </div>

      <div className="ecoscan-split">
        <motion.div
          className="ecoscan-copy"
          initial={false}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="ecoscan-kicker">Smart product intelligence</p>
          <h2 className="ecoscan-title">EcoScan</h2>
          <p className="ecoscan-sub">Instant Environmental Product Intelligence</p>
          <ul className="ecoscan-points">
            {ECOSCAN_BULLETS.map((line, i) => (
              <motion.li
                key={line}
                initial={false}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: 0.4,
                  delay: isActive ? 0.08 + i * 0.07 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="ecoscan-device-wrap"
          initial={false}
          animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.58, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ecoscan-phone glass-panel">
            <div className="ecoscan-phone-inner">
              <div className="ecoscan-notch" />
              <div className="ecoscan-screen">
                <header className="ecoscan-appbar">
                  <span className="ecoscan-app-name">EcoScan</span>
                  <span className="ecoscan-live">
                    <span className="ecoscan-live-dot" />
                    Live
                  </span>
                </header>

                <div className={`ecoscan-viewport ${scanning ? 'ecoscan-viewport--scanning' : ''}`}>
                  <div className="ecoscan-viewport-flicker" aria-hidden />
                  <div className="ecoscan-focus" aria-hidden>
                    <span className="ecoscan-focus-el f-tl" />
                    <span className="ecoscan-focus-el f-tr" />
                    <span className="ecoscan-focus-el f-bl" />
                    <span className="ecoscan-focus-el f-br" />
                  </div>
                  <div className="ecoscan-beam" aria-hidden />
                  <div className="ecoscan-product" aria-hidden>
                    <div className="ecoscan-product-cap" />
                    <div className="ecoscan-product-body" />
                  </div>
                </div>

                <motion.div
                  className="ecoscan-results"
                  initial={false}
                  animate={resultsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="ecoscan-product-name">Everyday bottle</p>
                  <div className={`ecoscan-score-row ecoscan-score-row--${tier}`}>
                    <span className="ecoscan-score-label">Eco score</span>
                    <span className="ecoscan-score-num">
                      <AnimatedCounter
                        value={ECOSCAN_SCORE}
                        duration={1100}
                        isActive={isActive && resultsReady}
                      />
                    </span>
                    <span
                      className={`ecoscan-tier-dot ecoscan-tier-dot--${tier}`}
                      title={
                        tier === 'good' ? 'Favorable impact' : tier === 'medium' ? 'Mixed impact' : 'High impact'
                      }
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="ecoscan-insights"
                  initial={false}
                  animate={insightsReady ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="ecoscan-insights-h">Insights</p>
                  <ul className="ecoscan-insights-list">
                    {[
                      { Icon: Cloud, text: 'Carbon: moderate footprint' },
                      { Icon: Recycle, text: 'Recyclability: high' },
                      { Icon: Sparkles, text: 'Alt: refillable glass' },
                    ].map(({ Icon, text }, i) => (
                      <motion.li
                        key={text}
                        className="ecoscan-insight"
                        initial={false}
                        animate={insightsReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{
                          duration: 0.38,
                          delay: insightsReady ? 0.06 + i * 0.08 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Icon className="ecoscan-insight-ic" aria-hidden />
                        <span>{text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MarketplaceSlide() {
  const chips = useMemo(() => ['Plastic', 'Paper', 'Glass', 'Textile', 'E-Waste', 'Organic'], [])

  return (
    <div className="slide-content">
      <p className="eyebrow">Trash-to-Value Marketplace</p>
      <h2 className="title">Waste moves like inventory in a circular economy.</h2>
      <div className="grid-split">
        <article className="card glass-panel">
          <h3>Market Network</h3>
          <p>Link recyclers, businesses, and processors in one trade graph.</p>
          <div className="chip-wrap">
            {chips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </article>
        <article className="card glass-panel cycle-diagram">
          <div className="cycle-node">Citizens</div>
          <div className="cycle-node">Recyclers</div>
          <div className="cycle-node">Industries</div>
          <div className="cycle-node">Retail</div>
          <div className="cycle-center">SAVIOUR</div>
        </article>
      </div>
    </div>
  )
}

function CityBrainSlide({ isActive }) {
  return (
    <div className="slide-content revenue-slide">
      <p className="eyebrow">Revenue Model</p>
      <h2 className="title revenue-title">How SAVIOUR makes money</h2>
      <div className="revenue-grid">
        {REVENUE_STREAMS.map(({ id, title, line1, line2, Icon }, idx) => (
          <motion.article
            key={id}
            className="revenue-card glass-panel"
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.42, delay: isActive ? 0.08 + idx * 0.08 : 0 }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            <Icon className="revenue-card-icon" aria-hidden />
            <h3>{title}</h3>
            <p>{line1}</p>
            <p>{line2}</p>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

const SAVIOUR_DEMO_URL =
  import.meta.env.VITE_SAVIOUR_DEMO_URL ||
  `${window.location.origin}/demo`

function BusinessSlide({ isActive }) {
  const openDemo = () => {
    window.location.assign(SAVIOUR_DEMO_URL)
  }

  return (
    <div className="slide-content final-demo-slide">
      <div className="final-demo-split">
        <motion.div
          className="final-demo-left"
          initial={false}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">SAVIOUR</p>
          <h2 className="title final-demo-title">Turning Everyday Actions into Global Impact</h2>
          <p className="final-demo-support">
            Users, businesses, and cities connected in one sustainability system.
          </p>
        </motion.div>

        <motion.div
          className="final-demo-right"
          initial={false}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.52, delay: isActive ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="final-demo-frame glass-panel">
            <header className="final-demo-head">
              <span className="final-demo-badge">Launch SAVIOUR Platform</span>
            </header>

            <div className="final-demo-screen">
              <article className="final-demo-panel">
                <ScanLine className="final-demo-icon" aria-hidden />
                <span>EcoScan</span>
              </article>
              <article className="final-demo-panel">
                <Coins className="final-demo-icon" aria-hidden />
                <span>EcoCredit</span>
              </article>
              <article className="final-demo-panel final-demo-panel--wide">
                <Brain className="final-demo-icon" aria-hidden />
                <span>Ecosystem</span>
              </article>
            </div>

            <motion.button
              type="button"
              className="final-demo-button"
              onClick={openDemo}
              animate={
                isActive
                  ? {
                      boxShadow: [
                        '0 0 0 rgba(0,255,136,0)',
                        '0 0 22px rgba(0,255,136,0.26)',
                        '0 0 0 rgba(0,255,136,0)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              Open Live Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function VisionSlide({ isActive }) {
  return (
    <div className="slide-content center vision-cinematic">
      <div className="vision-ambient" aria-hidden>
        <div className="vision-core-glow" />
        <div className="vision-particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`vision-particle vp-${(i % 7) + 1}`} />
          ))}
        </div>
      </div>
      <motion.h2
        className="vision-wordmark"
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        SAVIOUR
      </motion.h2>
      <motion.p
        className="vision-punchline"
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        Turning sustainability into a living economy.
      </motion.p>
      <motion.p
        className="vision-subtext"
        initial={false}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        A connected ecosystem of users, businesses, and AI driving real-world environmental change.
      </motion.p>
      <motion.p
        className="vision-fineprint"
        initial={false}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.52 }}
      >
        Built for a smarter, greener world.
      </motion.p>
      <div className="vision-focus-ring" aria-hidden>
      </div>
    </div>
  )
}

function IntroSlideTitle({ text }) {
  return (
    <div className="slide-content center">
      <h2 className="title">{text}</h2>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- deck registry consumed by Presentation.jsx
export const slides = [
  ({ isActive }) => <TitleSlide isActive={isActive} />,
  ({ isActive }) => <ProblemSlide isActive={isActive} />,
  ({ isActive }) => <SolutionSlide isActive={isActive} />,
  ({ isActive }) => <FlowSlide isActive={isActive} />,
  ({ isActive }) => <SaviourEcosystemSlide isActive={isActive} />,
  ({ isActive }) => <EcoScanSlide isActive={isActive} />,
  ({ isActive }) => <EconomyFlowSlide isActive={isActive} />,
  MarketplaceSlide,
  ({ isActive }) => <CityBrainSlide isActive={isActive} />,
  ({ isActive }) => <BusinessSlide isActive={isActive} />,
  ({ isActive }) => <VisionSlide isActive={isActive} />,
]

export function EmptySlideGuard() {
  return <IntroSlideTitle text="SAVIOUR" />
}
