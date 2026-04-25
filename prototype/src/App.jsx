import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, BrainCircuit, Building2, Leaf, LogOut, MapPinned, Recycle, ScanLine, Sparkles, Store, Wallet } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: Activity },
  { to: '/ecoscan', label: 'EcoScan', icon: ScanLine },
  { to: '/wallet', label: 'EcoCredit Wallet', icon: Wallet },
  { to: '/offers', label: 'Offers', icon: Store },
  { to: '/recycling', label: 'Recycling Hub', icon: Recycle },
  { to: '/insights', label: 'AI Insights', icon: BrainCircuit },
  { to: '/business-model', label: 'Business View', icon: Building2 },
]

const ACTIVITY = [
  'Bus commute logged (+20)',
  'Reusable bottle used (+8)',
  'Plastic disposal detected (-6)',
  'E-waste drop off (+30)',
]

const TXNS = [
  { text: 'Bus Ride', credits: +20 },
  { text: 'Recycling Drop', credits: +35 },
  { text: 'Plastic Bag Use', credits: -8 },
  { text: 'Bike Commute', credits: +15 },
]

const OFFERS = [
  { name: 'Eco Cafe', offer: '10% off with 120 credits', badge: 'Low Carbon' },
  { name: 'Green Transit', offer: '2 free rides / 200 credits', badge: 'Clean Mobility' },
  { name: 'Sustain Mart', offer: '15% off essentials', badge: 'Circular Retail' },
]

const AI_MESSAGES = [
  'Analyzing environmental impact...',
  'Optimizing recycling flow...',
  'Updating city data...',
  'Rebalancing EcoCredit rewards...',
]
const AUTH_KEY = 'saviour_demo_auth'

function CountUp({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const target = Number(value) || 0
    const durationMs = 1100
    const stepMs = 16
    const steps = Math.max(1, Math.floor(durationMs / stepMs))
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      const progress = Math.min(1, i / steps)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(target * eased))
      if (progress >= 1) window.clearInterval(id)
    }, stepMs)
    return () => window.clearInterval(id)
  }, [value])

  return display.toLocaleString()
}

function GlassCard({ children, className = '', depth = 1 }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -2 }}
      className={`glass-card layer-${depth} ${className}`}
    >
      {children}
    </motion.article>
  )
}

function Counter({ value, label }) {
  return (
    <GlassCard className="float-slow">
      <p className="card-kicker">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="counter-value"
      >
        <CountUp value={value} />
      </motion.p>
    </GlassCard>
  )
}

function ModuleHeader({ title, subtitle }) {
  return (
    <header className="module-header">
      <p className="module-kicker">Module</p>
      <h2 className="module-title">{title}</h2>
      <p className="module-subtitle">{subtitle}</p>
    </header>
  )
}

function SystemFlowBar() {
  const steps = [
    { label: 'EcoScan', hint: 'You earn here' },
    { label: 'EcoCredits', hint: 'Balance grows' },
    { label: 'Offers', hint: 'You spend here' },
    { label: 'Recycling', hint: 'Value returns' },
    { label: 'AI Insights', hint: 'System learns here' },
  ]
  return (
    <div className="flow-rail" aria-label="System flow">
      {steps.map((s, i) => (
        <div key={s.label} className="flow-step">
          <span className="flow-step-label">{s.label}</span>
          <span className="flow-step-hint">{s.hint}</span>
          <span className="flow-dot" />
          {i < steps.length - 1 ? <span className="flow-arrow">→</span> : null}
        </div>
      ))}
    </div>
  )
}

