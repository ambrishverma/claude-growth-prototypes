/* global React, ReactDOM, Icon, Sidebar, Topbar, ChatMessage, Composer, StepNav, useCountUp, MobileFrame, DeviceToggle, isPhoneViewport */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 1 — Discovery at limit-hit moment
// ─────────────────────────────────────────────────────────────────────────
function ScreenDiscovery({ tweaks }) {
  const [resetH, setResetH] = useState(3);
  const [resetM, setResetM] = useState(14);
  const [resetS, setResetS] = useState(38);

  useEffect(() => {
    const t = setInterval(() => {
      setResetS(s => {
        if (s > 0) return s - 1;
        setResetM(m => {
          if (m > 0) return m - 1;
          setResetH(h => Math.max(0, h - 1));
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

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
            <ChatMessage role="user">Help me refactor this 800-line React component into smaller reusable pieces</ChatMessage>
            <ChatMessage role="assistant">
              <p>I'll analyze the structure and break it down into…</p>
            </ChatMessage>

            <div className="sp-limit fade-up">
              <div className="sp-limit-head">
                <span className="sp-limit-icon"><Icon name="alert" size={16}/></span>
                <span>You've hit your Pro usage limit</span>
              </div>
              <p className="sp-limit-body">
                You've been in a deep coding session for 2 hours. Your next reset is in
                <span className="sp-limit-reset mono"> {resetH}h {String(resetM).padStart(2,"0")}m {String(resetS).padStart(2,"0")}s</span>.
                Keep working right now with a Sprint Pack:
              </p>

              <div className="sp-options">
                <div className="sp-option recommended">
                  <div className="sp-option-head">
                    <div>
                      <div className="sp-option-name">Weekday Sprint</div>
                      <div className="sp-option-meta">No rate limits for 24 hours · Same Opus 4.7 access · Finish the refactor without interruption</div>
                    </div>
                    <div className="sp-option-price">$40</div>
                  </div>
                  <div className="sp-option-foot">
                    <span className="pill coral" style={{fontSize: 10, padding: "3px 9px"}}>Recommended</span>
                    <button className="btn btn-primary sp-option-buy">Buy Sprint →</button>
                  </div>
                </div>

                <div className="sp-option">
                  <div className="sp-option-head">
                    <div>
                      <div className="sp-option-name">Weekend Sprint</div>
                      <div className="sp-option-meta">Best for Sat/Sun deep-work sessions · Includes 24-hour continuation</div>
                    </div>
                    <div className="sp-option-price">$25</div>
                  </div>
                  <div className="sp-option-foot">
                    <button className="btn btn-secondary sp-option-buy">Schedule for weekend</button>
                  </div>
                </div>
              </div>

              <a className="sp-upsell" href="#">
                Upgrade to Max 5x instead ($100/mo, includes 2 Sprints)
              </a>
            </div>
          </div>
        </div>
        <Composer placeholder="Reply to Claude…" value="" onChange={()=>{}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 2 — Active Sprint Mode (Claude Code shown)
// ─────────────────────────────────────────────────────────────────────────
function ScreenActive({ tweaks }) {
  // Real second-by-second countdown: 18h 42m 38s -> tick down each second
  const [totalSecs, setTotalSecs] = useState(18 * 3600 + 42 * 60 + 38);
  const [tickFlag, setTickFlag] = useState(0);
  const [msgs, setMsgs] = useState(47);
  const [files, setFiles] = useState(12);

  useEffect(() => {
    const t = setInterval(() => {
      setTotalSecs(s => Math.max(0, s - 1));
      setTickFlag(f => f + 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Occasionally bump the live "messages sent" / "files modified" stats — feels like Claude is working
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.6) setMsgs(m => m + 1);
      if (Math.random() < 0.25) setFiles(f => f + 1);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const tasks = [
    { done: true, title: "Refactored UserDashboard into 6 components", meta: "24 min · src/components/dashboard" },
    { done: true, title: "Extracted auth logic into custom hook", meta: "11 min · src/hooks/useAuth.ts" },
    { done: false, title: "Writing tests for new components", meta: "in progress · running…" }
  ];

  return (
    <div className="cl-app">
      <Sidebar plan="Pro · Sprint" activeChat={1} userName="Ambrish"/>
      <div className="cl-main sp-code-main">
        {/* Custom topbar to show Claude Code branding */}
        <header className="cl-topbar sp-code-topbar">
          <div className="cl-tb-left">
            <span className="claude-c">C</span>
            <span style={{fontSize: 14, fontWeight: 500}}>Claude Code</span>
          </div>
          <div className="cl-tb-right">
            <span className="pill" style={{background: "var(--success-soft)", color: "var(--success)", fontWeight: 600}}>
              <span className="admin-status-dot pulse-dot" style={{background: "var(--success)"}}/>
              Sprint Active
            </span>
          </div>
        </header>

        <div className="sp-active-wrap">
          {/* Big sprint banner */}
          <div className="sp-active-banner fade-up">
            <div className="sp-active-banner-left">
              <div className="sp-active-banner-title">
                <Icon name="zap" size={18}/>
                Weekday Sprint in progress
              </div>
              <div className="sp-active-banner-sub">No rate limits · focus mode</div>
            </div>
            <div className="sp-active-banner-right">
              <div className="sp-active-time mono">
                <span className="sp-active-time-num">{String(hrs).padStart(2,"0")}</span>
                <span className="sp-active-time-colon">:</span>
                <span className="sp-active-time-num">{String(mins).padStart(2,"0")}</span>
                <span className="sp-active-time-colon sp-active-time-blink">:</span>
                <span key={tickFlag} className="sp-active-time-secs">{String(secs).padStart(2,"0")}</span>
              </div>
              <div className="sp-active-time-lbl">remaining</div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="sp-active-stats">
            <div className="sp-active-stat">
              <div className="sp-active-stat-label">Started at</div>
              <div className="sp-active-stat-value mono">09:18 AM</div>
            </div>
            <div className="sp-active-stat">
              <div className="sp-active-stat-label">Messages sent</div>
              <div className="sp-active-stat-value" key={msgs}><span className="num-flip">{msgs}</span></div>
            </div>
            <div className="sp-active-stat">
              <div className="sp-active-stat-label">Files modified</div>
              <div className="sp-active-stat-value" key={files}><span className="num-flip">{files}</span></div>
            </div>
            <div className="sp-active-stat">
              <div className="sp-active-stat-label">Est. Pro limits bypassed</div>
              <div className="sp-active-stat-value" style={{color: "var(--success)"}}>4×</div>
            </div>
          </div>

          {/* Task list */}
          <div className="sp-active-section">
            <div className="sp-active-section-head">THIS SPRINT</div>
            <div className="sp-active-tasks">
              {tasks.map((t, i) => (
                <div key={i} className={"sp-active-task" + (t.done ? " done" : " active")}>
                  <span className="sp-active-task-icon">
                    {t.done ? (
                      <Icon name="check" size={13} stroke={2.6}/>
                    ) : (
                      <span className="sp-active-task-spin"/>
                    )}
                  </span>
                  <div className="sp-active-task-body">
                    <div className="sp-active-task-title">{t.title}</div>
                    <div className="sp-active-task-meta mono">{t.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 3 — Max tier with Sprint Packs bundled
// ─────────────────────────────────────────────────────────────────────────
function ScreenMaxBundle({ tweaks }) {
  const [selected, setSelected] = useState("max5");

  return (
    <div className="sp-bundle-app">
      <div className="sp-bundle-wrap">
        <div className="sp-bundle-eyebrow">PRICING</div>
        <h1 className="sp-bundle-title serif">
          You've used <em>3 Sprint Packs</em> this month
        </h1>
        <p className="sp-bundle-sub">
          Max 5x includes 2 Sprint Packs monthly — could save you money
        </p>

        <div className="sp-tiers">
          {/* Pro */}
          <div
            className={"sp-tier" + (selected === "pro" ? " selected" : "")}
            onClick={() => setSelected("pro")}
          >
            <div className="sp-tier-head">
              <div>
                <div className="sp-tier-name">Pro <span className="sp-tier-current">(current)</span></div>
              </div>
              <div className="sp-tier-price">$20<span className="sp-tier-period">/mo</span></div>
            </div>
            <ul className="sp-tier-feats">
              <li><Icon name="check" size={13} stroke={2.4}/> Standard usage limits</li>
              <li><Icon name="check" size={13} stroke={2.4}/> Claude Code + Cowork + Design access</li>
              <li><Icon name="check" size={13} stroke={2.4}/> Buy Sprint Packs individually ($25–$40)</li>
            </ul>
            <div className="sp-tier-foot">
              Your monthly spend: $20 + $115 (3 packs) = <b>$135</b>
            </div>
          </div>

          {/* Max 5x */}
          <div
            className={"sp-tier hot" + (selected === "max5" ? " selected" : "")}
            onClick={() => setSelected("max5")}
          >
            <div className="sp-tier-ribbon">BEST VALUE</div>
            <div className="sp-tier-head">
              <div>
                <div className="sp-tier-name">Max 5x</div>
              </div>
              <div className="sp-tier-price">$100<span className="sp-tier-period">/mo</span></div>
            </div>
            <ul className="sp-tier-feats">
              <li><Icon name="check" size={13} stroke={2.4}/> 5× Pro usage limits</li>
              <li><Icon name="check" size={13} stroke={2.4}/> Priority access during peak hours</li>
              <li><Icon name="check" size={13} stroke={2.4}/> Early access to new features</li>
            </ul>
            <div className="sp-tier-includes">
              <Icon name="package" size={14}/>
              <div>
                <b>Includes 2 Sprint Packs / month</b>
                <div className="sp-tier-includes-sub">Unused Sprints roll over up to 4. Equivalent to $80+ value.</div>
              </div>
            </div>
          </div>

          {/* Max 20x */}
          <div
            className={"sp-tier" + (selected === "max20" ? " selected" : "")}
            onClick={() => setSelected("max20")}
          >
            <div className="sp-tier-head">
              <div>
                <div className="sp-tier-name">Max 20x</div>
              </div>
              <div className="sp-tier-price">$200<span className="sp-tier-period">/mo</span></div>
            </div>
            <ul className="sp-tier-feats">
              <li><Icon name="check" size={13} stroke={2.4}/> 20× Pro usage limits</li>
              <li><Icon name="check" size={13} stroke={2.4}/> Always-on high capacity</li>
            </ul>
            <div className="sp-tier-includes">
              <Icon name="package" size={14}/>
              <div>
                <b>Includes 4 Sprint Packs / month</b>
                <div className="sp-tier-includes-sub">Effectively always-available Sprint behavior for daily heavy users.</div>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-lg sp-bundle-cta">
          {selected === "pro" ? "Stay on Pro" : selected === "max5" ? "Upgrade to Max 5x — $100/mo" : "Upgrade to Max 20x — $200/mo"}
          <Icon name="arrow-right" size={16}/>
        </button>
        <p className="sp-bundle-foot">Switch or cancel anytime · No contract</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
const { TweaksPanel, useTweaks, TweakSection, TweakRadio } = window;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "device": "desktop"
}/*EDITMODE-END*/;

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialStep = Math.max(0, Math.min(2, parseInt(urlParams.get('step') || '0', 10)));
  const hideNav = urlParams.get('hide') === 'nav';
  const [step, setStep] = useState(initialStep);
  const initialDefaults = isPhoneViewport()
    ? { ...TWEAK_DEFAULTS, device: "mobile" }
    : TWEAK_DEFAULTS;
  const [tweaks, setTweaks] = useTweaks(initialDefaults);
  const screens = ["Discovery", "Active sprint", "Max bundle"];
  const labels = [
    "01 Discovery at Limit-Hit Moment",
    "02 Active Sprint Mode (Shown in Claude Code)",
    "03 Max Tier with Sprint Packs Bundled"
  ];
  const screensComp = [
    <ScreenDiscovery key="0" tweaks={tweaks}/>,
    <ScreenActive key="1" tweaks={tweaks}/>,
    <ScreenMaxBundle key="2" tweaks={tweaks}/>,
  ];

  const isMobile = tweaks.device === "mobile";
  const screenContent = isMobile
    ? <MobileFrame>{screensComp[step]}</MobileFrame>
    : screensComp[step];

  return (
    <>
      {!hideNav && <div className="proto-screen-meta">{labels[step]}</div>}
      {!hideNav && (
        <DeviceToggle value={tweaks.device} onChange={v => setTweaks({device: v})}/>
      )}
      <div
        className={"proto-stage" + (isMobile ? " is-mobile" : "")}
        data-screen-label={labels[step]}
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
        </TweakSection>
        <TweakSection label="About">
          <p style={{fontSize: 12, color: "var(--text-tertiary)", margin: 0, lineHeight: 1.5}}>
            Step through the 3 screens with the bottom nav or ← → arrows. Sprint Packs let users buy time-boxed unlimited windows when they hit limits.
          </p>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

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
