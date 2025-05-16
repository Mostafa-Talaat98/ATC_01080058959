import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  
  return (
    <nav className="border-b bg-white py-4 shadow-sm dark:bg-gray-900">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            {t('common.appName')}
          </Link>
          <div className="ml-10 hidden space-x-4 md:flex">
            <Link to="/" className="text-gray-600 hover:text-primary dark:text-gray-200 dark:hover:text-primary">{t('common.events')}</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-primary dark:text-gray-200 dark:hover:text-primary">{t('common.admin')}</Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user?.name}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/my-bookings" className="w-full">{t('common.myBookings')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>{t('common.logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="outline">{t('common.login')}</Button>
              </Link>
              <Link to="/register">
                <Button>{t('common.signup')}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