function Dashboard() {
  return (
    <section className="module-wrap">
      <ModuleHeader
        title="Eco Dashboard"
        subtitle="Instant overview of score, credits, impact trend, and AI guidance."
      />
      <div className="dashboard-grid">
        <GlassCard className="center-score pulse-focus" depth={3}>
          <p className="card-kicker">EcoScore</p>
          <motion.p
            key="ecoscore-main"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="center-score-value"
          >
            <CountUp value={87} />
          </motion.p>
          <p className="center-score-note">AI analyzing your eco impact…</p>
        </GlassCard>
        <Counter value={1260} label="EcoCredits" />
        <GlassCard depth={1}>
          <p className="card-kicker cyan">AI Suggestion</p>
          <p className="card-text">Public transport today → +20 credits</p>
        </GlassCard>
        <GlassCard className="span-2" depth={2}>
          <p className="card-subtitle">Weekly impact trend</p>
          <div className="chart-bars">
            {[36, 48, 40, 62, 58, 74, 86].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.08 }}
                className="chart-bar"
              />
            ))}
          </div>
        </GlassCard>
        <GlassCard depth={1}>
          <p className="card-subtitle">Recent activity</p>
          <ul className="list-stack">
            {ACTIVITY.map((item) => (
              <li key={item} className="list-item">
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </section>
  )
}

function Ecoscan() {
  const [scanning, setScanning] = useState(false)
  return (
    <section className="module-wrap">
      <ModuleHeader
        title="EcoScan"
        subtitle="Scan products, evaluate impact, and discover cleaner alternatives."
      />
      <div className="grid two">
        <GlassCard>
          <p className="card-subtitle cyan">Google Lens for sustainability</p>
          <button
            className="pill-btn"
            onClick={() => {
              setScanning(true)
              window.setTimeout(() => setScanning(false), 1500)
            }}
          >
            Scan Product
          </button>
          <div className="scan-box">
            <motion.div
              animate={scanning ? { y: [0, 120, 0] } : { y: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="scan-line"
            />
          </div>
        </GlassCard>
        <GlassCard>
          <p className="card-subtitle">Scan Result</p>
          <ul className="result-list">
            <li>Eco Impact Score: <span className="hl-green">74 / 100</span></li>
            <li>CO2 Footprint: <span className="hl-cyan">1.8kg</span></li>
            <li>Alternative: <span className="hl-green">Refillable variant (-32% CO2)</span></li>
          </ul>
        </GlassCard>
      </div>
    </section>
  )
}

function WalletPage() {
  return (
    <section className="module-wrap">
      <ModuleHeader
        title="EcoCredit Wallet"
        subtitle="Track earnings, spending, and redemption opportunities."
      />
      <div className="grid three">
      <Counter value={1260} label="Total Credits" />
      <GlassCard className="span-2" depth={2}>
        <p className="card-subtitle">Transactions</p>
        <div className="list-stack">
          {TXNS.map((t) => (
            <div key={t.text} className="row-card">
              <span>{t.text}</span>
              <span className={t.credits > 0 ? 'hl-green' : 'hl-red'}>
                {t.credits > 0 ? '+' : ''}
                {t.credits}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="span-3" depth={1}>
        <p className="card-subtitle cyan">Redeem</p>
        <div className="grid three compact">
          {['Cafe offers', 'Shopping discounts', 'Transport rewards'].map((x) => (
            <div key={x} className="chip-card">
              {x}
            </div>
          ))}
        </div>
      </GlassCard>
      </div>
    </section>
  )
}

function Offers() {
  return (
    <section className="module-wrap">
      <ModuleHeader
        title="Offers Marketplace"
        subtitle="Spend EcoCredits on rewards from sustainability-focused partners."
      />
      <div className="grid three">
      {OFFERS.map((o) => (
        <GlassCard key={o.name}>
          <p className="card-title">{o.name}</p>
          <p className="card-text">{o.offer}</p>
          <span className="badge-pill">
            {o.badge}
          </span>
        </GlassCard>
      ))}
      </div>
    </section>
  )
}

function RecyclingHub() {
  return (
    <section className="module-wrap">
      <ModuleHeader
        title="Recycling Hub"
        subtitle="Convert waste into measurable value with recycler matching."
      />
      <div className="grid three">
      <GlassCard className="span-2">
        <p className="card-subtitle">Upload Waste Item (mock)</p>
        <div className="upload-box">
          Drag image / click upload
        </div>
      </GlassCard>
      <GlassCard>
        <p className="card-subtitle cyan">Estimated Value</p>
        <p className="value-big">$14.20</p>
        <p className="card-text">Recycler match: GreenLoop Processing</p>
        <p className="card-kicker">Flow: Waste → Value → Buyer</p>
      </GlassCard>
      </div>
    </section>
  )
}

function Insights() {
  return (
    <section className="module-wrap">
      <ModuleHeader
        title="AI Insights"
        subtitle="City intelligence, risk prediction, and optimization signals."
      />
      <div className="grid three">
      <GlassCard className="span-2">
        <p className="card-subtitle">City Heatmap (mock)</p>
        <div className="heatmap">
          <div className="heatmap-grid">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`heat-cell ${i % 5 === 0 ? 'hot' : 'cool'}`}
              />
            ))}
          </div>
        </div>
      </GlassCard>
      <GlassCard>
        <p className="card-subtitle cyan">Predictions</p>
        <div className="list-stack">
          <p className="list-item">Waste increase expected in Zone A</p>
          <p className="list-item">Transit carbon savings up 12% this week</p>
          <p className="list-item">Recycling demand spike near Downtown</p>
        </div>
      </GlassCard>
      </div>
    </section>
  )
}

function BusinessModelPage() {
  const metrics = [
    { label: 'Users Reached', value: 24300 },
    { label: 'Active Eco Customers', value: 8120 },
    { label: 'Offer Conversions', value: 1864 },
  ]

  const flow = [
    { title: 'Eco Users', hint: 'intent-rich demand' },
    { title: 'EcoCredits', hint: 'reward engine' },
    { title: 'Offers', hint: 'high-fit promotions' },
    { title: 'Business Growth', hint: 'revenue + retention' },
  ]

  return (
    <section className="module-wrap">
      <ModuleHeader
        title="Business View"
        subtitle="A focused growth control panel for business performance."
      />

      <section className="biz-section">
        <p className="card-kicker">Impact Snapshot</p>
        <div className="impact-grid">
          {metrics.map((m, i) => (
            <GlassCard key={m.label} className="impact-card pulse-focus" depth={i === 1 ? 3 : 2}>
              <p className="impact-value">
                <CountUp value={m.value} />
              </p>
              <p className="impact-label">{m.label}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="biz-section">
        <p className="card-kicker cyan">Growth Flow</p>
        <GlassCard className="growth-flow-shell" depth={2}>
          <div className="growth-flow-line" />
          {flow.map((step, i) => (
            <div key={step.title} className="growth-node">
              <p className="growth-node-title">{step.title}</p>
              <p className="growth-node-hint">{step.hint}</p>
              {i < flow.length - 1 ? <span className="growth-arrow">→</span> : null}
            </div>
          ))}
          <span className="flow-runner runner-1" />
          <span className="flow-runner runner-2" />
        </GlassCard>
      </section>

      <section className="biz-section">
        <p className="card-kicker">Action Controls</p>
        <div className="action-controls">
          {['Create Offer', 'Boost Visibility', 'View Analytics'].map((action) => (
            <button key={action} type="button" className="action-btn">
              {action}
            </button>
          ))}
        </div>
      </section>
    </section>
  )
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (event) => {
    event.preventDefault()
    onLogin()
  }

  return (
    <div className="login-shell">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        onSubmit={submitLogin}
        className="login-card"
      >
        <p className="module-kicker">Welcome</p>
        <h1 className="login-title">Enter SAVIOUR</h1>
        <p className="login-subtitle">Smart Eco Intelligence Platform</p>

        <label className="login-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          placeholder="you@saviour.ai"
          required
        />

        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          placeholder="••••••••"
          required
        />

        <button type="submit" className="pill-btn login-btn">
          Enter SAVIOUR
        </button>
        <button type="button" className="login-demo-btn" onClick={onLogin}>
          Continue as Demo User
        </button>
      </motion.form>
    </div>
  )
}

function Shell({ onLogout }) {
  const [aiMessageIndex, setAiMessageIndex] = useState(0)
  const [liveCreditGain, setLiveCreditGain] = useState(12)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const location = useLocation()
  const headerTitle = useMemo(() => {
    const item = NAV_ITEMS.find((n) => location.pathname.startsWith(n.to))
    return item ? item.label : 'Dashboard'
  }, [location.pathname])

  useEffect(() => {
    const id = window.setInterval(() => {
      setAiMessageIndex((v) => (v + 1) % AI_MESSAGES.length)
      setLiveCreditGain(8 + Math.floor(Math.random() * 17))
    }, 3600)
    return () => window.clearInterval(id)
  }, [])

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width - 0.5
    const ny = (event.clientY - rect.top) / rect.height - 0.5
    setParallax({ x: nx, y: ny })
  }

  const onPointerLeave = () => setParallax({ x: 0, y: 0 })

  return (
    <div
      className="proto-app"
      style={{ '--mx': `${parallax.x}`, '--my': `${parallax.y}` }}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
    >
      <div className="bg-waves" />
      <div className="bg-radials" />
      <div className="bg-grid" />
      <div className="bg-particles" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} className={`particle p-${(i % 7) + 1}`} />
        ))}
      </div>

      <div className="layout">
        <aside className="sidebar">
          <div className="brand-row">
            <Sparkles size={16} />
            <p className="brand-text">SAVIOUR</p>
          </div>
          <nav className="nav-stack">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link ${active ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="content">
          <div className="top-row">
            <div>
              <p className="top-kicker">Smart Eco Intelligence Platform</p>
              <h1 className="top-title">{headerTitle}</h1>
              <motion.p key={aiMessageIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="ai-status">
                {AI_MESSAGES[aiMessageIndex]}
              </motion.p>
            </div>
            <div className="top-actions">
              <p className="live-credit-pill">+{liveCreditGain} EcoCredits just earned</p>
              <a className="toggle-btn" href="/?slide=10" target="_top" rel="noreferrer">
                Back to Slides
              </a>
              <button type="button" onClick={onLogout} className="logout-btn" aria-label="Logout">
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ecoscan" element={<Ecoscan />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/recycling" element={<RecyclingHub />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/business-model" element={<BusinessModelPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          <SystemFlowBar />
        </main>
      </div>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(AUTH_KEY) === '1')

  const handleLogin = () => {
    localStorage.setItem(AUTH_KEY, '1')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY)
    setIsLoggedIn(false)
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />}
      />
      <Route
        path="/*"
        element={isLoggedIn ? <Shell onLogout={handleLogout} /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App
