/* global React */
// Shared Claude UI shell — sidebar + topbar that wraps each prototype's screen content.
// Renders a fake claude.ai chrome so monetization moments feel embedded in the real product.

const { useState, useEffect } = React;

// ─────────────────────────────────────────────────────────────────────────
// Icons (inline SVG, stroke-based to match Claude's lucide-style iconography)
// ─────────────────────────────────────────────────────────────────────────
function Icon({ name, size = 18, stroke = 1.6, style = {} }) {
  const s = size;
  const common = {
    width: s, height: s, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round", style
  };
  switch (name) {
    case "menu": return <svg {...common}><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>;
    case "edit": return <svg {...common}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>;
    case "search": return <svg {...common}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    case "chevron-down": return <svg {...common}><polyline points="6 9 12 15 18 9"/></svg>;
    case "chevron-right": return <svg {...common}><polyline points="9 6 15 12 9 18"/></svg>;
    case "chevron-left": return <svg {...common}><polyline points="15 6 9 12 15 18"/></svg>;
    case "plus": return <svg {...common}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "send": return <svg {...common}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
    case "paperclip": return <svg {...common}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
    case "sparkles": return <svg {...common}><path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>;
    case "zap": return <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
    case "trending": return <svg {...common}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
    case "check": return <svg {...common}><polyline points="20 6 9 17 4 12"/></svg>;
    case "check-circle": return <svg {...common}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
    case "x": return <svg {...common}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case "alert": return <svg {...common}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case "code": return <svg {...common}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case "users": return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "layers": return <svg {...common}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
    case "settings": return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case "mail": return <svg {...common}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case "file": return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
    case "folder": return <svg {...common}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
    case "play": return <svg {...common}><polygon points="5 3 19 12 5 21 5 3"/></svg>;
    case "pause": return <svg {...common}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
    case "arrow-right": return <svg {...common}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
    case "arrow-up": return <svg {...common}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>;
    case "globe": return <svg {...common}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case "flame": return <svg {...common}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
    case "rocket": return <svg {...common}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/></svg>;
    case "package": return <svg {...common}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
    default: return null;
  }
}
window.Icon = Icon;

