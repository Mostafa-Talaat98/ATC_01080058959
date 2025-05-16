import React from 'react';
import { render, screen } from '@testing-library/react';
import MyBookings from '../MyBookings';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', name: 'User', role: 'user' }, isAuthenticated: true })
}));
jest.mock('@/contexts/EventContext', () => ({
  useEvents: () => ({ getUserBookedEvents: () => [] })
}));

describe('MyBookings Page', () => {
  it('renders the heading', () => {
    render(
      <BrowserRouter>
        <MyBookings />
      </BrowserRouter>
    );
    expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
  });

  it('shows empty state if no bookings', () => {
    render(
      <BrowserRouter>
        <MyBookings />
      </BrowserRouter>
    );
    expect(screen.getByText(/No bookings yet/i)).toBeInTheDocument();
  });
}); 