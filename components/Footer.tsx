import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 text-center md:text-left">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex justify-center md:justify-start mb-6">
          <a
            href="https://www.instagram.com/iirda_events"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-8 h-8 md:w-6 md:h-6"
            />
          </a>
          <a
            href="https://wa.me/message/RQ44I22HB7WLL1"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-8 h-8 md:w-6 md:h-6"
            />
          </a>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <p className="text-gray-700 text-lg md:text-base">
            <strong>Mobile:</strong> +123-456-7890
          </p>
          <p className="text-gray-700 text-lg md:text-base">
            <strong>Email:</strong> <a href="mailto:youremail@example.com" className="text-blue-500">iirdaevents@gmail.com</a>
          </p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <p className="text-gray-700 text-lg md:text-base">
            <strong>Address:</strong> Manjeri,Malappuram,Kerala
          </p>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-gray-500 text-sm md:text-base">&copy; 2024 Iirda Event Management. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
