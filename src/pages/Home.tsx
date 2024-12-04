import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container-custom h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Votre Voyage Spirituel Commence Ici
            </h1>
            <p className="text-xl mb-8">
              Découvrez nos forfaits Hajj et Omra personnalisés pour une expérience inoubliable
            </p>
            <Link to="/packages" className="btn-primary text-lg">
              Découvrir nos forfaits
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Expérience</h3>
              <p className="text-gray-600">
                Plus de 15 ans d'expertise dans l'organisation de pèlerinages
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold mb-2">Hébergement Premium</h3>
              <p className="text-gray-600">
                Hôtels sélectionnés près des lieux saints
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Accompagnement</h3>
              <p className="text-gray-600">
                Guide spirituel francophone durant tout le séjour
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Forfaits Populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-primary bg-opacity-20" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Omra Ramadan</h3>
                <p className="text-gray-600 mb-4">
                  15 jours incluant les derniers jours du Ramadan
                </p>
                <p className="text-primary font-bold mb-4">À partir de 2500€</p>
                <Link to="/packages" className="btn-secondary block text-center">
                  En savoir plus
                </Link>
              </div>
            </div>

            {/* Package Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-primary bg-opacity-20" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Hajj Confort</h3>
                <p className="text-gray-600 mb-4">
                  Programme complet de 3 semaines tout inclus
                </p>
                <p className="text-primary font-bold mb-4">À partir de 6500€</p>
                <Link to="/packages" className="btn-secondary block text-center">
                  En savoir plus
                </Link>
              </div>
            </div>

            {/* Package Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-primary bg-opacity-20" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Omra Express</h3>
                <p className="text-gray-600 mb-4">
                  Programme court de 10 jours
                </p>
                <p className="text-primary font-bold mb-4">À partir de 1800€</p>
                <Link to="/packages" className="btn-secondary block text-center">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt pour votre voyage spirituel ?</h2>
          <p className="text-xl mb-8">
            Contactez-nous dès aujourd'hui pour planifier votre pèlerinage
          </p>
          <Link to="/contact" className="btn-secondary">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
