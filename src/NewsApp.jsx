
import { useState, useEffect, useRef } from "react";

// ─── THEME SYSTEM ───────────────────────────────────────────────────────────
const DEFAULT_THEME = {
  primary: "#1565C0",
  secondary: "#0D47A1",
  accent: "#FF6F00",
  light: "#E3F2FD",
  text: "#0D1B2A",
  bg: "#F4F8FF",
  cardBg: "#FFFFFF",
  navBg: "#1565C0",
  navText: "#FFFFFF",
  gradient: "linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1976D2 100%)",
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const INITIAL_NEWS = [
  { id:1, title:"Ghana Economic Forum Sets New Records in 2025", category:"Business", author:"Ama Mensah", date:"2025-05-20", image:"https://picsum.photos/seed/news1/600/340", excerpt:"The annual forum attracted over 2,000 delegates from 45 countries...", content:"Full article content here...", views:4821, premium:false, enabled:true, tags:["economy","ghana","forum"], social:{ whatsapp:true, facebook:true, twitter:true, instagram:true, linkedin:true, telegram:true } },
  { id:2, title:"Black Stars Qualify for AFCON 2026 Finals", category:"Sports", author:"Kwame Boateng", date:"2025-05-19", image:"https://picsum.photos/seed/news2/600/340", excerpt:"The national team secured a historic qualification after defeating...", content:"Full article content here...", views:9203, premium:false, enabled:true, tags:["football","blackstars","afcon"], social:{ whatsapp:true, facebook:true, twitter:true, instagram:true, linkedin:false, telegram:true } },
  { id:3, title:"Tech Hub Accra Launches AI Innovation Centre", category:"Technology", author:"Efua Darko", date:"2025-05-18", image:"https://picsum.photos/seed/news3/600/340", excerpt:"A new AI-focused research centre will train 10,000 developers annually...", content:"Full article content here...", views:3145, premium:true, enabled:true, tags:["tech","ai","accra"], social:{ whatsapp:true, facebook:true, twitter:true, instagram:false, linkedin:true, telegram:false } },
  { id:4, title:"New Highway Connecting Northern and Southern Ghana Opens", category:"Infrastructure", author:"Kofi Asante", date:"2025-05-17", image:"https://picsum.photos/seed/news4/600/340", excerpt:"The 450km dual-carriageway is set to boost trade and reduce travel time...", content:"Full article content here...", views:6732, premium:false, enabled:true, tags:["infrastructure","highway","development"], social:{ whatsapp:true, facebook:true, twitter:true, instagram:true, linkedin:true, telegram:true } },
  { id:5, title:"Ghana Music Industry Hits ₵500M Revenue Milestone", category:"Entertainment", author:"Abena Osei", date:"2025-05-16", image:"https://picsum.photos/seed/news5/600/340", excerpt:"Afrobeats and highlife exports have driven unprecedented growth...", content:"Full article content here...", views:7890, premium:false, enabled:true, tags:["music","entertainment","revenue"], social:{ whatsapp:true, facebook:true, twitter:true, instagram:true, linkedin:false, telegram:true } },
  { id:6, title:"Exclusive: Government Budget Plans for 2026 Revealed", category:"Politics", author:"Nana Adjei", date:"2025-05-15", image:"https://picsum.photos/seed/news6/600/340", excerpt:"Sources close to the Finance Ministry reveal key allocations...", content:"Full premium article content...", views:12034, premium:true, enabled:true, tags:["politics","budget","government"], social:{ whatsapp:true, facebook:true, twitter:true, instagram:true, linkedin:true, telegram:true } },
];

const INITIAL_VIDEOS = [
  { id:1, title:"Inside Ghana's Gold Coast: Documentary", thumbnail:"https://picsum.photos/seed/vid1/400/225", duration:"24:38", views:45200, downloadable:true, enabled:true, category:"Documentary" },
  { id:2, title:"AFCON 2026 Qualifier Highlights", thumbnail:"https://picsum.photos/seed/vid2/400/225", duration:"12:05", views:89100, downloadable:false, enabled:true, category:"Sports" },
  { id:3, title:"Tech Talk: Ghana's Silicon Savannah", thumbnail:"https://picsum.photos/seed/vid3/400/225", duration:"18:22", views:23400, downloadable:true, enabled:true, category:"Technology" },
];

const INITIAL_AUDIOS = [
  { id:1, title:"Morning Briefing - May 20, 2025", duration:"08:45", plays:12300, downloadable:true, enabled:true, category:"News Briefing" },
  { id:2, title:"Interview: Finance Minister on 2026 Budget", duration:"34:12", plays:8700, downloadable:false, enabled:true, category:"Interview" },
  { id:3, title:"Sports Review: Black Stars Season Wrap", duration:"22:18", plays:15600, downloadable:true, enabled:true, category:"Sports" },
];

const INITIAL_PODCASTS = [
  { id:1, title:"Ghana Forward", host:"Dr. Ama Serwaa", episodes:87, subscribers:34500, cover:"https://picsum.photos/seed/pod1/200/200", enabled:true, description:"Weekly deep dives into Ghana's political and economic landscape" },
  { id:2, title:"Tech Africa Weekly", host:"Kweku Darko", episodes:142, subscribers:67800, cover:"https://picsum.photos/seed/pod2/200/200", enabled:true, description:"The intersection of technology and African development" },
  { id:3, title:"Sports Pulse GH", host:"Abena Boateng", episodes:203, subscribers:89200, cover:"https://picsum.photos/seed/pod3/200/200", enabled:true, description:"All things sports - football, athletics, and beyond" },
];

const INITIAL_ADS = [
  { id:1, name:"Homepage Banner Top", position:"hero", size:"970x250", enabled:true, client:"MTN Ghana", price:2500, startDate:"2025-05-01", endDate:"2025-06-30", image:"", clicks:4823, impressions:124500 },
  { id:2, name:"Sidebar Right Ad", position:"sidebar", size:"300x600", enabled:true, client:"Vodafone Ghana", price:1200, startDate:"2025-05-10", endDate:"2025-07-10", image:"", clicks:1203, impressions:45600 },
  { id:3, name:"Article In-Content", position:"in-content", size:"728x90", enabled:false, client:"Ghana Airways", price:800, startDate:"2025-06-01", endDate:"2025-08-01", image:"", clicks:0, impressions:0 },
  { id:4, name:"Self-Serve: Local Market", position:"sidebar", size:"300x250", enabled:true, client:"Accra Market Traders", price:250, startDate:"2025-05-15", endDate:"2025-06-15", image:"", clicks:893, impressions:12400, selfServe:true },
];

const INITIAL_PRODUCTS = [
  { id:1, name:"Ghana News Annual Subscription", price:120, type:"digital", image:"https://picsum.photos/seed/prod1/300/300", stock:999, enabled:true, description:"12 months of premium news access", downloadable:true, payOnDelivery:false, onlinePayment:true },
  { id:2, name:"NewsApp Branded Mug", price:45, type:"physical", image:"https://picsum.photos/seed/prod2/300/300", stock:150, enabled:true, description:"Quality ceramic mug with our logo", downloadable:false, payOnDelivery:true, onlinePayment:true },
  { id:3, name:"Ghana Media Handbook 2025 (PDF)", price:75, type:"digital", image:"https://picsum.photos/seed/prod3/300/300", stock:999, enabled:true, description:"Comprehensive guide to Ghana's media landscape", downloadable:true, payOnDelivery:false, onlinePayment:true },
  { id:4, name:"Investigative Journalism Course", price:350, type:"digital", image:"https://picsum.photos/seed/prod4/300/300", stock:999, enabled:true, description:"8-week online course by senior journalists", downloadable:true, payOnDelivery:false, onlinePayment:true },
];

const INITIAL_COMMUNITY_MSGS = [
  { id:1, user:"Ama K.", text:"Great coverage on the new highway! Finally some infrastructure news.", time:"10:23", avatar:"AK" },
  { id:2, user:"Kofi B.", text:"The AFCON qualifier article was top-notch. Proud of the Black Stars!", time:"10:31", avatar:"KB" },
  { id:3, user:"Efua D.", text:"Looking forward to more tech stories. Silicon Savannah is growing fast 🇬🇭", time:"10:45", avatar:"ED" },
  { id:4, user:"Nana A.", text:"The premium budget article is worth every pesewa. Excellent insights!", time:"11:02", avatar:"NA" },
];

const PAYMENT_OPTIONS = { onlinePayment: true, payOnDelivery: true };

const SOCIAL_PLATFORMS = [
  { key:"whatsapp", label:"WhatsApp", color:"#25D366", icon:"📱" },
  { key:"facebook", label:"Facebook", color:"#1877F2", icon:"📘" },
  { key:"twitter", label:"Twitter/X", color:"#000000", icon:"🐦" },
  { key:"instagram", label:"Instagram", color:"#E1306C", icon:"📸" },
  { key:"linkedin", label:"LinkedIn", color:"#0A66C2", icon:"💼" },
  { key:"telegram", label:"Telegram", color:"#2CA5E0", icon:"✈️" },
];

const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/newsapp-ghana";

const ROLES = ["super_admin","admin","editor","contributor","subscriber"];

const USERS = [
  { id:1, name:"Super Admin", email:"admin@newsapp.gh", role:"super_admin", avatar:"SA", joined:"2024-01-01" },
  { id:2, name:"Ama Mensah", email:"ama@newsapp.gh", role:"admin", avatar:"AM", joined:"2024-03-15" },
  { id:3, name:"Kwame Boateng", email:"kwame@newsapp.gh", role:"editor", avatar:"KB", joined:"2024-04-20" },
  { id:4, name:"Efua Darko", email:"efua@newsapp.gh", role:"contributor", avatar:"ED", joined:"2024-06-10" },
  { id:5, name:"Guest Reader", email:"guest@email.com", role:"subscriber", avatar:"GR", joined:"2025-01-05" },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const Badge = ({ children, color = "#1565C0", bg }) => (
  <span style={{ background: bg || color + "18", color, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:20, letterSpacing:0.5, textTransform:"uppercase" }}>{children}</span>
);

const Toggle = ({ value, onChange, label }) => (
  <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
    <div onClick={() => onChange(!value)} style={{ width:42, height:24, borderRadius:12, background: value ? "#1565C0" : "#CBD5E1", position:"relative", transition:"background 0.2s", cursor:"pointer", flexShrink:0 }}>
      <div style={{ width:20, height:20, borderRadius:"50%", background:"white", position:"absolute", top:2, left: value ? 20 : 2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
    {label && <span style={{ fontSize:13, color:"#475569" }}>{label}</span>}
  </label>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background:"white", borderRadius:12, border:"1px solid #E2E8F0", overflow:"hidden", ...style }}>{children}</div>
);

const StatCard = ({ icon, label, value, color = "#1565C0", sub }) => (
  <div style={{ background:"white", borderRadius:12, border:"1px solid #E2E8F0", padding:"16px 20px" }}>
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
      <div style={{ width:38, height:38, borderRadius:10, background: color + "18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
      <span style={{ fontSize:12, color:"#64748B", fontWeight:600, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</span>
    </div>
    <div style={{ fontSize:28, fontWeight:800, color:"#0F172A" }}>{value}</div>
    {sub && <div style={{ fontSize:12, color:"#94A3B8", marginTop:4 }}>{sub}</div>}
  </div>
);

const Btn = ({ children, onClick, color = "#1565C0", outline, small, style = {} }) => (
  <button onClick={onClick} style={{ padding: small ? "6px 14px" : "10px 20px", borderRadius:8, border: outline ? `1.5px solid ${color}` : "none", background: outline ? "transparent" : color, color: outline ? color : "white", fontWeight:700, fontSize: small ? 12 : 14, cursor:"pointer", transition:"all 0.15s", ...style }}>{children}</button>
);

// ─── SHARE BUTTONS ────────────────────────────────────────────────────────────
const ShareButtons = ({ article, enabledPlatforms }) => {
  const url = encodeURIComponent(`https://newsapp.gh/news/${article.id}`);
  const text = encodeURIComponent(article.title);
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    instagram: `https://instagram.com/`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
  };
  return (
    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:8 }}>
      {SOCIAL_PLATFORMS.filter(p => enabledPlatforms?.[p.key]).map(p => (
        <a key={p.key} href={shareLinks[p.key]} target="_blank" rel="noreferrer"
          style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:6, background: p.color + "15", color: p.color, fontSize:12, fontWeight:600, textDecoration:"none", border:`1px solid ${p.color}30` }}>
          {p.icon} {p.label}
        </a>
      ))}
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function NewsApp() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [view, setView] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [news, setNews] = useState(INITIAL_NEWS);
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [audios, setAudios] = useState(INITIAL_AUDIOS);
  const [podcasts, setPodcasts] = useState(INITIAL_PODCASTS);
  const [ads, setAds] = useState(INITIAL_ADS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [communityMsgs, setCommunityMsgs] = useState(INITIAL_COMMUNITY_MSGS);
  const [chatMsg, setChatMsg] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [podcastEnabled, setPodcastEnabled] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState(PAYMENT_OPTIONS);
  const [adminTab, setAdminTab] = useState("overview");
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selfAdModal, setSelfAdModal] = useState(false);
  const [selfAd, setSelfAd] = useState({ title:"", budget:"", duration:"", description:"" });
  const [toasts, setToasts] = useState([]);
  const [newUserModal, setNewUserModal] = useState(false);
  const [users, setUsers] = useState(USERS);
  const [wpImportStatus, setWpImportStatus] = useState("idle");
  const [wpUrl, setWpUrl] = useState("");
  const [themeEditor, setThemeEditor] = useState(false);
  const [tempTheme, setTempTheme] = useState(DEFAULT_THEME);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const chatEndRef = useRef(null);

  const toast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [communityMsgs]);

  const login = (email, password) => {
    const user = USERS.find(u => u.email === email);
    if (user) { setCurrentUser(user); setLoginModal(false); toast(`Welcome back, ${user.name}! 🎉`); }
    else toast("Invalid credentials", "error");
  };

  const logout = () => { setCurrentUser(null); setView("home"); toast("Logged out successfully"); };

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const newMsg = { id: Date.now(), user: currentUser ? currentUser.name : "Guest", text: chatMsg, time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}), avatar: currentUser ? currentUser.avatar : "G?" };
    setCommunityMsgs(m => [...m, newMsg]);
    setChatMsg("");
  };

  const addToCart = (product) => {
    setCart(c => { const ex = c.find(x => x.id === product.id); return ex ? c.map(x => x.id === product.id ? {...x, qty: x.qty+1} : x) : [...c, {...product, qty:1}]; });
    toast(`${product.name} added to cart! 🛒`);
  };

  const totalCart = cart.reduce((s, x) => s + x.price * x.qty, 0);

  const filteredNews = news.filter(n => n.enabled && (activeCategory === "All" || n.category === activeCategory) && (searchQuery === "" || n.title.toLowerCase().includes(searchQuery.toLowerCase())));

  const categories = ["All", ...Array.from(new Set(news.map(n => n.category)))];

  const isAdmin = currentUser && ["super_admin","admin"].includes(currentUser.role);
  const isSuperAdmin = currentUser && currentUser.role === "super_admin";

  const applyTheme = () => { setTheme(tempTheme); setThemeEditor(false); toast("Theme updated! 🎨"); };

  const importFromWordPress = async () => {
    if (!wpUrl) { toast("Please enter your WordPress URL", "error"); return; }
    setWpImportStatus("loading");
    setTimeout(() => {
      const imported = [
        { id: Date.now(), title:"[WP Import] Ghana Development Projects Update", category:"Politics", author:"WP Migration", date: new Date().toISOString().slice(0,10), image:`https://picsum.photos/seed/wp1/600/340`, excerpt:"Imported from WordPress — content migrated successfully.", content:"Full imported content...", views:0, premium:false, enabled:true, tags:["imported","wordpress"], social:{ whatsapp:true, facebook:true, twitter:true, instagram:false, linkedin:true, telegram:false } },
      ];
      setNews(n => [...imported, ...n]);
      setWpImportStatus("done");
      toast("WordPress content imported! ✅");
    }, 2500);
  };

  const submitSelfAd = () => {
    const newAd = { id: Date.now(), name: selfAd.title, position:"sidebar", size:"300x250", enabled:true, client:"Self-Serve Client", price: parseFloat(selfAd.budget) || 0, startDate: new Date().toISOString().slice(0,10), endDate: new Date(Date.now() + parseInt(selfAd.duration||30) * 86400000).toISOString().slice(0,10), image:"", clicks:0, impressions:0, selfServe:true };
    setAds(a => [...a, newAd]);
    setSelfAdModal(false);
    setSelfAd({ title:"", budget:"", duration:"", description:"" });
    toast("Ad submitted! Payment confirmed. Your ad will go live shortly. ✅");
  };

  const P = theme.primary;

  // ── NAV ────────────────────────────────────────────────────────────────────
  const navItems = [
    { key:"home", label:"🏠 Home" },
    { key:"news", label:"📰 News" },
    { key:"videos", label:"🎬 Videos" },
    { key:"audios", label:"🎵 Audio" },
    ...(podcastEnabled ? [{ key:"podcasts", label:"🎙 Podcasts" }] : []),
    { key:"community", label:"💬 Community" },
    { key:"shop", label:"🛒 Shop" },
    { key:"advertise", label:"📢 Advertise" },
  ];

  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background: theme.bg, minHeight:"100vh", color: theme.text }}>

      {/* TOAST NOTIFICATIONS */}
      <div style={{ position:"fixed", top:20, right:20, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: t.type === "error" ? "#FEF2F2" : "#F0FDF4", border:`1px solid ${t.type==="error"?"#FCA5A5":"#86EFAC"}`, color: t.type==="error" ? "#DC2626" : "#15803D", padding:"10px 16px", borderRadius:10, fontSize:13, fontWeight:600, boxShadow:"0 4px 16px rgba(0,0,0,0.08)", minWidth:240, animation:"slideIn 0.2s ease" }}>
            {t.msg}
          </div>
        ))}
      </div>

      {/* BREAKING NEWS TICKER */}
      <div style={{ background: theme.accent, color:"white", padding:"6px 0", overflow:"hidden", position:"relative" }}>
        <div style={{ display:"flex", gap:0, alignItems:"center" }}>
          <span style={{ background:"rgba(0,0,0,0.3)", padding:"0 16px", fontWeight:800, fontSize:12, marginRight:16, flexShrink:0, alignSelf:"stretch", display:"flex", alignItems:"center" }}>🔴 BREAKING</span>
          <div style={{ display:"flex", gap:60, animation:"ticker 25s linear infinite", whiteSpace:"nowrap", fontSize:13, fontWeight:600 }}>
            {news.filter(n=>n.enabled).map(n => <span key={n.id}>{n.title} &nbsp;•&nbsp;</span>)}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header style={{ background: theme.navBg, color: theme.navText, boxShadow:"0 2px 20px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => setView("home")}>
              <div style={{ width:40, height:40, borderRadius:10, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color: P, fontSize:18 }}>GN</div>
              <div>
                <div style={{ fontSize:20, fontWeight:900, letterSpacing:-0.5 }}>GhanaNews<span style={{ color: theme.accent }}>Hub</span></div>
                <div style={{ fontSize:10, opacity:0.75, letterSpacing:1 }}>Reliable News Hub</div>
              </div>
            </div>

            {/* SEARCH */}
            <div style={{ flex:1, maxWidth:380, margin:"0 24px", position:"relative" }}>
              <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setView("news"); }} placeholder="Search news, topics, people..." style={{ width:"100%", padding:"9px 16px 9px 40px", borderRadius:24, border:"none", background:"rgba(255,255,255,0.15)", color:"white", fontSize:14, outline:"none", boxSizing:"border-box" }} />
              <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", opacity:0.7 }}>🔍</span>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {/* Cart */}
              <button onClick={() => setView("cart")} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"white", borderRadius:8, padding:"8px 12px", cursor:"pointer", fontSize:14, fontWeight:700, position:"relative" }}>
                🛒 {cart.length > 0 && <span style={{ background: theme.accent, borderRadius:"50%", width:18, height:18, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, marginLeft:4 }}>{cart.reduce((s,x)=>s+x.qty,0)}</span>}
              </button>

              {/* WhatsApp Channel */}
              <a href={WHATSAPP_CHANNEL} target="_blank" rel="noreferrer" style={{ background:"#25D36620", border:"1px solid #25D36660", color:"#4ade80", borderRadius:8, padding:"8px 12px", fontSize:12, fontWeight:700, textDecoration:"none" }}>📱 Join Channel</a>

              {/* Auth */}
              {currentUser ? (
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <button onClick={() => setView(currentUser.role === "super_admin" ? "dashboard" : "user-dashboard")} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"white", borderRadius:8, padding:"8px 12px", cursor:"pointer", fontSize:13, fontWeight:700 }}>
                    {currentUser.avatar} Dashboard
                  </button>
                  <button onClick={logout} style={{ background:"none", border:"1px solid rgba(255,255,255,0.3)", color:"white", borderRadius:8, padding:"8px 12px", cursor:"pointer", fontSize:12 }}>Logout</button>
                </div>
              ) : (
                <button onClick={() => setLoginModal(true)} style={{ background:"white", color: P, border:"none", borderRadius:8, padding:"9px 18px", cursor:"pointer", fontWeight:800, fontSize:14 }}>Login / Sign Up</button>
              )}
            </div>
          </div>
        </div>

        {/* NAV BAR */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", display:"flex", gap:0, overflowX:"auto" }}>
            {navItems.map(item => (
              <button key={item.key} onClick={() => setView(item.key)} style={{ background: view === item.key ? "rgba(255,255,255,0.2)" : "none", border:"none", color:"white", padding:"12px 16px", cursor:"pointer", fontSize:13, fontWeight: view === item.key ? 800 : 600, borderBottom: view === item.key ? `3px solid ${theme.accent}` : "3px solid transparent", whiteSpace:"nowrap", transition:"all 0.15s" }}>{item.label}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px 60px" }}>

        {/* ── HOME ────────────────────────────────────────────────────────── */}
        {view === "home" && (
          <div>
            {/* HERO AD SPACE */}
            {ads.find(a => a.position === "hero" && a.enabled) && (
              <div style={{ background:`linear-gradient(135deg, ${P}15, ${theme.accent}15)`, border:`1px solid ${P}30`, borderRadius:12, padding:"20px 32px", margin:"24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <Badge color={theme.accent}>SPONSORED</Badge>
                  <div style={{ fontSize:22, fontWeight:800, margin:"8px 0 4px", color: P }}>
                    {ads.find(a => a.position === "hero" && a.enabled)?.client}
                  </div>
                  <div style={{ color:"#64748B", fontSize:14 }}>Premium advertisement space • {ads.find(a => a.position === "hero" && a.enabled)?.size}</div>
                </div>
                <div style={{ fontSize:48 }}>📢</div>
              </div>
            )}

            {/* HERO NEWS */}
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:32 }}>
              {filteredNews.slice(0,1).map(n => (
                <div key={n.id} onClick={() => { setSelectedNews(n); setView("article"); }} style={{ cursor:"pointer", position:"relative", borderRadius:16, overflow:"hidden", boxShadow:"0 8px 32px rgba(21,101,192,0.12)" }}>
                  <img src={n.image} alt={n.title} style={{ width:"100%", height:380, objectFit:"cover", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:24 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:8 }}>
                      <Badge color={theme.accent}>{n.category}</Badge>
                      {n.premium && <Badge color="#F59E0B">⭐ PREMIUM</Badge>}
                    </div>
                    <h2 style={{ color:"white", fontSize:24, fontWeight:900, margin:"0 0 8px", lineHeight:1.3 }}>{n.title}</h2>
                    <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, margin:"0 0 8px" }}>{n.excerpt}</p>
                    <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12 }}>By {n.author} • {n.date} • {n.views.toLocaleString()} views</div>
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {filteredNews.slice(1,4).map(n => (
                  <div key={n.id} onClick={() => { setSelectedNews(n); setView("article"); }} style={{ cursor:"pointer", background:"white", borderRadius:12, border:"1px solid #E2E8F0", overflow:"hidden", display:"flex", gap:12, padding:12, transition:"box-shadow 0.15s" }}>
                    <img src={n.image} alt="" style={{ width:90, height:70, objectFit:"cover", borderRadius:8, flexShrink:0 }} />
                    <div>
                      <Badge color={P} small>{n.category}</Badge>
                      <div style={{ fontSize:14, fontWeight:700, marginTop:4, lineHeight:1.35, color:"#0F172A" }}>{n.title}</div>
                      <div style={{ fontSize:11, color:"#94A3B8", marginTop:4 }}>{n.author} • {n.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY TABS */}
            <div style={{ display:"flex", gap:8, marginBottom:20, overflowX:"auto", paddingBottom:4 }}>
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} style={{ padding:"8px 18px", borderRadius:24, border:"none", background: activeCategory === c ? P : "#E2E8F0", color: activeCategory === c ? "white" : "#475569", fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s" }}>{c}</button>
              ))}
            </div>

            {/* NEWS GRID */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:20, marginBottom:32 }}>
              {filteredNews.slice(1).map(n => (
                <Card key={n.id} style={{ cursor:"pointer", transition:"transform 0.15s, box-shadow 0.15s" }} onClick={() => { setSelectedNews(n); setView("article"); }}>
                  <div style={{ position:"relative" }}>
                    <img src={n.image} alt={n.title} style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} />
                    {n.premium && <div style={{ position:"absolute", top:8, right:8 }}><Badge color="#F59E0B">⭐ PREMIUM</Badge></div>}
                  </div>
                  <div style={{ padding:"14px 16px" }}>
                    <Badge color={P}>{n.category}</Badge>
                    <h3 style={{ margin:"8px 0 6px", fontSize:15, fontWeight:800, lineHeight:1.35, color:"#0F172A" }}>{n.title}</h3>
                    <p style={{ color:"#64748B", fontSize:13, margin:"0 0 10px", lineHeight:1.5 }}>{n.excerpt}</p>
                    <ShareButtons article={n} enabledPlatforms={n.social} />
                    <div style={{ fontSize:11, color:"#94A3B8", marginTop:8 }}>By {n.author} • {n.views.toLocaleString()} views</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* SIDEBAR AD */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:24 }}>
              <div>
                {/* FEATURED VIDEOS */}
                <h2 style={{ fontSize:20, fontWeight:900, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>🎬 Latest Videos</h2>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginBottom:32 }}>
                  {videos.filter(v => v.enabled).map(v => (
                    <Card key={v.id} style={{ cursor:"pointer" }} onClick={() => setView("videos")}>
                      <div style={{ position:"relative" }}>
                        <img src={v.thumbnail} alt="" style={{ width:"100%", height:140, objectFit:"cover", display:"block" }} />
                        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>▶</div>
                        </div>
                        <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,0.75)", color:"white", fontSize:11, fontWeight:700, padding:"2px 6px", borderRadius:4 }}>{v.duration}</div>
                        {v.downloadable && <div style={{ position:"absolute", top:8, right:8 }}><Badge color="#10B981">⬇ DL</Badge></div>}
                      </div>
                      <div style={{ padding:"10px 12px" }}>
                        <div style={{ fontSize:13, fontWeight:700, lineHeight:1.35 }}>{v.title}</div>
                        <div style={{ fontSize:11, color:"#94A3B8", marginTop:4 }}>{v.views.toLocaleString()} views</div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* PODCASTS */}
                {podcastEnabled && (
                  <>
                    <h2 style={{ fontSize:20, fontWeight:900, marginBottom:16 }}>🎙 Podcasts</h2>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16 }}>
                      {podcasts.filter(p => p.enabled).map(p => (
                        <Card key={p.id} style={{ padding:16 }}>
                          <img src={p.cover} alt="" style={{ width:60, height:60, borderRadius:8, objectFit:"cover", display:"block", marginBottom:10 }} />
                          <div style={{ fontSize:14, fontWeight:800 }}>{p.title}</div>
                          <div style={{ fontSize:12, color:"#64748B", marginTop:2 }}>by {p.host}</div>
                          <div style={{ fontSize:11, color:"#94A3B8", marginTop:6 }}>{p.episodes} episodes • {p.subscribers.toLocaleString()} subscribers</div>
                          <Btn small style={{ marginTop:10, background: P, color:"white", border:"none", width:"100%", textAlign:"center" }} onClick={() => {}}>▶ Listen</Btn>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* SIDEBAR */}
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {/* SIDEBAR AD */}
                {ads.find(a => a.position === "sidebar" && a.enabled) && (
                  <div style={{ background:`linear-gradient(135deg, ${P}10, ${theme.accent}10)`, border:`1px solid ${P}25`, borderRadius:12, padding:16, textAlign:"center" }}>
                    <Badge color={theme.accent}>ADVERTISEMENT</Badge>
                    <div style={{ fontSize:16, fontWeight:800, margin:"10px 0 4px", color: P }}>{ads.find(a => a.position === "sidebar" && a.enabled)?.client}</div>
                    <div style={{ color:"#94A3B8", fontSize:12 }}>300x600 • Premium Spot</div>
                    <div style={{ height:120, background:`${P}08`, borderRadius:8, marginTop:10, display:"flex", alignItems:"center", justifyContent:"center", color: P, fontSize:24 }}>📢</div>
                    <button onClick={() => setSelfAdModal(true)} style={{ marginTop:12, background: P, color:"white", border:"none", borderRadius:6, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer", width:"100%" }}>Place Your Ad Here</button>
                  </div>
                )}

                {/* TRENDING */}
                <Card style={{ padding:16 }}>
                  <h3 style={{ fontSize:15, fontWeight:800, marginTop:0, marginBottom:12, color: P }}>🔥 Trending Now</h3>
                  {news.sort((a,b) => b.views - a.views).slice(0,5).map((n, i) => (
                    <div key={n.id} onClick={() => { setSelectedNews(n); setView("article"); }} style={{ display:"flex", gap:10, marginBottom:12, cursor:"pointer", paddingBottom:12, borderBottom: i < 4 ? "1px solid #F1F5F9" : "none" }}>
                      <div style={{ fontSize:20, fontWeight:900, color:`${P}60`, width:24, flexShrink:0 }}>{i+1}</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, lineHeight:1.35 }}>{n.title}</div>
                        <div style={{ fontSize:11, color:"#94A3B8", marginTop:2 }}>{n.views.toLocaleString()} views</div>
                      </div>
                    </div>
                  ))}
                </Card>

                {/* WHATSAPP */}
                <div style={{ background:"linear-gradient(135deg, #075E54, #128C7E)", borderRadius:12, padding:20, color:"white", textAlign:"center" }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>📱</div>
                  <div style={{ fontWeight:900, fontSize:16, marginBottom:4 }}>Join Our WhatsApp Channel</div>
                  <div style={{ fontSize:12, opacity:0.85, marginBottom:14 }}>Get breaking news instantly on WhatsApp</div>
                  <a href={WHATSAPP_CHANNEL} target="_blank" rel="noreferrer" style={{ display:"block", background:"white", color:"#075E54", borderRadius:8, padding:"10px 16px", fontWeight:800, fontSize:14, textDecoration:"none" }}>📲 Join Now — Free</a>
                </div>

                {/* NEWSLETTER */}
                <Card style={{ padding:16 }}>
                  <h3 style={{ fontSize:15, fontWeight:800, marginTop:0, marginBottom:4, color: P }}>📬 Newsletter</h3>
                  <p style={{ fontSize:12, color:"#64748B", marginTop:0, marginBottom:10 }}>Get the top stories delivered to your inbox daily.</p>
                  <input type="email" placeholder="your@email.com" style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:13, boxSizing:"border-box", marginBottom:8, outline:"none" }} />
                  <Btn style={{ width:"100%", background: P, color:"white", border:"none", textAlign:"center" }} onClick={() => toast("Subscribed to newsletter! ✉️")}>Subscribe Free</Btn>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ── ARTICLE VIEW ─────────────────────────────────────────────────── */}
        {view === "article" && selectedNews && (
          <div style={{ maxWidth:780, margin:"32px auto" }}>
            <button onClick={() => setView("home")} style={{ background:"none", border:"none", color: P, fontWeight:700, cursor:"pointer", fontSize:14, marginBottom:16 }}>← Back to News</button>
            <img src={selectedNews.image} alt="" style={{ width:"100%", borderRadius:16, marginBottom:24, maxHeight:440, objectFit:"cover" }} />
            <div style={{ display:"flex", gap:8, marginBottom:12 }}>
              <Badge color={P}>{selectedNews.category}</Badge>
              {selectedNews.premium && !currentUser && <Badge color="#F59E0B">⭐ PREMIUM — Login to read</Badge>}
            </div>
            <h1 style={{ fontSize:32, fontWeight:900, lineHeight:1.2, margin:"0 0 12px" }}>{selectedNews.title}</h1>
            <div style={{ color:"#64748B", fontSize:13, marginBottom:20 }}>By <strong>{selectedNews.author}</strong> • {selectedNews.date} • {selectedNews.views.toLocaleString()} views</div>

            {selectedNews.premium && !currentUser ? (
              <div style={{ background:`${P}10`, border:`2px solid ${P}30`, borderRadius:16, padding:32, textAlign:"center" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔒</div>
                <h3 style={{ color: P, marginTop:0 }}>Premium Content</h3>
                <p style={{ color:"#64748B" }}>Login or subscribe to access exclusive premium news.</p>
                <Btn onClick={() => setLoginModal(true)} style={{ background: P, color:"white", border:"none" }}>Login to Continue</Btn>
              </div>
            ) : (
              <>
                <p style={{ fontSize:17, lineHeight:1.75, color:"#1E293B", marginBottom:24 }}>{selectedNews.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ghana continues to lead in economic development across the African continent with bold new policies and strategic partnerships that are reshaping the future of the nation.</p>
                <p style={{ fontSize:16, lineHeight:1.75, color:"#334155" }}>Further coverage from our senior correspondents reveals that this development has widespread implications for regional trade, infrastructure development, and community welfare across all 16 regions of Ghana.</p>

                {/* IN-CONTENT AD */}
                {ads.find(a => a.position === "in-content" && a.enabled) && (
                  <div style={{ background:`${theme.accent}10`, border:`1px solid ${theme.accent}30`, borderRadius:10, padding:"12px 20px", margin:"24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div><Badge color={theme.accent}>AD</Badge> <span style={{ fontSize:13, color:"#64748B", marginLeft:8 }}>{ads.find(a=>a.position==="in-content"&&a.enabled)?.client}</span></div>
                    <span style={{ fontSize:11, color:"#94A3B8" }}>728×90</span>
                  </div>
                )}

                <div style={{ borderTop:"1px solid #E2E8F0", paddingTop:20, marginTop:24 }}>
                  <div style={{ fontWeight:800, marginBottom:10 }}>📤 Share this story:</div>
                  <ShareButtons article={selectedNews} enabledPlatforms={selectedNews.social} />
                  <div style={{ marginTop:16 }}>
                    <a href={`https://wa.me/?text=${encodeURIComponent(selectedNews.title + " " + "https://newsapp.gh/news/" + selectedNews.id)}`} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#25D366", color:"white", borderRadius:8, padding:"10px 16px", fontWeight:700, textDecoration:"none", fontSize:14 }}>📱 Share on WhatsApp</a>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── NEWS LIST ─────────────────────────────────────────────────────── */}
        {view === "news" && (
          <div style={{ paddingTop:24 }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:20 }}>📰 All News</h2>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              {categories.map(c => (<button key={c} onClick={() => setActiveCategory(c)} style={{ padding:"7px 16px", borderRadius:24, border:"none", background: activeCategory===c ? P : "#E2E8F0", color: activeCategory===c ? "white" : "#475569", fontWeight:700, fontSize:13, cursor:"pointer" }}>{c}</button>))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:20 }}>
              {filteredNews.map(n => (
                <Card key={n.id} style={{ cursor:"pointer" }} onClick={() => { setSelectedNews(n); setView("article"); }}>
                  <div style={{ position:"relative" }}><img src={n.image} alt="" style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} />{n.premium && <div style={{ position:"absolute", top:8, right:8 }}><Badge color="#F59E0B">⭐ PREMIUM</Badge></div>}</div>
                  <div style={{ padding:"14px 16px" }}>
                    <Badge color={P}>{n.category}</Badge>
                    <h3 style={{ margin:"8px 0 6px", fontSize:15, fontWeight:800, lineHeight:1.35 }}>{n.title}</h3>
                    <p style={{ color:"#64748B", fontSize:13, margin:"0 0 10px" }}>{n.excerpt}</p>
                    <ShareButtons article={n} enabledPlatforms={n.social} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── VIDEOS ───────────────────────────────────────────────────────── */}
        {view === "videos" && (
          <div style={{ paddingTop:24 }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:8 }}>🎬 Videos</h2>
            <p style={{ color:"#64748B", marginBottom:24 }}>Watch and download video content from Wohonsem</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:20 }}>
              {videos.filter(v => v.enabled).map(v => (
                <Card key={v.id}>
                  <div style={{ position:"relative" }}>
                    <img src={v.thumbnail} alt="" style={{ width:"100%", height:200, objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                      <div style={{ width:56, height:56, borderRadius:"50%", background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>▶</div>
                    </div>
                    <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,0.8)", color:"white", fontSize:11, fontWeight:700, padding:"2px 7px", borderRadius:4 }}>{v.duration}</div>
                  </div>
                  <div style={{ padding:"14px 16px" }}>
                    <Badge color={P}>{v.category}</Badge>
                    <h3 style={{ margin:"8px 0 4px", fontSize:15, fontWeight:800 }}>{v.title}</h3>
                    <p style={{ color:"#64748B", fontSize:13, margin:"0 0 12px" }}>{v.views.toLocaleString()} views</p>
                    <div style={{ display:"flex", gap:8 }}>
                      <Btn small style={{ background: P, color:"white", border:"none" }}>▶ Watch</Btn>
                      {v.downloadable && <Btn small outline color={P} onClick={() => toast("Download started! ⬇️")}>⬇ Download</Btn>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── AUDIOS ───────────────────────────────────────────────────────── */}
        {view === "audios" && (
          <div style={{ paddingTop:24 }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:8 }}>🎵 Audio</h2>
            <p style={{ color:"#64748B", marginBottom:24 }}>Listen to audio news and interviews from Wohonsem</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {audios.filter(a => a.enabled).map(a => (
                <Card key={a.id} style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:54, height:54, borderRadius:"50%", background: `${P}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, cursor:"pointer" }} onClick={() => toast("Now playing: " + a.title + " 🎵")}>🎵</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:15, marginBottom:2 }}>{a.title}</div>
                    <div style={{ fontSize:12, color:"#64748B" }}>{a.category} • {a.duration} • {a.plays.toLocaleString()} plays</div>
                    <div style={{ marginTop:8, background:"#E2E8F0", borderRadius:4, height:4, position:"relative" }}>
                      <div style={{ width:"30%", height:"100%", background: P, borderRadius:4 }} />
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                    <Btn small style={{ background: P, color:"white", border:"none" }} onClick={() => toast("Playing: " + a.title)}>▶ Play</Btn>
                    {a.downloadable && <Btn small outline color={P} onClick={() => toast("Audio downloading! ⬇️")}>⬇ DL</Btn>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── PODCASTS ─────────────────────────────────────────────────────── */}
        {view === "podcasts" && podcastEnabled && (
          <div style={{ paddingTop:24 }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:8 }}>🎙 Podcasts</h2>
            <p style={{ color:"#64748B", marginBottom:24 }}>Subscribe to Ghana's top news podcasts</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:20 }}>
              {podcasts.filter(p => p.enabled).map(p => (
                <Card key={p.id} style={{ padding:20 }}>
                  <div style={{ display:"flex", gap:14, marginBottom:14 }}>
                    <img src={p.cover} alt="" style={{ width:72, height:72, borderRadius:12, objectFit:"cover" }} />
                    <div>
                      <h3 style={{ margin:"0 0 4px", fontSize:16, fontWeight:900 }}>{p.title}</h3>
                      <div style={{ color:"#64748B", fontSize:13 }}>by {p.host}</div>
                      <div style={{ fontSize:12, color:"#94A3B8", marginTop:4 }}>{p.episodes} eps • {p.subscribers.toLocaleString()} subscribers</div>
                    </div>
                  </div>
                  <p style={{ color:"#475569", fontSize:13, margin:"0 0 14px" }}>{p.description}</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <Btn small style={{ background: P, color:"white", border:"none", flex:1, textAlign:"center" }} onClick={() => toast("Subscribed to " + p.title + " 🎙")}>Subscribe</Btn>
                    <Btn small outline color={P} onClick={() => toast("Opening latest episode...")}>▶ Latest</Btn>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── COMMUNITY ────────────────────────────────────────────────────── */}
        {view === "community" && (
          <div style={{ paddingTop:24, maxWidth:720, margin:"0 auto" }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:4 }}>💬 Community Chat</h2>
            <p style={{ color:"#64748B", marginBottom:20 }}>Discuss the latest news with the Wohonsem community</p>
            <Card style={{ height:420, display:"flex", flexDirection:"column" }}>
              <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:14 }}>
                {communityMsgs.map(m => (
                  <div key={m.id} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background: `${P}18`, color: P, fontWeight:800, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{m.avatar}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                        <span style={{ fontWeight:700, fontSize:13, color:"#0F172A" }}>{m.user}</span>
                        <span style={{ fontSize:11, color:"#94A3B8" }}>{m.time}</span>
                      </div>
                      <div style={{ background:"#F8FAFC", border:"1px solid #E2E8F0", borderRadius:10, padding:"8px 12px", fontSize:14, color:"#334155", lineHeight:1.5 }}>{m.text}</div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div style={{ borderTop:"1px solid #E2E8F0", padding:16, display:"flex", gap:10 }}>
                <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder={currentUser ? "Write a message..." : "Login to chat..."} disabled={!currentUser} style={{ flex:1, padding:"10px 14px", borderRadius:10, border:"1px solid #E2E8F0", fontSize:14, outline:"none" }} />
                <button onClick={sendChat} disabled={!currentUser || !chatMsg.trim()} style={{ background: P, color:"white", border:"none", borderRadius:10, padding:"10px 20px", fontWeight:700, cursor:"pointer", opacity: (!currentUser || !chatMsg.trim()) ? 0.5 : 1 }}>Send</button>
              </div>
            </Card>
            {!currentUser && (
              <div style={{ textAlign:"center", marginTop:16 }}>
                <button onClick={() => setLoginModal(true)} style={{ background: P, color:"white", border:"none", borderRadius:8, padding:"10px 24px", fontWeight:700, cursor:"pointer" }}>Login to Join the Conversation</button>
              </div>
            )}
          </div>
        )}

        {/* ── SHOP ─────────────────────────────────────────────────────────── */}
        {view === "shop" && (
          <div style={{ paddingTop:24 }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:4 }}>🛒 Shop</h2>
            <p style={{ color:"#64748B", marginBottom:24 }}>Products, subscriptions, and digital downloads</p>
            {!paymentOptions.onlinePayment && !paymentOptions.payOnDelivery && (
              <div style={{ background:"#FEF3C7", border:"1px solid #FCD34D", borderRadius:10, padding:16, marginBottom:20, color:"#92400E", fontWeight:600 }}>⚠️ All payment options are currently disabled. Please contact support.</div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:20 }}>
              {products.filter(p => p.enabled).map(p => (
                <Card key={p.id}>
                  <img src={p.image} alt="" style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} />
                  <div style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", gap:6, marginBottom:6 }}>
                      <Badge color={p.type==="digital" ? "#7C3AED" : "#0891B2"}>{p.type === "digital" ? "📥 Digital" : "📦 Physical"}</Badge>
                      {p.downloadable && <Badge color="#059669">⬇ Download</Badge>}
                    </div>
                    <h3 style={{ margin:"6px 0", fontSize:15, fontWeight:800 }}>{p.name}</h3>
                    <p style={{ color:"#64748B", fontSize:13, margin:"0 0 10px" }}>{p.description}</p>
                    <div style={{ fontSize:22, fontWeight:900, color: P, marginBottom:10 }}>₵{p.price.toFixed(2)}</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:12, fontSize:12, color:"#64748B" }}>
                      {paymentOptions.onlinePayment && p.onlinePayment && <div style={{ display:"flex", alignItems:"center", gap:6 }}>✅ Online Payment (MoMo / Card)</div>}
                      {paymentOptions.payOnDelivery && p.payOnDelivery && <div style={{ display:"flex", alignItems:"center", gap:6 }}>✅ Pay on Delivery</div>}
                    </div>
                    <Btn style={{ width:"100%", background: P, color:"white", border:"none", textAlign:"center" }} onClick={() => addToCart(p)}>Add to Cart</Btn>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── CART ─────────────────────────────────────────────────────────── */}
        {view === "cart" && (
          <div style={{ paddingTop:24, maxWidth:640, margin:"0 auto" }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:20 }}>🛒 Your Cart</h2>
            {cart.length === 0 ? (
              <div style={{ textAlign:"center", padding:48, color:"#94A3B8" }}>
                <div style={{ fontSize:56, marginBottom:12 }}>🛒</div>
                <div style={{ fontSize:18, fontWeight:700 }}>Your cart is empty</div>
                <Btn style={{ marginTop:16, background: P, color:"white", border:"none" }} onClick={() => setView("shop")}>Continue Shopping</Btn>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <Card key={item.id} style={{ padding:16, marginBottom:12, display:"flex", gap:14, alignItems:"center" }}>
                    <img src={item.image} alt="" style={{ width:70, height:70, objectFit:"cover", borderRadius:8 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{item.name}</div>
                      <div style={{ color:"#64748B", fontSize:12, marginTop:2 }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontSize:18, fontWeight:900, color: P }}>₵{(item.price * item.qty).toFixed(2)}</div>
                    <button onClick={() => setCart(c => c.filter(x => x.id !== item.id))} style={{ background:"#FEF2F2", border:"none", color:"#DC2626", borderRadius:6, padding:"6px 10px", cursor:"pointer", fontWeight:700 }}>✕</button>
                  </Card>
                ))}
                <Card style={{ padding:20, marginTop:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                    <span style={{ fontSize:18, fontWeight:800 }}>Total</span>
                    <span style={{ fontSize:24, fontWeight:900, color: P }}>₵{totalCart.toFixed(2)}</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {paymentOptions.onlinePayment && <Btn style={{ background: P, color:"white", border:"none", textAlign:"center" }} onClick={() => { setCart([]); toast("Order placed! Payment received via MoMo. ✅"); setView("shop"); }}>💳 Pay Online (MoMo / Card)</Btn>}
                    {paymentOptions.payOnDelivery && <Btn outline color={P} style={{ textAlign:"center" }} onClick={() => { setCart([]); toast("Order placed! Pay on delivery. 🚚"); setView("shop"); }}>🚚 Pay on Delivery</Btn>}
                  </div>
                </Card>
              </>
            )}
          </div>
        )}

        {/* ── ADVERTISE ────────────────────────────────────────────────────── */}
        {view === "advertise" && (
          <div style={{ paddingTop:24 }}>
            <h2 style={{ fontSize:24, fontWeight:900, marginBottom:4 }}>📢 Advertise with Wohonsem</h2>
            <p style={{ color:"#64748B", marginBottom:32, fontSize:15 }}>Reach over 500,000 daily readers across Ghana and the diaspora</p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:20, marginBottom:40 }}>
              {[
                { title:"Homepage Banner", size:"970×250", price:"₵2,500/month", reach:"124,500+ daily", icon:"🏠", desc:"Maximum visibility on our homepage hero section" },
                { title:"Sidebar Ad", size:"300×600", price:"₵1,200/month", reach:"45,600+ daily", icon:"📌", desc:"Persistent sidebar placement across all articles" },
                { title:"In-Article Ad", size:"728×90", price:"₵800/month", reach:"78,000+ daily", icon:"📰", desc:"Embedded within high-traffic news articles" },
                { title:"Mobile Banner", size:"320×50", price:"₵600/month", reach:"210,000+ daily", icon:"📱", desc:"Top-performing mobile ad placement" },
              ].map((ad, i) => (
                <Card key={i} style={{ padding:20 }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>{ad.icon}</div>
                  <h3 style={{ margin:"0 0 4px", fontWeight:900 }}>{ad.title}</h3>
                  <div style={{ fontSize:12, color:"#94A3B8", marginBottom:8 }}>Size: {ad.size}</div>
                  <p style={{ fontSize:13, color:"#64748B", margin:"0 0 12px" }}>{ad.desc}</p>
                  <div style={{ fontSize:22, fontWeight:900, color: P, marginBottom:4 }}>{ad.price}</div>
                  <div style={{ fontSize:12, color:"#10B981", fontWeight:600, marginBottom:14 }}>📊 {ad.reach}</div>
                  <Btn style={{ background: P, color:"white", border:"none", width:"100%", textAlign:"center" }} onClick={() => setSelfAdModal(true)}>Book This Space</Btn>
                </Card>
              ))}
            </div>

            <div style={{ background:`linear-gradient(135deg, ${P}08, ${theme.accent}08)`, border:`2px solid ${P}20`, borderRadius:16, padding:32, textAlign:"center" }}>
              <h2 style={{ fontSize:22, fontWeight:900, marginTop:0, marginBottom:8 }}>🚀 Self-Serve Advertising</h2>
              <p style={{ color:"#64748B", fontSize:15, maxWidth:500, margin:"0 auto 24px" }}>Create and manage your own ad campaign. Set your budget, duration, and target audience. Pay securely with MoMo or card.</p>
              <Btn style={{ background: P, color:"white", border:"none", fontSize:16 }} onClick={() => setSelfAdModal(true)}>Launch Your Campaign</Btn>
            </div>
          </div>
        )}

        {/* ── USER DASHBOARD ───────────────────────────────────────────────── */}
        {view === "user-dashboard" && currentUser && (
          <div style={{ paddingTop:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32, background:"white", borderRadius:16, padding:24, border:"1px solid #E2E8F0" }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:`${P}18`, color: P, fontWeight:900, fontSize:22, display:"flex", alignItems:"center", justifyContent:"center" }}>{currentUser.avatar}</div>
              <div>
                <h2 style={{ margin:0, fontSize:22, fontWeight:900 }}>{currentUser.name}</h2>
                <div style={{ marginTop:4, display:"flex", gap:8, alignItems:"center" }}>
                  <Badge color={P}>{currentUser.role.replace("_"," ").toUpperCase()}</Badge>
                  <span style={{ fontSize:13, color:"#64748B" }}>{currentUser.email}</span>
                </div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:16, marginBottom:32 }}>
              <StatCard icon="📰" label="Saved Articles" value="12" color={P} sub="Last saved: today" />
              <StatCard icon="💬" label="Comments" value="34" color="#10B981" sub="Active commenter" />
              <StatCard icon="🛒" label="Orders" value="3" color="#F59E0B" sub="2 delivered" />
              <StatCard icon="🎙" label="Podcasts" value="7" color="#8B5CF6" sub="Subscribed" />
            </div>
            <Card style={{ padding:24 }}>
              <h3 style={{ marginTop:0, fontWeight:800 }}>Your Reading History</h3>
              {news.slice(0,4).map(n => (
                <div key={n.id} onClick={() => { setSelectedNews(n); setView("article"); }} style={{ display:"flex", gap:12, paddingBottom:14, marginBottom:14, borderBottom:"1px solid #F1F5F9", cursor:"pointer" }}>
                  <img src={n.image} alt="" style={{ width:64, height:48, objectFit:"cover", borderRadius:6 }} />
                  <div>
                    <div style={{ fontSize:14, fontWeight:700 }}>{n.title}</div>
                    <div style={{ fontSize:12, color:"#94A3B8", marginTop:2 }}>{n.date} • {n.category}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ── SUPER ADMIN DASHBOARD ─────────────────────────────────────────── */}
        {view === "dashboard" && isSuperAdmin && (
          <div style={{ paddingTop:24 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
              <div>
                <h1 style={{ margin:0, fontSize:26, fontWeight:900 }}>⚙️ Super Admin Dashboard</h1>
                <p style={{ color:"#64748B", margin:"4px 0 0" }}>Full control over Wohonsem</p>
              </div>
              <Btn style={{ background: P, color:"white", border:"none" }} onClick={() => setThemeEditor(true)}>🎨 Change Theme</Btn>
            </div>

            {/* ADMIN TABS */}
            <div style={{ display:"flex", gap:8, marginBottom:24, borderBottom:"2px solid #E2E8F0", paddingBottom:0 }}>
              {["overview","news","ads","users","shop","media","settings"].map(tab => (
                <button key={tab} onClick={() => setAdminTab(tab)} style={{ padding:"10px 18px", border:"none", background:"none", fontWeight:700, fontSize:13, cursor:"pointer", color: adminTab===tab ? P : "#64748B", borderBottom: adminTab===tab ? `2px solid ${P}` : "2px solid transparent", marginBottom:-2, textTransform:"capitalize" }}>{tab}</button>
              ))}
            </div>

            {/* OVERVIEW */}
            {adminTab === "overview" && (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:16, marginBottom:28 }}>
                  <StatCard icon="📰" label="Total Articles" value={news.length} color={P} sub={`${news.filter(n=>n.enabled).length} active`} />
                  <StatCard icon="👥" label="Total Users" value={users.length} color="#10B981" sub="All roles" />
                  <StatCard icon="📢" label="Active Ads" value={ads.filter(a=>a.enabled).length} color="#F59E0B" sub={`₵${ads.filter(a=>a.enabled).reduce((s,a)=>s+a.price,0).toLocaleString()}`} />
                  <StatCard icon="🛒" label="Products" value={products.filter(p=>p.enabled).length} color="#8B5CF6" sub="In store" />
                  <StatCard icon="🎬" label="Videos" value={videos.filter(v=>v.enabled).length} color="#EC4899" sub="Published" />
                  <StatCard icon="🎙" label="Podcasts" value={podcasts.filter(p=>p.enabled).length} color="#14B8A6" sub={podcastEnabled ? "Module ON" : "Module OFF"} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                  <Card style={{ padding:20 }}>
                    <h3 style={{ marginTop:0, fontWeight:800, fontSize:16 }}>📊 Top Performing Articles</h3>
                    {news.sort((a,b) => b.views - a.views).slice(0,5).map((n, i) => (
                      <div key={n.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom: i < 4 ? "1px solid #F1F5F9" : "none" }}>
                        <div style={{ fontSize:13, fontWeight:600, flex:1, marginRight:8 }}>{n.title.slice(0,42)}...</div>
                        <Badge color={P}>{n.views.toLocaleString()}</Badge>
                      </div>
                    ))}
                  </Card>
                  <Card style={{ padding:20 }}>
                    <h3 style={{ marginTop:0, fontWeight:800, fontSize:16 }}>💰 Ad Revenue</h3>
                    {ads.map((a, i) => (
                      <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom: i < ads.length-1 ? "1px solid #F1F5F9" : "none" }}>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600 }}>{a.name}</div>
                          <div style={{ fontSize:11, color:"#94A3B8" }}>{a.client} {a.selfServe && "• Self-Serve"}</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontWeight:800, color: P }}>₵{a.price.toLocaleString()}</div>
                          <div><Badge color={a.enabled ? "#10B981" : "#94A3B8"}>{a.enabled ? "Active" : "Paused"}</Badge></div>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              </div>
            )}

            {/* NEWS MANAGEMENT */}
            {adminTab === "news" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                  <h3 style={{ margin:0, fontWeight:800 }}>Manage News Articles</h3>
                  <Btn small style={{ background: P, color:"white", border:"none" }} onClick={() => toast("Article editor opening...")}>+ New Article</Btn>
                </div>
                {news.map(n => (
                  <div key={n.id} style={{ background:"white", borderRadius:10, border:"1px solid #E2E8F0", padding:"14px 18px", marginBottom:10, display:"flex", alignItems:"center", gap:16 }}>
                    <img src={n.image} alt="" style={{ width:72, height:52, objectFit:"cover", borderRadius:6 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{n.title}</div>
                      <div style={{ fontSize:12, color:"#94A3B8", marginTop:2 }}>{n.category} • {n.author} • {n.views.toLocaleString()} views {n.premium && "• ⭐ Premium"}</div>
                    </div>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <Toggle value={n.enabled} onChange={v => { setNews(ns => ns.map(x => x.id===n.id ? {...x, enabled:v} : x)); toast(`"${n.title}" ${v?"enabled":"disabled"}`); }} label="Visible" />
                      <Btn small outline color={P} onClick={() => toast("Opening article editor...")}>Edit</Btn>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADS MANAGEMENT */}
            {adminTab === "ads" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                  <h3 style={{ margin:0, fontWeight:800 }}>Manage Ad Spaces</h3>
                  <Btn small style={{ background: P, color:"white", border:"none" }} onClick={() => toast("Ad creator opening...")}>+ Add Ad Space</Btn>
                </div>
                {ads.map(a => (
                  <div key={a.id} style={{ background:"white", borderRadius:10, border:"1px solid #E2E8F0", padding:"14px 18px", marginBottom:10, display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:48, height:48, background:`${P}15`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📢</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{a.name} {a.selfServe && <Badge color="#8B5CF6">Self-Serve</Badge>}</div>
                      <div style={{ fontSize:12, color:"#94A3B8", marginTop:2 }}>{a.client} • {a.size} • {a.position} • ₵{a.price.toLocaleString()}/mo</div>
                      <div style={{ fontSize:11, color:"#64748B", marginTop:2 }}>👁 {a.impressions.toLocaleString()} impressions • 🖱 {a.clicks.toLocaleString()} clicks</div>
                    </div>
                    <Toggle value={a.enabled} onChange={v => { setAds(ads2 => ads2.map(x => x.id===a.id ? {...x, enabled:v} : x)); toast(`Ad "${a.name}" ${v?"activated":"deactivated"}`); }} label="Active" />
                  </div>
                ))}
              </div>
            )}

            {/* USERS MANAGEMENT */}
            {adminTab === "users" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                  <h3 style={{ margin:0, fontWeight:800 }}>Manage Users & Roles</h3>
                  <Btn small style={{ background: P, color:"white", border:"none" }} onClick={() => setNewUserModal(true)}>+ Add User</Btn>
                </div>
                {users.map(u => (
                  <div key={u.id} style={{ background:"white", borderRadius:10, border:"1px solid #E2E8F0", padding:"14px 18px", marginBottom:10, display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:`${P}18`, color: P, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{u.avatar}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{u.name}</div>
                      <div style={{ fontSize:12, color:"#94A3B8", marginTop:2 }}>{u.email} • Joined {u.joined}</div>
                    </div>
                    <select value={u.role} onChange={e => { setUsers(us => us.map(x => x.id===u.id ? {...x, role:e.target.value} : x)); toast(`${u.name} role updated to ${e.target.value}`); }} style={{ padding:"6px 10px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:12, fontWeight:600, cursor:"pointer", color: P }}>
                      {ROLES.map(r => <option key={r} value={r}>{r.replace("_"," ")}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* SHOP MANAGEMENT */}
            {adminTab === "shop" && (
              <div>
                <h3 style={{ marginTop:0, fontWeight:800 }}>E-commerce Settings</h3>
                <Card style={{ padding:24, marginBottom:20 }}>
                  <h4 style={{ marginTop:0, fontWeight:800, fontSize:15 }}>💳 Payment Options</h4>
                  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                    <Toggle value={paymentOptions.onlinePayment} onChange={v => { setPaymentOptions(p => ({...p, onlinePayment:v})); toast(`Online payment ${v?"enabled":"disabled"}`); }} label="Online Payment (MoMo / Card / Bank)" />
                    <Toggle value={paymentOptions.payOnDelivery} onChange={v => { setPaymentOptions(p => ({...p, payOnDelivery:v})); toast(`Pay on Delivery ${v?"enabled":"disabled"}`); }} label="Pay on Delivery" />
                  </div>
                </Card>
                <Card style={{ padding:24 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                    <h4 style={{ margin:0, fontWeight:800, fontSize:15 }}>🛒 Products</h4>
                    <Btn small style={{ background: P, color:"white", border:"none" }} onClick={() => toast("Product editor opening...")}>+ Add Product</Btn>
                  </div>
                  {products.map(p => (
                    <div key={p.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderBottom:"1px solid #F1F5F9" }}>
                      <img src={p.image} alt="" style={{ width:52, height:52, borderRadius:8, objectFit:"cover" }} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700 }}>{p.name}</div>
                        <div style={{ fontSize:11, color:"#94A3B8" }}>{p.type} • ₵{p.price} • Stock: {p.stock}</div>
                      </div>
                      <Toggle value={p.enabled} onChange={v => { setProducts(ps => ps.map(x => x.id===p.id ? {...x, enabled:v} : x)); toast(`"${p.name}" ${v?"visible":"hidden"}`); }} />
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {/* MEDIA MANAGEMENT */}
            {adminTab === "media" && (
              <div>
                <h3 style={{ marginTop:0, fontWeight:800 }}>🎬 Media & Podcast Settings</h3>
                <Card style={{ padding:24, marginBottom:20 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                    <div>
                      <div style={{ fontWeight:800, fontSize:16 }}>🎙 Podcast Module</div>
                      <div style={{ color:"#64748B", fontSize:13, marginTop:2 }}>Enable or disable the entire podcast section</div>
                    </div>
                    <Toggle value={podcastEnabled} onChange={v => { setPodcastEnabled(v); toast(`Podcast module ${v?"enabled":"disabled"}`); }} />
                  </div>
                  {podcastEnabled && podcasts.map(p => (
                    <div key={p.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderTop:"1px solid #F1F5F9" }}>
                      <img src={p.cover} alt="" style={{ width:48, height:48, borderRadius:8, objectFit:"cover" }} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700 }}>{p.title}</div>
                        <div style={{ fontSize:11, color:"#94A3B8" }}>by {p.host} • {p.episodes} episodes</div>
                      </div>
                      <Toggle value={p.enabled} onChange={v => { setPodcasts(ps => ps.map(x => x.id===p.id ? {...x, enabled:v} : x)); toast(`"${p.title}" ${v?"visible":"hidden"}`); }} />
                    </div>
                  ))}
                </Card>
                <Card style={{ padding:24 }}>
                  <h4 style={{ marginTop:0, fontWeight:800 }}>Videos & Audios</h4>
                  {videos.map(v => (
                    <div key={v.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderBottom:"1px solid #F1F5F9" }}>
                      <img src={v.thumbnail} alt="" style={{ width:72, height:48, borderRadius:6, objectFit:"cover" }} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700 }}>{v.title}</div>
                        <div style={{ fontSize:11, color:"#94A3B8" }}>{v.category} • {v.duration}</div>
                      </div>
                      <Toggle value={v.enabled} onChange={vl => { setVideos(vs => vs.map(x => x.id===v.id ? {...x, enabled:vl} : x)); toast(`Video ${vl?"enabled":"disabled"}`); }} />
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {/* SETTINGS */}
            {adminTab === "settings" && (
              <div>
                <h3 style={{ marginTop:0, fontWeight:800 }}>⚙️ Site Settings</h3>
                <Card style={{ padding:24, marginBottom:20 }}>
                  <h4 style={{ marginTop:0, fontWeight:800, fontSize:15 }}>📥 WordPress Migration</h4>
                  <p style={{ color:"#64748B", fontSize:13, marginTop:4, marginBottom:16 }}>Import your existing WordPress content via the REST API before shutting down your WP site. Content will be imported preserving categories, tags, authors, and images.</p>
                  <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                    <input value={wpUrl} onChange={e => setWpUrl(e.target.value)} placeholder="https://yourwordpresssite.com" style={{ flex:1, padding:"10px 14px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:14, outline:"none" }} />
                    <Btn style={{ background: P, color:"white", border:"none" }} onClick={importFromWordPress}>{wpImportStatus === "loading" ? "⏳ Importing..." : "Import Content"}</Btn>
                  </div>
                  {wpImportStatus === "done" && <div style={{ color:"#15803D", fontWeight:600, fontSize:13 }}>✅ WordPress content imported successfully!</div>}
                  <div style={{ fontSize:12, color:"#94A3B8", marginTop:8 }}>Supports: Posts, Pages, Categories, Tags, Featured Images, Authors</div>
                </Card>

                <Card style={{ padding:24, marginBottom:20 }}>
                  <h4 style={{ marginTop:0, fontWeight:800, fontSize:15 }}>📤 Social Media Settings</h4>
                  <p style={{ color:"#64748B", fontSize:13, marginTop:4, marginBottom:16 }}>Enable or disable social sharing platforms site-wide</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
                    {SOCIAL_PLATFORMS.map(sp => (
                      <div key={sp.key} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:`${sp.color}10`, borderRadius:8, border:`1px solid ${sp.color}30` }}>
                        <span style={{ fontSize:18 }}>{sp.icon}</span>
                        <span style={{ flex:1, fontWeight:600, fontSize:13 }}>{sp.label}</span>
                        <Toggle value={true} onChange={() => toast(`${sp.label} sharing toggled`)} />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card style={{ padding:24 }}>
                  <h4 style={{ marginTop:0, fontWeight:800, fontSize:15 }}>🎨 Theme Settings</h4>
                  <p style={{ color:"#64748B", fontSize:13 }}>Customize the color scheme and branding of the entire site.</p>
                  <Btn style={{ background: P, color:"white", border:"none", marginTop:8 }} onClick={() => setThemeEditor(true)}>Open Theme Editor</Btn>
                </Card>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ── THEME EDITOR MODAL ─────────────────────────────────────────────── */}
      {themeEditor && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"white", borderRadius:16, padding:32, width:480, maxHeight:"80vh", overflowY:"auto" }}>
            <h2 style={{ margin:"0 0 24px", fontSize:20, fontWeight:900 }}>🎨 Theme Editor</h2>
            {[
              { key:"primary", label:"Primary Color" },
              { key:"accent", label:"Accent Color" },
              { key:"navBg", label:"Navigation Background" },
              { key:"bg", label:"Page Background" },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
                <label style={{ fontSize:13, fontWeight:600, width:160 }}>{label}</label>
                <input type="color" value={tempTheme[key]} onChange={e => setTempTheme(t => ({...t, [key]: e.target.value}))} style={{ width:48, height:36, borderRadius:8, border:"1px solid #E2E8F0", cursor:"pointer" }} />
                <input value={tempTheme[key]} onChange={e => setTempTheme(t => ({...t, [key]: e.target.value}))} style={{ flex:1, padding:"8px 10px", borderRadius:6, border:"1px solid #E2E8F0", fontSize:12, fontFamily:"monospace" }} />
              </div>
            ))}
            <div style={{ background:`linear-gradient(135deg, ${tempTheme.primary}, ${tempTheme.accent})`, borderRadius:10, padding:"16px 24px", color:"white", marginBottom:20, fontWeight:800, fontSize:15 }}>Theme Preview: Wohonsem</div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn style={{ background: P, color:"white", border:"none", flex:1, textAlign:"center" }} onClick={applyTheme}>Apply Theme</Btn>
              <Btn outline color="#64748B" style={{ textAlign:"center" }} onClick={() => { setTempTheme(DEFAULT_THEME); setThemeEditor(false); }}>Reset</Btn>
              <Btn outline color="#64748B" style={{ textAlign:"center" }} onClick={() => setThemeEditor(false)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── LOGIN MODAL ───────────────────────────────────────────────────── */}
      {loginModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"white", borderRadius:16, padding:32, width:400 }}>
            <h2 style={{ margin:"0 0 8px", fontSize:22, fontWeight:900, color: P }}>Welcome back 👋</h2>
            <p style={{ color:"#64748B", marginTop:0, marginBottom:24, fontSize:14 }}>Login to access premium news, community, and more.</p>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:13, fontWeight:600, display:"block", marginBottom:5 }}>Email</label>
              <input id="login-email" placeholder="admin@newsapp.gh" defaultValue="admin@newsapp.gh" style={{ width:"100%", padding:"10px 14px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:14, boxSizing:"border-box", outline:"none" }} />
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:13, fontWeight:600, display:"block", marginBottom:5 }}>Password</label>
              <input type="password" placeholder="••••••••" defaultValue="password" style={{ width:"100%", padding:"10px 14px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:14, boxSizing:"border-box", outline:"none" }} />
            </div>
            <Btn style={{ width:"100%", background: P, color:"white", border:"none", textAlign:"center", fontSize:15 }} onClick={() => login(document.getElementById("login-email").value, "password")}>Login</Btn>
            <div style={{ marginTop:16, fontSize:12, color:"#94A3B8", textAlign:"center" }}>
              Quick access: admin@newsapp.gh (Super Admin) | ama@newsapp.gh (Admin)
            </div>
            <button onClick={() => setLoginModal(false)} style={{ display:"block", width:"100%", background:"none", border:"none", color:"#64748B", cursor:"pointer", marginTop:12, fontSize:13 }}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── SELF-SERVE AD MODAL ──────────────────────────────────────────── */}
      {selfAdModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"white", borderRadius:16, padding:32, width:460 }}>
            <h2 style={{ margin:"0 0 8px", fontWeight:900, color: P }}>🚀 Create Your Ad Campaign</h2>
            <p style={{ color:"#64748B", marginTop:0, marginBottom:20, fontSize:14 }}>Self-serve advertising — pay online and go live within 24 hours</p>
            {[
              { key:"title", label:"Ad Title / Business Name", placeholder:"e.g. Kofi's Electronics Shop" },
              { key:"budget", label:"Budget (₵ per month)", placeholder:"e.g. 500" },
              { key:"duration", label:"Duration (days)", placeholder:"e.g. 30" },
              { key:"description", label:"Ad Description", placeholder:"What are you promoting?" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom:14 }}>
                <label style={{ fontSize:13, fontWeight:600, display:"block", marginBottom:5 }}>{label}</label>
                <input value={selfAd[key]} onChange={e => setSelfAd(s => ({...s, [key]: e.target.value}))} placeholder={placeholder} style={{ width:"100%", padding:"10px 14px", borderRadius:8, border:"1px solid #E2E8F0", fontSize:14, boxSizing:"border-box", outline:"none" }} />
              </div>
            ))}
            {selfAd.budget && selfAd.duration && (
              <div style={{ background:`${P}10`, borderRadius:8, padding:12, marginBottom:16, fontSize:13, fontWeight:600, color: P }}>
                💳 Total to pay: ₵{(parseFloat(selfAd.budget || 0) * (parseInt(selfAd.duration || 30) / 30)).toFixed(2)} via MoMo or Card
              </div>
            )}
            <div style={{ display:"flex", gap:10 }}>
              <Btn style={{ flex:1, background: P, color:"white", border:"none", textAlign:"center" }} onClick={submitSelfAd}>Submit & Pay</Btn>
              <Btn outline color="#94A3B8" style={{ textAlign:"center" }} onClick={() => setSelfAdModal(false)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes slideIn { from { transform: translateX(30px); opacity:0 } to { transform: translateX(0); opacity:1 } }
      `}</style>
    </div>
  );
}
