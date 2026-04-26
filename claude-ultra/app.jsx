/* global React, ReactDOM, MobileFrame, DeviceToggle, isPhoneViewport */
const { useState } = React;
const { TweaksPanel, useTweaks, TweakSection, TweakRadio } = window;

// Shared data ─────────────────────────────────────────────────────────
const FILES_DESKTOP = [
  { ext: 'PDF', name: 'Q4_financials_2025.pdf', meta: 'Added 3d ago by you', size: '2.4 MB' },
  { ext: 'PDF', name: 'K1_partners_2025.pdf', meta: 'Added 5d ago by you', size: '820 KB' },
  { ext: 'CSV', name: 'payroll_2025_export.csv', meta: 'Added 1w ago by you', size: '340 KB', cls: 'csv' },
  { ext: 'DOC', name: 'prior_year_return_2024.docx', meta: 'Added 2w ago by you', size: '1.1 MB', cls: 'doc' },
  { ext: 'XLSX', name: 'expense_categories.xlsx', meta: 'Added 2w ago by you', size: '180 KB', cls: 'xlsx' },
  { ext: 'PDF', name: '1099_summary_2025.pdf', meta: 'Added 3w ago by Tax Analyst', size: '410 KB' },
];
const FILES_MOBILE = FILES_DESKTOP.slice(0, 5).map(f => ({ ext: f.ext, name: f.name, meta: f.meta.replace(' by you', ''), cls: f.cls }));

const AGENTS_DESKTOP = [
  { name: 'Tax Analyst', task: 'Cross-checking K-1s vs federal Schedule E for partnership income discrepancies', running: true, runtime: 'running 3h 14m · last update 4 min ago' },
  { name: 'Bookkeeper', task: 'Reconciling Q4 expense categories with bank statements', running: false, runtime: 'last run 2 days ago' },
  { name: 'Industry Researcher', task: 'Tracking comp set financials & SEC filings for Acme Co. peer group', running: false, runtime: 'last run 5 days ago' },
];
const AGENTS_MOBILE = [
  { name: 'Tax Analyst', task: 'Cross-checking K-1s vs federal Schedule E for partnership income discrepancies', running: true, runtime: 'running 3h 14m · last update 4m ago' },
  { name: 'Bookkeeper', task: 'Reconciling Q4 expense categories with bank statements', running: false, runtime: 'last run 2 days ago' },
  { name: 'Industry Researcher', task: 'Tracking comp set financials & SEC filings', running: false, runtime: 'last run 5 days ago' },
];

const ACTIVITY_DESKTOP = [
  { who: 'Tax Analyst', when: '4 min ago', text: <>Found discrepancy in <b>K-1 line 14</b> ($14,251) vs. federal Schedule E ($13,800). Suggesting reconciliation before final filing.</>, green: true },
  { who: 'You', when: '12 min ago', text: <>Added file <b>Q4_financials_2025.pdf</b> to workspace context.</> },
  { who: 'Tax Analyst', when: '1h ago', text: <>Completed pass through Q4 partner distributions. <b>3 items flagged</b> for review.</>, green: true },
  { who: 'Bookkeeper', when: '2d ago', text: <>Reconciled <b>187 transactions</b> across operating accounts. 4 unmatched.</> },
];
const ACTIVITY_MOBILE = [
  { who: 'Tax Analyst', when: '4m', text: <>Found discrepancy in <b>K-1 line 14</b> ($14,251) vs. federal Schedule E ($13,800). Suggesting reconciliation before final filing.</>, green: true },
  { who: 'You', when: '12m', text: <>Added <b>Q4_financials_2025.pdf</b> to workspace context.</> },
  { who: 'Tax Analyst', when: '1h', text: <>Completed pass through Q4 partner distributions. <b>3 items flagged</b> for review.</>, green: true },
  { who: 'Bookkeeper', when: '2d', text: <>Reconciled <b>187 transactions</b>. 4 unmatched.</> },
];

