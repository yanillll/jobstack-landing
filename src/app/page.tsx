
"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Smooth scroll for nav links is handled natively by HTML scroll-behavior: smooth in CSS,
    // but the JS implementation handles preventing default and efficient scrolling. 
    // In Next.js with App Router, simple hash links might work, but let's keep the logic if needed or rely on CSS.
    // The original JS script had manual smooth scroll. I'll include it adapted.
    const handleLinkClick = (e: MouseEvent) => {
      // Logic adapted for React event handling if attached to elements, but here we are using global selector
      // adhering to original script logic
    };

    // Instead of global listener, I will rely on CSS scroll-behavior: smooth 
    // or add click handlers to links if strictly necessary. 
    // The original script code:
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      // Cleanup links listeners if we assigned them... 
      // It's cleaner to strict React pattern but for migration speed we stick to effect.
      // However, React re-renders might lose listeners. 
      // But since this is a static landing page mostly, it's fine.
    };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar" id="navbar">
        <div className="navbar-inner">
          <a href="#" className="logo">
            <img src="/images/jobstack-logo.jpeg" alt="JobStack" className="logo-img" />
          </a>
          <ul className="nav-links">
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#how">Comment ça marche</a></li>
            <li><a href="#pricing">Tarifs</a></li>
            <li><a href="#testimonials">Témoignages</a></li>
          </ul>
          <div className="nav-cta">
            <button className="btn btn-ghost">Se connecter</button>
            <a href="/create-account" className="btn btn-primary">Commencer gratuitement</a>
          </div>
          <button className="mobile-menu-btn" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Lancement — Inscriptions ouvertes
          </div>
          <h1>
            Décroche ton CDI.<br />
            <span className="gradient-text">Sans y passer ta vie.</span>
          </h1>
          <p className="hero-subtitle">
            CV personnalisé par offre en 2 minutes, CRM de candidatures, relances automatiques.
            Tout ce qu{"'"}il faut pour décrocher ton premier poste — depuis un seul dashboard.
          </p>
          <div className="hero-actions">
            <a href="/create-account" className="btn btn-primary btn-lg">
              Créer mon compte gratuitement
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
            <button onClick={() => setShowVideo(true)} className="btn btn-outline btn-lg">Voir la démo</button>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack">
              <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>M</span>
              <span style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>S</span>
              <span style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>A</span>
              <span style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>L</span>
              <span style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>+</span>
            </div>
            <div className="hero-social-text">
              <span className="star-rating">★★★★★</span><br />
              <strong>500+</strong> candidats nous font confiance
            </div>
          </div>
        </div>
      </section>

      {/* HERO MOCKUP */}
      <div className="hero-mockup">
        <div className="mockup-window">
          <div className="mockup-toolbar">
            <div className="mockup-dot"></div>
            <div className="mockup-dot"></div>
            <div className="mockup-dot"></div>
            <div className="mockup-url">app.jobstack.io/dashboard</div>
          </div>
          <div className="mockup-body">
            <div className="mockup-sidebar">
              <div className="mockup-sidebar-title">Vue d{"'"}ensemble</div>
              <div className="sidebar-stat">
                <span className="sidebar-stat-label">Candidatures</span>
                <span className="sidebar-stat-value violet">47</span>
              </div>
              <div className="sidebar-stat">
                <span className="sidebar-stat-label">Entretiens</span>
                <span className="sidebar-stat-value green">8</span>
              </div>
              <div className="sidebar-stat">
                <span className="sidebar-stat-label">Taux de réponse</span>
                <span className="sidebar-stat-value">34%</span>
              </div>
              <div className="sidebar-stat">
                <span className="sidebar-stat-label">Score ATS moyen</span>
                <span className="sidebar-stat-value violet">87</span>
              </div>
              <div className="sidebar-stat">
                <span className="sidebar-stat-label">Relances à faire</span>
                <span className="sidebar-stat-value" style={{ color: '#d97706' }}>3</span>
              </div>
            </div>
            <div className="mockup-kanban">
              <div className="kanban-col">
                <div className="kanban-header">Postulé <span className="kanban-count">12</span></div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Chef de Projet Digital</div>
                  <div className="kanban-card-company">L{"'"}Oréal</div>
                  <span className="kanban-card-tag tag-cdi">CDI</span>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Business Analyst</div>
                  <div className="kanban-card-company">BNP Paribas</div>
                  <span className="kanban-card-tag tag-cdi">CDI</span>
                </div>
              </div>
              <div className="kanban-col">
                <div className="kanban-header">Vu <span className="kanban-count">5</span></div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Consultant Junior</div>
                  <div className="kanban-card-company">McKinsey</div>
                  <span className="kanban-card-tag tag-cdi">CDI</span>
                </div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Product Manager</div>
                  <div className="kanban-card-company">Doctolib</div>
                  <span className="kanban-card-tag tag-stage">Stage</span>
                </div>
              </div>
              <div className="kanban-col">
                <div className="kanban-header">Entretien <span className="kanban-count">3</span></div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Growth Manager</div>
                  <div className="kanban-card-company">Alan</div>
                  <span className="kanban-card-tag tag-cdi">CDI</span>
                </div>
              </div>
              <div className="kanban-col">
                <div className="kanban-header">Offre <span className="kanban-count">1</span></div>
                <div className="kanban-card">
                  <div className="kanban-card-title">Sales Executive</div>
                  <div className="kanban-card-company">Qonto</div>
                  <span className="kanban-card-tag tag-alt">CDI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOS */}
      <section className="logos-section animate-on-scroll">
        <div className="logos-label">Ils ont décroché des entretiens chez</div>
        <div className="logos-grid">
          <span>L{"'"}Oréal</span>
          <span>LVMH</span>
          <span>BNP Paribas</span>
          <span>Doctolib</span>
          <span>McKinsey</span>
          <span>Qonto</span>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="pain-section" id="problem">
        <div className="container">
          <div className="animate-on-scroll">
            <div className="section-eyebrow">Le problème</div>
            <h2 className="section-title">La recherche d{"'"}emploi est cassée.</h2>
            <p className="section-desc">
              Tu passes des heures à adapter ton CV, tu perds le fil de tes candidatures,
              et tu n{"'"}as aucune idée de pourquoi tu ne reçois pas de réponses.
            </p>
          </div>
          <div className="pain-grid">
            <div className="pain-card animate-on-scroll">
              <div className="pain-icon">😩</div>
              <h3>CV à refaire pour chaque offre</h3>
              <p>Tu passes 45 min à adapter chaque CV manuellement. Multiplié par 50 candidatures, c{"'"}est des semaines de travail perdu.</p>
            </div>
            <div className="pain-card animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
              <div className="pain-icon">📂</div>
              <h3>Le chaos des candidatures</h3>
              <p>Entre LinkedIn, Indeed, Welcome to the Jungle et les mails… impossible de savoir où tu en es. Tu oublies de relancer.</p>
            </div>
            <div className="pain-card animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="pain-icon">🤷</div>
              <h3>Zéro feedback</h3>
              <p>Tu envoies, tu attends, silence radio. Aucune visibilité sur ce qui bloque. Ton CV passe-t-il les filtres ATS ?</p>
            </div>
            <div className="pain-card animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
              <div className="pain-icon">🎓</div>
              <h3>Parcours français mal compris</h3>
              <p>Grande École, Bac+5, Master spécialisé… Les recruteurs ne décodent pas toujours la valeur de ton diplôme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="features-header animate-on-scroll">
            <div className="section-eyebrow">La solution</div>
            <h2 className="section-title">Tout ce qu{"'"}il te faut. Un seul outil.</h2>
            <p className="section-desc">
              JobStack automatise le plus pénible et te donne la clarté pour te concentrer sur ce qui compte : décrocher des entretiens.
            </p>
          </div>

          {/* Feature 1: CV Generator */}
          <div className="feature-row animate-on-scroll">
            <div className="feature-text">
              <div className="section-eyebrow">CV sur mesure</div>
              <h3>10 CV personnalisés.<br />En 2 minutes.</h3>
              <p>
                Colle une offre d{"'"}emploi, et notre IA génère un CV calibré sur les mots-clés,
                les compétences et le ton du poste. Score ATS inclus.
              </p>
              <ul className="feature-list">
                <li>Jusqu{"'"}à 10 CV générés en une fois</li>
                <li>Score de compatibilité ATS 0–100</li>
                <li>4 templates professionnels</li>
                <li>Export PDF en un clic</li>
              </ul>
            </div>
            <div className="feature-visual">
              <div className="cv-preview">
                <div className="cv-card">
                  <div className="cv-card-header">
                    <span className="cv-card-tag">L{"'"}Oréal — CDI</span>
                    <span className="cv-card-score">ATS 94</span>
                  </div>
                  <div className="cv-card-label">Chef de Projet Digital</div>
                  <div className="cv-card-lines">
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                  </div>
                </div>
                <div className="cv-card">
                  <div className="cv-card-header">
                    <span className="cv-card-tag">McKinsey — CDI</span>
                    <span className="cv-card-score">ATS 88</span>
                  </div>
                  <div className="cv-card-label">Consultant Junior</div>
                  <div className="cv-card-lines">
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                  </div>
                </div>
                <div className="cv-card">
                  <div className="cv-card-header">
                    <span className="cv-card-tag">Doctolib — Stage</span>
                    <span className="cv-card-score">ATS 91</span>
                  </div>
                  <div className="cv-card-label">Product Manager</div>
                  <div className="cv-card-lines">
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                  </div>
                </div>
                <div className="cv-card">
                  <div className="cv-card-header">
                    <span className="cv-card-tag">Alan — CDI</span>
                    <span className="cv-card-score">ATS 86</span>
                  </div>
                  <div className="cv-card-label">Growth Manager</div>
                  <div className="cv-card-lines">
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: CRM */}
          <div className="feature-row reverse animate-on-scroll">
            <div className="feature-text">
              <div className="section-eyebrow">CRM Candidatures</div>
              <h3>Chaque candidature.<br />Sous contrôle.</h3>
              <p>
                Un Kanban visuel pour suivre chaque offre, du brouillon à l{"'"}offre signée.
                Plus jamais de candidature oubliée ou de relance ratée.
              </p>
              <ul className="feature-list">
                <li>Vue Kanban + vue tableau</li>
                <li>Drag & drop entre statuts</li>
                <li>Fiche détaillée par candidature</li>
                <li>Timeline des interactions</li>
              </ul>
            </div>
            <div className="feature-visual">
              <div className="crm-preview">
                <div className="crm-row crm-row-header">
                  <span>Entreprise</span>
                  <span>Poste</span>
                  <span>Statut</span>
                  <span>Date</span>
                </div>
                <div className="crm-row">
                  <span className="crm-company">L{"'"}Oréal</span>
                  <span className="crm-role">Chef de Projet Digital</span>
                  <span className="crm-status status-interview">Entretien</span>
                  <span className="crm-date">15 sept.</span>
                </div>
                <div className="crm-row">
                  <span className="crm-company">BNP Paribas</span>
                  <span className="crm-role">Business Analyst</span>
                  <span className="crm-status status-applied">Postulé</span>
                  <span className="crm-date">12 sept.</span>
                </div>
                <div className="crm-row">
                  <span className="crm-company">Doctolib</span>
                  <span className="crm-role">Product Manager</span>
                  <span className="crm-status status-sent">CV envoyé</span>
                  <span className="crm-date">10 sept.</span>
                </div>
                <div className="crm-row">
                  <span className="crm-company">Alan</span>
                  <span className="crm-role">Growth Manager</span>
                  <span className="crm-status status-interview">Entretien</span>
                  <span className="crm-date">8 sept.</span>
                </div>
                <div className="crm-row">
                  <span className="crm-company">Qonto</span>
                  <span className="crm-role">Sales Executive</span>
                  <span className="crm-status status-applied">Postulé</span>
                  <span className="crm-date">5 sept.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Follow-ups */}
          <div className="feature-row animate-on-scroll">
            <div className="feature-text">
              <div className="section-eyebrow">Relances intelligentes</div>
              <h3>Ne laisse plus rien<br />passer entre les mailles.</h3>
              <p>
                Configure tes règles de relance et laisse JobStack te rappeler au bon moment.
                Templates pré-remplis, timing optimal, et suivi complet.
              </p>
              <ul className="feature-list">
                <li>Relances automatiques J+7, J+14, J+21</li>
                <li>Templates email personnalisables</li>
                <li>Messages LinkedIn générés</li>
                <li>Historique complet des échanges</li>
              </ul>
            </div>
            <div className="feature-visual" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, var(--violet-100), var(--blue-100))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '20px' }}>🔔</div>
              <div style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--slate-800)', marginBottom: '8px' }}>Relance suggérée</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--slate-500)', marginBottom: '16px' }}>L{"'"}Oréal — Chef de Projet Digital · J+7</div>
              <div style={{ background: 'var(--slate-50)', borderRadius: '12px', padding: '16px 20px', maxWidth: '340px', textAlign: 'left', fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.6', border: '1px solid var(--slate-100)' }}>
                "Bonjour Mme Dupont, je me permets de revenir vers vous suite à ma candidature envoyée le 8 sept. Je reste très motivé..."
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '8px 18px' }}>Envoyer</button>
                <button className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '8px 18px' }}>Modifier</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section animate-on-scroll">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">2 min</div>
              <div className="stat-label">pour générer un CV ciblé</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3x</div>
              <div className="stat-label">plus d{"'"}entretiens décrochés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">87%</div>
              <div className="stat-label">score ATS moyen</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10h</div>
              <div className="stat-label">gagnées par semaine</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="container">
          <div className="how-header animate-on-scroll">
            <div className="section-eyebrow">Comment ça marche</div>
            <h2 className="section-title">3 étapes. C{"'"}est tout.</h2>
            <p className="section-desc">
              Pas de configuration complexe. Crée ton compte, remplis ton profil, et laisse JobStack faire le reste.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card animate-on-scroll">
              <div className="step-number">1</div>
              <h3>Crée ton profil</h3>
              <p>Renseigne tes expériences, ta formation et tes compétences. Ou importe depuis LinkedIn en un clic.</p>
            </div>
            <div className="step-card animate-on-scroll" style={{ transitionDelay: '0.15s' }}>
              <div className="step-number">2</div>
              <h3>Colle une offre</h3>
              <p>Copie l{"'"}URL ou le texte d{"'"}une offre. Notre IA analyse les mots-clés et génère un CV calibré en 2 min.</p>
            </div>
            <div className="step-card animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
              <div className="step-number">3</div>
              <h3>Postule & track</h3>
              <p>Envoie ton CV, et suis ta candidature dans le CRM. JobStack te rappelle quand relancer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="testimonials-header animate-on-scroll">
            <div className="section-eyebrow">Témoignages</div>
            <h2 className="section-title">Ils ont trouvé grâce à JobStack</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "J{"'"}envoyais 10 candidatures par semaine sans réponse. Avec JobStack, mon taux de réponse est passé à 40%. J{"'"}ai décroché 3 entretiens en une semaine."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>M</div>
                <div>
                  <div className="testimonial-name">Marie L.</div>
                  <div className="testimonial-role">HEC Paris — CDI décroché chez LVMH</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Le traducteur académique a tout changé. Les recruteurs comprennent enfin la valeur de mon diplôme d{"'"}ingénieur. Je ne postule plus dans le vide."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>S</div>
                <div>
                  <div className="testimonial-name">Sofiane B.</div>
                  <div className="testimonial-role">Centrale Lyon — PM chez Doctolib</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Avant, je perdais mes candidatures entre 4 onglets et 3 fichiers Excel. Maintenant j{"'"}ai tout dans un seul dashboard. C{"'"}est un game-changer."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>A</div>
                <div>
                  <div className="testimonial-name">Amina K.</div>
                  <div className="testimonial-role">ESSEC — Consultante chez BCG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="pricing-header animate-on-scroll">
            <div className="section-eyebrow">Tarifs</div>
            <h2 className="section-title">Investis dans ta carrière.</h2>
            <p className="section-desc">
              Commence gratuitement. Passe au supérieur quand tu veux accélérer.
            </p>
          </div>
          <div className="pricing-grid">
            {/* Free */}
            <div className="pricing-card animate-on-scroll">
              <div className="pricing-name">Gratuit</div>
              <div className="pricing-desc">Pour tester la plateforme</div>
              <div className="pricing-price">
                <span className="pricing-amount">0</span>
                <span className="pricing-currency">€</span>
              </div>
              <ul className="pricing-features">
                <li><span className="check">✓</span> 3 CV personnalisés / mois</li>
                <li><span className="check">✓</span> CRM basique (10 candidatures)</li>
                <li><span className="check">✓</span> 1 template CV</li>
                <li className="disabled"><span className="check">—</span> Relances automatiques</li>
                <li className="disabled"><span className="check">—</span> Traducteur académique</li>
              </ul>
              <button className="btn btn-outline" style={{ width: '100%' }}>Commencer</button>
            </div>

            {/* Starter */}
            <div className="pricing-card popular animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
              <div className="pricing-popular-badge">Le plus populaire</div>
              <div className="pricing-name">Starter</div>
              <div className="pricing-desc">Pour chercher activement</div>
              <div className="pricing-price">
                <span className="pricing-amount">9,90</span>
                <span className="pricing-currency">€</span>
                <span className="pricing-period">/ mois</span>
              </div>
              <ul className="pricing-features">
                <li><span className="check">✓</span> 20 CV personnalisés / mois</li>
                <li><span className="check">✓</span> CRM illimité</li>
                <li><span className="check">✓</span> 2 templates CV</li>
                <li><span className="check">✓</span> Relances automatiques</li>
                <li className="disabled"><span className="check">—</span> Traducteur académique</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%' }}>Choisir Starter</button>
            </div>

            {/* Pro */}
            <div className="pricing-card animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="pricing-name">Pro</div>
              <div className="pricing-desc">Pour maximiser tes chances</div>
              <div className="pricing-price">
                <span className="pricing-amount">19,90</span>
                <span className="pricing-currency">€</span>
                <span className="pricing-period">/ mois</span>
              </div>
              <ul className="pricing-features">
                <li><span className="check">✓</span> CV illimités</li>
                <li><span className="check">✓</span> CRM illimité</li>
                <li><span className="check">✓</span> Tous les templates</li>
                <li><span className="check">✓</span> Relances automatiques</li>
                <li><span className="check">✓</span> Traducteur académique</li>
              </ul>
              <button className="btn btn-outline" style={{ width: '100%' }}>Choisir Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content animate-on-scroll">
          <h2>Prêt à décrocher ton<br />premier CDI ?</h2>
          <p>Rejoins les 500+ candidats qui ont pris le contrôle de leur recherche d{"'"}emploi. Commence gratuitement, sans carte bancaire.</p>
          <a href="/create-account" className="btn btn-primary btn-lg">
            Créer mon compte gratuitement
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src="/images/jobstack-logo.jpeg" alt="JobStack" className="logo-img" />
            </a>
            <p>La plateforme tout-en-un pour décrocher ton premier poste — sans stress.</p>
          </div>
          <div className="footer-col">
            <h4>Produit</h4>
            <ul>
              <li><a href="#features">Fonctionnalités</a></li>
              <li><a href="#pricing">Tarifs</a></li>
              <li><a href="#how">Comment ça marche</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ressources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Guide CV</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Légal</h4>
            <ul>
              <li><a href="#">CGU</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 JobStack. Tous droits réservés.</span>
          <div className="footer-socials">
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="Twitter">𝕏</a>
            <a href="#" title="Instagram">◻</a>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="modal-overlay" onClick={() => setShowVideo(false)} style={{ zIndex: 200, background: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '90%', padding: '0', background: 'black', overflow: 'hidden', display: 'flex' }}>
            <button
              className="modal-close"
              onClick={() => setShowVideo(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'white', zIndex: 10, background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}
            >
              ✕
            </button>
            <video
              src="/jobstack-promo-horizontal.mp4"
              controls
              autoPlay
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
