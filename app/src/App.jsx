import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Gauge,
  Linkedin,
  Loader2,
  Menu,
  Network,
  Pause,
  Play,
  Send,
  ShieldCheck,
  X,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const publicAsset = (path) => `${import.meta.env.VITE_STATIC_BASE || import.meta.env.BASE_URL}${path}`;
const presentationUrl = "https://drive.google.com/file/d/1qgRQitgBYbfbETDYNzBT8k0ASHTSZtRJ/view?usp=sharing";
const linkedInUrl = "https://www.linkedin.com/company/kreslix";
const linkedInFeedEndpoint = publicAsset("data/linkedin-posts.json");
const languages = {
  en: "EN",
  uk: "UA"
};

const content = {
  en: {
    meta: {
      title: "kreslix | AI platform for internal electrical network design",
      description:
        "kreslix helps design firms automate electrical documentation, drawings, schematics, and load calculations."
    },
    accessibility: {
      home: "kreslix home",
      navigation: "Main navigation",
      mobileNavigation: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Choose language"
    },
    nav: [
      { label: "Who it’s for", href: "#audience" },
      { label: "Why now", href: "#problem" },
      { label: "Results", href: "#benefits" },
      { label: "Demo", href: "#demo" }
    ],
    cta: "Book a call",
    demoVideo: "Demo video",
    close: "Close",
    presentation: { label: "View presentation", href: presentationUrl },
    hero: {
      eyebrow: "AI platform for internal electrical network design",
      title: "Design internal electrical networks faster.",
      lead:
        "kreslix helps design firms automate documentation, plans and schematics, and load calculations—while engineers stay in control of key decisions."
    },
    audience: {
      eyebrow: "Who it’s for",
      title: "For design firms ready to grow without scaling costs at the same pace.",
      items: [
        { title: "Design firm directors", text: "Grow project capacity without expanding the team at the same rate." },
        { title: "Chief engineers and project leads", text: "Keep deadlines, quality, and delivery under control." },
        { title: "Electrical design engineers", text: "Hand routine work to the system and focus on engineering decisions." }
      ]
    },
    problem: {
      eyebrow: "What slows projects down",
      title: "Routine work takes time away from engineering decisions.",
      text:
        "Drawings, checks, calculations, and documentation are still handled manually and across inconsistent formats. Teams move slower, while consultants and installers spend extra time interpreting the project.",
      points: [
        "Plans and schematics are drawn manually",
        "Checks and corrections are repeated across every project",
        "Load calculations live in disconnected files",
        "Inconsistent documentation is harder for consultants and installers to read"
      ]
    },
    benefits: {
      eyebrow: "Measurable impact",
      title: "Results that show up in project economics.",
      items: [
        { metric: "x2", title: "More projects per month", text: "Increase delivery capacity with the same core team." },
        { metric: "3×", title: "Projected client ROI", text: "Automation pays back through time saved and added capacity." },
        { metric: "+$1,500", title: "Potential monthly profit", text: "Unit-economics estimate from additional project capacity." },
        { metric: "100%", title: "Automated validation", text: "Check outputs against configured requirements and standards." }
      ]
    },
    demo: {
      eyebrow: "Product demo",
      title: "See kreslix at work.",
      text: "From project input to generated drawings and engineer review.",
      videoLabel: "kreslix product demo",
      meta: "Full-screen product walkthrough",
      playVideo: "Play demo",
      pauseVideo: "Pause demo"
    },
    linkedin: {
      eyebrow: "LinkedIn",
      title: "Follow kreslix for product updates and pilot results.",
      follow: "Follow kreslix",
      readPost: "Read post",
      loading: "Loading latest posts…",
      fallback: "The latest posts are temporarily unavailable. Follow us directly on LinkedIn."
    },
    final: {
      eyebrow: "Let’s talk",
      title: "Find out what your team can automate first.",
      text: "Leave your contact and we’ll arrange a short call."
    },
    footer: {
      description: "AI automation for internal electrical network design.",
      explore: "Explore",
      connect: "Connect",
      linkedin: "LinkedIn",
      privacy: "Privacy policy",
      backToTop: "Back to top",
      rights: "All rights reserved."
    },
    form: {
      eyebrow: "kreslix",
      title: "Book a call",
      intro: "Leave the essentials—we’ll discuss everything else directly.",
      fields: { name: "Name", company: "Company", contact: "Email or phone" },
      placeholders: { contact: "name@company.com or +1 555 000 0000" },
      submit: "Book a call",
      sending: "Sending",
      success: "Thanks. We received your contact and will get back to you shortly.",
      error: "The request could not be sent. Please try again later or contact us through LinkedIn.",
      required: "Please fill in all three fields."
    }
  },
  uk: {
    meta: {
      title: "kreslix | AI-платформа для проєктування внутрішніх електромереж",
      description:
        "kreslix допомагає проєктним компаніям автоматизувати документацію, креслення планів і схем та розрахунок навантажень."
    },
    accessibility: {
      home: "На головну kreslix",
      navigation: "Головна навігація",
      mobileNavigation: "Мобільна навігація",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
      language: "Вибрати мову"
    },
    nav: [
      { label: "Для кого", href: "#audience" },
      { label: "Чому зараз", href: "#problem" },
      { label: "Результати", href: "#benefits" },
      { label: "Демо", href: "#demo" }
    ],
    cta: "Запланувати дзвінок",
    demoVideo: "Переглянути демо",
    close: "Закрити",
    presentation: { label: "Відкрити презентацію", href: presentationUrl },
    hero: {
      eyebrow: "AI-платформа для проєктування внутрішніх електромереж",
      title: "Проєктуйте внутрішні електромережі швидше.",
      lead:
        "kreslix допомагає проєктним компаніям автоматизувати оформлення документації, креслення планів і схем та розрахунок навантажень — із контролем інженера на ключових етапах."
    },
    audience: {
      eyebrow: "Для кого",
      title: "Для проєктних компаній, які хочуть зростати без пропорційного збільшення витрат.",
      items: [
        { title: "Директори проєктних компаній", text: "Збільшуйте проєктну спроможність без такого самого зростання команди." },
        { title: "ГІПи та керівники проєктів", text: "Тримайте строки, якість і виконання проєктів під контролем." },
        { title: "Інженери-проєктувальники", text: "Передавайте рутину системі та зосереджуйтеся на інженерних рішеннях." }
      ]
    },
    problem: {
      eyebrow: "Що гальмує роботу",
      title: "Рутина забирає час, який має працювати на інженерні рішення.",
      text:
        "Креслення, перевірки, розрахунки й оформлення документації досі виконуються вручну та в різних форматах. Це сповільнює команду й ускладнює передачу проєкту суміжникам і монтажникам.",
      points: [
        "Плани та схеми креслять вручну",
        "Перевірки й виправлення повторюються в кожному проєкті",
        "Розрахунки навантажень зберігаються в розрізнених файлах",
        "Неуніфікована документація ускладнює роботу суміжників і монтажників"
      ]
    },
    benefits: {
      eyebrow: "Вимірюваний результат",
      title: "Результат, який видно в економіці проєкту.",
      items: [
        { metric: "x2", title: "Більше проєктів на місяць", text: "Збільшуйте обсяг робіт із тією самою основною командою." },
        { metric: "3×", title: "Прогнозований ROI клієнта", text: "Автоматизація окупається завдяки зекономленому часу й додатковій спроможності." },
        { metric: "+$1,500", title: "Потенційний прибуток на місяць", text: "Оцінка unit economics від додаткової проєктної спроможності." },
        { metric: "100%", title: "Автоматизована валідація", text: "Перевіряйте результати за заданими вимогами та нормами." }
      ]
    },
    demo: {
      eyebrow: "Демо продукту",
      title: "Подивіться, як працює kreslix.",
      text: "Від вхідних даних до згенерованих креслень та інженерної перевірки.",
      videoLabel: "Демонстрація продукту kreslix",
      meta: "Повноекранна демонстрація продукту",
      playVideo: "Запустити демо",
      pauseVideo: "Призупинити демо"
    },
    linkedin: {
      eyebrow: "LinkedIn",
      title: "Стежте за kreslix — публікуємо оновлення продукту та результати пілотів.",
      follow: "Стежити за kreslix",
      readPost: "Читати допис",
      loading: "Завантажуємо останні дописи…",
      fallback: "Останні дописи тимчасово недоступні. Стежте за нами безпосередньо в LinkedIn."
    },
    final: {
      eyebrow: "Поговорімо",
      title: "Визначимо, що ваша команда може автоматизувати насамперед.",
      text: "Залиште контакт — домовимося про короткий дзвінок."
    },
    footer: {
      description: "AI-автоматизація проєктування внутрішніх електромереж.",
      explore: "Навігація",
      connect: "Зв’язок",
      linkedin: "LinkedIn",
      privacy: "Політика конфіденційності",
      backToTop: "На початок",
      rights: "Усі права захищені."
    },
    form: {
      eyebrow: "kreslix",
      title: "Запланувати дзвінок",
      intro: "Залиште головне — решту обговоримо безпосередньо.",
      fields: { name: "Ім’я", company: "Компанія", contact: "Email або телефон" },
      placeholders: { contact: "name@company.com або +380 00 000 00 00" },
      submit: "Запланувати дзвінок",
      sending: "Надсилаємо",
      success: "Дякуємо. Ми отримали ваш контакт і незабаром зв’яжемося.",
      error: "Не вдалося надіслати заявку. Спробуйте ще раз пізніше або зв’яжіться з нами через LinkedIn.",
      required: "Заповніть усі три поля."
    }
  }
};

