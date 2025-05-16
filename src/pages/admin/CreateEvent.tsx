import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '@/contexts/EventContext';
import { EventForm } from '@/components/events/EventForm';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const CreateEvent = () => {
  const { addEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleCreateEvent = (data: any) => {
    if (!user) return;
    addEvent({ ...data, createdBy: user.id });
    navigate('/admin');
  };
  
  return (
    <ProtectedRoute requireAdmin>
      <div className="dark:bg-gray-900 min-h-screen py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Create New Event</h1>
          <p className="text-muted-foreground dark:text-gray-300">Add a new event to your platform</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <EventForm onSubmit={handleCreateEvent} />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default CreateEvent;
