/* global React, ReactDOM, Icon, Sidebar, Topbar, ChatMessage, Composer, StepNav, MobileFrame, DeviceToggle, isPhoneViewport */
const { useState, useEffect, useMemo } = React;

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 1 — In-product offer (Pro user, 3rd limit hit this week)
// ─────────────────────────────────────────────────────────────────────────
function ScreenInProduct({ tweaks }) {
  const [composerVal, setComposerVal] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [secsLeft, setSecsLeft] = useState(47 * 3600 + 23 * 60 + 14); // ~47h 23m 14s
  useEffect(() => {
    const t = setInterval(() => setSecsLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const exH = Math.floor(secsLeft / 3600);
  const exM = Math.floor((secsLeft % 3600) / 60);
  const exS = secsLeft % 60;

  const offerCopy = tweaks.tone === "urgent"
    ? { eyebrow: "Limited time — 48 hours only", title: "Stop hitting limits.", sub: "Upgrade now and save 60." }
    : { eyebrow: "Personalized for you", title: "You're working hard.", sub: "Make it easier." };

  return (
    <div className="cl-app">
      <Sidebar plan="Pro" activeChat={1} userName="Ambrish"/>
      <div className="cl-main">
        <Topbar
          title="Refactoring UserDashboard component"
          right={<span className="pill pro">Pro</span>}
        />
        <div className="cl-chat">
          <div className="cl-chat-inner">
            <ChatMessage role="user">Can you analyze this entire codebase and suggest architectural improvements?</ChatMessage>
            <ChatMessage role="assistant">
              <p>I'd be glad to. Let me start by scanning the structure…</p>
            </ChatMessage>

            {!dismissed && (
              <div className="dyn-offer fade-up">
                <div className="dyn-offer-eyebrow">
                  <span className="pill coral">{offerCopy.eyebrow}</span>
                </div>
                <h2 className="dyn-offer-title serif">
                  {offerCopy.title}<br/>{offerCopy.sub}
                </h2>
                <p className="dyn-offer-body">
                  You've hit your Pro limit <b>3 times this week</b> — mostly during deep coding sessions.
                  Max 5x gives you 5× the capacity for the same kind of work.
                </p>
                <div className="dyn-offer-price">
                  <span className="dyn-offer-price-old">$100</span>
                  <span className="dyn-offer-price-new">${tweaks.discount}</span>
                  <span className="dyn-offer-price-period">/mo · 3 mo</span>
                  <span className="pill success" style={{marginLeft: "auto"}}>Save ${100 - tweaks.discount * 1}</span>
                </div>
                <div className="dyn-offer-expires">
                  <Icon name="clock" size={12}/>
                  <span>Offer expires in <span className="mono dyn-offer-countdown">{String(exH).padStart(2,"0")}:{String(exM).padStart(2,"0")}:<span key={exS} className="dyn-offer-secs">{String(exS).padStart(2,"0")}</span></span></span>
                </div>
                <button className="btn btn-primary btn-lg btn-block dyn-offer-cta">
                  Upgrade to Max 5x — ${tweaks.discount}/mo
                  <Icon name="arrow-right" size={16}/>
                </button>
                <button className="dyn-offer-remind" onClick={() => setDismissed(true)}>
                  Remind me later
                </button>
              </div>
            )}
          </div>
        </div>
        <Composer value={composerVal} onChange={setComposerVal} placeholder="Reply to Claude…"/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 2 — Internal admin: Dynamic Offers Engine, cohort config
// ─────────────────────────────────────────────────────────────────────────
function ScreenAdmin({ tweaks }) {
  const initialCohorts = [
    {
      id: "A", letter: "A", name: "Pro → Max bridge: frequent limit-hitters",
      users: 284, rule: "plan = Pro AND last_hits_7d >= 3 AND active_days_7d >= 5",
      offer: "20% off Max 5x × 3 mo", control: 20,
      exposure: 42, uplift: 3.1, payback: 2.4, status: "active"
    },
    {
      id: "B", letter: "B", name: "Pro → Max bridge: cowork-heavy users",
      users: 96, rule: "plan = Pro AND cowork_sessions_30d >= 8",
      offer: "15% off Max 5x × 6 mo", control: 20,
      exposure: 38, uplift: 2.4, payback: 3.1, status: "active"
    },
    {
      id: "C", letter: "C", name: "Annual nudge: high-intent Pro (90d tenure)",
      users: 175, rule: "plan = Pro AND billing = monthly AND active_days_30d >= 22",
      offer: "20% off annual (≈$16/mo)", control: 20,
      exposure: 51, uplift: 5.8, payback: 0.8, status: "active"
    },
    {
      id: "D", letter: "D", name: "Churn save: Max → Pro downgraders",
      users: 12, rule: "plan_change = Max to Pro AND change_date < 7d",
      offer: "Max 5x at $60/mo × 3 mo", control: 0,
      exposure: 0, uplift: 0, payback: 0, status: "draft"
    },
  ];
  const [cohorts, setCohorts] = useState(initialCohorts);
  const [tick, setTick] = useState(0);

  // Live ticking metrics
  useEffect(() => {
    const t = setInterval(() => {
      setCohorts(prev => prev.map(c => {
        if (c.status !== "active") return c;
        const drift = (Math.random() - 0.5) * 0.3;
        return { ...c, exposure: Math.max(0, c.exposure + drift), users: c.users + (Math.random() < 0.3 ? 1 : 0) };
      }));
      setTick(t => t + 1);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  const toggle = (id) => setCohorts(prev =>
    prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c)
  );

  const totalUsers = cohorts.reduce((a, c) => a + c.users, 0);
  const activeCount = cohorts.filter(c => c.status === "active").length;

  return (
    <div className="admin-app">
      <header className="admin-header">
        <div className="admin-header-left">
          <span className="claude-c lg" style={{background: "#1F1E1B"}}>C</span>
          <div>
            <div className="admin-title">Dynamic Offers Engine</div>
            <div className="admin-subtitle">Rule-based v1 · {activeCount} active cohorts · {totalUsers.toLocaleString()} users</div>
          </div>
        </div>
        <div className="admin-header-right">
          <span className="admin-status">
            <span className="admin-status-dot pulse-dot"></span>
            Running
          </span>
          <button className="btn btn-secondary"><Icon name="settings" size={14}/> Config</button>
          <button className="btn btn-primary"><Icon name="plus" size={14}/> New cohort</button>
        </div>
      </header>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-label">Cohorts in flight</div>
          <div className="admin-stat-value">{activeCount} <span className="admin-stat-sub">/ {cohorts.length}</span></div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Eligible users</div>
          <div className="admin-stat-value">{totalUsers.toLocaleString()}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Avg exposure rate</div>
          <div className="admin-stat-value">
            {(cohorts.filter(c => c.status === "active").reduce((a, c) => a + c.exposure, 0) / Math.max(1, activeCount)).toFixed(1)}%
          </div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Blended uplift (pp)</div>
          <div className="admin-stat-value" style={{color: "var(--success)"}}>+3.6</div>
        </div>
      </div>

      <div className="admin-cohorts">
        {cohorts.map(c => (
          <div key={c.id} className={"admin-cohort" + (c.status === "draft" ? " admin-cohort-draft" : "")}>
            <div className="admin-cohort-head">
              <div className="admin-cohort-letter">{c.letter}</div>
              <div className="admin-cohort-name">
                <span className="admin-cohort-arrow">→</span>
                {c.name}
              </div>
              <div className="admin-cohort-users">
                <Icon name="users" size={12}/>
                <span>{c.users.toLocaleString()} users</span>
              </div>
              <button
                className={"admin-cohort-toggle" + (c.status === "active" ? " on" : "")}
                onClick={() => toggle(c.id)}
                disabled={c.status === "draft"}
              >
                <span className="admin-cohort-toggle-knob"/>
              </button>
            </div>

            <div className="admin-cohort-rule mono">
              {c.rule}
            </div>

            <div className="admin-cohort-pills">
              <span className="pill coral">{c.offer}</span>
              <span className="pill" style={{background: "var(--info-soft)", color: "var(--info)"}}>Control: {c.control}%</span>
              {c.status === "draft" && <span className="pill warning">Draft</span>}
              {c.status === "paused" && <span className="pill" style={{background: "#f0ede2", color: "var(--text-secondary)"}}>Paused</span>}
            </div>

            {c.status !== "draft" && (
              <div className="admin-cohort-metrics">
                <div className="admin-metric">
                  <div className="admin-metric-label">Exposure rate</div>
                  <div className="admin-metric-value">{c.exposure.toFixed(1)}%</div>
                </div>
                <div className="admin-metric">
                  <div className="admin-metric-label">Uplift vs. control</div>
                  <div className="admin-metric-value" style={{color: "var(--success)"}}>+{c.uplift.toFixed(1)} pp</div>
                </div>
                <div className="admin-metric">
                  <div className="admin-metric-label">CAC payback</div>
                  <div className="admin-metric-value">{c.payback.toFixed(1)} mo</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 3 — Email: usage-aware Max offer
// ─────────────────────────────────────────────────────────────────────────
function ScreenEmail({ tweaks }) {
  return (
    <div className="email-app">
      <div className="email-window">
        <div className="email-header">
          <div className="email-meta">
            <div className="email-from">
              <span className="email-avatar"><span className="claude-c">C</span></span>
              <div>
                <div><b>Claude by Anthropic</b> <span className="email-from-addr">&lt;claude@anthropic.com&gt;</span></div>
                <div className="email-to">to <b>ambrish@example.com</b></div>
              </div>
            </div>
            <div className="email-time">10:42 AM (2 hours ago)</div>
          </div>
          <h1 className="email-subject">Ambrish — your Claude usage from the last 30 days</h1>
        </div>

        <div className="email-body">
          <p>Hi Ambrish,</p>
          <p>You've been using Claude a lot lately — <b>5+ days a week</b>, mostly in Claude Code. We noticed you've been bumping into Pro's limits more often. We wanted to offer you a way to keep working without the interruptions.</p>

          <div className="email-callout">
            <div className="email-callout-title">What we noticed (last 30 days):</div>
            <ul>
              <li>23 days active on Pro</li>
              <li>47 Claude Code sessions</li>
              <li><b>Hit Pro's limit 11 times</b> — twice in the middle of late-night coding sprints</li>
            </ul>
          </div>

          <p>Max 5x would have avoided every one of those limit hits. For this month only, we'd like to offer you:</p>

          <div className="email-offer">
            <div className="email-offer-price">
              <span className="email-offer-amount">${tweaks.discount}</span>
              <span className="email-offer-period">/mo for 3 months</span>
            </div>
            <div className="email-offer-meta">That's {100 - tweaks.discount}% off Max 5x. Regular price $100/mo after.</div>
            <button className="btn btn-primary btn-lg btn-block email-offer-cta">
              Upgrade to Max 5x
            </button>
          </div>

          <p>No contract, cancel anytime. If Max 5x isn't right for you, you can downgrade back to Pro in one click.</p>

          <p className="email-signoff">— Claude</p>
        </div>

        <div className="email-foot">
          Offer valid through Nov 1 · Applies to your account only · This email was sent because you're an active Pro subscriber.
          <a href="#"> Manage preferences</a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Tweaks panel
// ─────────────────────────────────────────────────────────────────────────
const { TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakRadio } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "discount": 80,
  "tone": "warm",
  "device": "desktop"
}/*EDITMODE-END*/;

function App() {
  // Allow ?step=N&hide=nav for embedding (e.g. in PPTX export deck)
  const urlParams = new URLSearchParams(window.location.search);
  const initialStep = Math.max(0, Math.min(2, parseInt(urlParams.get('step') || '0', 10)));
  const hideNav = urlParams.get('hide') === 'nav';
  const [step, setStep] = useState(initialStep);
  const initialDefaults = isPhoneViewport()
    ? { ...TWEAK_DEFAULTS, device: "mobile" }
    : TWEAK_DEFAULTS;
  const [tweaks, setTweaks] = useTweaks(initialDefaults);
  const screens = ["In-product", "Admin engine", "Email"];

  const screenComponents = [
    <ScreenInProduct key="0" tweaks={tweaks}/>,
    <ScreenAdmin key="1" tweaks={tweaks}/>,
    <ScreenEmail key="2" tweaks={tweaks}/>,
  ];

  const screenLabels = [
    "01 In-Product Offer (Pro user, 3rd limit hit)",
    "02 Offer Engine: Cohort Configuration (Internal)",
    "03 Email: Usage-Aware Max Offer"
  ];

  // Mobile frame is only meaningful for the user-facing screens (in-product + email),
  // not the internal admin tool. Wrap when device=mobile + step is 0 or 2.
  const isMobile = tweaks.device === "mobile";
  const wrappable = step === 0 || step === 2;
  const screenContent = isMobile && wrappable
    ? <MobileFrame>{screenComponents[step]}</MobileFrame>
    : screenComponents[step];

  return (
    <>
      {!hideNav && <div className="proto-screen-meta">{screenLabels[step]}</div>}
      {!hideNav && wrappable && (
        <DeviceToggle value={tweaks.device} onChange={v => setTweaks({device: v})}/>
      )}
      <div
        className={"proto-stage" + (isMobile && wrappable ? " is-mobile" : "")}
        data-screen-label={screenLabels[step]}
        key={step + "-" + tweaks.device}
      >
        {screenContent}
      </div>
      <StepNav steps={screens} current={step} onChange={setStep} hidden={hideNav}/>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Device">
          <TweakRadio
            label="View"
            options={[{value: "desktop", label: "Desktop"}, {value: "mobile", label: "Mobile"}]}
            value={tweaks.device} onChange={v => setTweaks({device: v})}
          />
          {step === 1 && tweaks.device === "mobile" && (
            <p style={{fontSize: 11.5, color: "var(--text-tertiary)", margin: "4px 0 0", lineHeight: 1.5, fontStyle: "italic"}}>
              Admin engine is desktop-only — switch to screen 1 or 3 to see mobile.
            </p>
          )}
        </TweakSection>
        <TweakSection label="Offer">
          <TweakSlider
            label="Discount price ($/mo)" min={50} max={95} step={5}
            value={tweaks.discount} onChange={v => setTweaks({discount: v})}
          />
          <TweakRadio
            label="Copy tone"
            options={[{value: "warm", label: "Warm"}, {value: "urgent", label: "Urgent"}]}
            value={tweaks.tone} onChange={v => setTweaks({tone: v})}
          />
        </TweakSection>
        <TweakSection label="About">
          <p style={{fontSize: 12, color: "var(--text-tertiary)", margin: 0, lineHeight: 1.5}}>
            Click the dots in the bottom nav, or use ← → keys, to move between the three screens.
          </p>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// Keyboard nav
window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  const dots = document.querySelectorAll(".proto-stepnav-dot");
  const active = document.querySelector(".proto-stepnav-dot.active");
  if (!active) return;
  const idx = Array.from(dots).indexOf(active);
  if (e.key === "ArrowRight" && idx < dots.length - 1) dots[idx + 1].click();
  if (e.key === "ArrowLeft" && idx > 0) dots[idx - 1].click();
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
