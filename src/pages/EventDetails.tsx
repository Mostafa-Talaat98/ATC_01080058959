import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/sonner';
import { Share2, MapPin, Calendar, Users, Clock, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventCard } from '@/components/events/EventCard';
import { Event } from '@/types/event';

const EventDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { events, bookEvent, isEventBooked, addToWaitlist } = useEvents();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  const [isWaitlisting, setIsWaitlisting] = useState(false);
  
  const event = events.find(event => event.id === id);
  const alreadyBooked = isEventBooked(id || '');
  
  // Get related events (same category, excluding current event)
  const relatedEvents = events
    .filter(e => e.category === event?.category && e.id !== id)
    .slice(0, 3);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBookEvent = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    
    if (!event) return;
    
    if (event.capacity <= event.bookedCount) {
      setShowWaitlistDialog(true);
      return;
    }
    
    setIsBooking(true);
    try {
      await bookEvent(event.id);
      setBookingSuccess(true);
      toast.success(t('event.bookingSuccess'));
    } catch (error) {
      console.error('Error booking event:', error);
      toast.error(t('event.bookingError'));
    } finally {
      setIsBooking(false);
    }
  };

  const handleJoinWaitlist = async () => {
    if (!event || !user) return;
    
    setIsWaitlisting(true);
    try {
      await addToWaitlist(event.id, user.id);
      toast.success(t('event.waitlistSuccess'));
      setShowWaitlistDialog(false);
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast.error(t('event.waitlistError'));
    } finally {
      setIsWaitlisting(false);
    }
  };

  const handleShare = async () => {
    if (!event) return;
    
    const shareData = {
      title: event.name,
      text: event.description,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(t('event.linkCopied'));
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error(t('event.shareError'));
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12 dark:bg-gray-900">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 space-y-6">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container py-12 text-center dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('event.notFound')}</h2>
        <p className="mb-6 dark:text-gray-100">{t('event.notFoundDescription')}</p>
        <Button onClick={() => navigate('/')}>{t('event.backToEvents')}</Button>
      </div>
    );
  }

  const isEventFull = event.capacity <= event.bookedCount;
  const remainingSpots = event.capacity - event.bookedCount;

  return (
    <div className="container py-12 dark:bg-gray-900">
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="aspect-video rounded-lg overflow-hidden mb-6 relative group bg-white dark:bg-gray-800">
            <img 
              src={event.imageUrl} 
              alt={event.name} 
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{event.name}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{event.category}</Badge>
            <Badge variant="outline" className="dark:bg-gray-700 dark:text-gray-100">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(event.date)}
            </Badge>
            <Badge variant="outline" className="dark:bg-gray-700 dark:text-gray-100">
              <Clock className="h-3 w-3 mr-1" />
              {event.time}
            </Badge>
            <Badge variant="outline" className="dark:bg-gray-700 dark:text-gray-100">
              <MapPin className="h-3 w-3 mr-1" />
              {event.venue}
            </Badge>
          </div>
          
          <div className="prose max-w-none mb-6 dark:text-gray-100">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{t('event.about')}</h2>
            <p className="text-gray-600 whitespace-pre-line dark:text-gray-300">
              {event.description}
            </p>
          </div>

          {relatedEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">{t('event.relatedEvents')}</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {relatedEvents.map(relatedEvent => (
                  <EventCard key={relatedEvent.id} event={relatedEvent} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <Card className="sticky top-24 dark:bg-gray-800 dark:text-gray-100">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold dark:text-white">{formatCurrency(event.price)}</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">
                      {isEventFull ? (
                        <span className="text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {t('event.soldOut')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {t('event.remainingSpots', { count: remainingSpots })}
                        </span>
                      )}
                    </p>
                  </div>
                  {event.organizer && (
                    <Badge variant="outline" className="dark:bg-gray-700 dark:text-gray-100">
                      {t('event.organizedBy', { organizer: event.organizer })}
                    </Badge>
                  )}
                </div>

                {bookingSuccess ? (
                  <div className="text-center py-4">
                    <p className="text-green-600 font-medium mb-2">
                      {t('event.bookingConfirmed')}
                    </p>
                    <Link to="/my-bookings">
                      <Button variant="outline" className="w-full">
                        {t('event.viewBookings')}
                      </Button>
                    </Link>
                  </div>
                ) : alreadyBooked ? (
                  <div className="text-center py-4">
                    <p className="text-primary font-medium mb-2">
                      {t('event.alreadyBooked')}
                    </p>
                    <Link to="/my-bookings">
                      <Button variant="outline" className="w-full">
                        {t('event.viewBookings')}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleBookEvent}
                    disabled={isBooking || isEventFull}
                  >
                    {isBooking ? (
                      <>
                        <LoadingSpinner className="mr-2" />
                        {t('event.booking')}
                      </>
                    ) : isEventFull ? (
                      t('event.soldOut')
                    ) : (
                      t('event.bookNow')
                    )}
                  </Button>
                )}

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('event.dateAndTime')}</p>
                      <p>{formatDate(event.date)} at {event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <div>
                      <p className="font-medium">{t('event.venue')}</p>
                      <p>{event.venue}</p>
                      {event.address && <p className="mt-1">{event.address}</p>}
                    </div>
                  </div>
                  {event.organizer && (
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="font-medium">{t('event.organizer')}</p>
                        <p>{event.organizer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Waitlist Dialog */}
      <Dialog open={showWaitlistDialog} onOpenChange={setShowWaitlistDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('event.eventFull')}</DialogTitle>
            <DialogDescription>
              {t('event.waitlistDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowWaitlistDialog(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleJoinWaitlist}
              disabled={isWaitlisting}
            >
              {isWaitlisting ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  {t('event.joiningWaitlist')}
                </>
              ) : (
                t('event.joinWaitlist')
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails;
