import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Colis',
      value: '1,234',
      change: '+12%',
      positive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'En Livraison',
      value: '87',
      change: '+5%',
      positive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
    },
    {
      title: 'Livrés',
      value: '1,089',
      change: '+18%',
      positive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'En Retard',
      value: '23',
      change: '-8%',
      positive: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Nouveau colis créé', ref: '#PKG-1234', time: 'Il y a 5 min' },
    { id: 2, action: 'Livraison effectuée', ref: '#PKG-1230', time: 'Il y a 15 min' },
    { id: 3, action: 'Colis en transit', ref: '#PKG-1228', time: 'Il y a 30 min' },
    { id: 4, action: 'Client ajouté', ref: 'John Doe', time: 'Il y a 1h' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Bienvenue, {user?.name || 'Utilisateur'} 👋
        </h1>
        <p className="text-foreground/60 mt-2">
          Voici un aperçu de vos activités logistiques
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stat.value}
                </p>
                <p className={`text-sm mt-2 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} ce mois
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.positive ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Activités Récentes
            </h2>
            <Link to="/dashboard/parcels" className="text-primary text-sm hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <div>
                  <p className="text-foreground font-medium">{activity.action}</p>
                  <p className="text-foreground/60 text-sm">{activity.ref}</p>
                </div>
                <span className="text-foreground/60 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Actions Rapides
          </h2>
          <div className="space-y-3">
            <Link
              to="/dashboard/parcels/new"
              className="flex items-center gap-3 p-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium">Nouveau Colis</span>
            </Link>
            <Link
              to="/dashboard/tracking"
              className="flex items-center gap-3 p-4 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-medium">Suivre un Colis</span>
            </Link>
            <Link
              to="/dashboard/clients/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="font-medium">Ajouter Client</span>
            </Link>
            <Link
              to="/dashboard/reports"
              className="flex items-center gap-3 p-4 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">Voir Rapports</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
