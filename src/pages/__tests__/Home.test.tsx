import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', name: 'Admin', role: 'admin' }, isAuthenticated: true })
}));
jest.mock('@/contexts/EventContext', () => ({
  useEvents: () => ({ events: [], getUserBookedEvents: () => [], isLoading: false })
}));

describe('Home Page', () => {
  it('renders the home page title', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Find Your Perfect Event/i)).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Search events/i)).toBeInTheDocument();
  });

  it('shows create event button for admin', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Create New Event/i)).toBeInTheDocument();
  });
}); 