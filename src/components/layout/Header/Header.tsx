import { Link } from "react-router-dom";
import ThemeToggle from "../../shared/ThemeToggle/ThemeToggle";
import Container from "../Container/Container";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../ui";
import { useState } from "react";

export default function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
            <Container>
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        SmartLogi
                    </Link>
                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                            Accueil
                        </Link>
                        <Link
                            to="/tracking"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                            Suivi Colis
                        </Link>
                        <Link
                            to="/about"
                            className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                            À propos
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {user ? (
                            <div className="hidden md:flex items-center gap-2">
                                <Link to="/dashboard">
                                    <Button variant="outline" size="sm">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                >
                                    Déconnexion
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline" size="sm">
                                        Connexion
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm">
                                        S'inscrire
                                    </Button>
                                </Link>
                            </div>
                        )}
                        {/*  burger menu icon */}
                        <button onClick={toggleMenu} className="md:hidden p-2 rounded-md hover:bg-foreground/5">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-2`}>
                    <nav>


                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                        >
                            Accueil
                        </Link>
                        <Link
                            to="/tracking"
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                        >
                            Suivi Colis
                        </Link>
                        <Link
                            to="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                        >
                            À propos
                        </Link>
                    </nav>
                    <div>
                        {user ? (
                            <div className="flex flex-col  gap-4 justify-center">
                                <Link to="/dashboard">
                                    <Button variant="outline" fullWidth size="sm">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    fullWidth
                                    onClick={logout}
                                >
                                    Déconnexion
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col  gap-4 justify-center">
                                <Link to="/login">
                                    <Button variant="outline" size="sm" fullWidth>
                                        Connexion
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm" fullWidth>
                                        S'inscrire
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}