const benefitIcons = [Zap, ShieldCheck, Gauge, ClipboardCheck];
const audienceIcons = [Building2, Network, CheckCircle2];

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("kreslix-language") || "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const t = content[language];

  useEffect(() => {
    localStorage.setItem("kreslix-language", language);
    document.documentElement.lang = language === "uk" ? "uk" : "en";
    document.title = t.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", t.meta.description);
    }
  }, [language, t.meta.description, t.meta.title]);

  useEffect(() => {
    document.body.style.overflow = demoOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [demoOpen]);

  const nav = useMemo(() => t.nav, [t]);

  return (
    <div className="site-shell">
      <SiteBackground />
      <Header
        nav={nav}
        language={language}
        setLanguage={setLanguage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openDemo={() => setDemoOpen(true)}
        t={t}
      />
      <main>
        <Hero t={t} openDemo={() => setDemoOpen(true)} reducedMotion={reducedMotion} />
        <AudienceSection t={t} />
        <ProblemSection t={t} />
        <BenefitsSection t={t} />
        <DemoSection t={t} openDemo={() => setDemoOpen(true)} />
        <LinkedInSection t={t} language={language} />
        <FinalCTA t={t} openDemo={() => setDemoOpen(true)} />
      </main>
      <Footer nav={nav} t={t} openDemo={() => setDemoOpen(true)} />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} t={t} language={language} />
    </div>
  );
}

