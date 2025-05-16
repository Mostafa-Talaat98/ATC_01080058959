import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold text-lg mb-4">AreebEvents</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your one-stop platform for discovering, booking, and managing events.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Home</Link></li>
              <li><Link to="/my-bookings" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">My Bookings</Link></li>
              <li><Link to="/login" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Login</Link></li>
              <li><Link to="/register" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/?category=Conference" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Conferences</Link></li>
              <li><Link to="/?category=Music" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Music</Link></li>
              <li><Link to="/?category=Business" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Business</Link></li>
              <li><Link to="/?category=Technology" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Technology</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions or need help?<br />
              Email us at: <a href="mailto:mtlt278@gmail.com" className="text-primary hover:underline">mtlt278@gmail.com</a><br />
              WhatsApp: <a href="https://wa.me/201080058959" className="text-primary hover:underline">01080058959</a>
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700">
          <p>&copy; 2025 AreebEvents. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
