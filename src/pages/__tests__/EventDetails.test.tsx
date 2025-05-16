import React from 'react';
import { render, screen } from '@testing-library/react';
import EventDetails from '../EventDetails';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', name: 'User', role: 'user' }, isAuthenticated: true })
}));
jest.mock('@/contexts/EventContext', () => ({
  useEvents: () => ({
    events: [{
      id: '123',
      name: 'Test Event',
      description: 'Event description',
      category: 'Music',
      date: '2025-01-01',
      venue: 'Test Venue',
      price: 100,
      imageUrl: '',
      createdBy: '1',
      tags: ['music'],
      featured: false,
      bookedCount: 0,
      capacity: 10
    }],
    bookEvent: jest.fn(),
    isEventBooked: () => false,
    addToWaitlist: jest.fn(),
  })
}));

describe('EventDetails Page', () => {
  it('renders event info', () => {
    render(
      <MemoryRouter initialEntries={["/events/123"]}>
        <Routes>
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Event description/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Venue/i)).toBeInTheDocument();
  });

  it('renders the booking button', () => {
    render(
      <MemoryRouter initialEntries={["/events/123"]}>
        <Routes>
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
  });
}); 