function Header({ nav, language, setLanguage, menuOpen, setMenuOpen, openDemo, t }) {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const goToAnchor = () => setMenuOpen(false);
  const openDemoFromMenu = () => {
    setMenuOpen(false);
    openDemo();
  };

  useEffect(() => {
    let frameId = 0;

    const syncHeader = () => {
      frameId = 0;
      const nextScrolled = scrolledRef.current ? window.scrollY > 24 : window.scrollY > 72;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const updateHeader = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(syncHeader);
      }
    };

    syncHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label={t.accessibility.home}>
        <img src={publicAsset("brand/logo.svg")} alt="kreslix" />
      </a>

      <nav className="desktop-nav" aria-label={t.accessibility.navigation}>
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <div className={`language-switch is-${language}`} role="group" aria-label={t.accessibility.language}>
          <span className="language-switch-indicator" aria-hidden="true" />
          {Object.entries(languages).map(([code, label]) => (
            <button
              className={language === code ? "is-active" : ""}
              type="button"
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
              key={code}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="nav-cta" type="button" onClick={openDemo}>
          {t.cta}
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            aria-label={t.accessibility.mobileNavigation}
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={goToAnchor}>
                {item.label}
              </a>
            ))}
            <button type="button" onClick={openDemoFromMenu}>
              {t.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ t, openDemo, reducedMotion }) {
  return (
    <section id="top" className="hero-section">
      <HeroBackground reducedMotion={reducedMotion} />
      <Reveal className="hero-copy" disabled>
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p className="hero-lead">{t.hero.lead}</p>
        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={openDemo}>
            {t.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <a className="secondary-button" href="#demo">
            <Play size={18} aria-hidden="true" />
            {t.demoVideo}
          </a>
          <a className="secondary-button" href={t.presentation.href} target="_blank" rel="noreferrer">
            <ExternalLink size={18} aria-hidden="true" />
            {t.presentation.label}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function SiteBackground() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.32
  });
  const networkY = useTransform(smoothProgress, [0, 1], ["-3%", "9%"]);
  const networkX = useTransform(smoothProgress, [0, 1], ["-1.5%", "2.5%"]);
  const networkRotate = useTransform(smoothProgress, [0, 1], [-0.8, 1.2]);
  const auroraPrimaryY = useTransform(smoothProgress, [0, 1], ["-12%", "34%"]);
  const auroraPrimaryX = useTransform(smoothProgress, [0, 1], ["-7%", "9%"]);
  const auroraSecondaryY = useTransform(smoothProgress, [0, 1], ["20%", "-24%"]);
  const auroraSecondaryX = useTransform(smoothProgress, [0, 1], ["8%", "-5%"]);
  const sweepX = useTransform(smoothProgress, [0, 1], ["-16%", "320%"]);
  const orbitRotate = useTransform(smoothProgress, [0, 1], [-12, 20]);

  const motionStyle = (style) => (reducedMotion ? undefined : style);

  return (
    <div className="site-background" aria-hidden="true">
      <motion.div
        className="site-background-aurora site-background-aurora-primary"
        style={motionStyle({ x: auroraPrimaryX, y: auroraPrimaryY })}
      />
      <motion.div
        className="site-background-aurora site-background-aurora-secondary"
        style={motionStyle({ x: auroraSecondaryX, y: auroraSecondaryY })}
      />
      <motion.div className="site-background-orbit" style={motionStyle({ rotate: orbitRotate })} />
      <motion.div className="site-background-sweep" style={motionStyle({ x: sweepX })} />
      <motion.svg
        className="site-background-network"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        style={motionStyle({ x: networkX, y: networkY, rotate: networkRotate })}
      >
        <path className="ambient-route ambient-route-a" d="M-80 760H190V640H420V718H690V520H914V610H1200V420H1680" />
        <path className="ambient-route ambient-route-b" d="M-40 214H250V304H520V168H810V318H1090V206H1640" />
        <path className="ambient-route ambient-route-c" d="M1260 -40V136H1142V340H1308V548H1180V1040" />
        <path className="ambient-route ambient-route-d" d="M322 -30V148H184V416H338V582H188V1030" />
        <g className="ambient-panels">
          <rect x="382" y="598" width="104" height="82" />
          <rect x="1054" y="258" width="116" height="92" />
          <rect x="1228" y="548" width="94" height="124" />
        </g>
        <g className="ambient-nodes">
          <circle cx="190" cy="640" r="6" />
          <circle cx="420" cy="718" r="6" />
          <circle cx="690" cy="520" r="6" />
          <circle cx="914" cy="610" r="6" />
          <circle cx="1200" cy="420" r="6" />
          <circle cx="250" cy="304" r="5" />
          <circle cx="520" cy="168" r="5" />
          <circle cx="810" cy="318" r="5" />
          <circle cx="1090" cy="206" r="5" />
        </g>
      </motion.svg>
    </div>
  );
}

function AudienceSection({ t }) {
  return (
    <section id="audience" className="section section-muted">
      <div className="section-inner">
        <SectionHeader eyebrow={t.audience.eyebrow} title={t.audience.title} />
        <div className="card-grid three">
          {t.audience.items.map((item, index) => {
            const Icon = audienceIcons[index % audienceIcons.length];
            return (
              <Reveal className="info-card" delay={index * 0.05} key={item.title}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <Icon className="card-icon" size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProblemSection({ t }) {
  return (
    <section id="problem" className="section problem-section">
      <div className="section-inner problem-layout">
        <SectionHeader eyebrow={t.problem.eyebrow} title={t.problem.title} text={t.problem.text} />
        <div className="problem-list">
          {t.problem.points.map((point, index) => (
            <Reveal className="problem-item" delay={index * 0.04} key={point}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{point}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection({ t }) {
  return (
    <section id="benefits" className="section section-muted benefits-section">
      <div className="section-inner">
        <SectionHeader eyebrow={t.benefits.eyebrow} title={t.benefits.title} />
        <div className="card-grid four benefits-grid">
          {t.benefits.items.map((item, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            return (
              <Reveal className="info-card benefit-card" delay={index * 0.05} key={item.title}>
                <div className="benefit-card-top">
                  <strong className="benefit-metric">{item.metric}</strong>
                  <span className="benefit-icon" aria-hidden="true">
                    <Icon size={19} />
                  </span>
                </div>
                <div className="benefit-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DemoSection({ t, openDemo }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const toggleVideo = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="demo" className="demo-section" ref={sectionRef}>
      <div className="section-inner demo-intro">
        <Reveal className="demo-copy">
          <p className="eyebrow">{t.demo.eyebrow}</p>
          <h2>{t.demo.title}</h2>
          <p>{t.demo.text}</p>
        </Reveal>
        <Reveal delay={0.06} className="demo-side">
          <span>{t.demo.videoLabel}</span>
          <strong>{t.demo.meta}</strong>
          <div className="demo-actions">
            <button className="primary-button" type="button" onClick={openDemo}>
              {t.cta}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a className="secondary-button" href={t.presentation.href} target="_blank" rel="noreferrer">
              <ExternalLink size={18} aria-hidden="true" />
              {t.presentation.label}
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="demo-stage">
        <video
          ref={videoRef}
          className="demo-stage-video"
          loop
          playsInline
          preload="metadata"
          poster={publicAsset("media/kreslix-demo-poster-v2.jpg")}
          aria-label={t.demo.videoLabel}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={publicAsset("media/kreslix-demo-hq-v2.mp4")} type="video/mp4" />
        </video>
        <button
          className={`demo-play-toggle${isPlaying ? " is-playing" : ""}`}
          type="button"
          onClick={toggleVideo}
          aria-label={isPlaying ? t.demo.pauseVideo : t.demo.playVideo}
          aria-pressed={isPlaying}
        >
          <span className="demo-play-icon" aria-hidden="true">
            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
          </span>
          <span>{isPlaying ? t.demo.pauseVideo : t.demo.playVideo}</span>
        </button>
      </Reveal>
    </section>
  );
}

function LinkedInSection({ t, language }) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    const loadPosts = async () => {
      try {
        const cacheWindow = Math.floor(Date.now() / (15 * 60 * 1000));
        const response = await fetch(`${linkedInFeedEndpoint}?v=${cacheWindow}`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("LinkedIn feed is unavailable");
        }

        const data = await response.json();
        const nextPosts = Array.isArray(data.posts) ? data.posts.slice(0, 3) : [];
        setPosts(nextPosts);
        setStatus(nextPosts.length ? "ready" : "empty");
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus("error");
        }
      }
    };

    loadPosts();
    const refreshTimer = window.setInterval(loadPosts, 15 * 60 * 1000);

    return () => {
      controller.abort();
      window.clearInterval(refreshTimer);
    };
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(language === "uk" ? "uk-UA" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  return (
    <section id="linkedin" className="section linkedin-section">
      <div className="section-inner">
        <div className="linkedin-heading">
          <SectionHeader eyebrow={t.linkedin.eyebrow} title={t.linkedin.title} />
          <a className="linkedin-follow" href={linkedInUrl} target="_blank" rel="noreferrer">
            <Linkedin size={18} aria-hidden="true" />
            {t.linkedin.follow}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        {status === "loading" && (
          <div className="linkedin-loading" role="status">
            <Loader2 className="spin" size={18} aria-hidden="true" />
            {t.linkedin.loading}
          </div>
        )}

        {status === "ready" && (
          <div className="linkedin-grid">
            {posts.map((post, index) => {
              const dateLabel = formatDate(post.publishedAt);

              return (
                <Reveal className="linkedin-card-wrap" delay={index * 0.05} key={post.id}>
                  <article className="linkedin-card">
                    <div className="linkedin-card-top">
                      <span className="linkedin-mark">
                        <Linkedin size={18} aria-hidden="true" />
                      </span>
                      {dateLabel && <time dateTime={new Date(post.publishedAt).toISOString()}>{dateLabel}</time>}
                    </div>
                    <p>{post.text}</p>
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {t.linkedin.readPost}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        {(status === "error" || status === "empty") && (
          <div className="linkedin-fallback">
            <Linkedin size={24} aria-hidden="true" />
            <p>{t.linkedin.fallback}</p>
            <a href={linkedInUrl} target="_blank" rel="noreferrer">
              {t.linkedin.follow}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function FinalCTA({ t, openDemo }) {
  return (
    <section id="book-demo" className="section final-section">
      <div className="section-inner final-layout">
        <Reveal className="final-copy">
          <p className="eyebrow">{t.final.eyebrow}</p>
          <h2>{t.final.title}</h2>
          <p>{t.final.text}</p>
          <div className="final-actions">
            <button className="primary-button" type="button" onClick={openDemo}>
              {t.cta}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a className="secondary-button" href={t.presentation.href} target="_blank" rel="noreferrer">
              <ExternalLink size={18} aria-hidden="true" />
              {t.presentation.label}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="embedded-form">
          <DemoForm t={t} language={document.documentElement.lang === "uk" ? "uk" : "en"} compact />
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <Reveal className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

function Footer({ nav, t, openDemo }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="footer-main">
        <div className="footer-brand-block">
          <a className="footer-brand" href="#top">
            <img src={publicAsset("brand/logo.svg")} alt="kreslix" />
          </a>
          <p>{t.footer.description}</p>
        </div>

        <nav className="footer-column" aria-label={t.footer.explore}>
          <strong>{t.footer.explore}</strong>
          {nav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#linkedin">{t.linkedin.eyebrow}</a>
        </nav>

        <div className="footer-column footer-connect">
          <strong>{t.footer.connect}</strong>
          <a className="footer-linkedin" href={linkedInUrl} target="_blank" rel="noreferrer">
            <span>
              <Linkedin size={18} aria-hidden="true" />
              {t.footer.linkedin}
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <button type="button" onClick={openDemo}>
            {t.cta}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} kreslix. {t.footer.rights}</p>
        <div>
          <a href={publicAsset("privacy.html")}>{t.footer.privacy}</a>
          <a href="#top">
            {t.footer.backToTop}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function DemoModal({ isOpen, onClose, t, language }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="demo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button className="modal-close" type="button" onClick={onClose} aria-label={t.close}>
              <X size={18} aria-hidden="true" />
            </button>
            <DemoForm t={t} language={language} titleId="demo-title" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DemoForm({ t, language, titleId, compact = false }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: ""
  });

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!formData.name || !formData.company || !formData.contact) {
      setStatus("error");
      setMessage(t.form.required);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language, source: window.location.pathname })
      });

      if (!response.ok) {
        throw new Error("Demo request failed");
      }

      setStatus("success");
      setMessage(t.form.success);
      setFormData({
        name: "",
        company: "",
        contact: ""
      });
    } catch (error) {
      setStatus("error");
      setMessage(t.form.error);
    }
  };

  return (
    <form className={`demo-form ${compact ? "compact-form" : ""}`} onSubmit={submitForm}>
      <div className="form-head">
        <p className="eyebrow">{t.form.eyebrow}</p>
        <h2 id={titleId}>{t.form.title}</h2>
        <p>{t.form.intro}</p>
      </div>

      <div className="form-grid">
        <Input label={t.form.fields.name} name="name" value={formData.name} onChange={updateField} required />
        <Input label={t.form.fields.company} name="company" value={formData.company} onChange={updateField} required />
        <Input
          label={t.form.fields.contact}
          name="contact"
          value={formData.contact}
          onChange={updateField}
          placeholder={t.form.placeholders.contact}
          required
        />
      </div>

      {message && <p className={`form-message ${status}`}>{message}</p>}

      <button className="primary-button form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="spin" size={18} aria-hidden="true" />
            {t.form.sending}
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            {t.form.submit}
          </>
        )}
      </button>
    </form>
  );
}

function Input({ label, name, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}

function Reveal({ children, className = "", delay = 0, disabled = false }) {
  const reducedMotion = useReducedMotion();

  if (disabled || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.56,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

function HeroBackground({ reducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest(".hero-section");
    const context = canvas?.getContext("2d");

    if (!canvas || !hero || !context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let nodes = [];
    let animationFrame = 0;
    let isVisible = true;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false };
    const linkDistance = 130;
    const pointerRadius = 190;

    const buildNodes = () => {
      const count = Math.floor(Math.min(Math.max((width * height) / 13000, 40), 120));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.7
      }));
    };

    const draw = (updateNodes = true) => {
      context.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        if (!updateNodes) return;

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < pointerRadius && distance > 0.01) {
            const push = (1 - distance / pointerRadius) * 0.9;
            node.x += (dx / distance) * push;
            node.y += (dy / distance) * push;
          }
        }
      });

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < linkDistance) {
            context.strokeStyle = `rgba(184,247,255,${((1 - distance / linkDistance) * 0.5).toFixed(3)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      if (pointer.active) {
        nodes.forEach((node) => {
          const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);

          if (distance < pointerRadius) {
            context.strokeStyle = `rgba(204,255,0,${((1 - distance / pointerRadius) * 0.5).toFixed(3)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(pointer.x, pointer.y);
            context.stroke();
          }
        });
      }

      nodes.forEach((node) => {
        const isNearPointer =
          pointer.active && Math.hypot(node.x - pointer.x, node.y - pointer.y) < pointerRadius;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = isNearPointer ? "rgba(204,255,0,0.9)" : "rgba(184,247,255,0.55)";
        context.fill();
      });
    };

    const frame = () => {
      draw(true);
      animationFrame = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const start = () => {
      if (!reducedMotion && isVisible && !animationFrame) {
        animationFrame = window.requestAnimationFrame(frame);
      }
    };

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildNodes();
      draw(false);
    };

    const handlePointerMove = (event) => {
      if (reducedMotion || event.pointerType === "touch") return;
      const rect = hero.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });

    resize();
    resizeObserver.observe(hero);
    visibilityObserver.observe(hero);
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", handlePointerLeave);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion]);

  return (
    <div className="hero-background" aria-hidden="true">
      <canvas className="hero-nexus" ref={canvasRef} />
      <div className="hero-nexus-glow" />
    </div>
  );
}

export default App;
