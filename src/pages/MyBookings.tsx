import React from 'react';
import { useEvents } from '@/contexts/EventContext';
import { EventCard } from '@/components/events/EventCard';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MyBookings = () => {
  const { getUserBookedEvents } = useEvents();
  const bookedEvents = getUserBookedEvents();
  
  return (
    <ProtectedRoute>
      <div className="container py-12 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">My Bookings</h1>
        <p className="text-muted-foreground mb-8 dark:text-gray-300">Manage all your upcoming event bookings</p>
        
        {bookedEvents.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {bookedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">No bookings yet</h2>
            <p className="text-muted-foreground mb-6 dark:text-gray-300">
              You haven't booked any events yet. Explore our events and book your first one!
            </p>
            <Link to="/">
              <Button>Browse Events</Button>
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MyBookings;
