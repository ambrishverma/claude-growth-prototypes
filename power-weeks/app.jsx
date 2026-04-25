/* global React, ReactDOM, Icon, Sidebar, Topbar, ChatMessage, Composer, StepNav, useCountUp, MobileFrame */
const { useState, useEffect } = React;

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 1 — Power Week invitation (high-intent free user)
// ─────────────────────────────────────────────────────────────────────────
function ScreenInvitation({ tweaks }) {
  return (
    <div className="cl-app">
      <Sidebar plan="Free" activeChat={1} userName="Sam"/>
      <div className="cl-main">
        <Topbar
          title="Building a rate limiter in Go"
          right={<span className="pill free">Free</span>}
        />
        <div className="cl-chat">
          <div className="cl-chat-inner">
            <div className="pw-invite fade-up">
              <div className="pw-invite-eyebrow">
                <span className="pw-invite-badge">
                  <Icon name="rocket" size={11}/>
                  Power Week Invite
                </span>
              </div>
              <h2 className="pw-invite-title serif">
                You've been using Claude a lot.<br/>
                <em>Try Pro free for 7 days.</em>
              </h2>
              <p className="pw-invite-sub">
                No payment info required. Full access to everything Pro users get.
              </p>

              <div className="pw-qualified">
                <div className="pw-qualified-title">Why you qualified</div>
                <ul>
                  <li><Icon name="check-circle" size={14} stroke={2}/> Active 5 of the last 7 days</li>
                  <li><Icon name="check-circle" size={14} stroke={2}/> Hit rate limits 3 times this week</li>
                  <li><Icon name="check-circle" size={14} stroke={2}/> Started exploring Claude Code</li>
                </ul>
              </div>

              <div className="pw-during">
                <div className="pw-during-title">During your trial, try:</div>
                <div className="pw-during-grid">
                  <div className="pw-during-item">
                    <span className="pw-during-icon"><Icon name="code" size={16}/></span>
                    <div>
                      <div className="pw-during-name">One Claude Code session</div>
                      <div className="pw-during-desc">Refactor a repo, build a feature, or debug with full access</div>
                    </div>
                  </div>
                  <div className="pw-during-item">
                    <span className="pw-during-icon"><Icon name="users" size={16}/></span>
                    <div>
                      <div className="pw-during-name">One Cowork task</div>
                      <div className="pw-during-desc">Let Claude run a multi-step workflow for you</div>
                    </div>
                  </div>
                  <div className="pw-during-item">
                    <span className="pw-during-icon"><Icon name="sparkles" size={16}/></span>
                    <div>
                      <div className="pw-during-name">One Claude Design prototype</div>
                      <div className="pw-during-desc">Turn a rough idea into a polished visual</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-lg btn-block">
                Start My Power Week →
              </button>
              <p className="pw-invite-foot">
                No credit card · No auto-renewal · Trial ends naturally after 7 days
              </p>
            </div>
          </div>
        </div>
        <Composer placeholder="Reply to Claude…" value="" onChange={()=>{}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 2 — Day 4 of 7 progress nudge
// ─────────────────────────────────────────────────────────────────────────
function ScreenDay4({ tweaks }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(57), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="cl-app">
      <Sidebar plan="Pro (Power Week)" activeChat={1} userName="Sam"/>
      <div className="cl-main">
        <Topbar
          title="Power Week — Day 4 of 7"
          right={
            <>
              <span className="pill" style={{background: "#FAEEDB", color: "#B8721C", fontWeight: 600}}>
                Power Week · Day 4/7
              </span>
            </>
          }
        />
        <div className="cl-chat">
          <div className="cl-chat-inner pw-d4">
            <div className="pw-d4-hero fade-up">
              <div className="pw-d4-eyebrow">YOUR POWER WEEK</div>
              <h1 className="pw-d4-title serif">
                You're <em>57% through</em> — and already ahead of most trials.
              </h1>

              <div className="pw-d4-progress">
                <div className="pw-d4-progress-track">
                  <div
                    className="pw-d4-progress-fill"
                    style={{width: `${progress}%`}}
                  />
                </div>
                <div className="pw-d4-progress-meta">
                  <span>Day 4 of 7</span>
                  <span>3 days left</span>
                </div>
              </div>
            </div>

            <div className="pw-d4-section">
              <h3 className="pw-d4-h3">Your exploration so far</h3>
              <div className="pw-d4-tasks">
                <div className="pw-d4-task done">
                  <span className="pw-d4-check"><Icon name="check" size={14} stroke={2.6}/></span>
                  <div className="pw-d4-task-body">
                    <div className="pw-d4-task-title"><s>First Claude Code session</s></div>
                    <div className="pw-d4-task-desc">Completed Tuesday · Built a test runner for your repo</div>
                  </div>
                  <span className="pw-d4-plus">+1</span>
                </div>
                <div className="pw-d4-task done">
                  <span className="pw-d4-check"><Icon name="check" size={14} stroke={2.6}/></span>
                  <div className="pw-d4-task-body">
                    <div className="pw-d4-task-title"><s>First Cowork task</s></div>
                    <div className="pw-d4-task-desc">Completed Wednesday · Research on 12 competitors</div>
                  </div>
                  <span className="pw-d4-plus">+1</span>
                </div>
                <div className="pw-d4-task active">
                  <span className="pw-d4-check pending"></span>
                  <div className="pw-d4-task-body">
                    <div className="pw-d4-task-title">Try Claude Design</div>
                    <div className="pw-d4-task-desc">3 days left · Takes ~10 minutes</div>
                  </div>
                  <button className="pw-d4-task-cta">Start →</button>
                </div>
                <div className="pw-d4-task locked">
                  <span className="pw-d4-check locked"></span>
                  <div className="pw-d4-task-body">
                    <div className="pw-d4-task-title">Create your first Project</div>
                    <div className="pw-d4-task-desc">Persistent context for recurring work</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pw-d4-stat fade-up">
              <Icon name="trending" size={16}/>
              <div>
                <b>Users who complete 3+ goals are 3× more likely to love Pro</b>
                <div className="pw-d4-stat-sub">Try Claude Design this afternoon — you'll be glad you did.</div>
              </div>
            </div>
          </div>
        </div>
        <Composer placeholder="Reply to Claude…" value="" onChange={()=>{}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SCREEN 3 — End-of-trial paywall (Day 7)
// ─────────────────────────────────────────────────────────────────────────
function PwStat({ value, unit, label, highlight, format, delay }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay + 200);
    return () => clearTimeout(t);
  }, [delay]);
  const animated = useCountUp(started ? value : 0, 900);
  return (
    <div
      className={"pw-stat fade-up" + (highlight ? " highlight" : "")}
      style={{animationDelay: `${delay}ms`}}
    >
      <div className="pw-stat-value">
        {format ? format(animated) : Math.round(animated)}
        {unit && <span className="pw-stat-unit"> {unit}</span>}
      </div>
      <div className="pw-stat-label">{label}</div>
    </div>
  );
}
function ScreenPaywall({ tweaks }) {
  const stats = [
    { value: 14, unit: "hrs", label: "Work Claude helped you finish", highlight: true, format: v => `~${Math.round(v)}` },
    { value: 3, unit: "", label: "Surfaces explored", format: v => Math.round(v) },
    { value: 47, unit: "", label: "Coding sessions", format: v => Math.round(v) },
    { value: 8, unit: "", label: "Cowork tasks", format: v => Math.round(v) },
    { value: 12, unit: "", label: "Design drafts", format: v => Math.round(v) },
  ];

  return (
    <div className="cl-app">
      <Sidebar plan="Pro (Day 7)" activeChat={1} userName="Sam"/>
      <div className="cl-main">
        <Topbar
          title="Power Week — Final day"
          right={<span className="pill" style={{background: "#FAEEDB", color: "#B8721C", fontWeight: 600}}>Day 7 of 7</span>}
        />
        <div className="cl-chat">
          <div className="cl-chat-inner pw-paywall">
            <h1 className="pw-paywall-title serif fade-up">
              Look at <em>what you did</em> this week.
            </h1>
            <p className="pw-paywall-sub fade-up">
              Your Power Week was pretty remarkable — keep going.
            </p>

            <div className="pw-paywall-offer fade-up" style={{animationDelay: "150ms"}}>
              <div className="pw-paywall-offer-head">
                <div>
                  <div className="pw-paywall-offer-title">Continue with <b>Pro</b></div>
                  <div className="pw-paywall-offer-price">
                    <span className="pw-paywall-strike">$20/mo</span>
                    <span className="pw-paywall-amount">$15/mo</span>
                    <span className="pill success" style={{marginLeft: 8}}>25% off · 1 yr</span>
                  </div>
                </div>
              </div>
              <p className="pw-paywall-offer-body">
                Everything you just experienced — Code, Cowork, Design — plus your full conversation history and in-progress projects.
              </p>
              <button className="btn btn-primary btn-lg btn-block">Keep Pro — $15/mo →</button>
              <button className="pw-paywall-skip">Not now, remind me in a week</button>
            </div>

            <p className="pw-paywall-leadin fade-up" style={{animationDelay: "300ms"}}>
              Here's what your week looked like:
            </p>

            <div className="pw-stats">
              {stats.map((s, i) => (
                <PwStat key={i} {...s} delay={i * 80 + 400}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────
const { TweaksPanel, useTweaks, TweakSection, TweakRadio } = window;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "celebratory",
  "device": "desktop"
}/*EDITMODE-END*/;

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialStep = Math.max(0, Math.min(2, parseInt(urlParams.get('step') || '0', 10)));
  const hideNav = urlParams.get('hide') === 'nav';
  const [step, setStep] = useState(initialStep);
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);
  const screens = ["Invitation", "Day 4 nudge", "Paywall"];
  const labels = [
    "01 Power Week Invitation (High-Intent Free Users)",
    "02 Day 4 of 7 Progress Nudge",
    "03 End-of-Trial Paywall (The Critical Moment)"
  ];
  const screensComp = [
    <ScreenInvitation key="0" tweaks={tweaks}/>,
    <ScreenDay4 key="1" tweaks={tweaks}/>,
    <ScreenPaywall key="2" tweaks={tweaks}/>,
  ];

  const isMobile = tweaks.device === "mobile";
  // Mobile makes sense for all three screens here — they're all user-facing
  const screenContent = isMobile
    ? <MobileFrame>{screensComp[step]}</MobileFrame>
    : screensComp[step];

  return (
    <>
      {!hideNav && <div className="proto-screen-meta">{labels[step]}</div>}
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
            Step through the 3 screens with the bottom nav or ← → arrows. Power Weeks is a 7-day Pro trial for high-intent free users.
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
