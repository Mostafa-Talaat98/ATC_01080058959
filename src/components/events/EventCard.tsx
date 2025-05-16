import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Event } from '@/types';
import { useEvents } from '@/contexts/EventContext';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isEventBooked, deleteEvent } = useEvents();
  const { user } = useAuth();
  const isBooked = isEventBooked(event.id);
  const isCreator = user && event.createdBy === user.id;
  
  return (
    <Card className="event-card overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
      <div className="aspect-[16/9] relative">
        <img 
          src={event.imageUrl} 
          alt={event.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary text-white">{event.category}</Badge>
        </div>
        {event.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-amber-500 text-white">Featured</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-grow dark:bg-gray-800 dark:text-gray-100">
        <h3 className="text-lg font-bold leading-tight line-clamp-1">{event.name}</h3>
        <div className="mt-2 flex items-center text-sm text-muted-foreground dark:text-gray-300">
          <span>{formatDate(event.date)}</span>
          <span className="mx-1">•</span>
          <span className="truncate">{event.venue}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {event.description}
        </p>
        <div className="mt-2 text-lg font-semibold">${event.price.toFixed(2)}</div>
        
        {event.tags && event.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {event.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-200">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2 dark:bg-gray-800">
        {isBooked ? (
          <Button className="w-full" variant="outline" disabled>
            Already Booked
          </Button>
        ) : (
          <Link to={`/events/${event.id}`} className="w-full">
            <Button className="w-full gradient-hover bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </Link>
        )}
        {isCreator && (
          <div className="flex gap-2 mt-2">
            <Link to={`/admin/edit-event/${event.id}`} className="w-full">
              <Button className="w-full" variant="secondary">
                Edit
              </Button>
            </Link>
            <Button className="w-full" variant="destructive" onClick={() => deleteEvent(event.id)}>
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
