
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '@/contexts/EventContext';
import { EventForm } from '@/components/events/EventForm';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Card, CardContent } from '@/components/ui/card';

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  
  const event = events.find(event => event.id === id);
  
  const handleUpdateEvent = (data: any) => {
    if (id) {
      updateEvent(id, data);
      navigate('/admin');
    }
  };
  
  if (!event) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Event not found</h2>
          <p>The event you're trying to edit doesn't exist or has been removed.</p>
        </div>
      </ProtectedRoute>
    );
  }
  
  return (
    <ProtectedRoute requireAdmin>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Edit Event</h1>
          <p className="text-muted-foreground">Update the event details</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <EventForm 
              initialValues={event} 
              onSubmit={handleUpdateEvent} 
              isEdit={true}
            />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default EditEvent;
