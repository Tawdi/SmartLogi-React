import React from 'react';
import { Card } from '../../components/ui';
import Container from '../../components/layout/Container/Container';

const Tracking: React.FC = () => {
  return (
    <Container size="lg" className="py-12">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6">Suivi de Colis</h1>
        <p className="text-foreground/70 mb-8">
          Entrez votre numéro de suivi pour localiser votre colis en temps réel
        </p>

        <div className="max-w-2xl">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Entrez votre numéro de suivi (ex: PKG-1234)"
              className="flex-1 px-4 py-3 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Suivre
            </button>
          </div>

          <div className="mt-8 p-6 bg-foreground/5 rounded-lg">
            <h3 className="font-semibold mb-4">Exemple de numéro de suivi:</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>• PKG-1234</li>
              <li>• PKG-5678</li>
              <li>• PKG-9012</li>
            </ul>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Tracking;
