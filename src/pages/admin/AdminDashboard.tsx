
import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '@/contexts/EventContext';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate, formatCurrency, truncateText } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminDashboard = () => {
  const { events, deleteEvent } = useEvents();
  
  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };
  
  return (
    <ProtectedRoute requireAdmin>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your events</p>
          </div>
          <Link to="/admin/create-event">
            <Button>Create New Event</Button>
          </Link>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length > 0 ? (
                events.map(event => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{truncateText(event.name, 30)}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{formatDate(event.date)}</TableCell>
                    <TableCell>{formatCurrency(event.price)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link to={`/events/${event.id}`}>
                            <DropdownMenuItem>View</DropdownMenuItem>
                          </Link>
                          <Link to={`/admin/edit-event/${event.id}`}>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No events found. Create your first event.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
