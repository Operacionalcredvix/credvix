'use client';

import React from 'react';
import styles from './NossosBeneficios.module.css';

import {
    FaDumbbell,
    FaUserMd,
    FaRegSmileBeam,
    FaGraduationCap,
    FaUtensils,
    FaLanguage,
    FaBrain,
    FaFirstAid,
    FaHamburger
} from 'react-icons/fa';

export default function NossosBeneficios() {
    const beneficios = [
        { icon: FaDumbbell, label: 'TotalPass' },
        { icon: FaUserMd, label: 'Assistência Médica' },
        { icon: FaRegSmileBeam, label: 'Assistência Odonto (colaboradores ES)' },
        { icon: FaGraduationCap, label: 'Desconto em Graduações' },
        { icon: FaUtensils, label: 'Ticket Flexível' },
        { icon: FaLanguage, label: 'Parceria Open English' },
        { icon: FaBrain, label: 'Acolhimento Psicológico' },
        { icon: FaFirstAid, label: 'Desconto em Farmácia' },
        { icon: FaHamburger, label: 'Cupons iFood' },
    ];

    return (
        <section className="bg-white pb-16 md:pb-24">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="section-title">Nossos Benefícios</h2>
                    <p className="section-subtitle">
                        Fique por dentro dos Benefícios para colaboradores Credvix.
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className={styles.benefitCard}>
                                <div className={styles.benefitIcon}>

                                    {React.createElement(beneficio.icon)}
                                </div>
                                <span
                                    className={styles.benefitLabel}
                                    dangerouslySetInnerHTML={{ __html: beneficio.label.replace(' (', '<br /><span style="font-size: 0.75rem; color: #6b7280;">(') }}
                                >
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}