import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
const linkedInFeedEndpoint =
  import.meta.env.VITE_LINKEDIN_FEED_ENDPOINT ||
  (import.meta.env.PROD && import.meta.env.BASE_URL !== "/"
    ? publicAsset("data/linkedin-posts.json")
    : "/api/linkedin-posts");

const languages = {
  en: "EN",
  uk: "UA"
};

const content = {
  en: {
    meta: {
      title: "Kreslix | AI platform for internal electrical network design",
      description:
        "Kreslix helps engineering teams automate internal electrical network design. Book a demo to test the workflow with your team."
    },
    accessibility: {
      home: "Kreslix home",
      navigation: "Main navigation",
      mobileNavigation: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu"
    },
    nav: [
      { label: "Product", href: "#product" },
      { label: "For whom", href: "#audience" },
      { label: "Problem", href: "#problem" },
      { label: "Benefits", href: "#benefits" },
      { label: "Demo", href: "#demo" }
    ],
    cta: "Book a demo",
    demoVideo: "Demo video",
    close: "Close",
    presentation: {
      label: "View presentation",
      href: presentationUrl
    },
    hero: {
      eyebrow: "AI platform for internal electrical network design",
      title: "Design internal electrical networks faster.",
      lead:
        "Kreslix helps engineering teams automate internal electrical network design, reduce repetitive routing work, and keep project decisions under engineer control.",
      proof: "Built for real electrical design workflows, pilot testing, and long-term client cooperation."
    },
    product: {
      eyebrow: "Short product description",
      title: "Kreslix is an AI platform for internal electrical network design.",
      text:
        "It is designed to support engineering companies in the most repetitive parts of electrical network design: reading project context, generating routing logic, reviewing outputs, and preparing a workflow that can be repeated across future projects.",
      cards: [
        "AI-assisted routing for internal electrical networks",
        "Engineer-controlled review before project decisions move forward",
        "Workflow built around real pilot projects, not abstract demos"
      ]
    },
    audience: {
      eyebrow: "For whom",
      title: "For engineering teams that need more project capacity.",
      lead:
        "Kreslix is built for companies that already deliver electrical design projects and want to scale output without losing control over quality.",
      items: [
        {
          title: "Engineering company directors",
          text: "Need to increase delivery capacity, take on more projects, and understand whether AI can create measurable business value."
        },
        {
          title: "Project leads",
          text: "Need predictable workflows, fewer repeated corrections, and clearer visibility into where design time is lost."
        },
        {
          title: "Electrical design engineers",
          text: "Need to reduce repetitive routing work while keeping professional control over the final project decisions."
        }
      ]
    },
    problem: {
      eyebrow: "Problem",
      title: "Manual routing limits how many projects a team can deliver.",
      text:
        "Internal electrical network design still depends on repetitive CAD/BIM actions, manual routing, repeated checking, and project logic that often stays inside one engineer's head. This makes it hard to scale project volume without increasing team size or risking quality.",
      points: [
        "Too many repeated routing and redrawing actions",
        "Hard to scale delivery without adding more engineers",
        "Quality control depends on manual review at every stage",
        "Project knowledge is difficult to reuse across similar buildings"
      ]
    },
    benefits: {
      eyebrow: "Key benefits",
      title: "A faster workflow with engineer control built in.",
      items: [
        {
          title: "Reduce repetitive work",
          text: "Move routine routing actions from manual drafting into an AI-assisted workflow."
        },
        {
          title: "Keep engineers in control",
          text: "Engineers review, correct, and approve critical outputs before decisions move forward."
        },
        {
          title: "Validate through a pilot",
          text: "Start with one real workflow and measure whether automation makes business sense."
        },
        {
          title: "Build repeatable delivery",
          text: "Turn project logic, corrections, and QA/QC signals into a process that can improve over time."
        }
      ]
    },
    demo: {
      eyebrow: "Product demonstration",
      title: "See how Kreslix supports electrical network design.",
      text:
        "The demo shows the product workflow in context: project input, routing generation, engineer review, and the path toward a practical pilot.",
      videoLabel: "Kreslix product demo",
      meta: "Full-screen product walkthrough",
      detail: "See Kreslix in action / pilot workflow preview",
      playVideo: "Play demo",
      pauseVideo: "Pause demo"
    },
    linkedin: {
      eyebrow: "Latest from LinkedIn",
      title: "Product thinking, pilot insights, and Kreslix updates.",
      text: "Follow how we are building a more efficient workflow for electrical design teams.",
      readPost: "Read on LinkedIn",
      follow: "Follow Kreslix",
      loading: "Loading the latest posts…",
      fallback: "The live feed is temporarily unavailable. Visit our LinkedIn page for the latest updates."
    },
    final: {
      eyebrow: "Call to action",
      title: "Book a demo and check if Kreslix fits your workflow.",
      text:
        "Tell us how your team designs internal electrical networks today. We will review your workflow and suggest a practical pilot path."
    },
    footer: {
      label: "Kreslix / electrical design intelligence",
      title: "Build more. Route less.",
      description: "AI-assisted workflows for internal electrical network design.",
      explore: "Explore",
      connect: "Connect",
      linkedin: "LinkedIn",
      privacy: "Privacy policy",
      backToTop: "Back to top",
      rights: "All rights reserved."
    },
    form: {
      eyebrow: "Kreslix demo",
      title: "Book a demo",
      intro: "Share a few details about your current design workflow. We will review it before contacting you.",
      fields: {
        name: "Name",
        company: "Company",
        role: "Role",
        email: "Email",
        contact: "Telegram / phone",
        location: "Country / city",
        projects: "Projects per month",
        tools: "Current tools",
        bottleneck: "Main bottleneck",
        pilot: "What would make a pilot useful?"
      },
      placeholders: {
        projects: "Example: 2-3 residential projects",
        tools: "AutoCAD, Revit, BIM workflow...",
        bottleneck: "Manual routing, QA/QC, redrawing, documentation...",
        pilot: "What result would make the pilot worth your team's time?"
      },
      submit: "Request demo",
      sending: "Sending",
      success: "Thanks. We received your request and will get back with a demo proposal.",
      error: "The request could not be sent. Please try again later or contact us through LinkedIn.",
      required: "Please fill in the required fields."
    }
  },
  uk: {
    meta: {
      title: "Kreslix | AI-платформа для проєктування внутрішніх електромереж",
      description:
        "Kreslix допомагає інжиніринговим командам автоматизувати проєктування внутрішніх електромереж. Замовте демо для перевірки на реальному процесі."
    },
    accessibility: {
      home: "На головну Kreslix",
      navigation: "Головна навігація",
      mobileNavigation: "Мобільна навігація",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню"
    },
    nav: [
      { label: "Продукт", href: "#product" },
      { label: "Для кого", href: "#audience" },
      { label: "Проблема", href: "#problem" },
      { label: "Переваги", href: "#benefits" },
      { label: "Демо", href: "#demo" }
    ],
    cta: "Замовити демо",
    demoVideo: "Переглянути демо",
    close: "Закрити",
    presentation: {
      label: "Відкрити презентацію",
      href: presentationUrl
    },
    hero: {
      eyebrow: "AI-платформа для проєктування внутрішніх електромереж",
      title: "Проєктуйте внутрішні електромережі швидше.",
      lead:
        "Kreslix допомагає інжиніринговим командам автоматизувати проєктування внутрішніх електромереж, зменшити повторюване трасування й залишити ключові рішення під контролем інженера.",
      proof: "Створено для реальних процесів електропроєктування, пілотного тестування та довгострокової співпраці."
    },
    product: {
      eyebrow: "Короткий опис продукту",
      title: "Kreslix — AI-платформа для проєктування внутрішніх електромереж.",
      text:
        "Платформа допомагає інжиніринговим компаніям автоматизувати найбільш повторювані етапи електропроєктування: аналіз проєктного контексту, побудову логіки трасування, перевірку результатів і підготовку процесу, який можна повторювати в наступних проєктах.",
      cards: [
        "Трасування внутрішніх електромереж за допомогою AI",
        "Інженерна перевірка перед ухваленням критичних рішень",
        "Робочий процес на основі реального пілотного проєкту, а не абстрактної демонстрації"
      ]
    },
    audience: {
      eyebrow: "Для кого рішення",
      title: "Для інжинірингових команд, яким потрібно виконувати більше проєктів.",
      lead:
        "Kreslix створено для компаній, які вже проєктують електромережі й хочуть збільшити обсяг робіт без втрати контролю над якістю.",
      items: [
        {
          title: "Директори інжинірингових компаній",
          text: "Прагнуть збільшити продуктивність команди, брати більше проєктів і зрозуміти, чи може AI створити вимірювану цінність для бізнесу."
        },
        {
          title: "Керівники проєктів",
          text: "Потребують передбачуваних процесів, меншої кількості повторних правок і чіткого розуміння, де команда втрачає час."
        },
        {
          title: "Інженери-електрики",
          text: "Потрібно зменшити повторюване трасування, але залишити професійний контроль над фінальними рішеннями."
        }
      ]
    },
    problem: {
      eyebrow: "Яку проблему вирішує",
      title: "Ручне трасування обмежує кількість проєктів, які може виконати команда.",
      text:
        "Проєктування внутрішніх електромереж досі тримається на повторюваних CAD/BIM діях, ручному трасуванні, перевірках і проєктній логіці, яка часто живе в голові окремого інженера. Через це складно масштабувати обсяг проєктів без розширення команди або ризику для якості.",
      points: [
        "Забагато повторюваного трасування й перекреслення",
        "Складно збільшувати обсяг робіт без найму нових інженерів",
        "Контроль якості залежить від ручної перевірки на кожному етапі",
        "Проєктні знання важко повторно використати в схожих будівлях"
      ]
    },
    benefits: {
      eyebrow: "Ключові переваги",
      title: "Швидший процес із вбудованим інженерним контролем.",
      items: [
        {
          title: "Менше повторюваної роботи",
          text: "Перенесіть рутинне трасування з ручного креслення в процес із підтримкою AI."
        },
        {
          title: "Інженер зберігає контроль",
          text: "Команда перевіряє, коригує й погоджує критичні результати перед рухом далі."
        },
        {
          title: "Перевірка на пілотному проєкті",
          text: "Почніть з одного реального процесу й виміряйте, чи дає автоматизація практичну цінність для бізнесу."
        },
        {
          title: "Відтворюваний процес",
          text: "Перетворюйте проєктну логіку, правки та результати перевірок на процес, який удосконалюється з часом."
        }
      ]
    },
    demo: {
      eyebrow: "Демонстрація продукту",
      title: "Подивіться, як Kreslix підтримує проєктування електромереж.",
      text:
        "Демо показує весь процес у контексті: вхідні дані проєкту, побудову трасування, інженерну перевірку та перехід до практичного пілоту.",
      videoLabel: "Демонстрація продукту Kreslix",
      meta: "Повноекранна демонстрація продукту",
      detail: "Kreslix у дії — огляд пілотного процесу",
      playVideo: "Запустити демо",
      pauseVideo: "Призупинити демо"
    },
    linkedin: {
      eyebrow: "Останнє з LinkedIn",
      title: "Продуктові рішення, інсайти з пілотів та новини Kreslix.",
      text: "Стежте за тим, як ми створюємо ефективніші процеси для команд електропроєктування.",
      readPost: "Читати в LinkedIn",
      follow: "Стежити за Kreslix",
      loading: "Завантажуємо останні пости…",
      fallback: "Стрічка тимчасово недоступна. Перейдіть на нашу сторінку в LinkedIn, щоб переглянути останні новини."
    },
    final: {
      eyebrow: "Заклик до дії",
      title: "Замовте демо та перевірте, чи підходить Kreslix вашим робочим процесам.",
      text:
        "Розкажіть, як ваша команда зараз проєктує внутрішні електромережі. Ми проаналізуємо ваш процес і запропонуємо практичний шлях до пілотного проєкту."
    },
    footer: {
      label: "Kreslix / інтелектуальне електропроєктування",
      title: "Проєктуйте більше. Трасуйте менше.",
      description: "Проєктування внутрішніх електромереж із підтримкою AI.",
      explore: "Навігація",
      connect: "Зв’язок",
      linkedin: "LinkedIn",
      privacy: "Політика конфіденційності",
      backToTop: "На початок",
      rights: "Усі права захищені."
    },
    form: {
      eyebrow: "Демо Kreslix",
      title: "Замовити демо",
      intro: "Розкажіть кілька деталей про ваш поточний робочий процес. Ми ознайомимося з ними перед тим, як зв’язатися з вами.",
      fields: {
        name: "Ім’я",
        company: "Компанія",
        role: "Роль",
        email: "Email",
        contact: "Telegram / телефон",
        location: "Країна / місто",
        projects: "Проєктів на місяць",
        tools: "Поточні інструменти",
        bottleneck: "Головне вузьке місце",
        pilot: "Що зробить пілот корисним?"
      },
      placeholders: {
        projects: "Наприклад: 2-3 житлові проєкти",
        tools: "AutoCAD, Revit, BIM-процеси...",
        bottleneck: "Ручне трасування, QA/QC, перекреслення, документація...",
        pilot: "Який результат зробить пілот вартим часу команди?"
      },
      submit: "Надіслати запит",
      sending: "Надсилаємо",
      success: "Дякуємо. Ми отримали заявку й незабаром зв’яжемося з вами щодо демонстрації.",
      error: "Не вдалося надіслати заявку. Спробуйте ще раз пізніше або зв’яжіться з нами через LinkedIn.",
      required: "Заповніть усі обов’язкові поля."
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
        <ProductIntro t={t} />
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
        <img src={publicAsset("brand/logo.svg")} alt="Kreslix" />
      </a>

      <nav className="desktop-nav" aria-label={t.accessibility.navigation}>
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button className="language-toggle" type="button" onClick={() => setLanguage(language === "en" ? "uk" : "en")}>
          <span>{languages[language]}</span>
        </button>
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
      <Reveal className="hero-copy">
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
        <p className="hero-proof">{t.hero.proof}</p>
      </Reveal>
    </section>
  );
}

function SiteBackground() {
  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-background-sweep" />
      <svg className="site-background-network" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
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
      </svg>
    </div>
  );
}

