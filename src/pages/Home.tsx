import React, { useState, useMemo } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { EventCard } from '@/components/events/EventCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Pagination } from '@/components/ui/pagination';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { Event } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowUpDown, Calendar, DollarSign, Users } from 'lucide-react';

// Constants for event categories
export const EVENT_CATEGORIES = [
  'All',
  'Conference',
  'Music',
  'Business',
  'Wellness',
  'Technology',
  'Food',
  'Entertainment',
] as const;

const Home = () => {
  const { t } = useTranslation();
  const { events } = useEvents();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [events, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Loading skeleton for event cards
  const EventCardSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/90 to-purple-800 py-16 text-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">{t('home.title')}</h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Input 
              className="w-full max-w-sm bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400" 
              placeholder={t('home.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full max-w-[200px] bg-purple-700 text-white border-none shadow-none rounded-b-lg dark:bg-gray-700 dark:text-gray-100">
                <SelectValue placeholder={t('home.selectCategory')} />
              </SelectTrigger>
              <SelectContent className="bg-white text-black rounded-b-lg border-none shadow-lg dark:bg-gray-800 dark:text-gray-100">
                {EVENT_CATEGORIES.map(category => (
                  <SelectItem
                    key={category}
                    value={category}
                    className={
                      category === 'All'
                        ? 'bg-purple-50 text-purple-700 font-semibold dark:bg-gray-700 dark:text-purple-300'
                        : ''
                    }
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {user?.role === 'admin' && (
            <div className="mt-8">
              <Link to="/admin/create-event">
                <Button variant="secondary">{t('home.createEvent')}</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Events Grid Section */}
      <section className="container py-12 dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('home.upcomingEvents')}</h2>
        {filteredEvents.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)} 
                    disabled={currentPage === 1}
                  />
                  <Pagination.Previous 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                  />
                  <Pagination.List>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Pagination.Item 
                        key={page} 
                        value={page} 
                        isActive={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      />
                    ))}
                  </Pagination.List>
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(totalPages)} 
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t('home.noEventsFound')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('home.noEventsDescription')}
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}>
              {t('home.resetFilters')}
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
