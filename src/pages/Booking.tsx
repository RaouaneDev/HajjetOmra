import React, { useState } from 'react';

const Booking: React.FC = () => {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4VudhVGfJJaENs-ld5N8FefoQHofngmwL-ZwJ2XJ04pO2SW-xZntCHtvzGb4RNiU0/exec';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    age: '',
    nationality: '',
    phone: '',
    email: '',
    package: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const packages = [
    { id: 'omra-ramadan', name: 'Omra Ramadan - 15 jours', price: '2500€' },
    { id: 'hajj-confort', name: 'Hajj Confort - 3 semaines', price: '6500€' },
    { id: 'omra-express', name: 'Omra Express - 10 jours', price: '1800€' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const selectedPackage = packages.find(pkg => pkg.id === formData.package);
    
    try {
      const urlWithParams = new URL(GOOGLE_SCRIPT_URL);
      urlWithParams.searchParams.append('timestamp', new Date().toLocaleString());
      urlWithParams.searchParams.append('firstName', formData.firstName);
      urlWithParams.searchParams.append('lastName', formData.lastName);
      urlWithParams.searchParams.append('address', formData.address);
      urlWithParams.searchParams.append('gender', formData.gender);
      urlWithParams.searchParams.append('age', formData.age);
      urlWithParams.searchParams.append('nationality', formData.nationality);
      urlWithParams.searchParams.append('phone', formData.phone);
      urlWithParams.searchParams.append('email', formData.email);
      urlWithParams.searchParams.append('package', selectedPackage?.name || '');
      urlWithParams.searchParams.append('price', selectedPackage?.price || '');

      const response = await fetch(urlWithParams.toString(), {
        method: 'GET',
        mode: 'no-cors'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        gender: '',
        age: '',
        nationality: '',
        phone: '',
        email: '',
        package: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-dark-300 min-h-screen">
      <div className="container-custom max-w-2xl">
        <div className="bg-dark-200 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">Réservation</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-yellow-light mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-yellow-light mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            {/* Adresse */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-yellow-light mb-1">
                Adresse (optionnel)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                placeholder="Votre adresse"
              />
            </div>

            {/* Genre et Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-yellow-light mb-1">
                  Sexe
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                >
                  <option value="">Sélectionnez</option>
                  <option value="H">Homme</option>
                  <option value="F">Femme</option>
                </select>
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-yellow-light mb-1">
                  Âge
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="120"
                  className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="Votre âge"
                />
              </div>
            </div>

            {/* Nationalité */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-yellow-light mb-1">
                Nationalité
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                placeholder="Votre nationalité"
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-yellow-light mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="Votre numéro"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-yellow-light mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Forfait */}
            <div>
              <label htmlFor="package" className="block text-sm font-medium text-yellow-light mb-1">
                Choisir votre forfait
              </label>
              <select
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
              >
                <option value="">Sélectionnez un forfait</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary py-3 text-lg font-semibold text-dark-100 flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-dark-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer la réservation'
                )}
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Votre réservation a été envoyée avec succès ! Nous vous contacterons bientôt.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.
              </div>
            )}
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Nous traiterons votre demande dans les plus brefs délais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
