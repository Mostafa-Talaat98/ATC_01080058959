
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    if (newLang === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  };
  
  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className="px-2"
    >
      {i18n.language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export { LanguageSwitcher };
