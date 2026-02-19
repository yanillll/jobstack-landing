
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAccount() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        status: '',
        school: '',
        level: '',
        goal: '',
        terms: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: val }));
        // Clear error
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "Le prénom est requis";
        if (!formData.lastName) newErrors.lastName = "Le nom est requis";
        if (!formData.email) newErrors.email = "L'email est requis";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";

        if (!formData.password) newErrors.password = "Le mot de passe est requis";
        else if (formData.password.length < 8) newErrors.password = "Minimum 8 caractères";

        if (!formData.status) newErrors.status = "Le statut est requis";
        if (!formData.school) newErrors.school = "L'école ou université est requise";
        if (!formData.level) newErrors.level = "Le niveau d'études est requis";
        if (!formData.goal) newErrors.goal = "L'objectif est requis";

        if (!formData.terms) newErrors.terms = "Vous devez accepter les CGU";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Save minimal profile
            const userProfile = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                goal: formData.goal,
                level: formData.level
            };

            if (typeof window !== 'undefined') {
                localStorage.setItem('jobstack_user', JSON.stringify(userProfile));
            }

            router.push('/cv-demo');
        }
    };

    return (
        <>
            <nav className="navbar" style={{ position: 'absolute' }}>
                <div className="navbar-inner">
                    <a href="/" className="logo">
                        <img src="/images/jobstack-logo.jpeg" alt="JobStack" className="logo-img" />
                    </a>
                    <a href="/" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>Retour au site</a>
                </div>
            </nav>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 24px 60px',
                background: 'var(--slate-50)'
            }}>
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--slate-200)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                    width: '100%',
                    maxWidth: '520px'
                }} className="animate-on-scroll visible">

                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>Créer ton compte</h1>
                        <p style={{ color: 'var(--slate-500)' }}>Accède à la démo et génère ton CV en 2 minutes.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label className="form-label">Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Thomas"
                                />
                                {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Nom</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Dubois"
                                />
                                {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="thomas.dubois@email.com"
                            />
                            {errors.email && <div className="form-error">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="8 caractères minimum"
                            />
                            {errors.password && <div className="form-error">{errors.password}</div>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Statut</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">Sélectionner...</option>
                                <option value="student">Étudiant</option>
                                <option value="graduate">Jeune diplômé</option>
                                <option value="apprentice">En alternance</option>
                                <option value="international">International</option>
                            </select>
                            {errors.status && <div className="form-error">{errors.status}</div>}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label className="form-label">École / Université</label>
                                <input
                                    type="text"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Ex: HEC, Sorbonne..."
                                />
                                {errors.school && <div className="form-error">{errors.school}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Niveau d{"'"}études</label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="">Sélectionner...</option>
                                    <option value="bac3">Bac+3</option>
                                    <option value="bac4">Bac+4</option>
                                    <option value="bac5">Bac+5</option>
                                </select>
                                {errors.level && <div className="form-error">{errors.level}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Objectif</label>
                            <select
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">Sélectionner...</option>
                                <option value="stage">Stage</option>
                                <option value="alternance">Alternance</option>
                                <option value="cdi">CDI</option>
                                <option value="cdd">CDD</option>
                            </select>
                            {errors.goal && <div className="form-error">{errors.goal}</div>}
                        </div>

                        <div className="form-group">
                            <label className="form-checkbox-group">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                <span style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                                    J{"'"}accepte les <a href="#" style={{ color: 'var(--violet-600)', textDecoration: 'underline' }}>CGU</a> et la politique de confidentialité.
                                </span>
                            </label>
                            {errors.terms && <div className="form-error">{errors.terms}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '16px' }}>
                            Créer mon compte
                        </button>

                        <div style={{ textAlign: 'center' }}>
                            <button type="button" className="btn btn-ghost" onClick={() => alert('Demo: Login non implémenté')}>
                                J{"'"}ai déjà un compte
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}
