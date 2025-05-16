
import React, { createContext, useContext, useState } from 'react';
import { Event, Booking, User } from '@/types';
import { toast } from '@/components/ui/sonner';
import { useAuth } from './AuthContext';

interface EventContextType {
  events: Event[];
  bookings: Booking[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  bookEvent: (eventId: string) => Promise<void>;
  isEventBooked: (eventId: string) => boolean;
  getUserBookings: () => Booking[];
  getUserBookedEvents: () => Event[];
  getFeaturedEvents: () => Event[];
  getEventsByTag: (tag: string) => Event[];
  getAllTags: () => string[];
}

// Sample event data
const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Tech Conference 2025',
    description: 'Join us for the premier tech conference of the year, featuring keynotes from industry leaders, workshops on cutting-edge technologies, and unparalleled networking opportunities.',
    category: 'Conference',
    date: '2025-06-15T09:00:00',
    venue: 'Grand Tech Center',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop',
    tags: ['technology', 'networking', 'innovation'],
    featured: true
  },
  {
    id: '2',
    name: 'Summer Music Festival',
    description: 'Experience three days of amazing music across five stages with over 50 artists. Food, camping, and unforgettable memories included!',
    category: 'Music',
    date: '2025-07-20T12:00:00',
    venue: 'Riverside Park',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop',
    tags: ['music', 'outdoor', 'festival'],
    featured: true
  },
  {
    id: '3',
    name: 'Business Leadership Summit',
    description: 'Learn from top business leaders about innovation, management strategies, and future market trends in this exclusive summit.',
    category: 'Business',
    date: '2025-05-10T10:00:00',
    venue: 'Executive Convention Center',
    price: 499.99,
    imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=600&auto=format&fit=crop',
    tags: ['business', 'leadership', 'networking']
  },
  {
    id: '4',
    name: 'Wellness Retreat',
    description: 'A weekend of mindfulness, yoga, meditation and healthy living workshops in a peaceful natural setting.',
    category: 'Wellness',
    date: '2025-08-05T08:00:00',
    venue: 'Mountain View Resort',
    price: 349.99,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    tags: ['wellness', 'meditation', 'yoga', 'health']
  },
  {
    id: '5',
    name: 'Artificial Intelligence Expo',
    description: 'Discover the latest in AI technology, including demos, panel discussions, and hands-on experiences with cutting-edge innovations.',
    category: 'Technology',
    date: '2025-09-15T09:00:00',
    venue: 'Future Technologies Center',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
    tags: ['technology', 'AI', 'innovation'],
    featured: true
  },
  {
    id: '6',
    name: 'Food & Wine Festival',
    description: 'Sample cuisines and beverages from top chefs and vineyards around the world at this delicious culinary celebration.',
    category: 'Food',
    date: '2025-06-25T17:00:00',
    venue: 'Central Park Gardens',
    price: 85.00,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop',
    tags: ['food', 'wine', 'culinary']
  },
  {
    id: '7',
    name: 'Digital Marketing Conference',
    description: 'Learn the latest strategies and tools in digital marketing from industry experts and successful practitioners.',
    category: 'Conference',
    date: '2025-10-05T09:00:00',
    venue: 'Digital Innovation Hub',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop',
    tags: ['marketing', 'digital', 'business']
  },
  {
    id: '8',
    name: 'Science Fiction Film Festival',
    description: 'A weekend celebrating the best in sci-fi cinema with screenings, director Q&As, and special effects demonstrations.',
    category: 'Entertainment',
    date: '2025-11-15T10:00:00',
    venue: 'Metropolis Cinema Complex',
    price: 75.00,
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    tags: ['film', 'entertainment', 'science-fiction']
  }
];

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `${events.length + 1}`, // In a real app, we'd get this from the backend
    };
    setEvents([...events, newEvent]);
    toast.success('Event created successfully');
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ));
    toast.success('Event updated successfully');
  };

  const deleteEvent = (id: string) => {
    // First, check if there are any bookings for this event
    const eventHasBookings = bookings.some(booking => booking.eventId === id);
    if (eventHasBookings) {
      toast.error('Cannot delete event with existing bookings');
      return;
    }
    
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event deleted successfully');
  };

  const bookEvent = async (eventId: string): Promise<void> => {
    if (!user) {
      toast.error('Please log in to book events');
      throw new Error('User not authenticated');
    }
    
    // Check if user already booked this event
    if (isEventBooked(eventId)) {
      toast.error('You have already booked this event');
      return;
    }
    
    // In a real app, this would be an API call
    const newBooking: Booking = {
      id: `booking-${bookings.length + 1}`,
      eventId,
      userId: user.id,
      bookingDate: new Date().toISOString(),
    };
    
    setBookings([...bookings, newBooking]);
    toast.success('Event booked successfully!');
  };

  const isEventBooked = (eventId: string): boolean => {
    if (!user) return false;
    return bookings.some(booking => booking.eventId === eventId && booking.userId === user.id);
  };

  const getUserBookings = (): Booking[] => {
    if (!user) return [];
    return bookings.filter(booking => booking.userId === user.id);
  };

  const getUserBookedEvents = (): Event[] => {
    if (!user) return [];
    const userBookings = getUserBookings();
    const bookedEventIds = userBookings.map(booking => booking.eventId);
    return events.filter(event => bookedEventIds.includes(event.id));
  };

  // New functions to support tags and featured events
  const getFeaturedEvents = (): Event[] => {
    return events.filter(event => event.featured);
  };

  const getEventsByTag = (tag: string): Event[] => {
    return events.filter(event => event.tags?.includes(tag));
  };

  const getAllTags = (): string[] => {
    const allTags = events.flatMap(event => event.tags || []);
    return [...new Set(allTags)];
  };

  return (
    <EventContext.Provider
      value={{
        events,
        bookings,
        addEvent,
        updateEvent,
        deleteEvent,
        bookEvent,
        isEventBooked,
        getUserBookings,
        getUserBookedEvents,
        getFeaturedEvents,
        getEventsByTag,
        getAllTags
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
