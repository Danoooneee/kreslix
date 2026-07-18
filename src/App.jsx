import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Gauge,
  Loader2,
  Menu,
  Network,
  Play,
  Send,
  ShieldCheck,
  X,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const languages = {
  en: "EN",
  uk: "UA"
};

const content = {
  en: {
    nav: [
      { label: "Product", href: "#product" },
      { label: "For whom", href: "#audience" },
      { label: "Problem", href: "#problem" },
      { label: "Benefits", href: "#benefits" },
      { label: "Demo", href: "#demo" }
    ],
    cta: "Book a demo",
    close: "Close",
    presentation: {
      label: "Download presentation",
      href: publicAsset("downloads/kreslix.pdf"),
      fileName: "kreslix.pdf"
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
      detail: "MP4 background / pilot workflow preview"
    },
    final: {
      eyebrow: "Call to action",
      title: "Book a demo and check if Kreslix fits your workflow.",
      text:
        "Tell us how your team designs internal electrical networks today. We will review your workflow and suggest a practical pilot path."
    },
    form: {
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
      error: "The request could not be sent yet. Please check Telegram configuration or try again later.",
      required: "Please fill in the required fields."
    }
  },
  uk: {
    nav: [
      { label: "Продукт", href: "#product" },
      { label: "Для кого", href: "#audience" },
      { label: "Проблема", href: "#problem" },
      { label: "Переваги", href: "#benefits" },
      { label: "Демо", href: "#demo" }
    ],
    cta: "Book a demo",
    close: "Закрити",
    presentation: {
      label: "Завантажити презентацію",
      href: publicAsset("downloads/kreslix.pdf"),
      fileName: "kreslix.pdf"
    },
    hero: {
      eyebrow: "AI platform for internal electrical network design",
      title: "Проєктуйте внутрішні електромережі швидше.",
      lead:
        "Kreslix допомагає інжиніринговим командам автоматизувати проєктування внутрішніх електромереж, зменшити повторюване трасування й залишити ключові рішення під контролем інженера.",
      proof: "Створено для реальних workflow електропроєктування, пілотного тестування та подальшої співпраці з клієнтом."
    },
    product: {
      eyebrow: "Короткий опис продукту",
      title: "Kreslix — AI platform for internal electrical network design.",
      text:
        "Платформа допомагає інжиніринговим компаніям у найбільш повторюваних частинах електропроєктування: аналізі проєктного контексту, генерації логіки трасування, перевірці результату та підготовці workflow, який можна повторювати в наступних проєктах.",
      cards: [
        "AI-assisted routing для внутрішніх електромереж",
        "Перевірка інженером перед критичними рішеннями",
        "Workflow навколо реального пілоту, а не абстрактної презентації"
      ]
    },
    audience: {
      eyebrow: "Для кого рішення",
      title: "Для інжинірингових команд, яким потрібна більша проєктна потужність.",
      lead:
        "Kreslix створений для компаній, які вже виконують проєкти електромереж і хочуть масштабувати delivery без втрати контролю над якістю.",
      items: [
        {
          title: "Директори інжинірингових компаній",
          text: "Потрібно збільшити пропускну здатність, брати більше проєктів і зрозуміти, чи може AI дати вимірювану бізнес-цінність."
        },
        {
          title: "Project leads",
          text: "Потрібні прогнозовані workflow, менше повторюваних правок і ясність у тому, де команда втрачає час."
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
        "Складно масштабувати delivery без найму нових інженерів",
        "Контроль якості залежить від ручної перевірки на кожному етапі",
        "Проєктні знання важко повторно використати в схожих будівлях"
      ]
    },
    benefits: {
      eyebrow: "Ключові переваги",
      title: "Швидший workflow із вбудованим контролем інженера.",
      items: [
        {
          title: "Менше повторюваної роботи",
          text: "Перенесіть рутинне трасування з ручного креслення в AI-assisted workflow."
        },
        {
          title: "Інженер зберігає контроль",
          text: "Команда перевіряє, коригує й погоджує критичні результати перед рухом далі."
        },
        {
          title: "Валідація через пілот",
          text: "Почніть з одного реального workflow і виміряйте, чи має автоматизація бізнес-сенс."
        },
        {
          title: "Повторюваний delivery",
          text: "Перетворюйте проєктну логіку, правки та QA/QC сигнали на процес, який покращується з часом."
        }
      ]
    },
    demo: {
      eyebrow: "Демонстрація продукту",
      title: "Подивіться, як Kreslix підтримує проєктування електромереж.",
      text:
        "Демо показує workflow продукту в контексті: вхідні дані проєкту, генерація трасування, перевірка інженером і шлях до практичного пілоту.",
      videoLabel: "Kreslix product demo",
      meta: "Повноекранний product walkthrough",
      detail: "MP4 background / preview пілотного workflow"
    },
    final: {
      eyebrow: "Заклик до дії",
      title: "Book a demo і перевірте, чи підходить Kreslix вашому workflow.",
      text:
        "Розкажіть, як ваша команда зараз проєктує внутрішні електромережі. Ми переглянемо workflow і запропонуємо практичний шлях до пілоту."
    },
    form: {
      title: "Book a demo",
      intro: "Залиште кілька деталей про поточний workflow. Ми переглянемо їх перед тим, як зв'язатись із вами.",
      fields: {
        name: "Ім'я",
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
        tools: "AutoCAD, Revit, BIM workflow...",
        bottleneck: "Ручне трасування, QA/QC, перекреслення, документація...",
        pilot: "Який результат зробить пілот вартим часу команди?"
      },
      submit: "Request demo",
      sending: "Відправляємо",
      success: "Дякуємо. Ми отримали заявку й повернемось із пропозицією демо.",
      error: "Заявку поки не вдалось відправити. Перевірте Telegram configuration або спробуйте пізніше.",
      required: "Заповніть обов'язкові поля."
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
  }, [language]);

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
      <a className="brand" href="#top" aria-label="Kreslix home">
        <img src={publicAsset("brand/logo.svg")} alt="Kreslix" />
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
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
          aria-label="Open menu"
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
            aria-label="Mobile navigation"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={goToAnchor}>
                {item.label}
              </a>
            ))}
            <button type="button" onClick={openDemo}>
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
  const pointerX = useMotionValue(0.62);
  const pointerY = useMotionValue(0.42);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.65 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.65 });
  const mapX = useTransform(springX, [0, 1], [18, -18]);
  const mapY = useTransform(springY, [0, 1], [10, -10]);
  const nodeX = useTransform(springX, [0, 1], [-8, 8]);
  const nodeY = useTransform(springY, [0, 1], [-5, 5]);

  const handlePointerMove = (event) => {
    if (reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)));
    pointerY.set(Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)));
  };

  const handlePointerLeave = () => {
    pointerX.set(0.62);
    pointerY.set(0.42);
  };

  return (
    <section id="top" className="hero-section" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <HeroBackground
        reducedMotion={reducedMotion}
        mapX={mapX}
        mapY={mapY}
        nodeX={nodeX}
        nodeY={nodeY}
      />
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
            Demo video
          </a>
          <a className="secondary-button" href={t.presentation.href} download={t.presentation.fileName}>
            <Download size={18} aria-hidden="true" />
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

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.42 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

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
            <a className="secondary-button" href={t.presentation.href} download={t.presentation.fileName}>
              <Download size={18} aria-hidden="true" />
              {t.presentation.label}
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="demo-stage">
        <video ref={videoRef} className="demo-stage-video" muted loop playsInline preload="metadata" aria-label={t.demo.videoLabel}>
          <source src={publicAsset("media/kreslix-demo-web.mp4")} type="video/mp4" />
        </video>
      </Reveal>
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
            <a className="secondary-button" href={t.presentation.href} download={t.presentation.fileName}>
              <Download size={18} aria-hidden="true" />
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
  return (
    <footer className="site-footer">
      <div>
        <a className="footer-brand" href="#top">
          <img src={publicAsset("brand/logo.svg")} alt="Kreslix" />
        </a>
        <p>AI platform for internal electrical network design.</p>
      </div>
      <div className="footer-links">
        {nav.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <button type="button" onClick={openDemo}>
          {t.cta}
        </button>
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
        <p className="eyebrow">Kreslix demo</p>
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

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function HeroBackground({ reducedMotion, mapX, mapY, nodeX, nodeY }) {
  return (
    <div className="hero-background" aria-hidden="true">
      <motion.div
        className="hero-scan"
        animate={reducedMotion ? undefined : { x: ["-15%", "115%"] }}
        transition={{ duration: 7.5, ease: "linear", repeat: Infinity }}
      />
      <motion.svg className="hero-node-field" viewBox="0 0 1200 760" preserveAspectRatio="none" style={{ x: nodeX, y: nodeY }}>
        <path className="system-backbone" d="M84 606H262V526H420V448H626V368H770V274H1038" />
        <path className="system-backbone soft" d="M142 182H326V246H520V190H748V246H1092" />
        <path className="system-backbone soft" d="M1018 94V214H930V394H1048V662" />
        <rect className="system-panel" x="910" y="338" width="86" height="112" rx="3" />
        <rect className="system-panel" x="278" y="488" width="72" height="88" rx="3" />
        <rect className="system-panel" x="676" y="206" width="88" height="72" rx="3" />
        {[262, 420, 626, 770, 326, 520, 748, 930, 1048].map((cx, index) => (
          <circle
            className="system-node"
            cx={cx}
            cy={[526, 448, 368, 274, 246, 190, 246, 394, 662][index]}
            r={index % 3 === 0 ? "7" : "5"}
            key={`${cx}-${index}`}
          />
        ))}
      </motion.svg>
      <motion.svg className="hero-routing-map" viewBox="0 0 1200 760" preserveAspectRatio="none" style={{ x: mapX, y: mapY }}>
        <defs>
          <linearGradient id="routeGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(204,255,0,0)" />
            <stop offset="42%" stopColor="rgba(204,255,0,0.78)" />
            <stop offset="100%" stopColor="rgba(24,216,245,0.12)" />
          </linearGradient>
        </defs>
        <path className="floor-outline" d="M82 138H430V92H704V162H1100V612H838V674H460V604H82Z" />
        <path className="floor-outline soft" d="M222 234H515V188H706V258H962V492H735V548H392V488H222Z" />
        <path className="floor-partition" d="M430 138V604M704 162V612M838 258V674M222 492H962M515 234V548M82 370H430M704 338H1100" />
        <path className="service-zone" d="M884 208H1038V320H884ZM604 492H784V604H604ZM248 274H392V390H248Z" />
        <motion.path
          className="pulse-route"
          d="M108 518H290C362 518 374 442 446 442H650C732 442 742 338 824 338H1080"
          stroke="url(#routeGradient)"
          pathLength="1"
          initial={false}
          animate={reducedMotion ? undefined : { strokeDashoffset: [1, 0] }}
          transition={{ duration: 5.4, ease: "linear", repeat: Infinity }}
        />
        <motion.path
          className="pulse-route secondary"
          d="M170 172H352C438 172 438 288 526 288H700C790 288 792 214 884 214H1124"
          stroke="rgba(204,255,0,0.46)"
          pathLength="1"
          initial={false}
          animate={reducedMotion ? undefined : { strokeDashoffset: [1, 0] }}
          transition={{ duration: 7.2, ease: "linear", repeat: Infinity, delay: 0.7 }}
        />
        {[108, 446, 824, 352, 700, 884].map((cx, index) => (
          <circle className="map-node" cx={cx} cy={index < 3 ? [518, 442, 338][index] : [172, 288, 214][index - 3]} r="6" key={cx} />
        ))}
      </motion.svg>
    </div>
  );
}

export default App;
