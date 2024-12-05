import React, { useState } from 'react';
import { FaPhone, FaWhatsapp, FaTimes } from 'react-icons/fa';

const FloatingCallButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+33123456789'; // Remplacez par votre numéro de téléphone

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-primary text-dark-100 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaPhone size={24} />}
      </button>

      {/* Sous-menu */}
      <div
        className={`absolute bottom-20 right-0 flex flex-col gap-4 transition-all duration-300 ${
          isOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 pointer-events-none transform translate-y-4'
        }`}
      >
        {/* Bouton WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
          title="WhatsApp"
        >
          <FaWhatsapp size={24} />
        </button>

        {/* Bouton Téléphone */}
        <button
          onClick={handlePhoneClick}
          className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
          title="Appeler"
        >
          <FaPhone size={20} />
        </button>
      </div>
    </div>
  );
};

export default FloatingCallButton;
