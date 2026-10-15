import React, { useState, useEffect } from "react";

const apps = [
  { name: "Finder", icon: "🙂" },
  { name: "Safari", icon: "🧭" },
  { name: "Notes", icon: "📝" },
  { name: "Photos", icon: "🌄" },
  { name: "Calendar", icon: "📅" },
  { name: "Settings", icon: "⚙️" },
];

export default function App() {
  const [openApps, setOpenApps] = useState(["Finder"]);
  const [activeApp, setActiveApp] = useState("Finder");
  const [time, setTime] = useState(new Date());
  const [note, setNote] = useState(
    "Welcome to your new desktop! ✨"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function openApp(name) {
    setOpenApps((old) =>
      old.includes(name) ? old : [...old, name]
    );
    setActiveApp(name);
  }

  function closeApp(name) {
    setOpenApps((old) => old.filter((app) => app !== name));
    if (activeApp === name) {
      setActiveApp(
        [...openApps].filter((app) => app !== name).pop() || ""
      );
    }
  }

  const styles = `
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif; }
    button, input, textarea { font: inherit; }
    button { cursor: pointer; }
    .desktop {
      height: 100vh; height: 100dvh; width: 100%;
      overflow: hidden; position: relative; color: white;
      background:
        radial-gradient(ellipse at 20% 20%, #ffb7e8 0%, transparent 32%),
        radial-gradient(ellipse at 80% 25%, #7c9dff 0%, transparent 36%),
        radial-gradient(ellipse at 55% 85%, #6e55cf 0%, transparent 45%),
        linear-gradient(135deg, #101d49, #472f86 50%, #091c44);
    }
    .desktop:before {
      content: ""; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 48%,
        #ffffff24, transparent 55%);
      pointer-events: none;
    }
    .menubar {
      position: absolute; top: 0; left: 0; right: 0; height: 39px;
      padding: 0 18px; display: flex; align-items: center;
      justify-content: space-between; gap: 12px; z-index: 100;
      background: #ffffff20; backdrop-filter: blur(30px);
      border-bottom: 1px solid #ffffff24; font-size: 13px;
    }
    .menu-left, .menu-right {
      display: flex; align-items: center; gap: 16px;
    }
    .menu-button {
      color: white; border: 0; background: transparent;
      padding: 5px 0; white-space: nowrap;
    }
    .desktop-icons {
      position: absolute; right: 20px; top: 60px;
      display: flex; flex-direction: column; gap: 22px;
    }
    .desktop-icon {
      display: flex; flex-direction: column; align-items: center;
      gap: 5px; width: 76px; color: white; background: transparent;
      border: 0; text-shadow: 0 1px 5px #111; font-size: 12px;
    }
    .desktop-icon span:first-child { font-size: 36px; }
    .window {
      position: absolute; top: 13%; left: 50%;
      transform: translateX(-50%);
      width: min(740px, calc(100% - 30px));
      height: min(490px, 68vh); min-height: 260px;
      border: 1px solid #ffffff75; border-radius: 15px;
      overflow: hidden; background: #f6f6f8ee; color: #20202a;
      box-shadow: 0 25px 90px #0005, 0 2px 8px #0002;
      backdrop-filter: blur(35px); display: flex; flex-direction: column;
    }
    .window.active { z-index: 20; }
    .titlebar {
      height: 48px; flex-shrink: 0; display: flex;
      align-items: center; padding: 0 15px; gap: 8px;
      background: #e7e7ebcc; border-bottom: 1px solid #00000012;
    }
    .traffic { display: flex; gap: 7px; }
    .traffic button {
      width: 12px; height: 12px; border-radius: 50%;
      border: 0; padding: 0;
    }
    .red { background: #ff5f57; }
    .yellow { background: #febc2e; }
    .green { background: #28c840; }
    .window-title { flex: 1; text-align: center; font-weight: 600; font-size: 13px; }
    .window-body { flex: 1; min-height: 0; overflow: auto; }
    .finder { display: flex; height: 100%; }
    .sidebar { width: 175px; flex-shrink: 0; background: #e9e9edb8; padding: 18px 10px; }
    .side-item { padding: 9px; border-radius: 8px; font-size: 13px; }
    .side-item.selected { background: #b8c8f4; }
    .file-area { flex: 1; padding: 22px; }
    .file-grid { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 24px; }
    .file { width: 78px; text-align: center; font-size: 12px; }
    .file-icon { font-size: 38px; margin-bottom: 6px; }
    .browser-toolbar { padding: 10px; display: flex; gap: 8px; background: #ededf1; }
    .browser-toolbar input { flex: 1; min-width: 0; border: 0; border-radius: 8px; padding: 9px; background: white; }
    .browser-page { padding: 28px 16px; text-align: center; }
    .browser-page h1 { font-size: 34px; margin: 18px 0 8px; }
    .browser-page input { width: min(440px, 100%); border: 1px solid #ddd; border-radius: 24px; padding: 13px 17px; }
    .note-area { width: 100%; height: 100%; border: 0; outline: 0; resize: none; padding: 25px; font-size: 17px; background: #fffdf2; color: #282828; }
    .settings { padding: 22px; }
    .setting-row { display: flex; justify-content: space-between; padding: 16px 8px; border-bottom: 1px solid #ddd; }
    .calendar { padding: 22px; text-align: center; }
    .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 18px; }
    .calendar-grid div { padding: 9px 0; border-radius: 9px; }
    .today { background: #3478f6; color: white; }
    .photos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 15px; }
    .photo { min-height: 110px; border-radius: 12px; display: grid; place-items: center; font-size: 38px; background: linear-gradient(135deg,#f8a9cf,#9abaff,#5b55a5); }
    .dock-wrap {
      position: absolute; bottom: 13px; left: 50%;
      transform: translateX(-50%); z-index: 90; max-width: 96%;
    }
    .dock {
      display: flex; align-items: end; gap: 9px; padding: 9px 12px;
      border: 1px solid #ffffff65; border-radius: 22px;
      background: #ffffff32; backdrop-filter: blur(35px);
      box-shadow: 0 10px 40px #0003;
    }
    .dock-app {
      width: 49px; height: 49px; border: 0; border-radius: 13px;
      background: #ffffff26; font-size: 31px; padding: 2px;
      transition: transform .16s; position: relative;
    }
    .dock-app:hover { transform: translateY(-8px) scale(1.12); }
    .dock-app.running:after {
      content: ""; position: absolute; width: 4px; height: 4px;
      background: white; border-radius: 50%; bottom: -5px;
      left: calc(50% - 2px);
    }
    .welcome { text-align: center; padding: 28px 15px; }
    .welcome h2 { font-size: 27px; margin: 10px 0; }
    .welcome p { color: #656575; }
    .primary {
      border: 0; border-radius: 9px; background: #3478f6;
      color: white; padding: 10px 17px;
    }
    @media(max-width: 560px) {
      .menubar { padding: 0 10px; }
      .menu-left, .menu-right { gap: 9px; }
      .menu-extra { display: none; }
      .sidebar { width: 115px; }
      .dock { gap: 5px; padding: 8px; }
      .dock-app { width: 39px; height: 39px; font-size: 25px; }
      .window { top: 11%; height: 68vh; }
      .desktop-icons { right: 8px; }
    }
  `;

  function appContent(name) {
    if (name === "Finder") return (
      <div className="finder">
        <aside className="sidebar">
          <div className="side-item selected">⭐ Favorites</div>
          <div className="side-item">🖥 Desktop</div>
          <div className="side-item">📄 Documents</div>
          <div className="side-item">⬇️ Downloads</div>
          <div className="side-item">🖼 Pictures</div>
        </aside>
        <div className="file-area">
          <b>Recents</b>
          <div className="file-grid">
            {["Desktop", "Documents", "Downloads", "Pictures"].map((f, i) => (
              <div className="file" key={f}>
                <div className="file-icon">{["🖥️","📁","⬇️","🖼️"][i]}</div>
                {f}
              </div>
            ))}
          </div>
          <p style={{ color: "#888", marginTop: 40 }}>Welcome to your desktop.</p>
        </div>
      </div>
    );

    if (name === "Safari") return (
      <>
        <div className="browser-toolbar">
          <button onClick={() => setSearch("")}>↻</button>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search or enter website name" />
          <button onClick={() => setSearch(search)}>Go</button>
        </div>
        <div className="browser-page">
          <div style={{ fontSize: 52 }}>🧭</div>
          <h1>Safari</h1>
          <p style={{ color: "#777" }}>Your browser-inspired home page</p>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search the web..." />
          {search && (
            <p><button className="primary" onClick={() =>
              window.open("https://www.google.com/search?q=" + encodeURIComponent(search), "_blank", "noopener,noreferrer")
            }>Search the web ↗</button></p>
          )}
        </div>
      </>
    );

    if (name === "Notes") return (
      <textarea className="note-area" value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Type your notes here..." />
    );

    if (name === "Settings") return (
      <div className="settings">
        <h2>System Settings</h2>
        <p style={{ color: "#777" }}>Make your desktop feel like yours.</p>
        {["Appearance", "Desktop & Dock", "Wallpaper", "Notifications", "Sound"].map((s, i) => (
          <div className="setting-row" key={s}>
            <span>{["🎨","🖥️","🌄","🔔","🔊"][i]}　{s}</span>
            <span>›</span>
          </div>
        ))}
      </div>
    );

    if (name === "Calendar") {
      const days = ["S","M","T","W","T","F","S"];
      return (
        <div className="calendar">
          <h2>{time.toLocaleString(undefined, { month: "long", year: "numeric" })}</h2>
          <div className="calendar-grid">
            {days.map((d, i) => <b key={i}>{d}</b>)}
            {Array.from({ length: new Date(time.getFullYear(), time.getMonth(), 1).getDay() }, (_, i) => <div key={"e"+i}/>)}
            {Array.from({ length: new Date(time.getFullYear(), time.getMonth()+1, 0).getDate() }, (_, i) => (
              <div className={i+1 === time.getDate() ? "today" : ""} key={i}>{i+1}</div>
            ))}
          </div>
        </div>
      );
    }

    if (name === "Photos") return (
      <div className="photos">
        {["🌅","🏔️","🌊","🌸","🌌","🌲","🌈","🌙","☁️"].map((p, i) => (
          <div className="photo" key={i}>{p}</div>
        ))}
      </div>
    );

    return <div className="welcome"><h2>{name}</h2><p>Welcome to your desktop.</p></div>;
  }

  return (
    <main className="desktop">
      <style>{styles}</style>

      <header className="menubar">
        <div className="menu-left">
          <button className="menu-button" onClick={() => openApp("Settings")}>●</button>
          <b>Finder</b>
          <button className="menu-button menu-extra" onClick={() => openApp("Finder")}>File</button>
          <button className="menu-button menu-extra" onClick={() => openApp("Finder")}>Edit</button>
          <button className="menu-button menu-extra" onClick={() => openApp("Settings")}>View</button>
        </div>
        <div className="menu-right">
          <span className="menu-extra">⌕</span>
          <span className="menu-extra">◉</span>
          <span>Wi-Fi</span>
          <span>{time.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
          <span>{time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
        </div>
      </header>

      <div className="desktop-icons">
        <button className="desktop-icon" onClick={() => openApp("Finder")}>
          <span>🖥️</span><span>Computer</span>
        </button>
        <button className="desktop-icon" onClick={() => openApp("Photos")}>
          <span>🖼️</span><span>Pictures</span>
        </button>
      </div>

      {openApps.map(name => (
        <section key={name} className={"window" + (activeApp === name ? " active" : "")}
          onMouseDown={() => setActiveApp(name)}>
          <div className="titlebar">
            <div className="traffic">
              <button className="red" aria-label="Close" onClick={() => closeApp(name)} />
              <button className="yellow" aria-label="Minimize" onClick={() => closeApp(name)} />
              <button className="green" aria-label="Zoom" onClick={e => {
                const w = e.currentTarget.closest(".window");
                if (w) {
                  w.style.width = w.style.width === "95%" ? "min(740px, calc(100% - 30px))" : "95%";
                  w.style.height = w.style.height === "88vh" ? "min(490px, 68vh)" : "88vh";
                }
              }} />
            </div>
            <div className="window-title">{name}</div>
            <div style={{ width: 44 }} />
          </div>
          <div className="window-body">{appContent(name)}</div>
        </section>
      ))}

      {openApps.length === 0 && (
        <div className="welcome" style={{ position: "absolute", top: "28%", width: "100%" }}>
          <h2>Your desktop, your way.</h2>
          <p>Choose an app from the Dock to get started.</p>
        </div>
      )}

      <footer className="dock-wrap">
        <div className="dock">
          {apps.map(app => (
            <button key={app.name}
              title={app.name}
              aria-label={app.name}
              className={"dock-app" + (openApps.includes(app.name) ? " running" : "")}
              onClick={() => openApp(app.name)}>
              {app.icon}
            </button>
          ))}
          <div style={{ width: 1, height: 38, background: "#ffffff77", margin: "0 2px" }} />
          <button title="Trash" className="dock-app"
            onClick={() => openApp("Trash")}>🗑️</button>
        </div>
      </footer>
    </main>
  );
}
