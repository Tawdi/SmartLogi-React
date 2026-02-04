
import { Link } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import Container from '../../components/layout/Container/Container';

export default function Home() {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Livraison Rapide',
            description: 'Optimisation des routes pour des livraisons express et efficaces'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Sécurisé',
            description: 'Système de sécurité avancé avec authentification JWT et OAuth2'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'Analytics',
            description: 'Tableau de bord complet avec statistiques en temps réel'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Suivi GPS',
            description: 'Localisation en temps réel de tous vos colis'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: 'Multi-utilisateurs',
            description: 'Gestion des rôles pour clients, livreurs et gestionnaires'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Application Mobile',
            description: 'Interface responsive adaptée à tous les appareils'
        },
    ];

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <Container className="py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        SmartLogi Delivery Management System
                    </h1>
                    <p className="text-xl text-foreground/70 mb-8">
                        Solution complète de gestion de livraison avec suivi en temps réel,
                        optimisation des routes et gestion multi-utilisateurs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button size="lg" className="w-full sm:w-auto">
                                Commencer Gratuitement
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Se Connecter
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>

            {/* Features Section */}
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Fonctionnalités Principales
                    </h2>
                    <p className="text-lg text-foreground/70">
                        Tout ce dont vous avez besoin pour gérer vos livraisons efficacement
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="text-primary mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-foreground/70">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* CTA Section */}
            <Container>
                <Card className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à optimiser vos livraisons ?
                    </h2>
                    <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                        Rejoignez des centaines d'entreprises qui font confiance à SmartLogi
                        pour gérer leurs opérations logistiques
                    </p>
                    <Link to="/register">
                        <Button size="lg">
                            Créer un compte maintenant
                        </Button>
                    </Link>
                </Card>
            </Container>
        </div>
    );
}