// ─────────────────────────────────────────────────────────────────────────
// Sidebar — chat list, projects, account
// ─────────────────────────────────────────────────────────────────────────
function Sidebar({ chats = [], activeChat, plan = "Pro", userName = "Ambrish", compact = false }) {
  const defaultChats = [
    { id: 1, title: "Refactoring UserDashboard component", time: "2m" },
    { id: 2, title: "Auth flow architecture review", time: "1h" },
    { id: 3, title: "Cowork session — Q4 planning", time: "Yesterday" },
    { id: 4, title: "Marketing copy variants", time: "Yesterday" },
    { id: 5, title: "API rate limiting strategy", time: "2d" },
    { id: 6, title: "Onboarding flow user research", time: "3d" },
    { id: 7, title: "Database migration plan", time: "1w" },
  ];
  const list = chats.length ? chats : defaultChats;

  return (
    <aside className="cl-sidebar" style={{ width: compact ? 60 : 260 }}>
      <div className="cl-sb-top">
        <div className="cl-brand">
          <span className="claude-c">C</span>
          {!compact && <span className="cl-brand-name">Claude</span>}
        </div>
        {!compact && (
          <button className="cl-icon-btn" title="New chat">
            <Icon name="edit" size={16} />
          </button>
        )}
      </div>

      {!compact && (
        <>
          <button className="cl-sb-newchat">
            <Icon name="plus" size={15} />
            <span>New chat</span>
          </button>

          <div className="cl-sb-search">
            <Icon name="search" size={15} />
            <span>Search chats</span>
            <kbd>⌘K</kbd>
          </div>

          <nav className="cl-sb-nav">
            <a className="cl-sb-link"><Icon name="folder" size={15}/><span>Projects</span></a>
            <a className="cl-sb-link"><Icon name="layers" size={15}/><span>Artifacts</span></a>
          </nav>

          <div className="cl-sb-section">
            <div className="cl-sb-heading">Recents</div>
            <div className="cl-sb-list scroll-y">
              {list.map(c => (
                <a key={c.id} className={"cl-sb-item" + (c.id === activeChat ? " active" : "")}>
                  <span className="cl-sb-item-title">{c.title}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="cl-sb-foot">
        <div className="cl-user">
          <div className="cl-avatar">{userName[0]}</div>
          {!compact && (
            <div className="cl-user-meta">
              <div className="cl-user-name">{userName}</div>
              <div className="cl-user-plan">{plan} plan</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
window.Sidebar = Sidebar;

// ─────────────────────────────────────────────────────────────────────────
// Topbar — model picker / share / settings on current chat
// ─────────────────────────────────────────────────────────────────────────
function Topbar({ title = "Claude", model = "Claude Sonnet 4.5", right = null }) {
  return (
    <header className="cl-topbar">
      <div className="cl-tb-left">
        <button className="cl-tb-model">
          <span>{model}</span>
          <Icon name="chevron-down" size={14} />
        </button>
      </div>
      <div className="cl-tb-title">{title}</div>
      <div className="cl-tb-right">
        {right}
      </div>
    </header>
  );
}
window.Topbar = Topbar;

// ─────────────────────────────────────────────────────────────────────────
// Chat message bubbles
// ─────────────────────────────────────────────────────────────────────────
function ChatMessage({ role = "user", children, streaming = false }) {
  if (role === "user") {
    return (
      <div className="cl-msg cl-msg-user">
        <div className="cl-msg-bubble">{children}</div>
      </div>
    );
  }
  return (
    <div className="cl-msg cl-msg-assistant">
      <div className="cl-msg-avatar"><span className="claude-c">C</span></div>
      <div className="cl-msg-body">
        {children}
        {streaming && <span className="cl-cursor" />}
      </div>
    </div>
  );
}
window.ChatMessage = ChatMessage;

// ─────────────────────────────────────────────────────────────────────────
// Composer (chat input)
// ─────────────────────────────────────────────────────────────────────────
function Composer({ placeholder = "Reply to Claude…", value = "", onChange, disabled = false }) {
  return (
    <div className="cl-composer-wrap">
      <div className="cl-composer">
        <button className="cl-comp-icon"><Icon name="plus" size={18}/></button>
        <input
          className="cl-comp-input"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          disabled={disabled}
        />
        <button className="cl-comp-model">
          <Icon name="sparkles" size={14}/>
          <span>Sonnet 4.5</span>
        </button>
        <button className={"cl-comp-send" + (value ? " active" : "")}>
          <Icon name="arrow-up" size={16} stroke={2.2}/>
        </button>
      </div>
      <div className="cl-comp-foot">Claude can make mistakes. Please double-check responses.</div>
    </div>
  );
}
window.Composer = Composer;

// ─────────────────────────────────────────────────────────────────────────
// Screen-step navigator (the prototype's prev/next chrome at the bottom)
// ─────────────────────────────────────────────────────────────────────────
function StepNav({ steps, current, onChange, accent = "var(--claude-coral)", hidden = false }) {
  if (hidden) return null;
  return (
    <div className="proto-stepnav">
      <button
        className="proto-stepnav-arrow"
        onClick={() => onChange(Math.max(0, current - 1))}
        disabled={current === 0}
        aria-label="Previous screen"
      >
        <Icon name="chevron-left" size={16}/>
      </button>
      <div className="proto-stepnav-dots">
        {steps.map((s, i) => (
          <button
            key={i}
            className={"proto-stepnav-dot" + (i === current ? " active" : "")}
            onClick={() => onChange(i)}
          >
            <span className="proto-stepnav-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="proto-stepnav-lbl">{s}</span>
          </button>
        ))}
      </div>
      <button
        className="proto-stepnav-arrow"
        onClick={() => onChange(Math.min(steps.length - 1, current + 1))}
        disabled={current === steps.length - 1}
        aria-label="Next screen"
      >
        <Icon name="chevron-right" size={16}/>
      </button>
    </div>
  );
}
window.StepNav = StepNav;

// ─────────────────────────────────────────────────────────────────────────
// Mobile frame wrapper — iPhone-style chrome around any screen content
// ─────────────────────────────────────────────────────────────────────────
function MobileFrame({ children, time = "9:41" }) {
  return (
    <div className="proto-mobile-frame">
      <div className="proto-mobile-notch"/>
      <div className="proto-mobile-status">
        <span>{time}</span>
        <div className="proto-mobile-status-icons">
          {/* Signal */}
          <svg viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="0.5"/>
            <rect x="5" y="6" width="3" height="6" rx="0.5"/>
            <rect x="10" y="3" width="3" height="9" rx="0.5"/>
            <rect x="15" y="0" width="3" height="12" rx="0.5"/>
          </svg>
          {/* Wifi */}
          <svg viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 5 Q9 -1 16 5"/>
            <path d="M4.5 7.5 Q9 4 13.5 7.5"/>
            <path d="M7 10 Q9 8.5 11 10"/>
          </svg>
          {/* Battery */}
          <svg viewBox="0 0 26 12" fill="currentColor">
            <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <rect x="2" y="2" width="18" height="8" rx="1.5"/>
            <rect x="23.5" y="4" width="2" height="4" rx="0.5" opacity="0.5"/>
          </svg>
        </div>
      </div>
      {children}
      <div className="proto-mobile-home"/>
    </div>
  );
}
window.MobileFrame = MobileFrame;

function useCountUp(target, ms = 800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      setV(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}
window.useCountUp = useCountUp;
