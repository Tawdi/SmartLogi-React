import React from 'react';
import { Card } from '../../components/ui';
import Container from '../../components/layout/Container/Container';

const About: React.FC = () => {
    return (
        <Container size="lg" className="py-12">
            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">À Propos de SmartLogi</h1>
                    <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                        Leader dans la gestion de livraison intelligente depuis 2020
                    </p>
                </div>

                <Card className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
                    <p className="text-foreground/70 leading-relaxed">
                        SmartLogi SDMS a été créé pour révolutionner le secteur de la logistique
                        et de la livraison. Notre mission est de fournir une solution complète,
                        sécurisée et efficace pour gérer tous les aspects de la chaîne de livraison,
                        du client final au gestionnaire logistique.
                    </p>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                        <p className="text-foreground/70">Clients Satisfaits</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                        <p className="text-foreground/70">Colis Livrés</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                        <p className="text-foreground/70">Taux de Satisfaction</p>
                    </Card>
                </div>

                <Card className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Nos Valeurs</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2"> Excellence</h3>
                            <p className="text-foreground/70">
                                Nous visons l'excellence dans chaque aspect de notre service
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2"> Sécurité</h3>
                            <p className="text-foreground/70">
                                La protection de vos données est notre priorité absolue
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2"> Innovation</h3>
                            <p className="text-foreground/70">
                                Nous adoptons les dernières technologies pour améliorer nos services
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2"> Collaboration</h3>
                            <p className="text-foreground/70">
                                Nous travaillons ensemble pour atteindre les meilleurs résultats
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </Container>
    );
};

export default About;
