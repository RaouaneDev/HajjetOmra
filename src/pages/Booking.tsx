import React, { useState, useEffect } from 'react';

const packages = [
  { id: 'omra-ramadan', name: 'Omra Ramadan - 15 jours', price: 2500 },
  { id: 'hajj-confort', name: 'Hajj Confort - 3 semaines', price: 6500 },
  { id: 'omra-express', name: 'Omra Express - 10 jours', price: 1800 }
];

const roomTypes = [
  { id: 'quadruple', name: 'Chambre Quadruple', description: '4 personnes', priceCalculation: (basePrice: number) => basePrice },
  { id: 'triple', name: 'Chambre Triple', description: '3 personnes', priceCalculation: (basePrice: number) => basePrice + (basePrice * 0.33) },
  { id: 'double', name: 'Chambre Double', description: '2 personnes', priceCalculation: (basePrice: number) => basePrice + (basePrice * 0.50) }
];

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4VudhVGfJJaENs-ld5N8FefoQHofngmwL-ZwJ2XJ04pO2SW-xZntCHtvzGb4RNiU0/exec';

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    age: '',
    nationality: '',
    phone: '',
    email: '',
    package: '',
    roomType: ''
  });

  const [totalPrice, setTotalPrice] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Calculer le prix total lorsque le forfait ou le type de chambre change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (formData.package && formData.roomType) {
      const selectedPackage = packages.find(pkg => pkg.id === formData.package);
      const selectedRoom = roomTypes.find(room => room.id === formData.roomType);
      
      if (selectedPackage && selectedRoom) {
        const basePrice = selectedPackage.price;
        const finalPrice = selectedRoom.priceCalculation(basePrice);
        setTotalPrice(`${finalPrice.toFixed(2)}€`);
      }
    } else {
      setTotalPrice('');
    }
  }, [formData.package, formData.roomType]);

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
    const selectedRoom = roomTypes.find(room => room.id === formData.roomType);
    
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
      urlWithParams.searchParams.append('roomType', selectedRoom?.name || '');
      urlWithParams.searchParams.append('totalPrice', totalPrice);

      await fetch(urlWithParams.toString(), {
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
        package: '',
        roomType: ''
      });
      setTotalPrice('');
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
                    {pkg.name} - {pkg.price}€
                  </option>
                ))}
              </select>
            </div>

            {/* Type de Chambre */}
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-yellow-light mb-1">
                Type de Chambre
              </label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
              >
                <option value="">Sélectionnez le type de chambre</option>
                {roomTypes.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} ({room.description})
                  </option>
                ))}
              </select>
            </div>

            {/* Prix Total */}
            {totalPrice && (
              <div className="mt-4 p-4 bg-dark-100 border border-primary rounded-md">
                <p className="text-lg font-semibold text-primary text-center">
                  Prix Total: {totalPrice}
                </p>
              </div>
            )}

            {/* Prénom */}
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
              />
            </div>

            {/* Nom */}
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
              />
            </div>

            {/* Adresse */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-yellow-light mb-1">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
              />
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-yellow-light mb-1">
                Genre
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
              >
                <option value="">Sélectionnez votre genre</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
            </div>

            {/* Âge */}
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
                min="0"
                max="120"
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
              />
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
              />
            </div>

            {/* Téléphone */}
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
              />
            </div>

            {/* Email */}
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
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white text-lg font-medium ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
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
