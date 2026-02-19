
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CVDemo() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [plan, setPlan] = useState('free');

    const [inputs, setInputs] = useState({
        targetRole: '',
        summary: '',
        skills: '',
        experience: { company: '', role: '', dates: '', desc: '' },
        education: { school: '', degree: '', dates: '' },
        offerText: '',
        offerUrl: '',
        sector: ''
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [score, setScore] = useState(0);
    const [showPaywall, setShowPaywall] = useState(false);

    useEffect(() => {
        // Load user profile
        const storedUser = localStorage.getItem('jobstack_user');
        if (storedUser) {
            setUserProfile(JSON.parse(storedUser));
        } else {
            // Redirect if no user? For demo we can stay or redirect
            // router.push('/create-account');
        }

        const storedPlan = localStorage.getItem('jobstack_plan');
        if (storedPlan) setPlan(storedPlan);
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setInputs(prev => ({
                ...prev,
                [parent]: { ...(prev as any)[parent], [child]: value }
            }));
        } else {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleGenerate = () => {
        if (!inputs.offerText && !inputs.offerUrl) {
            alert("Veuillez coller une offre ou une URL.");
            return;
        }

        setIsGenerating(true);

        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            setHasGenerated(true);
            // Random score based on sector or inputs
            const baseScore = 78;
            const extra = Math.floor(Math.random() * 17); // 0 to 16 -> max 94-95
            setScore(baseScore + extra);
        }, 1500);
    };

    const handleDownload = () => {
        if (plan === 'free') {
            setShowPaywall(true);
        } else {
            // Print/Download simulation
            window.print();
        }
    };

    const handleUnlockDemo = () => {
        localStorage.setItem('jobstack_plan', 'starter');
        setPlan('starter');
        setShowPaywall(false);
    };

    // Recruiter advice based on sector
    const getAdvice = () => {
        switch (inputs.sector) {
            case 'Tech': return [
                "Mettez en avant vos projets Github.",
                "Détaillez votre stack technique.",
                "Soyez précis sur votre impact (métriques)."
            ];
            case 'Finance': return [
                "La rigueur est clé, zéro faute tolérée.",
                "Mettez en avant vos certifications (CFA, etc).",
                "Utilisez des verbes d'action forts."
            ];
            case 'Marketing': return [
                "Montrez votre créativité dans la mise en page.",
                "Chiffrez vos campagnes (ROI, Reach).",
                "Adaptez le ton à la marque."
            ];
            default: return [
                "Personnalisez le titre du CV.",
                "Faites tenir le tout sur une page.",
                "Relisez-vous pour éviter les coquilles."
            ];
        }
    };

    return (
        <>
            <nav className="navbar" style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--slate-200)' }}>
                <div className="navbar-inner">
                    <a href="/" className="logo">
                        <img src="/images/jobstack-logo.jpeg" alt="JobStack" className="logo-img" />
                    </a>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-500)', background: 'var(--slate-100)', padding: '4px 10px', borderRadius: '100px' }}>
                            Plan: {plan === 'free' ? 'Gratuit' : 'Starter'}
                        </span>
                        <a href="/" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>Retour au site</a>
                    </div>
                </div>
            </nav>

            <div style={{
                minHeight: 'calc(100vh - 73px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '0',
                background: 'var(--slate-50)'
            }}>
                {/* LEFT COLUMN: INPUTS */}
                <div style={{ padding: '32px', borderRight: '1px solid var(--slate-200)', overflowY: 'auto', maxHeight: 'calc(100vh - 73px)' }}>
                    <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', color: 'var(--slate-800)' }}>Informations & Offre</h2>

                    <div className="form-group">
                        <label className="form-label">Poste cible</label>
                        <input type="text" name="targetRole" value={inputs.targetRole} onChange={handleChange} className="form-input" placeholder="Ex: Product Manager" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Résumé pro</label>
                        <textarea name="summary" value={inputs.summary} onChange={handleChange} className="form-textarea" placeholder="Bref résumé de votre profil..." style={{ minHeight: '80px' }}></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Compétences (séparées par des virgules)</label>
                        <input type="text" name="skills" value={inputs.skills} onChange={handleChange} className="form-input" placeholder="React, Node.js, Design..." />
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '24px', marginBottom: '16px', color: 'var(--violet-700)' }}>Expérience Principale</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                            <input type="text" name="experience.company" value={inputs.experience.company} onChange={handleChange} className="form-input" placeholder="Entreprise" />
                        </div>
                        <div className="form-group">
                            <input type="text" name="experience.role" value={inputs.experience.role} onChange={handleChange} className="form-input" placeholder="Rôle" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" name="experience.dates" value={inputs.experience.dates} onChange={handleChange} className="form-input" placeholder="Dates (ex: 2020 - 2023)" />
                    </div>
                    <div className="form-group">
                        <textarea name="experience.desc" value={inputs.experience.desc} onChange={handleChange} className="form-textarea" placeholder="Description des tâches..." style={{ minHeight: '80px' }}></textarea>
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '24px', marginBottom: '16px', color: 'var(--violet-700)' }}>Formation</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                            <input type="text" name="education.school" value={inputs.education.school} onChange={handleChange} className="form-input" placeholder="École" />
                        </div>
                        <div className="form-group">
                            <input type="text" name="education.degree" value={inputs.education.degree} onChange={handleChange} className="form-input" placeholder="Diplôme" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" name="education.dates" value={inputs.education.dates} onChange={handleChange} className="form-input" placeholder="Année d'obtention" />
                    </div>

                    <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid var(--slate-200)' }} />

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--slate-800)' }}>L{"'"}Offre d{"'"}Emploi</h3>
                    <div className="form-group">
                        <label className="form-label">Secteur</label>
                        <select name="sector" value={inputs.sector} onChange={handleChange} className="form-select">
                            <option value="">Sélectionner...</option>
                            <option value="Tech">Tech / IT</option>
                            <option value="Finance">Banque / Finance</option>
                            <option value="Conseil">Conseil / Stratégie</option>
                            <option value="Marketing">Marketing / Com</option>
                            <option value="Luxe">Luxe / Retail</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Coller la description du poste</label>
                        <textarea name="offerText" value={inputs.offerText} onChange={handleChange} className="form-textarea" placeholder="Collez ici le texte de l'offre..." style={{ minHeight: '120px' }}></textarea>
                    </div>
                    <div className="form-group">
                        <label className="form-label">OU url de l{"'"}offre</label>
                        <input type="text" name="offerUrl" value={inputs.offerUrl} onChange={handleChange} className="form-input" placeholder="https://..." />
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: '16px', opacity: isGenerating ? 0.7 : 1 }}
                    >
                        {isGenerating ? (
                            <>
                                Analyse en cours...
                                <span style={{ marginLeft: '10px', animation: 'spin 1s linear infinite' }}>⏳</span>
                            </>
                        ) : "Générer mon CV"}
                    </button>
                </div>

                {/* RIGHT COLUMN: PREVIEW */}
                <div style={{ padding: '32px', background: 'var(--slate-100)', overflowY: 'auto', maxHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {hasGenerated && (
                        <div style={{ width: '100%', maxWidth: '210mm', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ background: 'white', padding: '8px 16px', borderRadius: '50px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-600)' }}>Score ATS:</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--green-500)' }}>{score}/100</span>
                            </div>
                            <button onClick={handleDownload} className="btn btn-outline" style={{ gap: '8px' }}>
                                {plan === 'free' && <span>🔒</span>}
                                Télécharger PDF
                            </button>
                        </div>
                    )}

                    {/* A4 PREVIEW */}
                    <div style={{
                        width: '210mm',
                        minHeight: '297mm',
                        background: 'white',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        padding: '40px',
                        position: 'relative',
                        opacity: hasGenerated ? 1 : 0.5,
                        transform: hasGenerated ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.5s ease',
                        filter: hasGenerated ? 'none' : 'blur(2px)'
                    }}>
                        {!hasGenerated && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--slate-400)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📄</div>
                                <p>Remplissez les infos et cliquez sur "Générer"</p>
                            </div>
                        )}

                        {/* CV HEADER */}
                        <div style={{ borderBottom: '2px solid var(--slate-100)', paddingBottom: '24px', marginBottom: '24px' }}>
                            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '4px' }}>
                                {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Prénom Nom'}
                            </h1>
                            <h2 style={{ fontSize: '1.2rem', color: 'var(--violet-600)', fontWeight: 600 }}>{inputs.targetRole || "Titre du poste cible"}</h2>
                            <div style={{ marginTop: '12px', color: 'var(--slate-500)', fontSize: '0.9rem' }}>
                                {userProfile?.email || "email@exemple.com"} • +33 6 00 00 00 00 • Paris, France
                            </div>
                        </div>

                        {/* CV BODY */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                            <div>
                                <section style={{ marginBottom: '24px' }}>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)', paddingBottom: '8px', marginBottom: '12px' }}>Profil</h3>
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--slate-700)' }}>
                                        {inputs.summary || "Je suis un professionnel motivé avec une solide expérience en [Domaine]. Passionné par [Secteur], je cherche à mettre à profit mes compétences en [Compétence clé] pour aider [Entreprise] à atteindre ses objectifs."}
                                    </p>
                                </section>

                                <section style={{ marginBottom: '24px' }}>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)', paddingBottom: '8px', marginBottom: '12px' }}>Expérience</h3>
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <strong style={{ color: 'var(--slate-800)' }}>{inputs.experience.role || "Intitulé du poste"}</strong>
                                            <span style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>{inputs.experience.dates || "2020 - Présent"}</span>
                                        </div>
                                        <div style={{ color: 'var(--violet-600)', fontWeight: 500, fontSize: '0.9rem', marginBottom: '8px' }}>{inputs.experience.company || "Nom de l'entreprise"}</div>
                                        <p style={{ fontSize: '0.92rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                                            {inputs.experience.desc || "Responsable de la gestion de projet et de la coordination des équipes. Augmentation de la productivité de 15%. Mise en place de nouvelles méthodologies agiles."}
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)', paddingBottom: '8px', marginBottom: '12px' }}>Formation</h3>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <strong style={{ color: 'var(--slate-800)' }}>{inputs.education.school || "Université / École"}</strong>
                                            <span style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>{inputs.education.dates || "2020"}</span>
                                        </div>
                                        <div style={{ color: 'var(--slate-600)', fontSize: '0.92rem' }}>{inputs.education.degree || "Master en Management"}</div>
                                    </div>
                                </section>
                            </div>

                            <div>
                                <section style={{ marginBottom: '24px' }}>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)', paddingBottom: '8px', marginBottom: '12px' }}>Compétences</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {(inputs.skills ? inputs.skills.split(',') : ['Compétence 1', 'Compétence 2', 'Compétence 3']).map((skill, i) => (
                                            <span key={i} style={{ background: 'var(--slate-100)', color: 'var(--slate-700)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 500 }}>
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                <section style={{ marginBottom: '24px' }}>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--slate-400)', borderBottom: '1px solid var(--slate-200)', paddingBottom: '8px', marginBottom: '12px' }}>Langues</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.92rem', color: 'var(--slate-600)' }}>
                                        <li style={{ marginBottom: '4px' }}>Français (Natif)</li>
                                        <li style={{ marginBottom: '4px' }}>Anglais (C1 - Courant)</li>
                                        <li>Espagnol (B2 - Intermédiaire)</li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* RECRUITER ADVICE */}
                    {hasGenerated && inputs.sector && (
                        <div style={{ width: '210mm', marginTop: '32px', background: 'var(--violet-50)', border: '1px solid var(--violet-200)', borderRadius: 'var(--radius)', padding: '24px' }}>
                            <h4 style={{ color: 'var(--violet-700)', fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                Conseils Recruteur pour le secteur {inputs.sector}
                            </h4>
                            <ul style={{ paddingLeft: '20px', color: 'var(--slate-700)' }}>
                                {getAdvice().map((tip, i) => (
                                    <li key={i} style={{ marginBottom: '8px' }}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* PAYWALL MODAL */}
            {showPaywall && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowPaywall(false)}>✕</button>
                        <div className="modal-title">Débloque le téléchargement</div>
                        <p className="modal-desc">
                            Ton CV est prêt. Pour l{"'"}exporter en PDF + accéder au CRM candidatures, passe en Starter.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ border: '1px solid var(--slate-200)', borderRadius: 'var(--radius)', padding: '16px', textAlign: 'center', opacity: 0.6 }}>
                                <div style={{ fontWeight: 700, color: 'var(--slate-700)' }}>Gratuit</div>
                                <div style={{ fontSize: '0.9rem', marginTop: '4px' }}>Preview uniquement</div>
                            </div>
                            <div style={{ border: '2px solid var(--violet-500)', borderRadius: 'var(--radius)', padding: '16px', textAlign: 'center', background: 'var(--violet-50)' }}>
                                <div style={{ fontWeight: 700, color: 'var(--violet-700)' }}>Starter</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800, margin: '4px 0' }}>9,90€ <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>/mois</span></div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button onClick={handleUnlockDemo} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                Débloquer (démo)
                            </button>
                            <button onClick={() => setShowPaywall(false)} className="btn btn-ghost" style={{ width: '100%' }}>
                                Pas maintenant
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