// ── DESKTOP SCREENS ──────────────────────────────────────────────────
function DesktopScreen1({ onUpsell }) {
  return (
    <div className="s1">
      <aside className="s1-side">
        <div className="s1-side-brand">
          <span className="ccc">C</span>
          <span className="name">Claude</span>
          <span className="pill">PRO</span>
        </div>
        <div className="s1-newchat">+ New chat</div>
        <div className="s1-side-h">Recents</div>
        <div className="s1-conv active">Acme Co. tax prep<div className="sub">Just now</div></div>
        <div className="s1-conv">Acme Co. — Q3 review<div className="sub">Last Tuesday</div></div>
        <div className="s1-conv">K-1 reconciliation help<div className="sub">Apr 14</div></div>
        <div className="s1-conv">Brewer Holdings memo<div className="sub">Apr 11</div></div>
        <div className="s1-conv">Marketing copy — Q1 launch<div className="sub">Apr 7</div></div>
        <div className="s1-conv">Payroll cleanup<div className="sub">Apr 3</div></div>
      </aside>
      <main className="s1-main">
        <div className="s1-thread">
          <div className="s1-msg u">Continue the Acme Co. tax prep — pick up where we left off last week</div>
          <div className="s1-msg c">
            <div className="who"><span className="ccc">C</span>Claude</div>
            <div className="body">I don't have context from last week's conversations. Can you re-share the K-1 forms and Q4 financials so I can continue?</div>
          </div>
          <div className="s1-offer">
            <div className="s1-offer-card">
              <div className="s1-offer-h">Tired of re-explaining context?</div>
              <p className="s1-offer-p">We noticed you're running multiple ongoing projects. <b>Claude Ultra</b> includes persistent workspaces, specialized agents, and background runs — built for solopreneurs running on Claude.</p>
              <div className="s1-stats">
                <div className="s1-stats-h">Your last 30 days</div>
                <div className="s1-stats-row"><span>Sessions started about "Acme Co."</span><b>12</b></div>
                <div className="s1-stats-row"><span>Files re-uploaded</span><b>34</b></div>
                <div className="s1-stats-row"><span>Time spent rebuilding context</span><b>~6h</b></div>
              </div>
              <button className="s1-cta" onClick={onUpsell}>See Claude Ultra — built for solopreneurs →</button>
              <div className="s1-link" onClick={onUpsell}>Or start with Max-20 (1 Workspace included)</div>
            </div>
          </div>
        </div>
        <div className="s1-composer">
          <div className="s1-composer-inner">
            <div className="s1-composer-input">Reply to Claude…</div>
            <div className="s1-composer-btn">↑</div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DesktopScreen2() {
  const [tab, setTab] = useState('files');
  return (
    <div className="s2">
      <aside className="s2-side">
        <div className="s2-side-brand">
          <span className="ccc">C</span>
          <span className="name">Claude</span>
          <span className="pill">ULTRA</span>
        </div>
        <div className="s2-side-h">Workspaces</div>
        <div className="s2-ws active">Acme Co. — Tax<div className="meta">4 agents · active</div></div>
        <div className="s2-ws">Brewer Holdings<div className="meta">2 agents</div></div>
        <div className="s2-ws">Q1 Marketing<div className="meta">3 agents</div></div>
        <div className="s2-ws">Personal Books<div className="meta">1 agent</div></div>
        <div className="s2-ws">Investor pipeline<div className="meta">1 agent</div></div>
        <div className="s2-ws">Vendor contracts<div className="meta">1 agent</div></div>
        <div className="s2-ws-new">+ New Workspace (4 left)</div>
      </aside>
      <main className="s2-main">
        <div className="s2-header">
          <span className="s2-header-icon">C</span>
          <div>
            <h2>Acme Co. — Tax Prep 2026</h2>
            <div className="meta">Last active 12 min ago · 4 agents configured · 12 files in context</div>
          </div>
          <div className="actions">
            <button className="btn">Share</button>
            <button className="btn primary">Open chat →</button>
          </div>
        </div>
        <div className="s2-tabs">
          <div className={"s2-tab" + (tab === 'files' ? ' active' : '')} onClick={() => setTab('files')}>Files & Context</div>
          <div className={"s2-tab" + (tab === 'agents' ? ' active' : '')} onClick={() => setTab('agents')}>Agents</div>
          <div className={"s2-tab" + (tab === 'history' ? ' active' : '')} onClick={() => setTab('history')}>History</div>
        </div>
        <div className="s2-content">
          <div>
            <div className="s2-section-h"><span>Files</span><span className="count">{FILES_DESKTOP.length} items · 5.3 MB</span></div>
            <div className="s2-files">
              {FILES_DESKTOP.map((f, i) => (
                <div key={i} className="s2-file">
                  <span className={"s2-ext " + (f.cls || '')}>{f.ext}</span>
                  <div>
                    <div className="s2-fname">{f.name}</div>
                    <div className="s2-fmeta">{f.meta}</div>
                  </div>
                  <span className="s2-fsize">{f.size}</span>
                  <span style={{fontSize: 14, color: 'var(--text-tertiary)'}}>⋯</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="s2-section-h"><span>Agents</span><span className="count">3 of 6 configured</span></div>
            <div className="s2-agents">
              {AGENTS_DESKTOP.map((a, i) => (
                <div key={i} className={"s2-agent" + (a.running ? ' running' : '')}>
                  <div className="s2-agent-top">
                    <span className="s2-agent-name">{a.name}</span>
                    <span className="s2-agent-status">{a.running ? 'running' : 'idle'}</span>
                  </div>
                  <div className="s2-agent-task">{a.task}</div>
                  <div className="s2-agent-runtime">{a.runtime}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="s2-activity">
            <div style={{padding: '14px 16px', borderBottom: '1px solid var(--border-soft)'}}>
              <div className="s2-section-h" style={{margin: 0}}><span>Recent agent activity</span></div>
            </div>
            {ACTIVITY_DESKTOP.map((a, i) => (
              <div key={i} className="s2-activity-row">
                <span className={"s2-activity-icon" + (a.green ? ' green' : '')}>{a.who[0]}</span>
                <div>
                  <div style={{fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 3, fontFamily: 'var(--font-mono)'}}>{a.who}</div>
                  <div className="s2-activity-text">{a.text}</div>
                </div>
                <span className="s2-activity-time">{a.when}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function DesktopScreen3({ onUpgrade }) {
  return (
    <div className="s3">
      <div className="s3-inner">
        <div className="s3-eyebrow">Plans for Claude</div>
        <h1 className="s3-h1">Built for the way <em>solopreneurs</em> actually work</h1>
        <p className="s3-sub">Ultra replaces $500–2,000/mo of contractors and SaaS — making Claude tax-deductible business infrastructure, not a chatbot.</p>

        <div className="s3-grid">
          <div className="s3-tier">
            <h3 className="s3-name">Pro</h3>
            <p className="s3-tagline">Standard chat for individuals</p>
            <div className="s3-price"><span className="num">$20</span><span className="per">/month</span></div>
            <ul className="s3-feats">
              <li className="s3-feat"><span className="tk">✓</span>Standard chat across web, desktop, mobile</li>
              <li className="s3-feat"><span className="tk">✓</span>Projects with file uploads</li>
              <li className="s3-feat muted"><span className="x">○</span>No persistent workspaces</li>
              <li className="s3-feat muted"><span className="x">○</span>No specialized agents</li>
              <li className="s3-feat muted"><span className="x">○</span>No background execution</li>
            </ul>
            <button className="s3-cta current">Your current plan</button>
          </div>

          <div className="s3-tier">
            <h3 className="s3-name">Max-20x</h3>
            <p className="s3-tagline">For power users running multi-week projects</p>
            <div className="s3-price"><span className="num">$200</span><span className="per">/month</span></div>
            <ul className="s3-feats">
              <li className="s3-feat"><span className="tk">✓</span><b>1 Workspace</b> — persistent context, files, history</li>
              <li className="s3-feat"><span className="tk">✓</span>Build & purchase agents (no publishing)</li>
              <li className="s3-feat"><span className="tk">✓</span>25× Pro usage</li>
              <li className="s3-feat"><span className="tk">✓</span>Priority capacity at peak</li>
              <li className="s3-feat muted"><span className="x">○</span>No background execution</li>
            </ul>
            <button className="s3-cta">Upgrade to Max-20x</button>
          </div>

          <div className="s3-tier hl">
            <span className="s3-best">★ BEST FOR BUSINESS</span>
            <h3 className="s3-name"><em>Ultra</em></h3>
            <p className="s3-tagline">For solopreneurs running on Claude</p>
            <div className="s3-price"><span className="num">$1,000</span><span className="per">/month</span></div>
            <ul className="s3-feats">
              <li className="s3-feat"><span className="tk">✓</span>Up to <b>10 workspaces</b> with memory & faster runs</li>
              <li className="s3-feat"><span className="tk">✓</span>Specialized agents: <b>Designer, Marketer, Accountant, Support</b></li>
              <li className="s3-feat"><span className="tk">✓</span>Background execution via Desktop & Cowork</li>
              <li className="s3-feat"><span className="tk">✓</span>Publish agents to marketplace <em>(free Year 1)</em></li>
              <li className="s3-feat"><span className="tk">✓</span>50× Pro consumption cap (margin-safe)</li>
            </ul>
            <button className="s3-cta primary" onClick={onUpgrade}>Upgrade to Ultra →</button>
          </div>
        </div>

        <div className="s3-replaces">
          <div>
            <h3 className="s3-replaces-h">Replaces a typical <em>$1,700/mo</em> stack</h3>
            <div className="s3-replaces-list">
              <div className="s3-replaces-row"><span>Bookkeeper / part-time CPA</span><b>~$800/mo</b></div>
              <div className="s3-replaces-row"><span>Industry research subscription</span><b>~$300/mo</b></div>
              <div className="s3-replaces-row"><span>Marketing freelancer (8h)</span><b>~$600/mo</b></div>
              <div className="s3-replaces-row"><span>Specialized SaaS tools</span><b>~$200/mo</b></div>
            </div>
          </div>
          <div className="s3-savings">
            <div className="s3-savings-label">Net savings</div>
            <div className="s3-savings-num">~60%</div>
            <div className="s3-savings-sub">vs. Ultra at $1,000/mo</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MOBILE SCREENS ──────────────────────────────────────────────────
function MobileScreen1({ onUpsell }) {
  return (
    <div className="s1">
      <div className="s1-bar">
        <span className="ccc">C</span>
        <span className="name">Claude</span>
        <span className="pill">PRO</span>
      </div>
      <div className="s1-thread">
        <div className="m-msg-u">Continue the Acme Co. tax prep — pick up where we left off last week</div>
        <div className="m-msg-c">
          <span className="ccc sm">C</span>
          <div className="body-t">I don't have context from last week's conversations. Can you re-share the K-1 forms and Q4 financials so I can continue?</div>
        </div>
        <div className="s1-offer">
          <div className="s1-offer-h">Tired of re-explaining context?</div>
          <p className="s1-offer-p">We noticed you're running multiple ongoing projects. <b>Claude Ultra</b> includes persistent workspaces, specialized agents, and background runs — built for solopreneurs running on Claude.</p>
          <div className="s1-stats">
            <div className="s1-stats-h">Your last 30 days</div>
            <div className="s1-stats-row"><span>Sessions about "Acme Co."</span><b>12</b></div>
            <div className="s1-stats-row"><span>Files re-uploaded</span><b>34</b></div>
            <div className="s1-stats-row"><span>Time rebuilding context</span><b>~6h</b></div>
          </div>
          <button className="s1-cta" onClick={onUpsell}>See Claude Ultra — built for solopreneurs →</button>
          <div className="s1-link" onClick={onUpsell}>Or start with Max-20 (1 Workspace included)</div>
        </div>
      </div>
      <div className="s1-comp"><div className="input">Reply to Claude…</div></div>
    </div>
  );
}

function MobileScreen2() {
  const [tab, setTab] = useState('files');
  return (
    <div className="s2">
      <div className="s2-head">
        <span className="icon">C</span>
        <div>
          <div className="ttl">Acme Co. — Tax Prep</div>
          <div className="meta">4 agents · 12 files · active</div>
        </div>
        <span className="pill">ULTRA</span>
      </div>
      <div className="s2-tabs">
        <button className={"s2-tab" + (tab === 'files' ? ' active' : '')} onClick={() => setTab('files')}>Files</button>
        <button className={"s2-tab" + (tab === 'agents' ? ' active' : '')} onClick={() => setTab('agents')}>Agents</button>
        <button className={"s2-tab" + (tab === 'history' ? ' active' : '')} onClick={() => setTab('history')}>Activity</button>
      </div>
      <div className="s2-content">
        {tab === 'files' && (
          <div>
            <div className="s2-section-h"><span>Files in context</span><span>{FILES_MOBILE.length} items</span></div>
            <div className="s2-card">
              {FILES_MOBILE.map((f, i) => (
                <div key={i} className="s2-file">
                  <span className={"s2-ext " + (f.cls || '')}>{f.ext}</span>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div className="s2-fname">{f.name}</div>
                    <div className="s2-fmeta">{f.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'agents' && (
          <div>
            <div className="s2-section-h"><span>Agents</span><span>3 of 6 configured</span></div>
            <div className="s2-card">
              {AGENTS_MOBILE.map((a, i) => (
                <div key={i} className={"s2-agent" + (a.running ? ' running' : '')}>
                  <div className="s2-agent-top">
                    <span className="s2-agent-name">{a.name}</span>
                    <span className="s2-agent-status">{a.running ? 'running' : 'idle'}</span>
                  </div>
                  <div className="s2-agent-task">{a.task}</div>
                  <div className="s2-agent-runtime">{a.runtime}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'history' && (
          <div>
            <div className="s2-section-h"><span>Recent activity</span></div>
            <div className="s2-card">
              {ACTIVITY_MOBILE.map((a, i) => (
                <div key={i} className="s2-act">
                  <span className={"s2-act-icon" + (a.green ? ' green' : '')}>{a.who[0]}</span>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div className="s2-act-who">{a.who}</div>
                    <div className="s2-act-text">{a.text}</div>
                  </div>
                  <span className="s2-act-time">{a.when}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileScreen3({ onUpgrade }) {
  return (
    <div className="s3">
      <div className="s3-eyebrow">Plans for Claude</div>
      <h2 className="s3-h">Built for the way <em>solopreneurs</em> actually work</h2>
      <p className="s3-sub">Ultra replaces $500–2,000/mo of contractors and SaaS — making Claude tax-deductible business infrastructure, not a chatbot.</p>

      <div className="s3-tier">
        <h3 className="s3-name">Pro</h3>
        <p className="s3-tagline">Standard chat for individuals</p>
        <div className="s3-price"><span className="num">$20</span><span className="per">/month</span></div>
        <ul className="s3-feats">
          <li><span className="tk">✓</span>Standard chat across web, desktop, mobile</li>
          <li><span className="tk">✓</span>Projects with file uploads</li>
          <li className="muted"><span className="x">○</span>No persistent workspaces</li>
          <li className="muted"><span className="x">○</span>No specialized agents</li>
        </ul>
        <button className="s3-cta current">Your current plan</button>
      </div>

      <div className="s3-tier">
        <h3 className="s3-name">Max-20x</h3>
        <p className="s3-tagline">For power users running multi-week projects</p>
        <div className="s3-price"><span className="num">$200</span><span className="per">/month</span></div>
        <ul className="s3-feats">
          <li><span className="tk">✓</span><b>1 Workspace</b> — persistent context, files, history</li>
          <li><span className="tk">✓</span>Build & purchase agents (no publishing)</li>
          <li><span className="tk">✓</span>25× Pro usage</li>
          <li><span className="tk">✓</span>Priority capacity at peak</li>
          <li className="muted"><span className="x">○</span>No background execution</li>
        </ul>
        <button className="s3-cta outline">Upgrade to Max-20x</button>
      </div>

      <div className="s3-tier hl">
        <span className="s3-best">★ BEST FOR BUSINESS</span>
        <h3 className="s3-name"><em>Ultra</em></h3>
        <p className="s3-tagline">For solopreneurs running on Claude</p>
        <div className="s3-price"><span className="num">$1,000</span><span className="per">/month</span></div>
        <ul className="s3-feats">
          <li><span className="tk">✓</span>Up to <b>10 workspaces</b> with memory & faster runs</li>
          <li><span className="tk">✓</span>Specialized agents: <b>Designer, Marketer, Accountant, Support</b></li>
          <li><span className="tk">✓</span>Background execution via Desktop & Cowork</li>
          <li><span className="tk">✓</span>Publish agents to marketplace <em>(free Year 1)</em></li>
          <li><span className="tk">✓</span>50× Pro consumption cap (margin-safe)</li>
        </ul>
        <button className="s3-cta" onClick={onUpgrade}>Upgrade to Ultra →</button>
      </div>

      <div className="s3-replaces">
        <h3 className="s3-replaces-h">Replaces a typical <em>$1,700/mo</em> stack</h3>
        <div className="s3-replaces-row"><span>Bookkeeper / part-time CPA</span><b>~$800/mo</b></div>
        <div className="s3-replaces-row"><span>Industry research subscription</span><b>~$300/mo</b></div>
        <div className="s3-replaces-row"><span>Marketing freelancer (8h)</span><b>~$600/mo</b></div>
        <div className="s3-replaces-row"><span>Specialized SaaS tools</span><b>~$200/mo</b></div>
        <div className="s3-savings">
          <span className="s3-savings-l">Net savings</span>
          <div>
            <span className="s3-savings-n">~60%</span>
            <span className="s3-savings-sub">vs. Ultra at $1,000/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App shell ────────────────────────────────────────────────────────
const StepNav = window.StepNav;
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
  const screens = ["Discovery", "Workspace", "Tier ladder"];
  const labels = [
    "01 Discovery moment (Pro user, heavy use)",
    "02 Active workspace (Ultra user)",
    "03 Tier ladder (Pro → Ultra)",
  ];
  const isMobile = tweaks.device === "mobile";

  const desktopScreens = [
    <DesktopScreen1 key="d0" onUpsell={() => setStep(2)}/>,
    <DesktopScreen2 key="d1"/>,
    <DesktopScreen3 key="d2" onUpgrade={() => setStep(1)}/>,
  ];
  const mobileScreens = [
    <MobileScreen1 key="m0" onUpsell={() => setStep(2)}/>,
    <MobileScreen2 key="m1"/>,
    <MobileScreen3 key="m2" onUpgrade={() => setStep(1)}/>,
  ];

  const screenContent = isMobile
    ? <MobileFrame>{mobileScreens[step]}</MobileFrame>
    : desktopScreens[step];

  return (
    <>
      {!hideNav && <div className="proto-screen-meta">{labels[step]}</div>}
      {!hideNav && (
        <DeviceToggle value={tweaks.device} onChange={v => setTweaks({device: v})}/>
      )}
      <div
        className={"proto-stage ult-stage" + (isMobile ? " is-mobile" : "")}
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
            Step through the 3 screens with the bottom nav or ← → arrows. Claude Ultra is the high-tier plan built for solopreneurs running their business on Claude.
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

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