function ProductIntro({ t }) {
  return (
    <section id="product" className="section product-section">
      <div className="section-inner product-layout">
        <SectionHeader eyebrow={t.product.eyebrow} title={t.product.title} text={t.product.text} />
        <div className="product-card-stack">
          {t.product.cards.map((item, index) => (
            <Reveal className="product-line" delay={index * 0.04} key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection({ t }) {
  return (
    <section id="audience" className="section section-muted">
      <div className="section-inner">
        <SectionHeader eyebrow={t.audience.eyebrow} title={t.audience.title} text={t.audience.lead} />
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
    <section id="benefits" className="section section-muted">
      <div className="section-inner">
        <SectionHeader eyebrow={t.benefits.eyebrow} title={t.benefits.title} />
        <div className="card-grid four">
          {t.benefits.items.map((item, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            return (
              <Reveal className="info-card benefit-card" delay={index * 0.05} key={item.title}>
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
          <p>{t.demo.detail}</p>
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
          poster={publicAsset("media/kreslix-demo-poster.jpg")}
          aria-label={t.demo.videoLabel}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={publicAsset("media/kreslix-demo-web.mp4")} type="video/mp4" />
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

    async function loadPosts() {
      try {
        const response = await fetch(linkedInFeedEndpoint, {
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
    }

    loadPosts();
    return () => controller.abort();
  }, []);

  const formatDate = (timestamp) =>
    new Intl.DateTimeFormat(language === "uk" ? "uk-UA" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(timestamp));

  return (
    <section id="linkedin" className="section linkedin-section">
      <div className="section-inner">
        <div className="linkedin-heading">
          <SectionHeader eyebrow={t.linkedin.eyebrow} title={t.linkedin.title} text={t.linkedin.text} />
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
            {posts.map((post, index) => (
              <Reveal className="linkedin-card-wrap" delay={index * 0.05} key={post.id}>
                <article className="linkedin-card">
                  <div className="linkedin-card-top">
                    <span className="linkedin-mark">
                      <Linkedin size={18} aria-hidden="true" />
                    </span>
                    <time dateTime={new Date(post.publishedAt).toISOString()}>{formatDate(post.publishedAt)}</time>
                  </div>
                  <p>{post.text}</p>
                  <a href={post.url} target="_blank" rel="noreferrer" aria-label={`${t.linkedin.readPost}: ${post.text}`}>
                    {t.linkedin.readPost}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ))}
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

      <div className="footer-statement">
        <p>{t.footer.label}</p>
        <h2>{t.footer.title}</h2>
        <button className="primary-button" type="button" onClick={openDemo}>
          {t.cta}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="footer-main">
        <div className="footer-brand-block">
          <a className="footer-brand" href="#top">
            <img src={publicAsset("brand/logo.svg")} alt="Kreslix" />
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
        <p>© {year} Kreslix. {t.footer.rights}</p>
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
    role: "",
    email: "",
    contact: "",
    location: "",
    projects: "",
    tools: "",
    bottleneck: "",
    pilot: ""
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

    if (!formData.name || !formData.company || !formData.email || !formData.bottleneck) {
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
        role: "",
        email: "",
        contact: "",
        location: "",
        projects: "",
        tools: "",
        bottleneck: "",
        pilot: ""
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
        <Input label={t.form.fields.role} name="role" value={formData.role} onChange={updateField} />
        <Input label={t.form.fields.email} name="email" value={formData.email} onChange={updateField} type="email" required />
        {!compact && (
          <>
            <Input label={t.form.fields.contact} name="contact" value={formData.contact} onChange={updateField} />
            <Input label={t.form.fields.location} name="location" value={formData.location} onChange={updateField} />
          </>
        )}
      </div>

      <Input
        label={t.form.fields.projects}
        name="projects"
        value={formData.projects}
        onChange={updateField}
        placeholder={t.form.placeholders.projects}
      />
      {!compact && (
        <Input
          label={t.form.fields.tools}
          name="tools"
          value={formData.tools}
          onChange={updateField}
          placeholder={t.form.placeholders.tools}
        />
      )}
      <TextArea
        label={t.form.fields.bottleneck}
        name="bottleneck"
        value={formData.bottleneck}
        onChange={updateField}
        placeholder={t.form.placeholders.bottleneck}
        required
      />
      {!compact && (
        <TextArea
          label={t.form.fields.pilot}
          name="pilot"
          value={formData.pilot}
          onChange={updateField}
          placeholder={t.form.placeholders.pilot}
        />
      )}

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

function TextArea({ label, name, value, onChange, placeholder = "", required = false }) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={4} />
    </label>
  );
}

function Reveal({ children, className = "" }) {
  return <div className={className}>{children}</div>;
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
